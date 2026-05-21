import type { Claim, ConfidenceLevel, ExposureRisk, PublicationDecision, ReviewStatus } from "@/types/eeo";

const VALID_CONFIDENCE: ReadonlySet<ConfidenceLevel> = new Set(["high", "medium", "low", "insufficient", "disputed"]);
const VALID_EXPOSURE_RISK: ReadonlySet<ExposureRisk> = new Set([
  "low",
  "medium",
  "high",
  "restricted",
  "do_not_publish",
]);
const VALID_PUBLICATION_DECISION: ReadonlySet<PublicationDecision> = new Set([
  "publish",
  "publish_aggregated",
  "publish_with_redactions",
  "withhold",
  "do_not_collect",
]);
const VALID_REVIEW_STATUS: ReadonlySet<ReviewStatus> = new Set([
  "draft",
  "method_review",
  "legal_review",
  "exposure_review",
  "right_of_reply_pending",
  "approved_for_release",
  "challenged",
  "corrected",
  "withdrawn",
]);

/** Returns missing required field names. */
export function validateClaimRequiredFields(claim: Claim): string[] {
  const missing: string[] = [];

  if (!claim.id) missing.push("id");
  if (!claim.title) missing.push("title");
  if (!claim.plainLanguageClaim) missing.push("plainLanguageClaim");
  if (!claim.claimType) missing.push("claimType");
  if (!claim.legalPosture) missing.push("legalPosture");
  if (!claim.corridorNode) missing.push("corridorNode");
  if (!claim.evidenceLinks?.length) missing.push("evidenceLinks");
  if (!claim.confidence) missing.push("confidence");
  if (!claim.exposureRisk) missing.push("exposureRisk");
  if (!claim.publicationDecision) missing.push("publicationDecision");
  if (!claim.reviewStatus) missing.push("reviewStatus");
  if (!claim.rightOfReplyStatus) missing.push("rightOfReplyStatus");
  if (!claim.whatThisDoesNotProve?.length) missing.push("whatThisDoesNotProve");
  if (!claim.whatWouldReviseThisClaim?.length) missing.push("whatWouldReviseThisClaim");
  if (!claim.lastUpdated) missing.push("lastUpdated");

  return missing;
}

/** Returns invalid field names where values are present but not recognized enum members. */
export function validateClaimEnumValues(claim: Claim): string[] {
  const invalid: string[] = [];

  if (claim.confidence && !VALID_CONFIDENCE.has(claim.confidence)) invalid.push("confidence");
  if (claim.exposureRisk && !VALID_EXPOSURE_RISK.has(claim.exposureRisk)) invalid.push("exposureRisk");
  if (claim.publicationDecision && !VALID_PUBLICATION_DECISION.has(claim.publicationDecision))
    invalid.push("publicationDecision");
  if (claim.reviewStatus && !VALID_REVIEW_STATUS.has(claim.reviewStatus)) invalid.push("reviewStatus");

  return invalid;
}

/** Combined check: returns all missing required fields and invalid enum values. */
export function validateClaim(claim: Claim): { missing: string[]; invalid: string[] } {
  return {
    missing: validateClaimRequiredFields(claim),
    invalid: validateClaimEnumValues(claim),
  };
}
