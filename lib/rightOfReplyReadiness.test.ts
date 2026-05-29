import { describe, expect, it } from "vitest";

import { assessRightOfReplyReadiness } from "@/lib/rightOfReplyReadiness";
import type { Claim } from "@/types/eeo";

const baseClaim: Claim = {
  id: "CLAIM-TEST-001",
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
  lastUpdated: "2026-05-25",
  governanceNote: "Internal governance note should not be returned.",
};

function claimWith(overrides: Partial<Claim>): Claim {
  return { ...baseClaim, ...overrides };
}

function claimIds(claims: { id: string }[]): string[] {
  return claims.map((claim) => claim.id);
}

function inconsistencyIssues(
  assessment: ReturnType<typeof assessRightOfReplyReadiness>
): string[] {
  return assessment.claimsWithInconsistentStatus.map((claim) => claim.issue);
}

describe("assessRightOfReplyReadiness", () => {
  it("does not require right-of-reply for method-limit claims", () => {
    const methodLimitClaim = claimWith({
      claimType: "method_limit",
      legalPosture: "methodological_limit",
      corridorNode: "processing_trade",
      rightOfReplyRequired: false,
      rightOfReplyStatus: "not_required",
    });

    const assessment = assessRightOfReplyReadiness([methodLimitClaim]);

    expect(assessment.claimsRequiringRightOfReply).toEqual([]);
    expect(assessment.claimsSatisfied).toHaveLength(1);
    expect(JSON.stringify(assessment)).not.toContain("Internal governance");
  });

  it("counts explicit rightOfReplyRequired claims", () => {
    const explicitClaim = claimWith({
      rightOfReplyRequired: true,
      rightOfReplyReason: "Materially affects an identifiable actor.",
      rightOfReplyStatus: "requested",
    });

    const assessment = assessRightOfReplyReadiness([explicitClaim]);

    expect(claimIds(assessment.claimsMarkedRequired)).toEqual([
      "CLAIM-TEST-001",
    ]);
    expect(claimIds(assessment.claimsRequiringRightOfReply)).toEqual([
      "CLAIM-TEST-001",
    ]);
  });

  it("counts inferred materially affecting claims", () => {
    const inferredClaim = claimWith({
      corridorNode: "public_revenue",
      rightOfReplyRequired: false,
      rightOfReplyStatus: "not_requested",
    });

    const assessment = assessRightOfReplyReadiness([inferredClaim]);

    expect(claimIds(assessment.claimsInferredRequired)).toEqual([
      "CLAIM-TEST-001",
    ]);
    expect(claimIds(assessment.claimsRequiringRightOfReply)).toEqual([
      "CLAIM-TEST-001",
    ]);
  });

  it("flags missing rightOfReplyReason when requirement is explicit", () => {
    const explicitWithoutReason = claimWith({
      rightOfReplyRequired: true,
      rightOfReplyReason: "  ",
      rightOfReplyStatus: "requested",
    });

    const assessment = assessRightOfReplyReadiness([explicitWithoutReason]);

    expect(claimIds(assessment.claimsMissingReason)).toEqual([
      "CLAIM-TEST-001",
    ]);
    expect(inconsistencyIssues(assessment)).toContain(
      "marked_required_missing_reason"
    );
  });

  it("flags not_required as inconsistent when the helper infers requirement", () => {
    const inferredButMarkedNotRequired = claimWith({
      corridorNode: "labor_risk",
      rightOfReplyRequired: false,
      rightOfReplyStatus: "not_required",
    });

    const assessment = assessRightOfReplyReadiness([
      inferredButMarkedNotRequired,
    ]);

    expect(claimIds(assessment.claimsInferredRequired)).toEqual([
      "CLAIM-TEST-001",
    ]);
    expect(inconsistencyIssues(assessment)).toContain(
      "required_but_status_not_required"
    );
  });

  it("counts received and declined as structurally satisfied", () => {
    const receivedClaim = claimWith({
      id: "CLAIM-TEST-RECEIVED",
      rightOfReplyRequired: true,
      rightOfReplyReason: "Materially affects an identifiable actor.",
      rightOfReplyStatus: "received",
    });
    const declinedClaim = claimWith({
      id: "CLAIM-TEST-DECLINED",
      rightOfReplyRequired: true,
      rightOfReplyReason: "Materially affects an identifiable actor.",
      rightOfReplyStatus: "declined",
    });

    const assessment = assessRightOfReplyReadiness([
      receivedClaim,
      declinedClaim,
    ]);

    expect(claimIds(assessment.claimsSatisfied)).toEqual([
      "CLAIM-TEST-RECEIVED",
      "CLAIM-TEST-DECLINED",
    ]);
  });

  it("counts requested, not_requested, and overdue as pending", () => {
    const requestedClaim = claimWith({
      id: "CLAIM-TEST-REQUESTED",
      rightOfReplyRequired: true,
      rightOfReplyReason: "Materially affects an identifiable actor.",
      rightOfReplyStatus: "requested",
    });
    const notRequestedClaim = claimWith({
      id: "CLAIM-TEST-NOT-REQUESTED",
      rightOfReplyRequired: true,
      rightOfReplyReason: "Materially affects an identifiable actor.",
      rightOfReplyStatus: "not_requested",
    });
    const overdueClaim = claimWith({
      id: "CLAIM-TEST-OVERDUE",
      rightOfReplyRequired: true,
      rightOfReplyReason: "Materially affects an identifiable actor.",
      rightOfReplyStatus: "overdue",
    });

    const assessment = assessRightOfReplyReadiness([
      requestedClaim,
      notRequestedClaim,
      overdueClaim,
    ]);

    expect(claimIds(assessment.claimsPending)).toEqual([
      "CLAIM-TEST-REQUESTED",
      "CLAIM-TEST-NOT-REQUESTED",
      "CLAIM-TEST-OVERDUE",
    ]);
  });

  it("includes the structural-only and no-legal-sufficiency limitation in publicSafeSummary", () => {
    const assessment = assessRightOfReplyReadiness([baseClaim]);

    expect(assessment.publicSafeSummary).toContain(
      "This is a structural right-of-reply readiness check only."
    );
    expect(assessment.publicSafeSummary).toContain(
      "It does not determine legal sufficiency"
    );
    expect(assessment.publicSafeSummary).toContain("publication approval");
  });
});
