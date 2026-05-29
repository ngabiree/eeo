import type { Claim } from "@/types/eeo";
import { requiresRightOfReply } from "@/lib/publicationRules";

const PUBLIC_SAFE_SUMMARY =
  "This is a structural right-of-reply readiness check only. It does not determine legal sufficiency, fairness, notice adequacy, or publication approval.";

type RightOfReplyClaimSummary = Pick<
  Claim,
  "id" | "title" | "rightOfReplyRequired" | "rightOfReplyStatus"
>;

export type RightOfReplyInconsistencyType =
  | "required_but_status_not_required"
  | "marked_required_missing_reason"
  | "satisfied_status_without_requirement";

export interface RightOfReplyInconsistency
  extends RightOfReplyClaimSummary {
  issue: RightOfReplyInconsistencyType;
}

export interface RightOfReplyReadinessAssessment {
  totalClaims: number;
  claimsRequiringRightOfReply: RightOfReplyClaimSummary[];
  claimsMarkedRequired: RightOfReplyClaimSummary[];
  claimsInferredRequired: RightOfReplyClaimSummary[];
  claimsSatisfied: RightOfReplyClaimSummary[];
  claimsPending: RightOfReplyClaimSummary[];
  claimsMissingReason: RightOfReplyClaimSummary[];
  claimsWithInconsistentStatus: RightOfReplyInconsistency[];
  publicSafeSummary: string;
}

export function assessRightOfReplyReadiness(
  claims: Claim[]
): RightOfReplyReadinessAssessment {
  const claimsRequiringRightOfReply: RightOfReplyClaimSummary[] = [];
  const claimsMarkedRequired: RightOfReplyClaimSummary[] = [];
  const claimsInferredRequired: RightOfReplyClaimSummary[] = [];
  const claimsSatisfied: RightOfReplyClaimSummary[] = [];
  const claimsPending: RightOfReplyClaimSummary[] = [];
  const claimsMissingReason: RightOfReplyClaimSummary[] = [];
  const claimsWithInconsistentStatus: RightOfReplyInconsistency[] = [];

  for (const claim of claims) {
    const requirementApplies = requiresRightOfReply(claim);
    const summary = toClaimSummary(claim);

    if (requirementApplies) {
      claimsRequiringRightOfReply.push(summary);
    }

    if (claim.rightOfReplyRequired) {
      claimsMarkedRequired.push(summary);
    } else if (requirementApplies) {
      claimsInferredRequired.push(summary);
    }

    if (claim.rightOfReplyRequired && !claim.rightOfReplyReason?.trim()) {
      claimsMissingReason.push(summary);
      claimsWithInconsistentStatus.push({
        ...summary,
        issue: "marked_required_missing_reason",
      });
    }

    if (
      requirementApplies &&
      claim.rightOfReplyStatus === "not_required"
    ) {
      claimsWithInconsistentStatus.push({
        ...summary,
        issue: "required_but_status_not_required",
      });
    }

    if (
      !requirementApplies &&
      !claim.rightOfReplyRequired &&
      (claim.rightOfReplyStatus === "received" ||
        claim.rightOfReplyStatus === "declined")
    ) {
      claimsWithInconsistentStatus.push({
        ...summary,
        issue: "satisfied_status_without_requirement",
      });
    }

    if (
      claim.rightOfReplyStatus === "requested" ||
      claim.rightOfReplyStatus === "not_requested" ||
      claim.rightOfReplyStatus === "overdue"
    ) {
      claimsPending.push(summary);
    } else if (
      claim.rightOfReplyStatus === "received" ||
      claim.rightOfReplyStatus === "declined" ||
      (claim.rightOfReplyStatus === "not_required" && !requirementApplies)
    ) {
      claimsSatisfied.push(summary);
    }
  }

  return {
    totalClaims: claims.length,
    claimsRequiringRightOfReply,
    claimsMarkedRequired,
    claimsInferredRequired,
    claimsSatisfied,
    claimsPending,
    claimsMissingReason,
    claimsWithInconsistentStatus,
    publicSafeSummary: PUBLIC_SAFE_SUMMARY,
  };
}

function toClaimSummary(claim: Claim): RightOfReplyClaimSummary {
  return {
    id: claim.id,
    title: claim.title,
    rightOfReplyRequired: claim.rightOfReplyRequired,
    rightOfReplyStatus: claim.rightOfReplyStatus,
  };
}
