import type { MetricDefinition } from "./visual-contract";

export function isPercentageMetric(metric: MetricDefinition): boolean {
  return metric.aggregation === "share" || /%|percent|percentage/i.test(metric.unit);
}

export function validateMetricSemantics(metric: MetricDefinition): string[] {
  const issues: string[] = [];

  if (!metric.name.trim()) issues.push("Metric name is required.");
  if (!metric.unit.trim()) issues.push("Metric unit is required.");
  if (isPercentageMetric(metric) && !metric.denominator?.trim()) {
    issues.push("Percentages and shares require a denominator.");
  }
  if (metric.aggregation === "rate" && (!metric.numerator?.trim() || !metric.denominator?.trim())) {
    issues.push("Rates require both numerator and denominator.");
  }

  return issues;
}
