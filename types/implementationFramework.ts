export type ReadinessStatus = "complete" | "in_progress" | "blocked" | "deferred";

export type ReadinessDomain =
  | "doctrine"
  | "evidence"
  | "governance"
  | "disclosure"
  | "product"
  | "maintenance";

export interface ImplementationPhase {
  id: string;
  title: string;
  status: ReadinessStatus;
  purpose: string;
  deliverables: string[];
  exitGate: string;
  doctrineBoundary: string;
}

export interface ReadinessGate {
  id: string;
  domain: ReadinessDomain;
  title: string;
  status: ReadinessStatus;
  ownerRole: string;
  evidenceRequired: string[];
  blockerRule: string;
  publicUxImplication: string;
  maintenanceHook: string;
}

export interface MaintenanceCadence {
  id: string;
  cadence: "weekly" | "monthly" | "quarterly" | "release" | "emergency";
  ownerRole: string;
  checks: string[];
  output: string;
}

export interface RiskControl {
  id: string;
  risk: string;
  trigger: string;
  mitigation: string;
  releaseGate: string;
}
