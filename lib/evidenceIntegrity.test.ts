import { describe, expect, it } from "vitest";

import { assessEvidenceIntegrity } from "@/lib/evidenceIntegrity";
import type { Claim, EvidenceItem, Source } from "@/types/eeo";

const baseSource: Source = {
  id: "SRC-TEST-001",
  title: "Test source",
  publisher: "Test publisher",
  sourceType: "other",
  accessedDate: "2026-05-25",
  licenseStatus: "open",
  notes: "Internal source note should not be returned by integrity checks.",
};

const baseClaim: Claim = {
  id: "CLAIM-TEST-001",
  title: "Test claim",
  plainLanguageClaim: "A test-only claim fixture.",
  claimType: "descriptive",
  legalPosture: "factual_observation",
  corridorNode: "endowment",
  evidenceLinks: [
    {
      evidenceId: "EVID-TEST-001",
      role: "supports",
      note: "Internal claim-link note should not be returned.",
    },
  ],
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
  lastReviewed: "2026-01-01",
  staleAfter: "2026-07-01",
  governanceNote: "Internal governance note should not be returned.",
};

const baseEvidenceItem: EvidenceItem = {
  id: "EVID-TEST-001",
  sourceId: "SRC-TEST-001",
  title: "Test evidence",
  summary: "Test-only evidence fixture.",
  evidenceClass: "official",
  confidenceContribution: "high",
  limitations: ["Test-only limitation."],
  exposureRisk: "low",
  publicationDecision: "publish",
  claimLinks: [
    {
      claimId: "CLAIM-TEST-001",
      role: "supports",
      note: "Internal evidence-link note should not be returned.",
    },
  ],
};

function claimWith(overrides: Partial<Claim>): Claim {
  return { ...baseClaim, ...overrides };
}

function evidenceItemWith(overrides: Partial<EvidenceItem>): EvidenceItem {
  return { ...baseEvidenceItem, ...overrides };
}

describe("assessEvidenceIntegrity", () => {
  it("reports complete links as structurally passing", () => {
    const assessment = assessEvidenceIntegrity({
      claims: [baseClaim],
      evidenceItems: [baseEvidenceItem],
      sources: [baseSource],
    });

    expect(assessment.totalClaims).toBe(1);
    expect(assessment.claimsMissingEvidenceLinks).toEqual([]);
    expect(assessment.claimsWithMissingEvidenceItems).toEqual([]);
    expect(assessment.evidenceItemsMissingSources).toEqual([]);
    expect(assessment.evidenceItemsWithNoClaimLinks).toEqual([]);
    expect(assessment.reciprocalLinkMismatches).toEqual([]);
    expect(assessment.claimsWithOnlyContextualEvidence).toEqual([]);
    expect(assessment.publicSafeSummary).toContain(
      "This is a structural linkage check only."
    );
    expect(JSON.stringify(assessment)).not.toContain("Internal");
  });

  it("flags a claim referencing a missing evidence item", () => {
    const assessment = assessEvidenceIntegrity({
      claims: [
        claimWith({
          evidenceLinks: [{ evidenceId: "EVID-MISSING", role: "supports" }],
        }),
      ],
      evidenceItems: [],
      sources: [baseSource],
    });

    expect(assessment.claimsWithMissingEvidenceItems).toEqual([
      {
        id: "CLAIM-TEST-001",
        title: "Test claim",
        missingEvidenceIds: ["EVID-MISSING"],
      },
    ]);
  });

  it("flags an evidence item referencing a missing source", () => {
    const assessment = assessEvidenceIntegrity({
      claims: [baseClaim],
      evidenceItems: [evidenceItemWith({ sourceId: "SRC-MISSING" })],
      sources: [],
    });

    expect(assessment.evidenceItemsMissingSources).toEqual([
      {
        id: "EVID-TEST-001",
        title: "Test evidence",
        missingSourceId: "SRC-MISSING",
      },
    ]);
  });

  it("flags an evidence item with no claimLinks", () => {
    const assessment = assessEvidenceIntegrity({
      claims: [],
      evidenceItems: [evidenceItemWith({ claimLinks: [] })],
      sources: [baseSource],
    });

    expect(assessment.evidenceItemsWithNoClaimLinks).toEqual([
      {
        id: "EVID-TEST-001",
        title: "Test evidence",
      },
    ]);
  });

  it("flags a reciprocal mismatch", () => {
    const secondClaim = claimWith({
      id: "CLAIM-TEST-002",
      title: "Second test claim",
    });
    const evidenceItem = evidenceItemWith({
      claimLinks: [{ claimId: secondClaim.id, role: "supports" }],
    });

    const assessment = assessEvidenceIntegrity({
      claims: [baseClaim, secondClaim],
      evidenceItems: [evidenceItem],
      sources: [baseSource],
    });

    expect(assessment.reciprocalLinkMismatches).toEqual([
      {
        claimId: "CLAIM-TEST-001",
        evidenceId: "EVID-TEST-001",
        issue: "missing_evidence_backlink",
        claimRole: "supports",
      },
    ]);
  });

  it("flags a claim with only contextualizes evidence as context-only", () => {
    const contextualClaim = claimWith({
      evidenceLinks: [
        { evidenceId: "EVID-TEST-001", role: "contextualizes" },
      ],
    });
    const contextualEvidence = evidenceItemWith({
      claimLinks: [
        { claimId: "CLAIM-TEST-001", role: "contextualizes" },
      ],
    });

    const assessment = assessEvidenceIntegrity({
      claims: [contextualClaim],
      evidenceItems: [contextualEvidence],
      sources: [baseSource],
    });

    expect(assessment.claimsWithOnlyContextualEvidence).toEqual([
      {
        id: "CLAIM-TEST-001",
        title: "Test claim",
      },
    ]);
    expect(assessment.claimsMissingEvidenceLinks).toEqual([]);
    expect(assessment.publicSafeSummary).toContain(
      "It does not validate factual truth, legal status, publication approval, or source quality."
    );
  });
});
