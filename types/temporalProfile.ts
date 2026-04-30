import type {
  ConfidenceLevel,
  EvidenceRole,
  ExposureRisk,
} from "./eeo";

/**
 * Dormant type stub — future v1.3+ boundary only.
 *
 * Per GOVERNANCE.md / ROADMAP.md: temporal, monitoring, and scenario surfaces are **deferred**
 * until a trustworthy **corridor dossier** ships. `v0.6` advances **dossier schema + source map doctrine**,
 * not temporal activation.
 *
 * Temporal Endowment Profiles (when eventually used) describe:
 * - what an endowment was;
 * - what it is now;
 * - how it is changing;
 * - what plausible futures may follow under stated assumptions.
 *
 * This file is type-only. It must not introduce monitoring pipelines,
 * scenario engines, forecasting UI, or runtime dashboard behavior.
 */

export type TemporalProfileStatus =
  | "concept_only"
  | "draft"
  | "method_review"
  | "evidence_review"
  | "exposure_review"
  | "approved_for_prototype"
  | "withdrawn";

export type TemporalLayer =
  | "baseline"
  | "current_state"
  | "observed_trend"
  | "drivers_of_change"
  | "plausible_scenarios"
  | "governance_implications"
  | "exposure_restrictions";

export type TemporalDriverCategory =
  | "governance"
  | "market"
  | "technology"
  | "climate"
  | "ecological"
  | "labor"
  | "finance"
  | "conflict"
  | "infrastructure"
  | "policy"
  | "unknown";

export type ScenarioPosture =
  | "not_a_prediction"
  | "plausible_pathway"
  | "risk_warning"
  | "stewardship_opportunity"
  | "data_gap";

export interface TemporalEvidenceLink {
  evidenceId: string;
  role: EvidenceRole;
  note?: string;
}

export interface TemporalConditionStatement {
  layer: TemporalLayer;
  statement: string;
  period?: string;
  confidence: ConfidenceLevel;
  evidenceLinks: TemporalEvidenceLink[];
  limitations: string[];
}

export interface TemporalDriver {
  id: string;
  category: TemporalDriverCategory;
  description: string;
  confidence: ConfidenceLevel;
  evidenceLinks: TemporalEvidenceLink[];
}

export interface TemporalScenarioNote {
  id: string;
  title: string;
  posture: ScenarioPosture;
  summary: string;
  assumptions: string[];
  possibleImplications: string[];
  confidence: ConfidenceLevel;
  evidenceLinks: TemporalEvidenceLink[];
  whatThisDoesNotPredict: string[];
}

export interface TemporalEndowmentProfile {
  id: string;

  /**
   * Links this profile back to the relevant EEO entity/endowment.
   * Example: ENT-COBALT or a future endowment entity ID.
   */
  endowmentId: string;

  title: string;

  status: TemporalProfileStatus;

  baseline: TemporalConditionStatement;

  currentState: TemporalConditionStatement;

  observedTrend: TemporalConditionStatement;

  driversOfChange: TemporalDriver[];

  scenarioNotes: TemporalScenarioNote[];

  governanceImplications: string[];

  exposureRisk: ExposureRisk;

  exposureRestrictions: string[];

  publicLimitations: string[];

  lastUpdated: string;
}
