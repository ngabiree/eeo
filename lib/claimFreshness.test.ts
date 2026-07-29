import { describe, expect, it } from "vitest";

import { assessClaimFreshness } from "@/lib/claimFreshness";
import type { Claim } from "@/types/eeo";

const asOf = new Date("2026-07-07T00:00:00.000Z");

const baseClaim: Claim = {
  id: "CLAIM-TEST-001",
  recordMode: "synthetic",
  title: "Test claim",
  plainLanguageClaim: "A test-only claim fixture.",
  claimType: "descriptive",
  legalPosture: "factual_observation",
  corridorNode: "endowment",
  evidenceLinks: [{ evidenceId: "EVID-TEST-001", role: "supports" }],
  entityIds: ["ENT-TEST"],
  confidence: "high",
  exposureRisk: "low",
  publicationDecision: "publish",
  reviewStatus: "approved_for_release",
  rightOfReplyRequired: false,
  rightOfReplyStatus: "not_required",
  whatThisDoesNotProve: ["It does not make a real-world factual assertion."],
  whatWouldReviseThisClaim: ["A changed test fixture."],
  lastUpdated: "2026-06-27",
  lastReviewed: "2026-06-27",
  staleAfter: "2026-12-27",
};

describe("assessClaimFreshness", () => {
  it("marks claims as current when the stale-after date is more than 30 days away", () => {
    const assessment = assessClaimFreshness(baseClaim, asOf);

    expect(assessment.status).toBe("current");
    expect(assessment.daysUntilStale).toBeGreaterThan(30);
  });

  it("marks claims as stale soon within 30 days of the stale-after date", () => {
    const assessment = assessClaimFreshness(
      { ...baseClaim, staleAfter: "2026-07-30" },
      asOf
    );

    expect(assessment.status).toBe("stale_soon");
    expect(assessment.daysUntilStale).toBe(23);
  });

  it("marks claims as stale after the stale-after date has passed", () => {
    const assessment = assessClaimFreshness(
      { ...baseClaim, staleAfter: "2026-07-01" },
      asOf
    );

    expect(assessment.status).toBe("stale");
    expect(assessment.daysUntilStale).toBeLessThan(0);
  });

  it("flags invalid review dates", () => {
    const assessment = assessClaimFreshness(
      { ...baseClaim, lastReviewed: "2026-08-01", staleAfter: "2026-07-01" },
      asOf
    );

    expect(assessment.status).toBe("invalid_review_dates");
    expect(assessment.daysUntilStale).toBeNull();
  });
});
