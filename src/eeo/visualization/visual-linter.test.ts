import { describe, expect, it } from "vitest";

import type { EEOVisualContract } from "./visual-contract";
import { lintVisualContract } from "./visual-linter";

const baseContract: EEOVisualContract = {
  id: "visual-demo-001", version: "1", question: "What share is reported?", audience: "public", visualType: "bar",
  metricDefinitions: [{ id: "share", name: "Reported share", unit: "%", numerator: "reported amount", denominator: "total reported amount", aggregation: "share" }],
  dataRefs: [{ id: "datum-1", value: 20, metricId: "share", evidenceRefs: ["EVID-1"], confidence: "official", claimType: "official", disclosureTier: "contextual public", displayedAs: "official" }],
  missingDataPolicy: "Missing values remain missing and are disclosed.", missingValueTreatment: "preserve", uncertaintyPolicy: "Confidence is shown per datum.", disclosureTier: "contextual public",
  legalPosture: "public-record description", title: "Reported share", interpretation: "Reported values are not physical traceability.", limitations: ["Synthetic test data."],
  accessibility: { altText: "A table-backed chart of a reported share.", tableFallback: true, colorIndependent: true },
  evidenceSnapshot: "snapshot-test", methodVersion: "1", rendererVersion: "1", reviewStatus: "exposure-reviewed",
};

describe("visual contract linter", () => {
  it("approves a semantically specified, datum-provenanced visual", () => {
    expect(lintVisualContract(baseContract)).toMatchObject({ outcome: "APPROVED", effectiveDisclosureTier: "contextual public", issues: [] });
  });

  it("rejects modeled evidence rendered as observed", () => {
    const result = lintVisualContract({ ...baseContract, dataRefs: [{ ...baseContract.dataRefs[0], claimType: "modeled", displayedAs: "observed" }] });
    expect(result.outcome).toBe("BLOCKED");
    expect(result.issues.map((issue) => issue.code)).toContain("INFERENCE_UPGRADE");
  });

  it("restricts public visuals that lower underlying disclosure", () => {
    const result = lintVisualContract({ ...baseContract, disclosureTier: "open", dataRefs: [{ ...baseContract.dataRefs[0], disclosureTier: "aggregated" }] });
    expect(result.outcome).toBe("RESTRICTED");
    expect(result.effectiveDisclosureTier).toBe("aggregated");
  });

  it("blocks Sankeys made from reported trade rather than verified physical movement", () => {
    const result = lintVisualContract({ ...baseContract, visualType: "sankey", sankeyConditions: { commonUnits: true, compatibleTimePeriod: true, compatibleBoundaries: true, additiveQuantities: true, noObviousDoubleCounting: true, lossesTreatmentKnown: true, sufficientCoverage: true, flowKind: "reported-trade" } });
    expect(result.outcome).toBe("BLOCKED");
    expect(result.issues.map((issue) => issue.code)).toContain("TRADE_NOT_TRACEABILITY");
  });

  it("downgrades overly complex public networks to a table", () => {
    const result = lintVisualContract({ ...baseContract, visualType: "network", networkTopology: { answersStructuralConnectionQuestion: true, meaningfulNodeCount: 26 } });
    expect(result.outcome).toBe("DOWNGRADED_TO_TABLE");
  });

  it("rejects percentages without denominators and mixed primary-axis units", () => {
    const result = lintVisualContract({
      ...baseContract,
      metricDefinitions: [
        { ...baseContract.metricDefinitions[0], denominator: undefined },
        { id: "tonnes", name: "Reported tonnes", unit: "tonnes", aggregation: "sum" },
      ],
    });
    expect(result.issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["INVALID_METRIC_SEMANTICS", "MIXED_AXIS_UNITS"])
    );
  });
});
