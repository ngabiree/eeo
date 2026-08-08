import { resolveVisualDisclosureTier } from "./disclosure-policy";
import type { EEOVisualContract, VisualOutcome } from "./visual-contract";

export interface VisualLintIssue {
  severity: "error" | "warning";
  code: string;
  message: string;
}

export interface VisualLintResult {
  outcome: VisualOutcome;
  effectiveDisclosureTier: EEOVisualContract["disclosureTier"];
  publicationAuthorized: false;
  issues: VisualLintIssue[];
}

const observedOnlyClaimTypes = new Set(["modeled", "inferred", "alleged", "disputed", "confidential", "withdrawn"]);
const quantitativeVisualTypes = new Set(["bar", "line", "pie", "scatter", "sankey"]);
const hardErrorCodes = new Set([
  "INVALID_METRIC_SEMANTICS", "MIXED_AXIS_UNITS", "UNKNOWN_METRIC", "MISSING_VALUE", "MISSING_AS_ZERO",
  "UNDOCUMENTED_TRANSFORMATION", "INFERENCE_UPGRADE", "INVALID_QUANTITATIVE_VALUE", "INVALID_PIE_VALUE",
  "INVALID_PIE_TOTAL", "UNSAFE_SANKEY", "TRADE_NOT_TRACEABILITY", "NETWORK_INTENT", "PUBLIC_SECONDARY_AXIS",
  "NO_TABLE_FALLBACK", "COLOR_DEPENDENT", "UNKNOWN_DISCLOSURE_TIER",
]);
const restrictionErrorCodes = new Set(["DISCLOSURE_DOWNGRADE", "SENSITIVE_COORDINATES"]);

function validateMetricSemantics(metric: EEOVisualContract["metricDefinitions"][number]): string[] {
  const issues: string[] = [];
  const isPercentage = metric.aggregation === "share" || /%|percent|percentage/i.test(metric.unit);

  if (!metric.name.trim()) issues.push("Metric name is required.");
  if (!metric.unit.trim()) issues.push("Metric unit is required.");
  if (isPercentage && !metric.denominator?.trim()) issues.push("Percentages and shares require a denominator.");
  if (metric.aggregation === "rate" && (!metric.numerator?.trim() || !metric.denominator?.trim())) {
    issues.push("Rates require both numerator and denominator.");
  }
  return issues;
}

export function lintVisualContract(contract: EEOVisualContract): VisualLintResult {
  const issues: VisualLintIssue[] = [];
  const error = (code: string, message: string) => issues.push({ severity: "error", code, message });
  const warn = (code: string, message: string) => issues.push({ severity: "warning", code, message });
  const metricIds = new Set(contract.metricDefinitions.map((metric) => metric.id));

  for (const metric of contract.metricDefinitions) {
    for (const message of validateMetricSemantics(metric)) error("INVALID_METRIC_SEMANTICS", message);
  }
  const unitsByAxis = new Map<string, Set<string>>();
  for (const metric of contract.metricDefinitions) {
    const axis = metric.axis ?? "primary";
    const units = unitsByAxis.get(axis) ?? new Set<string>();
    units.add(metric.unit);
    unitsByAxis.set(axis, units);
  }
  for (const [axis, units] of unitsByAxis) {
    if (units.size > 1) error("MIXED_AXIS_UNITS", `The ${axis} axis mixes incompatible units: ${[...units].join(", ")}.`);
  }
  if (contract.audience === "public" && contract.metricDefinitions.some((metric) => metric.axis === "secondary")) {
    error("PUBLIC_SECONDARY_AXIS", "Public visuals cannot use a secondary axis in the MVP.");
  }
  if (!contract.dataRefs.length) error("MISSING_DATA", "A public visual requires datum-level data.");
  for (const datum of contract.dataRefs) {
    if (!metricIds.has(datum.metricId)) error("UNKNOWN_METRIC", `Datum ${datum.id} references an unknown metric.`);
    if (!datum.evidenceRefs.length) error("MISSING_PROVENANCE", `Datum ${datum.id} has no evidence reference.`);
    if (datum.value === null || datum.value === undefined) error("MISSING_VALUE", `Datum ${datum.id} must follow the missing-data policy, not silently become zero.`);
    if (datum.derivationRef && !contract.transformationMethod?.trim()) {
      error("UNDOCUMENTED_TRANSFORMATION", `Datum ${datum.id} has a derivation reference but no transformation method.`);
    }
    if (observedOnlyClaimTypes.has(datum.claimType) && ["observed", "official"].includes(datum.displayedAs)) {
      error("INFERENCE_UPGRADE", `Datum ${datum.id} cannot render ${datum.claimType} evidence as ${datum.displayedAs}.`);
    }
    if (quantitativeVisualTypes.has(contract.visualType) && (typeof datum.value !== "number" || !Number.isFinite(datum.value))) {
      error("INVALID_QUANTITATIVE_VALUE", `Datum ${datum.id} must be a finite number for ${contract.visualType} visuals.`);
    }
    if (contract.visualType === "pie" && typeof datum.value === "number" && datum.value < 0) {
      error("INVALID_PIE_VALUE", `Datum ${datum.id} cannot be negative in a pie chart.`);
    }
  }
  if (contract.missingValueTreatment !== "preserve" && contract.missingValueTreatment !== "explicit-not-available") {
    error("MISSING_AS_ZERO", "Missing values cannot be converted to zero.");
  }
  if (contract.quantitativeAxis?.truncated && !contract.quantitativeAxis.justification?.trim()) {
    warn("TRUNCATED_AXIS", "A truncated quantitative axis requires a visible justification.");
  }

  const disclosure = resolveVisualDisclosureTier(
    contract.dataRefs.map((datum) => datum.disclosureTier),
    contract.disclosureTier
  );
  if (disclosure.hasUnknownTier) {
    error("UNKNOWN_DISCLOSURE_TIER", "An unknown disclosure tier fails closed.");
  }
  if (!disclosure.hasUnknownTier && disclosure.effectiveTier !== contract.disclosureTier) {
    error("DISCLOSURE_DOWNGRADE", "The visual cannot be less restrictive than its underlying claims or geometries.");
  }
  if (contract.audience === "public" && (contract.geographyScope?.containsSensitiveCoordinates || contract.dataRefs.some((datum) => datum.geometry?.containsSensitiveCoordinates))) {
    error("SENSITIVE_COORDINATES", "Sensitive coordinates cannot be publicly exposed.");
  }

  if (contract.visualType === "sankey") {
    const conditions = contract.sankeyConditions;
    if (!conditions || Object.entries(conditions).some(([key, value]) => key !== "flowKind" && value !== true)) {
      error("UNSAFE_SANKEY", "Sankey requires compatible, additive, sufficiently covered flows with known losses treatment.");
    } else if (conditions.flowKind === "reported-trade") {
      error("TRADE_NOT_TRACEABILITY", "Reported trade flows require an unweighted flow diagram, not a Sankey that implies physical traceability.");
    }
  }
  if (contract.visualType === "network") {
    const topology = contract.networkTopology;
    if (!topology?.answersStructuralConnectionQuestion) error("NETWORK_INTENT", "A network must answer a structural-connection question.");
    if (contract.audience === "public" && (topology?.meaningfulNodeCount ?? 0) > 25) warn("PUBLIC_NETWORK_COMPLEXITY", "Public networks over 25 meaningful nodes should be filtered, tabular, or searchable.");
  }
  if (contract.visualType === "pie" && contract.dataRefs.length > 6) warn("PIE_COMPLEXITY", "Pies over six categories should use a clearer alternative.");
  if (contract.visualType === "pie" && contract.dataRefs.every((datum) => typeof datum.value === "number") && contract.dataRefs.reduce((total, datum) => total + (datum.value as number), 0) <= 0) {
    error("INVALID_PIE_TOTAL", "Pie charts require a positive total.");
  }
  if (!contract.accessibility.tableFallback) error("NO_TABLE_FALLBACK", "A table fallback is required.");
  if (!contract.accessibility.colorIndependent) error("COLOR_DEPENDENT", "The visual must not rely on color alone.");

  const errorCodes = new Set(issues.filter((issue) => issue.severity === "error").map((issue) => issue.code));
  const hasHardError = [...errorCodes].some((code) => hardErrorCodes.has(code));
  const hasMissingEvidence = errorCodes.has("MISSING_PROVENANCE") || errorCodes.has("MISSING_DATA");
  const hasOnlyRestrictions = errorCodes.size > 0 && [...errorCodes].every((code) => restrictionErrorCodes.has(code));
  const outcome: VisualOutcome = hasHardError
    ? "BLOCKED"
    : hasMissingEvidence
      ? "INSUFFICIENT_EVIDENCE"
      : hasOnlyRestrictions
        ? "RESTRICTED"
        : errorCodes.size > 0
          ? "BLOCKED"
          : contract.visualType === "network" && issues.some((issue) => issue.code === "PUBLIC_NETWORK_COMPLEXITY")
            ? "DOWNGRADED_TO_TABLE"
            : "VALID_FOR_REVIEW";

  return { outcome, effectiveDisclosureTier: disclosure.effectiveTier, publicationAuthorized: false, issues };
}
