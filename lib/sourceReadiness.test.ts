import { describe, expect, it } from "vitest";

import { assessSourceReadiness } from "@/lib/sourceReadiness";
import type { EvidenceItem, Source } from "@/types/eeo";

const baseSource: Source = {
  id: "SRC-TEST-001",
  recordMode: "illustrative",
  title: "Test source",
  publisher: "Test publisher",
  sourceType: "other",
  accessedDate: "2026-05-25",
  licenseStatus: "open",
  notes: "Internal source note should not be returned by source readiness.",
};

const baseEvidenceItem: EvidenceItem = {
  id: "EVID-TEST-001",
  recordMode: "illustrative",
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

function sourceWith(overrides: Partial<Source>): Source {
  return { ...baseSource, ...overrides };
}

function evidenceItemWith(overrides: Partial<EvidenceItem>): EvidenceItem {
  return { ...baseEvidenceItem, ...overrides };
}

describe("assessSourceReadiness", () => {
  it("reports complete open sources as structurally passing", () => {
    const assessment = assessSourceReadiness({
      sources: [baseSource],
      evidenceItems: [baseEvidenceItem],
    });

    expect(assessment.totalSources).toBe(1);
    expect(assessment.sourcesMissingAccessedDate).toEqual([]);
    expect(assessment.sourcesWithUnknownLicense).toEqual([]);
    expect(assessment.sourcesPermissionRequired).toEqual([]);
    expect(assessment.sourcesRestricted).toEqual([]);
    expect(assessment.sourcesUnusedByEvidence).toEqual([]);
    expect(assessment.evidenceUsingMissingSources).toEqual([]);
    expect(JSON.stringify(assessment)).not.toContain("Internal");
  });

  it("flags unknown license as a review posture", () => {
    const assessment = assessSourceReadiness({
      sources: [sourceWith({ licenseStatus: "unknown" })],
      evidenceItems: [baseEvidenceItem],
    });

    expect(assessment.sourcesWithUnknownLicense).toEqual([
      {
        id: "SRC-TEST-001",
        title: "Test source",
        publisher: "Test publisher",
        licenseStatus: "unknown",
      },
    ]);
  });

  it("flags restricted source as a review posture", () => {
    const assessment = assessSourceReadiness({
      sources: [sourceWith({ licenseStatus: "restricted" })],
      evidenceItems: [baseEvidenceItem],
    });

    expect(assessment.sourcesRestricted).toEqual([
      {
        id: "SRC-TEST-001",
        title: "Test source",
        publisher: "Test publisher",
        licenseStatus: "restricted",
      },
    ]);
  });

  it("flags permission_required source as a review posture", () => {
    const assessment = assessSourceReadiness({
      sources: [sourceWith({ licenseStatus: "permission_required" })],
      evidenceItems: [baseEvidenceItem],
    });

    expect(assessment.sourcesPermissionRequired).toEqual([
      {
        id: "SRC-TEST-001",
        title: "Test source",
        publisher: "Test publisher",
        licenseStatus: "permission_required",
      },
    ]);
  });

  it("flags missing accessedDate", () => {
    const assessment = assessSourceReadiness({
      sources: [sourceWith({ accessedDate: "   " })],
      evidenceItems: [baseEvidenceItem],
    });

    expect(assessment.sourcesMissingAccessedDate).toEqual([
      {
        id: "SRC-TEST-001",
        title: "Test source",
        publisher: "Test publisher",
        licenseStatus: "open",
      },
    ]);
  });

  it("flags unused source", () => {
    const unusedSource = sourceWith({
      id: "SRC-TEST-UNUSED",
      title: "Unused test source",
    });

    const assessment = assessSourceReadiness({
      sources: [baseSource, unusedSource],
      evidenceItems: [baseEvidenceItem],
    });

    expect(assessment.sourcesUnusedByEvidence).toEqual([
      {
        id: "SRC-TEST-UNUSED",
        title: "Unused test source",
        publisher: "Test publisher",
        licenseStatus: "open",
      },
    ]);
  });

  it("flags evidence referencing a missing source", () => {
    const assessment = assessSourceReadiness({
      sources: [baseSource],
      evidenceItems: [evidenceItemWith({ sourceId: "SRC-MISSING" })],
    });

    expect(assessment.evidenceUsingMissingSources).toEqual([
      {
        id: "EVID-TEST-001",
        title: "Test evidence",
        missingSourceId: "SRC-MISSING",
      },
    ]);
  });

  it("includes the structural-only and legal-clearance limitation in publicSafeSummary", () => {
    const assessment = assessSourceReadiness({
      sources: [baseSource],
      evidenceItems: [baseEvidenceItem],
    });

    expect(assessment.publicSafeSummary).toContain(
      "This is a structural source/license posture check only."
    );
    expect(assessment.publicSafeSummary).toContain(
      "It does not provide legal clearance"
    );
  });
});
