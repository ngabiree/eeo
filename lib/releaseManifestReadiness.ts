import type { CorridorDossier } from "@/types/corridorDossier";
import type { Claim, EvidenceItem, Source } from "@/types/eeo";
import { assessDossierReadiness } from "@/lib/dossierReadiness";
import { assessEvidenceIntegrity } from "@/lib/evidenceIntegrity";
import { canClaimBeApprovedForRelease } from "@/lib/publicationRules";
import { assessSourceReadiness } from "@/lib/sourceReadiness";

const PUBLIC_SAFE_SUMMARY =
  "This is an internal structural readiness check only. It does not sign a release manifest, approve publication, validate factual truth, determine legal status, or clear source rights.";

export type ReleaseManifestBlockingIssueType =
  | "dossier_release_not_ready"
  | "dossier_sections_incomplete"
  | "dossier_sections_missing_claims"
  | "dossier_sections_missing_evidence"
  | "claims_missing_evidence_links"
  | "claims_reference_missing_evidence"
  | "evidence_references_missing_sources"
  | "evidence_without_claim_links"
  | "reciprocal_link_mismatches"
  | "sources_missing_accessed_date";

export type ReleaseManifestReviewFlagType =
  | "non_approvable_claims"
  | "claims_with_only_contextual_evidence"
  | "sources_with_unknown_license"
  | "sources_permission_required"
  | "sources_restricted"
  | "sources_unused_by_evidence";

export interface ReleaseManifestReadinessItem<TType extends string> {
  type: TType;
  count: number;
  publicSafeSummary: string;
}

export interface ReleaseManifestReadinessAssessment {
  releaseReadiness: CorridorDossier["releaseReadiness"];
  totalClaims: number;
  approvableClaims: number;
  nonApprovableClaims: number;
  dossierReady: boolean;
  evidenceIntegrityPasses: boolean;
  sourceReadinessPasses: boolean;
  blockingStructuralIssues: ReleaseManifestReadinessItem<ReleaseManifestBlockingIssueType>[];
  reviewFlags: ReleaseManifestReadinessItem<ReleaseManifestReviewFlagType>[];
  publicSafeSummary: string;
}

export function assessReleaseManifestReadiness(params: {
  dossier: CorridorDossier;
  claims: Claim[];
  evidenceItems: EvidenceItem[];
  sources: Source[];
}): ReleaseManifestReadinessAssessment {
  const dossierReadiness = assessDossierReadiness(params.dossier);
  const evidenceIntegrity = assessEvidenceIntegrity({
    claims: params.claims,
    evidenceItems: params.evidenceItems,
    sources: params.sources,
  });
  const sourceReadiness = assessSourceReadiness({
    sources: params.sources,
    evidenceItems: params.evidenceItems,
  });

  const approvableClaims = params.claims.filter(
    canClaimBeApprovedForRelease
  ).length;
  const nonApprovableClaims = params.claims.length - approvableClaims;

  const dossierReleaseStageReady =
    params.dossier.releaseReadiness === "release_candidate" ||
    params.dossier.releaseReadiness === "released";
  const incompleteDossierSections =
    dossierReadiness.notStartedSections +
    dossierReadiness.inProgressSections +
    dossierReadiness.blockedOrWithheldSections;
  const dossierReady =
    dossierReleaseStageReady &&
    incompleteDossierSections === 0 &&
    dossierReadiness.sectionsMissingClaims.length === 0 &&
    dossierReadiness.sectionsMissingEvidence.length === 0;

  const evidenceIntegrityPasses =
    evidenceIntegrity.claimsMissingEvidenceLinks.length === 0 &&
    evidenceIntegrity.claimsWithMissingEvidenceItems.length === 0 &&
    evidenceIntegrity.evidenceItemsMissingSources.length === 0 &&
    evidenceIntegrity.evidenceItemsWithNoClaimLinks.length === 0 &&
    evidenceIntegrity.reciprocalLinkMismatches.length === 0;

  const sourceReadinessPasses =
    sourceReadiness.sourcesMissingAccessedDate.length === 0 &&
    sourceReadiness.evidenceUsingMissingSources.length === 0;

  const blockingStructuralIssues: ReleaseManifestReadinessAssessment["blockingStructuralIssues"] =
    [];
  const reviewFlags: ReleaseManifestReadinessAssessment["reviewFlags"] = [];

  addReadinessItem(
    blockingStructuralIssues,
    "dossier_release_not_ready",
    dossierReleaseStageReady ? 0 : 1,
    "Dossier release readiness is not at release-candidate posture."
  );
  addReadinessItem(
    blockingStructuralIssues,
    "dossier_sections_incomplete",
    incompleteDossierSections,
    "One or more dossier sections remain incomplete, under review, or withheld."
  );
  addReadinessItem(
    blockingStructuralIssues,
    "dossier_sections_missing_claims",
    dossierReadiness.sectionsMissingClaims.length,
    "One or more dossier sections have no linked claims."
  );
  addReadinessItem(
    blockingStructuralIssues,
    "dossier_sections_missing_evidence",
    dossierReadiness.sectionsMissingEvidence.length,
    "One or more dossier sections have no linked evidence."
  );
  addReadinessItem(
    blockingStructuralIssues,
    "claims_missing_evidence_links",
    evidenceIntegrity.claimsMissingEvidenceLinks.length,
    "One or more claims have no linked evidence."
  );
  addReadinessItem(
    blockingStructuralIssues,
    "claims_reference_missing_evidence",
    evidenceIntegrity.claimsWithMissingEvidenceItems.length,
    "One or more claims reference evidence records that are not present."
  );
  addReadinessItem(
    blockingStructuralIssues,
    "evidence_references_missing_sources",
    evidenceIntegrity.evidenceItemsMissingSources.length,
    "One or more evidence records reference source records that are not present."
  );
  addReadinessItem(
    blockingStructuralIssues,
    "evidence_without_claim_links",
    evidenceIntegrity.evidenceItemsWithNoClaimLinks.length,
    "One or more evidence records have no claim links."
  );
  addReadinessItem(
    blockingStructuralIssues,
    "reciprocal_link_mismatches",
    evidenceIntegrity.reciprocalLinkMismatches.length,
    "One or more claim/evidence reciprocal links do not match structurally."
  );
  addReadinessItem(
    blockingStructuralIssues,
    "sources_missing_accessed_date",
    sourceReadiness.sourcesMissingAccessedDate.length,
    "One or more source records are missing an accessed date."
  );

  addReadinessItem(
    reviewFlags,
    "non_approvable_claims",
    nonApprovableClaims,
    "One or more claims do not currently meet the local release-approval helper conditions."
  );
  addReadinessItem(
    reviewFlags,
    "claims_with_only_contextual_evidence",
    evidenceIntegrity.claimsWithOnlyContextualEvidence.length,
    "One or more claims have only contextual evidence links."
  );
  addReadinessItem(
    reviewFlags,
    "sources_with_unknown_license",
    sourceReadiness.sourcesWithUnknownLicense.length,
    "One or more source records have unknown license posture and need review."
  );
  addReadinessItem(
    reviewFlags,
    "sources_permission_required",
    sourceReadiness.sourcesPermissionRequired.length,
    "One or more source records are marked permission-required and need review."
  );
  addReadinessItem(
    reviewFlags,
    "sources_restricted",
    sourceReadiness.sourcesRestricted.length,
    "One or more source records are marked restricted and need review."
  );
  addReadinessItem(
    reviewFlags,
    "sources_unused_by_evidence",
    sourceReadiness.sourcesUnusedByEvidence.length,
    "One or more source records are not linked from current evidence records."
  );

  return {
    releaseReadiness: params.dossier.releaseReadiness,
    totalClaims: params.claims.length,
    approvableClaims,
    nonApprovableClaims,
    dossierReady,
    evidenceIntegrityPasses,
    sourceReadinessPasses,
    blockingStructuralIssues,
    reviewFlags,
    publicSafeSummary: PUBLIC_SAFE_SUMMARY,
  };
}

function addReadinessItem<TType extends string>(
  items: ReleaseManifestReadinessItem<TType>[],
  type: TType,
  count: number,
  publicSafeSummary: string
): void {
  if (count === 0) {
    return;
  }

  items.push({
    type,
    count,
    publicSafeSummary,
  });
}
