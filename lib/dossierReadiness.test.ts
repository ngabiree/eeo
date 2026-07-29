import { describe, expect, it } from "vitest";

import { copperCobaltCorridorPilotSkeleton } from "@/data/corridorDossier";
import { assessDossierReadiness } from "@/lib/dossierReadiness";
import type {
  CorridorDossier,
  CorridorDossierSectionRecord,
} from "@/types/corridorDossier";

const baseSection: CorridorDossierSectionRecord = {
  id: "CDS-TEST-scope",
  recordMode: "illustrative",
  section: "scope",
  title: "Scope",
  status: "source_mapping",
  summary: "Structural test section.",
  linkedClaimIds: ["CLAIM-TEST-001"],
  linkedEvidenceIds: ["EVID-TEST-001"],
  sourceIds: ["SRC-TEST-001"],
  publicLimitations: ["Prototype test limitation."],
  exposureNotes: ["Internal note should not be returned by the readiness helper."],
  lastUpdated: "2026-05-25T00:00:00.000Z",
};

const baseDossier: CorridorDossier = {
  id: "CDR-TEST-001",
  recordMode: "illustrative",
  title: "Test dossier",
  corridor: "Test corridor",
  geography: "Test geography",
  commodityFocus: ["test"],
  purpose: "Exercise readiness helper behavior.",
  scopeStatement: "Test-only scope.",
  nonGoals: ["No factual claims are made by this test fixture."],
  sections: [baseSection],
  releaseReadiness: "not_ready",
  publicLimitations: ["Prototype test limitation."],
  lastUpdated: "2026-05-25T00:00:00.000Z",
};

function sectionWith(
  overrides: Partial<CorridorDossierSectionRecord>
): CorridorDossierSectionRecord {
  return { ...baseSection, ...overrides };
}

function dossierWith(sections: CorridorDossierSectionRecord[]): CorridorDossier {
  return { ...baseDossier, sections };
}

describe("assessDossierReadiness", () => {
  it("reports the current copper-cobalt dossier as not ready", () => {
    const assessment = assessDossierReadiness(
      copperCobaltCorridorPilotSkeleton
    );

    expect(assessment.releaseReadiness).toBe("not_ready");
    expect(assessment.totalSections).toBe(
      copperCobaltCorridorPilotSkeleton.sections.length
    );
    expect(assessment.readySections).toBe(0);
    expect(assessment.notStartedSections).toBeGreaterThan(0);
    expect(assessment.inProgressSections).toBeGreaterThan(0);
    expect(assessment.publicSafeSummary).toBe(
      "This dossier is not ready for release. Several sections remain incomplete or under review."
    );
  });

  it("counts stub/not_started sections as incomplete", () => {
    const assessment = assessDossierReadiness(
      dossierWith([
        sectionWith({ id: "CDS-TEST-ready", status: "ready_for_release" }),
        sectionWith({ id: "CDS-TEST-stub", status: "not_started" }),
      ])
    );

    expect(assessment.totalSections).toBe(2);
    expect(assessment.readySections).toBe(1);
    expect(assessment.notStartedSections).toBe(1);
  });

  it("identifies sections with no claims without returning internal notes", () => {
    const assessment = assessDossierReadiness(
      dossierWith([
        sectionWith({
          id: "CDS-TEST-missing-claims",
          linkedClaimIds: [],
        }),
      ])
    );

    expect(assessment.sectionsMissingClaims).toEqual([
      {
        id: "CDS-TEST-missing-claims",
        section: "scope",
        title: "Scope",
        status: "source_mapping",
      },
    ]);
    expect(JSON.stringify(assessment.sectionsMissingClaims)).not.toContain(
      "Internal note"
    );
  });

  it("identifies sections with no evidence without returning evidence ids", () => {
    const assessment = assessDossierReadiness(
      dossierWith([
        sectionWith({
          id: "CDS-TEST-missing-evidence",
          linkedEvidenceIds: [],
        }),
      ])
    );

    expect(assessment.sectionsMissingEvidence).toEqual([
      {
        id: "CDS-TEST-missing-evidence",
        section: "scope",
        title: "Scope",
        status: "source_mapping",
      },
    ]);
    expect(JSON.stringify(assessment.sectionsMissingEvidence)).not.toContain(
      "EVID-TEST-001"
    );
  });

  it("counts ready_for_release sections as ready", () => {
    const assessment = assessDossierReadiness(
      dossierWith([
        sectionWith({ id: "CDS-TEST-ready", status: "ready_for_release" }),
      ])
    );

    expect(assessment.readySections).toBe(1);
    expect(assessment.notStartedSections).toBe(0);
    expect(assessment.inProgressSections).toBe(0);
    expect(assessment.blockedOrWithheldSections).toBe(0);
  });

  it("counts withheld sections as blocked/withheld", () => {
    const assessment = assessDossierReadiness(
      dossierWith([sectionWith({ id: "CDS-TEST-withheld", status: "withheld" })])
    );

    expect(assessment.blockedOrWithheldSections).toBe(1);
    expect(assessment.readySections).toBe(0);
    expect(assessment.publicSafeSummary).toBe(
      "This dossier is not ready for release. One or more sections are withheld or blocked, and remaining sections may still require review."
    );
  });
});
