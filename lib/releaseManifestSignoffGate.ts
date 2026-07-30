import { assessReviewSignoffReadiness } from "@/lib/reviewSignoffReadiness";
import type { ReleaseManifest } from "@/types/eeo";
import type {
  ReviewSignoff,
  ReviewSignoffRequirement,
} from "@/types/reviewSignoff";

export interface ReleaseManifestClaimSignoffAssessment {
  claimId: string;
  requiredCount: number;
  satisfiedCount: number;
  pendingCount: number;
  blockedCount: number;
  expiredCount: number;
  releaseEligible: boolean;
  publicSafeSummary: string;
}

export interface ReleaseManifestSignoffGateAssessment {
  manifestId: string;
  passes: boolean;
  includedClaimCount: number;
  claimsMissingRequirements: string[];
  claimsPendingReview: string[];
  claimsBlockedByReview: string[];
  claimsWithExpiredReview: string[];
  claimAssessments: ReleaseManifestClaimSignoffAssessment[];
  publicSafeSummary: string;
}

/**
 * Structural release gate for claim-level governed review sign-offs.
 *
 * This function does not create, authenticate, or approve a review decision.
 * It only checks whether every claim listed for inclusion has declared review
 * requirements and current governed sign-offs satisfying those requirements.
 */
export function assessReleaseManifestSignoffGate(params: {
  releaseManifest: Pick<ReleaseManifest, "id" | "includedClaimIds">;
  requirements: ReviewSignoffRequirement[];
  signoffs: ReviewSignoff[];
  now?: Date;
}): ReleaseManifestSignoffGateAssessment {
  const now = params.now ?? new Date();
  const claimAssessments: ReleaseManifestClaimSignoffAssessment[] = [];
  const claimsMissingRequirements: string[] = [];
  const claimsPendingReview: string[] = [];
  const claimsBlockedByReview: string[] = [];
  const claimsWithExpiredReview: string[] = [];

  for (const claimId of params.releaseManifest.includedClaimIds) {
    const claimRequirements = params.requirements.filter(
      (requirement) =>
        requirement.required &&
        requirement.objectType === "claim" &&
        requirement.objectId === claimId
    );

    if (claimRequirements.length === 0) {
      claimsMissingRequirements.push(claimId);
      continue;
    }

    const readiness = assessReviewSignoffReadiness({
      objectId: claimId,
      requirements: claimRequirements,
      signoffs: params.signoffs,
      now,
    });

    claimAssessments.push({
      claimId,
      requiredCount: readiness.requiredCount,
      satisfiedCount: readiness.satisfiedCount,
      pendingCount: readiness.pendingCount,
      blockedCount: readiness.blockedCount,
      expiredCount: readiness.expiredCount,
      releaseEligible: readiness.releaseEligible,
      publicSafeSummary: readiness.publicSafeSummary,
    });

    if (readiness.pendingCount > 0) {
      claimsPendingReview.push(claimId);
    }
    if (readiness.blockedCount > 0) {
      claimsBlockedByReview.push(claimId);
    }
    if (readiness.expiredCount > 0) {
      claimsWithExpiredReview.push(claimId);
    }
  }

  const passes =
    claimsMissingRequirements.length === 0 &&
    claimsPendingReview.length === 0 &&
    claimsBlockedByReview.length === 0 &&
    claimsWithExpiredReview.length === 0 &&
    claimAssessments.length === params.releaseManifest.includedClaimIds.length &&
    claimAssessments.every((assessment) => assessment.releaseEligible);

  return {
    manifestId: params.releaseManifest.id,
    passes,
    includedClaimCount: params.releaseManifest.includedClaimIds.length,
    claimsMissingRequirements,
    claimsPendingReview,
    claimsBlockedByReview,
    claimsWithExpiredReview,
    claimAssessments,
    publicSafeSummary: passes
      ? "Every included claim has declared review requirements and current governed sign-offs. This structural pass does not itself sign or publish the manifest."
      : "One or more included claims lack declared requirements or have pending, blocked, or expired review lanes. The manifest is not eligible for release.",
  };
}
