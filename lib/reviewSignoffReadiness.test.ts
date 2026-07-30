import { describe, expect, it } from "vitest";

import { assessReviewSignoffReadiness } from "@/lib/reviewSignoffReadiness";
import type {
  ReviewSignoff,
  ReviewSignoffRequirement,
} from "@/types/reviewSignoff";

const requirements: ReviewSignoffRequirement[] = [
  {
    id: "RREQ-TEST-METHOD",
    objectType: "claim",
    objectId: "CLAIM-TEST-001",
    reviewType: "method_review",
    accountableRole: "method_reviewer",
    required: true,
    rationale: "Confirm the method.",
    publicSafeSummary: "Method review is required.",
  },
  {
    id: "RREQ-TEST-RELEASE",
    objectType: "claim",
    objectId: "CLAIM-TEST-001",
    reviewType: "release_authority_review",
    accountableRole: "release_authority",
    required: true,
    rationale: "Confirm release authority.",
    publicSafeSummary: "Release authority review is required.",
  },
];

function signoffWith(
  overrides: Partial<ReviewSignoff> & Pick<ReviewSignoff, "id" | "reviewType">
): ReviewSignoff {
  return {
    objectType: "claim",
    objectId: "CLAIM-TEST-001",
    status: "approved",
    conditions: [],
    publicSafeSummary: "Review completed.",
    reviewedAt: "2026-07-29T12:00:00.000Z",
    reviewedBy: "reviewer",
    ...overrides,
  };
}

describe("assessReviewSignoffReadiness", () => {
  it("keeps every requirement pending when no governed signoff exists", () => {
    const assessment = assessReviewSignoffReadiness({
      objectId: "CLAIM-TEST-001",
      requirements,
      signoffs: [],
      now: new Date("2026-07-29T18:00:00.000Z"),
    });

    expect(assessment.releaseEligible).toBe(false);
    expect(assessment.pendingCount).toBe(2);
    expect(assessment.satisfiedCount).toBe(0);
  });

  it("accepts approved and conditioned decisions as satisfied lanes", () => {
    const assessment = assessReviewSignoffReadiness({
      objectId: "CLAIM-TEST-001",
      requirements,
      signoffs: [
        signoffWith({ id: "RSIGN-METHOD", reviewType: "method_review" }),
        signoffWith({
          id: "RSIGN-RELEASE",
          reviewType: "release_authority_review",
          status: "conditioned",
          conditions: ["Retain the approved wording."],
        }),
      ],
      now: new Date("2026-07-29T18:00:00.000Z"),
    });

    expect(assessment.releaseEligible).toBe(true);
    expect(assessment.satisfiedCount).toBe(2);
    expect(assessment.pendingCount).toBe(0);
  });

  it("treats a blocked latest decision as a release blocker", () => {
    const assessment = assessReviewSignoffReadiness({
      objectId: "CLAIM-TEST-001",
      requirements,
      signoffs: [
        signoffWith({ id: "RSIGN-METHOD", reviewType: "method_review" }),
        signoffWith({
          id: "RSIGN-RELEASE",
          reviewType: "release_authority_review",
          status: "blocked",
        }),
      ],
      now: new Date("2026-07-29T18:00:00.000Z"),
    });

    expect(assessment.releaseEligible).toBe(false);
    expect(assessment.blockedCount).toBe(1);
  });

  it("treats an expired approval as expired rather than satisfied", () => {
    const assessment = assessReviewSignoffReadiness({
      objectId: "CLAIM-TEST-001",
      requirements,
      signoffs: [
        signoffWith({
          id: "RSIGN-METHOD",
          reviewType: "method_review",
          expiresAt: "2026-07-29T17:00:00.000Z",
        }),
        signoffWith({
          id: "RSIGN-RELEASE",
          reviewType: "release_authority_review",
        }),
      ],
      now: new Date("2026-07-29T18:00:00.000Z"),
    });

    expect(assessment.releaseEligible).toBe(false);
    expect(assessment.expiredCount).toBe(1);
    expect(assessment.satisfiedCount).toBe(1);
  });

  it("ignores superseded signoffs when resolving the current lane", () => {
    const assessment = assessReviewSignoffReadiness({
      objectId: "CLAIM-TEST-001",
      requirements: [requirements[0]!],
      signoffs: [
        signoffWith({
          id: "RSIGN-OLD",
          reviewType: "method_review",
          status: "superseded",
          reviewedAt: "2026-07-29T13:00:00.000Z",
        }),
        signoffWith({
          id: "RSIGN-CURRENT",
          reviewType: "method_review",
          status: "approved",
          reviewedAt: "2026-07-29T12:00:00.000Z",
        }),
      ],
      now: new Date("2026-07-29T18:00:00.000Z"),
    });

    expect(assessment.releaseEligible).toBe(true);
    expect(assessment.requirements[0]?.signoffId).toBe("RSIGN-CURRENT");
  });
});
