import type { Claim } from "@/types/eeo";

export function canClaimBeApprovedForRelease(claim: Claim): boolean {
  return (
    claim.reviewStatus === "approved_for_release" &&
    claim.publicationDecision === "publish" &&
    claim.exposureRisk !== "high" &&
    claim.exposureRisk !== "do_not_publish"
  );
}

/**
 * Right-of-reply applicability helper for publication discipline.
 * This is not a legal adjudication.
 */
export function requiresRightOfReply(claim: Claim): boolean {
  if (claim.rightOfReplyRequired) return true;

  if (claim.claimType === "method_limit" || claim.legalPosture === "methodological_limit") {
    return false;
  }

  if (claim.entityIds.length === 0) return false;

  const materiallyAffectingNodes = new Set<Claim["corridorNode"]>([
    "concession_permit",
    "operator",
    "ownership_control",
    "labor_risk",
    "ecological_signal",
    "public_revenue",
  ]);

  return materiallyAffectingNodes.has(claim.corridorNode);
}
