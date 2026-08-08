import type {
  ClaimType,
  ConfidenceLabel,
  DisclosureTier,
  LegalPosture,
  ReviewStatus,
} from "../types";

export type VisualType =
  | "bar"
  | "line"
  | "map"
  | "network"
  | "sankey"
  | "flow-diagram"
  | "pie"
  | "scatter"
  | "table"
  | "none";

export type VisualOutcome =
  | "VALID_FOR_REVIEW"
  | "DOWNGRADED_TO_TABLE"
  | "DOWNGRADED_TO_DIAGRAM"
  | "AGGREGATED"
  | "RESTRICTED"
  | "BLOCKED"
  | "INSUFFICIENT_EVIDENCE";

export interface MetricDefinition {
  id: string;
  name: string;
  unit: string;
  numerator?: string;
  denominator?: string;
  aggregation: "sum" | "mean" | "median" | "rate" | "share" | "index";
  normalization?: "per-capita" | "per-tonne" | "real" | "nominal";
  timeGrain?: string;
  geoGrain?: string;
  axis?: "primary" | "secondary";
}

export interface TimeScope {
  start: string;
  end: string;
  grain?: string;
}

export interface GeographyScope {
  label: string;
  grain?: string;
  containsSensitiveCoordinates?: boolean;
}

export interface VisualDatum {
  id: string;
  value: unknown;
  metricId: string;
  evidenceRefs: string[];
  derivationRef?: string;
  confidence: ConfidenceLabel;
  claimType: ClaimType;
  disclosureTier: DisclosureTier;
  /** The evidentiary state represented to the reader; never silently upgraded. */
  displayedAs: "observed" | "official" | "modeled" | "estimated" | "inferred" | "disputed" | "unknown";
  label?: string;
  geometry?: { containsSensitiveCoordinates: boolean };
}

export interface SankeyConditions {
  commonUnits: boolean;
  compatibleTimePeriod: boolean;
  compatibleBoundaries: boolean;
  additiveQuantities: boolean;
  noObviousDoubleCounting: boolean;
  lossesTreatmentKnown: boolean;
  sufficientCoverage: boolean;
  flowKind: "reported-trade" | "verified-physical-movement";
}

export interface NetworkTopology {
  meaningfulNodeCount: number;
  answersStructuralConnectionQuestion: boolean;
}

export interface EEOVisualContract {
  id: string;
  version: string;
  question: string;
  audience: "public" | "research" | "review";
  visualType: VisualType;
  metricDefinitions: MetricDefinition[];
  dataRefs: VisualDatum[];
  timeScope?: TimeScope;
  geographyScope?: GeographyScope;
  missingDataPolicy: string;
  missingValueTreatment: "preserve" | "explicit-not-available";
  uncertaintyPolicy: string;
  aggregationMethod?: string;
  transformationMethod?: string;
  disclosureTier: DisclosureTier;
  legalPosture: LegalPosture;
  title: string;
  interpretation: string;
  limitations: string[];
  accessibility: {
    altText: string;
    tableFallback: boolean;
    colorIndependent: boolean;
  };
  evidenceSnapshot: string;
  methodVersion: string;
  rendererVersion: string;
  reviewStatus: ReviewStatus;
  quantitativeAxis?: { truncated: boolean; justification?: string };
  sankeyConditions?: SankeyConditions;
  networkTopology?: NetworkTopology;
}
