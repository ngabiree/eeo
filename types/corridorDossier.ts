/**
 * Corridor evidence dossier structure (v0.7) — typing only for the Critical Minerals Corridor pilot.
 * No runtime dossier publishing or temporal/monitoring hooks.
 */

export type CorridorDossierSection =
  | "scope"
  | "source_map"
  | "endowment_profile"
  | "governance_profile"
  | "concession_permit_profile"
  | "operator_profile"
  | "ownership_control_profile"
  | "extraction_production_profile"
  | "processing_trade_profile"
  | "labor_profile"
  | "ecological_profile"
  | "public_revenue_profile"
  | "value_capture_profile"
  | "human_capability_stewardship_profile"
  | "evidence_gaps"
  | "methods_limits"
  | "safeguards_map_safety"
  | "right_of_reply"
  | "release_manifest";

export type DossierSectionStatus =
  | "not_started"
  | "source_mapping"
  | "drafting"
  | "evidence_review"
  | "legal_review"
  | "exposure_review"
  | "partner_review"
  | "ready_for_release"
  | "withheld";

export type CorridorLifecyclePhase =
  | "candidate"
  | "scoping"
  | "evidence_development"
  | "review"
  | "release_candidate"
  | "release_authorized"
  | "public"
  | "correction_review"
  | "superseded"
  | "archived";

export type CorridorReleaseGate =
  | "scope_authority"
  | "source_rights"
  | "evidence_provenance"
  | "method_review"
  | "legal_posture_review"
  | "exposure_review"
  | "map_safety_review"
  | "right_of_reply"
  | "correction_route"
  | "manifest_completeness"
  | "release_authorization";

export type CorridorGateStatus =
  | "not_started"
  | "in_progress"
  | "satisfied"
  | "not_required"
  | "blocked"
  | "revoked";

export interface CorridorGateRecord {
  gate: CorridorReleaseGate;
  status: CorridorGateStatus;
  publicSummary: string;
  internalReason?: string;
  accountableRole?: string;
  reviewedAt?: string;
}

export interface CorridorLifecycleRecord {
  corridorId: string;
  phase: CorridorLifecyclePhase;
  gates: CorridorGateRecord[];
  releaseManifestId?: string;
  authorizedAt?: string;
  publicSince?: string;
  supersedesLifecycleId?: string;
  lastUpdated: string;
}

export interface CorridorDossierSectionRecord {
  id: string;
  section: CorridorDossierSection;
  title: string;
  status: DossierSectionStatus;
  summary: string;
  linkedClaimIds: string[];
  linkedEvidenceIds: string[];
  sourceIds: string[];
  publicLimitations: string[];
  exposureNotes: string[];
  lastUpdated: string;
}

export interface CorridorDossier {
  id: string;
  title: string;
  corridor: string;
  geography: string;
  commodityFocus: string[];
  purpose: string;
  scopeStatement: string;
  nonGoals: string[];
  sections: CorridorDossierSectionRecord[];
  lifecycle?: CorridorLifecycleRecord;
  /** @deprecated Use lifecycle.phase and lifecycle.gates for new governance work. */
  releaseReadiness:
    | "not_ready"
    | "internal_review"
    | "partner_review"
    | "release_candidate"
    | "released";
  publicLimitations: string[];
  lastUpdated: string;
}
