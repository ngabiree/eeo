import type { Claim } from "@/types/eeo";
import type { ClaimGovernanceStatus } from "@/types/eeo";
import type { CorrectionSubmission } from "@/lib/correctionsStore";

import { hasContradictoryEvidence, isContextualOnly } from "./evidenceUtils";
import { validateClaimRequiredFields } from "./validation";

export function getClaimIntegrityWarnings(claim: Claim): string[] {
  const warnings: string[] = [];
  const missing = validateClaimRequiredFields(claim);

  if (missing.length) {
    warnings.push(`Missing required fields: ${missing.join(", ")}.`);
  }
  if (!claim.evidenceLinks.length) {
    warnings.push("No evidence is linked.");
  }
  if (isContextualOnly(claim.evidenceLinks)) {
    warnings.push("Evidence is contextual only; no supporting source has been linked.");
  }
  if (hasContradictoryEvidence(claim.evidenceLinks)) {
    warnings.push("Evidence set includes contradiction links; manual review required.");
  }
  if (claim.confidence === "insufficient") {
    warnings.push("Confidence is insufficient.");
  }
  if (claim.exposureRisk === "high" || claim.exposureRisk === "do_not_publish") {
    warnings.push("Exposure risk is high for public display.");
  }
  if (claim.publicationDecision === "withhold" || claim.publicationDecision === "do_not_collect") {
    warnings.push("Publication decision does not allow public release.");
  }
  if (
    claim.rightOfReplyRequired &&
    (claim.rightOfReplyStatus === "not_requested" ||
      claim.rightOfReplyStatus === "requested")
  ) {
    warnings.push("Right-of-reply is required and not yet complete.");
  }
  if (
    ["draft", "legal_review", "exposure_review", "challenged", "withdrawn"].includes(
      claim.reviewStatus
    )
  ) {
    warnings.push(`Review status is ${claim.reviewStatus}; claim is not ready for public release.`);
  }

  return warnings;
}

export type ClaimCorrectionSummary = {
  claimId: string;
  linkedCorrections: CorrectionSubmission[];
  openCorrections: CorrectionSubmission[];
  resolvedCorrections: CorrectionSubmission[];
  latestCorrectionAt?: string;
  governanceStatus: ClaimGovernanceStatus;
};

function getCorrectionSortTimestamp(correction: CorrectionSubmission): string {
  return correction.triageUpdatedAt || correction.submittedAt;
}

export function getClaimCorrectionSummary(
  claimId: string,
  corrections: CorrectionSubmission[]
): ClaimCorrectionSummary {
  const linkedCorrections = corrections.filter((correction) => correction.claimId === claimId);
  const openCorrections = linkedCorrections.filter((correction) => correction.triageStatus !== "resolved");
  const resolvedCorrections = linkedCorrections.filter((correction) => correction.triageStatus === "resolved");
  const latestCorrectionAt = linkedCorrections
    .map(getCorrectionSortTimestamp)
    .sort((a, b) => b.localeCompare(a))[0];

  const hasWithdrawal = linkedCorrections.some((correction) => correction.category === "Withdrawal request");
  const hasRestriction = linkedCorrections.some(
    (correction) =>
      correction.category === "Harm-risk restriction request" ||
      correction.category === "Indigenous or community-sensitive review"
  );
  const hasUnderReview = linkedCorrections.some((correction) => correction.triageStatus === "in_review");
  const hasChallenged = linkedCorrections.some(
    (correction) => correction.triageStatus === "queued" || correction.triageStatus === "needs_review"
  );

  let governanceStatus: ClaimGovernanceStatus = "stable";
  if (hasWithdrawal) {
    governanceStatus = "withdrawn";
  } else if (hasRestriction) {
    governanceStatus = "restricted";
  } else if (hasUnderReview) {
    governanceStatus = "under_review";
  } else if (hasChallenged) {
    governanceStatus = "challenged";
  } else if (resolvedCorrections.length > 0) {
    governanceStatus = "corrected";
  }

  return {
    claimId,
    linkedCorrections,
    openCorrections,
    resolvedCorrections,
    latestCorrectionAt,
    governanceStatus,
  };
}
