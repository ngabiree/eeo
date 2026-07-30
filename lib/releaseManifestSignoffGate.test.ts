import { describe, expect, it } from "vitest";

import { claimReviewRequirements } from "@/data/claimReviewRequirements";
import { releaseManifest } from "@/data/releaseManifest";
import { assessReleaseManifestSignoffGate } from "@/lib/releaseManifestSignoffGate";
import type { ReviewSignoff } from "@/types/reviewSignoff";

function approvedSignoffsForClaim(claimId: string): ReviewSignoff[] {
  return claimReviewRequirements
    .filter((requirement) => requirement.objectId === claimId)
    .map((requirement, index) => ({
      id: `RSIGN-${claimId}-${index + 1}`,
      objectType: requirement.objectType,
      objectId: requirement.objectId,
      reviewType: requirement.reviewType,
      status: "approved" as const,
      conditions: [],
      publicSafeSummary: "Required review completed for test.",
      reviewedAt: "2026-07-29T18:00:00.000Z",
      reviewedBy: "reviewer" as const,
    }));
}

describe("assessReleaseManifestSignoffGate", () => {
  it("blocks the current manifest while governed signoffs are absent", () => {
    const assessment = assessReleaseManifestSignoffGate({
      releaseManifest,
      requirements: claimReviewRequirements,
      signoffs: [],
      now: new Date("2026-07-29T19:00:00.000Z"),
    });

    expect(assessment.passes).toBe(false);
    expect(assessment.claimsPendingReview).toContain("CLAIM-DRC-CO-001");
    expect(assessment.claimsMissingRequirements).toEqual([]);
  });

  it("passes only when every included claim requirement has a current signoff", () => {
    const assessment = assessReleaseManifestSignoffGate({
      releaseManifest,
      requirements: claimReviewRequirements,
      signoffs: approvedSignoffsForClaim("CLAIM-DRC-CO-001"),
      now: new Date("2026-07-29T19:00:00.000Z"),
    });

    expect(assessment.passes).toBe(true);
    expect(assessment.claimAssessments[0]?.releaseEligible).toBe(true);
  });

  it("blocks a newly included claim whose review lanes remain pending", () => {
    const assessment = assessReleaseManifestSignoffGate({
      releaseManifest: {
        id: "REL-TEST-002",
        includedClaimIds: ["CLAIM-DRC-CO-001", "CLAIM-DRC-CO-002"],
      },
      requirements: claimReviewRequirements,
      signoffs: approvedSignoffsForClaim("CLAIM-DRC-CO-001"),
      now: new Date("2026-07-29T19:00:00.000Z"),
    });

    expect(assessment.passes).toBe(false);
    expect(assessment.claimsPendingReview).toContain("CLAIM-DRC-CO-002");
  });

  it("blocks included claims that have no declared review requirements", () => {
    const assessment = assessReleaseManifestSignoffGate({
      releaseManifest: {
        id: "REL-TEST-003",
        includedClaimIds: ["CLAIM-UNKNOWN-001"],
      },
      requirements: claimReviewRequirements,
      signoffs: [],
      now: new Date("2026-07-29T19:00:00.000Z"),
    });

    expect(assessment.passes).toBe(false);
    expect(assessment.claimsMissingRequirements).toEqual([
      "CLAIM-UNKNOWN-001",
    ]);
  });

  it("blocks a manifest when the latest required decision is expired", () => {
    const signoffs = approvedSignoffsForClaim("CLAIM-DRC-CO-001");
    signoffs[0] = {
      ...signoffs[0]!,
      expiresAt: "2026-07-29T18:30:00.000Z",
    };

    const assessment = assessReleaseManifestSignoffGate({
      releaseManifest,
      requirements: claimReviewRequirements,
      signoffs,
      now: new Date("2026-07-29T19:00:00.000Z"),
    });

    expect(assessment.passes).toBe(false);
    expect(assessment.claimsWithExpiredReview).toContain(
      "CLAIM-DRC-CO-001"
    );
  });
});
