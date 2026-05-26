import { describe, expect, it } from "vitest";

import { copperCobaltCorridorPilotSkeleton } from "@/data/corridorDossier";

const formerStubSections = [
  "concession_permit_profile",
  "operator_profile",
  "ownership_control_profile",
  "ecological_profile",
  "value_capture_profile",
  "human_capability_stewardship_profile",
  "methods_limits",
  "safeguards_map_safety",
  "right_of_reply",
  "release_manifest",
];

const placeholderMarkers = [
  "placeholder",
  "stub",
  "substantive drafting awaits",
  "structural-only milestone",
];

const actorAffectingSections = [
  "concession_permit_profile",
  "operator_profile",
  "ownership_control_profile",
  "labor_profile",
  "public_revenue_profile",
  "value_capture_profile",
  "human_capability_stewardship_profile",
  "evidence_gaps",
  "right_of_reply",
];

describe("corridor dossier coherence", () => {
  it("has no placeholder language in public dossier records", () => {
    const publicText = [
      copperCobaltCorridorPilotSkeleton.purpose,
      copperCobaltCorridorPilotSkeleton.scopeStatement,
      ...copperCobaltCorridorPilotSkeleton.nonGoals,
      ...copperCobaltCorridorPilotSkeleton.publicLimitations,
      ...copperCobaltCorridorPilotSkeleton.sections.flatMap((section) => [
        section.title,
        section.summary,
        ...section.publicLimitations,
      ]),
    ].join(" ");

    const normalized = publicText.toLowerCase();

    for (const marker of placeholderMarkers) {
      expect(normalized).not.toContain(marker);
    }
  });

  it("fills former stub sections with public-safe dossier narratives", () => {
    for (const sectionName of formerStubSections) {
      const section = copperCobaltCorridorPilotSkeleton.sections.find(
        (candidate) => candidate.section === sectionName
      );

      expect(section, sectionName).toBeDefined();
      expect(section?.summary.length).toBeGreaterThan(180);
      expect(section?.summary.toLowerCase()).toContain("depends on");
      expect(section?.publicLimitations.length).toBeGreaterThan(0);
      expect(section?.lastUpdated).toBe(copperCobaltCorridorPilotSkeleton.lastUpdated);
    }
  });

  it("keeps release readiness conservative and unsigned", () => {
    const manifestSection = copperCobaltCorridorPilotSkeleton.sections.find(
      (section) => section.section === "release_manifest"
    );

    expect(copperCobaltCorridorPilotSkeleton.releaseReadiness).toBe("not_ready");
    expect(manifestSection?.status).toBe("not_started");
    expect(manifestSection?.summary).toContain("not signed");
    expect(manifestSection?.summary).toContain("not published");
    expect(manifestSection?.publicLimitations.join(" ")).toContain(
      "does not approve publication"
    );
  });

  it("documents correction or right-of-reply posture for actor-affecting sections", () => {
    for (const sectionName of actorAffectingSections) {
      const section = copperCobaltCorridorPilotSkeleton.sections.find(
        (candidate) => candidate.section === sectionName
      );
      const publicText = [
        section?.summary ?? "",
        ...(section?.publicLimitations ?? []),
      ]
        .join(" ")
        .toLowerCase();

      expect(publicText, sectionName).toMatch(/correction|right-of-reply/);
    }
  });
});
