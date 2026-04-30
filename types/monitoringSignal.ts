import type {
  ConfidenceLevel,
  EvidenceRole,
  ExposureRisk,
  PublicationDecision,
} from "./eeo";
import type { MapSafetyClassification as MapSafetyClass } from "./mapSafety";

/**
 * v0.8 contract only.
 *
 * A Monitoring Signal is an evidence-linked observation or update
 * that may later inform a claim, dossier section, trend assessment,
 * or Temporal Endowment Profile.
 *
 * It is not a claim.
 * It is not a finding.
 * It is not a forecast.
 * It is not a scenario.
 * It is not a score.
 * It is not a legal conclusion.
 *
 * This file is type-only. It must not introduce monitoring UI,
 * live data feeds, alerting, forecasting, scenario notes, or
 * runtime dashboard behavior.
 */

export type MonitoringSignalStatus =
  | "concept_only"
  | "draft"
  | "method_review"
  | "evidence_review"
  | "exposure_review"
  | "approved_for_registry"
  | "withdrawn";

export type MonitoringSignalCategory =
  | "endowment_condition"
  | "governance_change"
  | "concession_or_permit_change"
  | "ownership_or_control_change"
  | "production_or_extraction"
  | "processing_or_trade"
  | "labor_risk"
  | "ecological_signal"
  | "public_revenue"
  | "public_benefit"
  | "source_freshness"
  | "correction_activity"
  | "map_safety"
  | "evidence_gap";

export type MonitoringSignalPosture =
  | "observation"
  | "trend_indicator"
  | "freshness_warning"
  | "risk_relevance"
  | "evidence_gap"
  | "not_a_prediction";

export type MonitoringSignalFrequency =
  | "one_time"
  | "annual"
  | "quarterly"
  | "monthly"
  | "weekly"
  | "irregular"
  | "unknown";

export type MonitoringSignalDirection =
  | "increase"
  | "decrease"
  | "stable"
  | "mixed"
  | "unknown"
  | "not_applicable";

export interface MonitoringSignalEvidenceLink {
  evidenceId: string;
  role: EvidenceRole;
  note?: string;
}

export interface MonitoringSignalSourceLink {
  sourceId: string;
  note?: string;
}

export interface MonitoringSignal {
  id: string;
  title: string;

  category: MonitoringSignalCategory;
  posture: MonitoringSignalPosture;
  status: MonitoringSignalStatus;

  linkedDossierId?: string;
  linkedClaimIds: string[];
  linkedEntityIds: string[];
  linkedSourceIds: string[];

  baselinePeriod?: string;
  baselineStatement?: string;

  currentObservation: string;
  observationPeriod?: string;

  observedDirection?: MonitoringSignalDirection;
  updateFrequency: MonitoringSignalFrequency;

  trendRelevance?: string;

  governanceImplications: string[];

  confidence: ConfidenceLevel;

  evidenceLinks: MonitoringSignalEvidenceLink[];
  sourceLinks: MonitoringSignalSourceLink[];

  mapSafetyClass: MapSafetyClass;
  exposureRisk: ExposureRisk;
  publicationDecision: PublicationDecision;

  sourceLimitations: string[];

  whatThisSignalDoesNotProve: string[];

  reviewNotes?: string;

  lastUpdated: string;
}
