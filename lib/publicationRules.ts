import type { Claim } from "@/types/eeo";

export function canClaimBeApprovedForRelease(claim: Claim): boolean {
  return (
    claim.reviewStatus === "approved_for_release" &&
    claim.publicationDecision === "publish" &&
    claim.exposureRisk !== "high" &&
    claim.exposureRisk !== "do_not_publish"
  );
}
