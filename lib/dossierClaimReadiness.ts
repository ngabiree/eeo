import type { SourceMapEntry } from "@/data/sourceMap";
import type { CorrectionSubmission } from "@/lib/correctionsSchema";
import {
  getClaimCorrectionSummary,
  getClaimEvidenceCompleteness,
  getSourceLimitationsForClaim,
} from "@/lib/claimUtils";
import type { Claim, EvidenceItem, ReleaseManifest, Source } from "@/types/eeo";

export type DossierClaimReadinessStatus = "ready" | "needs_review" | "blocked";

export type DossierClaimReadinessIssueType =
  | "missing_claim_evidence_links"
  | "missing_evidence_record"
  | "missing_source_record"
  | "missing_source_limitations"
  | "missing_claim_limitations"
  | "missing_revision_conditions"
  | "right_of_reply_pending"
  | "review_not_approved"
  | "high_or_restricted_exposure"
  | "publication_not_public_safe"
  | "open_correction"
  | "withheld_from_release_manifest"
  | "not_listed_in_release_manifest";

export interface DossierClaimReadinessIssue {
  type: DossierClaimReadinessIssueType;
  severity: "blocker" | "warning";
  publicSafeSummary: string;
}

export interface DossierClaimReadinessRow {
  claimId: string;
  title: string;
  status: DossierClaimReadinessStatus;
  releaseManifestDisposition: "included" | "withheld" | "not_listed";
  evidenceCount: number;
  sourceCount: number;
  sourceLimitationCount: number;
  openCorrectionCount: number;
  reviewStatus: Claim["reviewStatus"];
  confidence: Claim["confidence"];
  exposureRisk: Claim["exposureRisk"];
  publicationDecision: Claim["publicationDecision"];
  rightOfReplyStatus: Claim["rightOfReplyStatus"];
  issues: DossierClaimReadinessIssue[];
}

export interface DossierClaimReadinessAssessment {
  totalClaims: number;
  readyClaimCount: number;
  needsReviewClaimCount: number;
  blockedClaimCount: number;
  rows: DossierClaimReadinessRow[];
  publicSafeSummary: string;
}

export function assessDossierClaimReadiness(params: {
  claims: Claim[];
  evidenceItems: EvidenceItem[];
  sources: Source[];
  sourceMap: SourceMapEntry[];
  releaseManifest: ReleaseManifest;
  corrections: CorrectionSubmission[];
}): DossierClaimReadinessAssessment {
  const evidenceById = new Map(params.evidenceItems.map((item) => [item.id, item]));
  const sourceById = new Map(params.sources.map((source) => [source.id, source]));
  const includedClaimIds = new Set(params.releaseManifest.includedClaimIds);
  const withheldClaimIds = new Set(params.releaseManifest.withheldClaimIds);

  const rows = params.claims.map((claim) => {
    const issues: DossierClaimReadinessIssue[] = [];
    const linkedEvidenceIds = claim.evidenceLinks.map((link) => link.evidenceId);
    const linkedEvidence = linkedEvidenceIds
      .map((evidenceId) => evidenceById.get(evidenceId))
      .filter((item): item is EvidenceItem => Boolean(item));
    const missingEvidenceIds = linkedEvidenceIds.filter((evidenceId) => !evidenceById.has(evidenceId));
    const sourceIds = [...new Set(linkedEvidence.map((item) => item.sourceId))];
    const missingSourceIds = sourceIds.filter((sourceId) => !sourceById.has(sourceId));
    const sourceLimitations = getSourceLimitationsForClaim(
      claim.id,
      params.evidenceItems,
      params.sources,
      params.sourceMap
    );
    const completeness = getClaimEvidenceCompleteness(
      claim,
      params.evidenceItems,
      params.sources,
      params.sourceMap
    );
    const correctionSummary = getClaimCorrectionSummary(claim.id, params.corrections);

    if (claim.evidenceLinks.length === 0) {
      issues.push({
        type: "missing_claim_evidence_links",
        severity: "blocker",
        publicSafeSummary: "Claim has no claim-level evidence links.",
      });
    }

    if (missingEvidenceIds.length > 0) {
      issues.push({
        type: "missing_evidence_record",
        severity: "blocker",
        publicSafeSummary: "Claim references evidence records that are not present.",
      });
    }

    if (missingSourceIds.length > 0 || !completeness.hasSources) {
      issues.push({
        type: "missing_source_record",
        severity: "blocker",
        publicSafeSummary: "Linked evidence is missing one or more source records.",
      });
    }

    if (sourceLimitations.length === 0) {
      issues.push({
        type: "missing_source_limitations",
        severity: "warning",
        publicSafeSummary: "Claim has no inspectable source-limitations summary.",
      });
    }

    if (claim.whatThisDoesNotProve.length === 0) {
      issues.push({
        type: "missing_claim_limitations",
        severity: "warning",
        publicSafeSummary: "Claim does not state what it does not prove.",
      });
    }

    if (claim.whatWouldReviseThisClaim.length === 0) {
      issues.push({
        type: "missing_revision_conditions",
        severity: "warning",
        publicSafeSummary: "Claim does not state what would revise it.",
      });
    }

    if (
      claim.rightOfReplyRequired &&
      !["received", "declined"].includes(claim.rightOfReplyStatus)
    ) {
      issues.push({
        type: "right_of_reply_pending",
        severity: "blocker",
        publicSafeSummary: "Right-of-reply is required but not closed.",
      });
    }

    if (claim.reviewStatus !== "approved_for_release") {
      issues.push({
        type: "review_not_approved",
        severity: "warning",
        publicSafeSummary: "Claim is not yet marked approved for release.",
      });
    }

    if (
      claim.exposureRisk === "high" ||
      claim.exposureRisk === "restricted" ||
      claim.exposureRisk === "do_not_publish"
    ) {
      issues.push({
        type: "high_or_restricted_exposure",
        severity: "blocker",
        publicSafeSummary: "Claim has high, restricted, or do-not-publish exposure posture.",
      });
    }

    if (
      claim.publicationDecision === "withhold" ||
      claim.publicationDecision === "do_not_collect"
    ) {
      issues.push({
        type: "publication_not_public_safe",
        severity: "blocker",
        publicSafeSummary: "Claim publication decision does not allow public release.",
      });
    }

    if (correctionSummary.openCorrections.length > 0) {
      issues.push({
        type: "open_correction",
        severity: "warning",
        publicSafeSummary: "Claim has open correction activity.",
      });
    }

    let releaseManifestDisposition: DossierClaimReadinessRow["releaseManifestDisposition"] = "not_listed";
    if (includedClaimIds.has(claim.id)) {
      releaseManifestDisposition = "included";
    } else if (withheldClaimIds.has(claim.id)) {
      releaseManifestDisposition = "withheld";
      issues.push({
        type: "withheld_from_release_manifest",
        severity: "warning",
        publicSafeSummary: "Claim is currently withheld from the release manifest.",
      });
    } else {
      issues.push({
        type: "not_listed_in_release_manifest",
        severity: "warning",
        publicSafeSummary: "Claim is not listed in the current release manifest.",
      });
    }

    const hasBlockers = issues.some((issue) => issue.severity === "blocker");
    const hasWarnings = issues.some((issue) => issue.severity === "warning");
    const status: DossierClaimReadinessStatus = hasBlockers
      ? "blocked"
      : hasWarnings
        ? "needs_review"
        : "ready";

    return {
      claimId: claim.id,
      title: claim.title,
      status,
      releaseManifestDisposition,
      evidenceCount: linkedEvidence.length,
      sourceCount: sourceIds.filter((sourceId) => sourceById.has(sourceId)).length,
      sourceLimitationCount: sourceLimitations.length,
      openCorrectionCount: correctionSummary.openCorrections.length,
      reviewStatus: claim.reviewStatus,
      confidence: claim.confidence,
      exposureRisk: claim.exposureRisk,
      publicationDecision: claim.publicationDecision,
      rightOfReplyStatus: claim.rightOfReplyStatus,
      issues,
    };
  });

  const readyClaimCount = rows.filter((row) => row.status === "ready").length;
  const needsReviewClaimCount = rows.filter((row) => row.status === "needs_review").length;
  const blockedClaimCount = rows.filter((row) => row.status === "blocked").length;

  return {
    totalClaims: rows.length,
    readyClaimCount,
    needsReviewClaimCount,
    blockedClaimCount,
    rows,
    publicSafeSummary:
      "This is an internal dossier-readiness check. It verifies structural claim, evidence, source, correction, right-of-reply, and release-manifest posture. It does not certify factual truth, determine legal status, assign liability, rank actors, or approve publication.",
  };
}
