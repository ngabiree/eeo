import type { Claim } from "@/types/eeo";

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
