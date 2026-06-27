import { describe, expect, it } from "vitest";

import { claims } from "@/data/claims";
import { evidenceItems } from "@/data/evidence";
import { sources } from "@/data/sources";
import { assessEvidenceOperatingSystem } from "@/lib/evidenceOperatingSystem";
import type { Claim, EvidenceItem, Source } from "@/types/eeo";

const baseSource: Source = {
  id: "SRC-TEST-001",
  title: "Test source",
  publisher: "Test publisher",
  sourceType: "government",
  accessedDate: "2026-06-27",
  licenseStatus: "open",
};

const baseEvidenceItem: EvidenceItem = {
  id: "EVID-TEST-001",
  sourceId: "SRC-TEST-001",
  title: "Test evidence",
  summary: "Test evidence summary.",
  evidenceClass: "official",
  confidenceContribution: "high",
  limitations: ["This is a test limitation."],
  exposureRisk: "low",
  publicationDecision: "publish",
  claimLinks: [{ claimId: "CLAIM-TEST-001", role: "supports" }],
};

const baseClaim: Claim = {
  id: "CLAIM-TEST-001",
  title: "Test claim",
  plainLanguageClaim: "Available public evidence indicates a test condition.",
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
  whatThisDoesNotProve: ["It does not establish legal responsibility."],
  whatWouldReviseThisClaim: ["Updated authoritative public evidence."],
  lastUpdated: "2026-06-27",
};

function claimWith(overrides: Partial<Claim>): Claim {
  return { ...baseClaim, ...overrides };
}

function evidenceWith(overrides: Partial<EvidenceItem>): EvidenceItem {
  return { ...baseEvidenceItem, ...overrides };
}

function sourceWith(overrides: Partial<Source>): Source {
  return { ...baseSource, ...overrides };
}

describe("assessEvidenceOperatingSystem", () => {
  it("passes the current corridor evidence package without blockers", () => {
    const assessment = assessEvidenceOperatingSystem({
      claims,
      evidenceItems,
      sources,
    });

    expect(assessment.blockers).toEqual([]);
    expect(assessment.publicSafeSummary).toContain(
      "does not validate factual truth"
    );
  });

  it("blocks claims without evidence links", () => {
    const assessment = assessEvidenceOperatingSystem({
      claims: [claimWith({ evidenceLinks: [] })],
      evidenceItems: [baseEvidenceItem],
      sources: [baseSource],
    });

    expect(assessment.blockers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recordType: "claim",
          recordId: "CLAIM-TEST-001",
          issue: "Claim has no linked evidence.",
        }),
      ])
    );
  });

  it("blocks claims without non-claim limits", () => {
    const assessment = assessEvidenceOperatingSystem({
      claims: [claimWith({ whatThisDoesNotProve: [] })],
      evidenceItems: [baseEvidenceItem],
      sources: [baseSource],
    });

    expect(assessment.blockers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          issue: "Claim does not state what it does not prove.",
        }),
      ])
    );
  });

  it("blocks public claims using restricted or permission-required sources", () => {
    const assessment = assessEvidenceOperatingSystem({
      claims: [baseClaim],
      evidenceItems: [baseEvidenceItem],
      sources: [sourceWith({ licenseStatus: "permission_required" })],
    });

    expect(assessment.blockers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recordType: "source",
          issue: "Source license does not support public release.",
        }),
      ])
    );
  });

  it("blocks required right-of-reply claims that are not ready", () => {
    const assessment = assessEvidenceOperatingSystem({
      claims: [
        claimWith({
          rightOfReplyRequired: true,
          rightOfReplyStatus: "requested",
        }),
      ],
      evidenceItems: [baseEvidenceItem],
      sources: [baseSource],
    });

    expect(assessment.blockers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          issue: "Right-of-reply is required but not publication-ready.",
        }),
      ])
    );
  });

  it("warns when a materially affecting claim may need right-of-reply review", () => {
    const assessment = assessEvidenceOperatingSystem({
      claims: [
        claimWith({
          corridorNode: "public_revenue",
          rightOfReplyRequired: false,
          rightOfReplyStatus: "not_required",
        }),
      ],
      evidenceItems: [baseEvidenceItem],
      sources: [baseSource],
    });

    expect(assessment.warnings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          issue: "Claim may trigger right-of-reply review but is not explicitly flagged.",
        }),
      ])
    );
  });

  it("warns when source license status is unknown", () => {
    const assessment = assessEvidenceOperatingSystem({
      claims: [baseClaim],
      evidenceItems: [baseEvidenceItem],
      sources: [sourceWith({ licenseStatus: "unknown" })],
    });

    expect(assessment.warnings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          issue: "Source license status is unknown.",
        }),
      ])
    );
  });

  it("blocks evidence records without limitations", () => {
    const assessment = assessEvidenceOperatingSystem({
      claims: [baseClaim],
      evidenceItems: [evidenceWith({ limitations: [] })],
      sources: [baseSource],
    });

    expect(assessment.blockers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recordType: "evidence",
          issue: "Evidence record has no limitations.",
        }),
      ])
    );
  });
});
