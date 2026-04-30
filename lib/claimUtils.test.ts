import { describe, expect, it } from "vitest";

import type { CorrectionSubmission } from "@/lib/correctionsSchema";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";

const CLAIM = "CLAIM-DRC-CO-001";
const baseTime = "2026-04-27T12:00:00.000Z";

function submission(partial: Partial<CorrectionSubmission> & Pick<CorrectionSubmission, "id">): CorrectionSubmission {
  return {
    submittedAt: baseTime,
    name: "Test",
    email: "t@example.com",
    category: "Factual correction",
    details: "details",
    triageStatus: "queued",
    triageUpdatedAt: baseTime,
    activities: [],
    ...partial,
  };
}

describe("getClaimCorrectionSummary", () => {
  it("returns stable when no corrections link to the claim", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({ id: "CORR-OTHER", claimId: "OTHER-CLAIM" }),
    ]);
    expect(s.governanceStatus).toBe("stable");
    expect(s.linkedCorrections).toHaveLength(0);
  });

  it("derives challenged from queued triage", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({ id: "C1", claimId: CLAIM, triageStatus: "queued" }),
    ]);
    expect(s.governanceStatus).toBe("challenged");
  });

  it("derives challenged from needs_review triage", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({ id: "C1", claimId: CLAIM, triageStatus: "needs_review" }),
    ]);
    expect(s.governanceStatus).toBe("challenged");
  });

  it("derives under_review from in_review triage", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({ id: "C1", claimId: CLAIM, triageStatus: "in_review" }),
    ]);
    expect(s.governanceStatus).toBe("under_review");
  });

  it("derives corrected from governance outcome claim_corrected", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({
        id: "C1",
        claimId: CLAIM,
        triageStatus: "resolved",
        triageGovernanceOutcome: "claim_corrected",
      }),
    ]);
    expect(s.governanceStatus).toBe("corrected");
  });

  it("derives corrected when resolved with no explicit governance outcome", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({ id: "C1", claimId: CLAIM, triageStatus: "resolved" }),
    ]);
    expect(s.governanceStatus).toBe("corrected");
  });

  it("derives restricted from harm-risk category", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({
        id: "C1",
        claimId: CLAIM,
        category: "Harm-risk restriction request",
        triageStatus: "queued",
      }),
    ]);
    expect(s.governanceStatus).toBe("restricted");
  });

  it("derives restricted from governance outcome claim_restricted", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({
        id: "C1",
        claimId: CLAIM,
        triageStatus: "resolved",
        triageGovernanceOutcome: "claim_restricted",
      }),
    ]);
    expect(s.governanceStatus).toBe("restricted");
  });

  it("derives withdrawn from withdrawal request category", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({
        id: "C1",
        claimId: CLAIM,
        category: "Withdrawal request",
        triageStatus: "queued",
      }),
    ]);
    expect(s.governanceStatus).toBe("withdrawn");
  });

  it("derives withdrawn from governance outcome claim_withdrawn", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({
        id: "C1",
        claimId: CLAIM,
        triageStatus: "resolved",
        triageGovernanceOutcome: "claim_withdrawn",
      }),
    ]);
    expect(s.governanceStatus).toBe("withdrawn");
  });

  it("prefers withdrawn over restricted when both signals exist", () => {
    const s = getClaimCorrectionSummary(CLAIM, [
      submission({
        id: "C1",
        claimId: CLAIM,
        category: "Harm-risk restriction request",
        triageStatus: "queued",
      }),
      submission({
        id: "C2",
        claimId: CLAIM,
        category: "Withdrawal request",
        triageStatus: "queued",
      }),
    ]);
    expect(s.governanceStatus).toBe("withdrawn");
  });
});
