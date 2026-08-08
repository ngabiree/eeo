import { validateMetricSemantics } from "./metric-semantics";
import { visualDisclosureTier } from "./disclosure-policy";
import type { EEOVisualContract, VisualOutcome } from "./visual-contract";

export interface VisualLintIssue {
  severity: "error" | "warning";
  code: string;
  message: string;
}

export interface VisualLintResult {
  outcome: VisualOutcome;
  effectiveDisclosureTier: EEOVisualContract["disclosureTier"];
  issues: VisualLintIssue[];
}

const observedOnlyClaimTypes = new Set(["modeled", "inferred", "alleged", "disputed", "confidential", "withdrawn"]);

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
  }
  if (contract.missingValueTreatment !== "preserve" && contract.missingValueTreatment !== "explicit-not-available") {
    error("MISSING_AS_ZERO", "Missing values cannot be converted to zero.");
  }
  if (contract.quantitativeAxis?.truncated && !contract.quantitativeAxis.justification?.trim()) {
    warn("TRUNCATED_AXIS", "A truncated quantitative axis requires a visible justification.");
  }

  const effectiveDisclosureTier = visualDisclosureTier(
    contract.dataRefs.map((datum) => datum.disclosureTier),
    contract.disclosureTier
  );
  if (effectiveDisclosureTier !== contract.disclosureTier) {
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
  if (!contract.accessibility.tableFallback) error("NO_TABLE_FALLBACK", "A table fallback is required.");
  if (!contract.accessibility.colorIndependent) error("COLOR_DEPENDENT", "The visual must not rely on color alone.");

  const hasErrors = issues.some((issue) => issue.severity === "error");
  const outcome: VisualOutcome = hasErrors
    ? issues.some((issue) => issue.code === "MISSING_PROVENANCE" || issue.code === "MISSING_DATA")
      ? "INSUFFICIENT_EVIDENCE"
      : issues.some((issue) => issue.code === "SENSITIVE_COORDINATES" || issue.code === "DISCLOSURE_DOWNGRADE")
        ? "RESTRICTED"
        : "BLOCKED"
    : contract.visualType === "network" && issues.some((issue) => issue.code === "PUBLIC_NETWORK_COMPLEXITY")
      ? "DOWNGRADED_TO_TABLE"
      : "APPROVED";

  return { outcome, effectiveDisclosureTier, issues };
}
