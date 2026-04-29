import type { Claim } from "@/types/eeo";

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
