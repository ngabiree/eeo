import { describe, expect, it } from "vitest";

import {
  implementationPhases,
  maintenanceCadences,
  readinessGates,
  riskControls,
  summarizeReadiness,
} from "./implementationFramework";

describe("implementation framework", () => {
  it("keeps every readiness gate evidence-backed and maintainable", () => {
    for (const gate of readinessGates) {
      expect(gate.evidenceRequired.length, gate.id).toBeGreaterThan(0);
      expect(gate.blockerRule.length, gate.id).toBeGreaterThan(24);
      expect(gate.maintenanceHook.length, gate.id).toBeGreaterThan(24);
      expect(gate.publicUxImplication.length, gate.id).toBeGreaterThan(24);
    }
  });

  it("keeps completion tied to the MVP publication chain rather than atlas expansion", () => {
    const combinedText = [
      ...implementationPhases.map((phase) => `${phase.exitGate} ${phase.doctrineBoundary}`),
      ...riskControls.map((control) => `${control.trigger} ${control.mitigation}`),
    ]
      .join("\n")
      .toLowerCase();

    expect(combinedText).toContain("global atlas");
    expect(combinedText).toContain("release manifest");
    expect(combinedText).toContain("correction");
    expect(combinedText).toContain("right-of-reply");
  });

  it("includes recurring maintenance cadences for routine and emergency operations", () => {
    const cadences = maintenanceCadences.map((cadence) => cadence.cadence);

    expect(cadences).toContain("weekly");
    expect(cadences).toContain("monthly");
    expect(cadences).toContain("quarterly");
    expect(cadences).toContain("release");
    expect(cadences).toContain("emergency");
  });

  it("summarizes gate statuses without dropping blocked release gates", () => {
    const summary = summarizeReadiness(readinessGates);

    expect(summary.complete).toBeGreaterThan(0);
    expect(summary.in_progress).toBeGreaterThan(0);
    expect(summary.blocked).toBeGreaterThan(0);
  });
});
