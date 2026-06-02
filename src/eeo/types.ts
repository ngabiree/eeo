export type ClaimType =
  | "observed" | "official" | "modeled" | "inferred"
  | "alleged" | "disputed" | "confidential" | "withdrawn";

export type ConfidenceLabel =
  | "verified" | "official" | "modeled" | "estimated"
  | "self-reported" | "third-party reported" | "community-reported"
  | "disputed" | "restricted" | "outdated" | "unknown";

export type EvidenceLayer = "factual" | "analytical" | "normative" | "legal";

export type Granularity =
  | "site-level" | "facility-level" | "corridor-level" | "district-level"
  | "province-level" | "national-level" | "regional-level" | "global-level" | "unknown";

export type LegalPosture =
  | "no legal claim" | "public-record description" | "allegation by source"
  | "finding by authority" | "disputed legal status" | "requires legal review";

export type DisclosureTier =
  | "open" | "contextual public" | "aggregated"
  | "verified access" | "community-governed" | "suppressed";

export type ReviewStatus =
  | "draft" | "reviewed" | "exposure-reviewed" | "right-of-reply-open"
  | "published" | "corrected" | "disputed" | "withdrawn";

export type RightOfReplyStatus =
  | "not required" | "required" | "requested" | "received"
  | "declined" | "expired" | "unresolved";

export interface EvidenceClaim {
  id: string;
  claimText: string;
  claimType: ClaimType;
  confidenceLabel: ConfidenceLabel;
  evidenceLayer: EvidenceLayer;
  granularity: Granularity;
  legalPosture: LegalPosture;
  disclosureTier: DisclosureTier;
  sourceTitle: string;
  sourceLocator: string;
  sourceDate: string;
  retrievalDate: string;
  licenseOrUseBasis: string;
  method: string;
  confidenceExplanation: string;
  staleAfter: string;
  reviewStatus: ReviewStatus;
  correctionPath: string;
  rightOfReplyStatus: RightOfReplyStatus;
  notes?: string;
}

export interface CorridorStep {
  id: string;
  label: string;
  description: string;
  evidenceClaimIds: string[];
  disclosureTier: DisclosureTier;
}

export interface CorridorReasoningDimension {
  id: string;
  label: string;
  question: string;
  evidenceClaimIds: string[];
  disclosureTier: DisclosureTier;
}

export interface CorridorProfile {
  id: string;
  name: string;
  commodity: string;
  geography: string;
  status: "synthetic-demo" | "draft" | "internal-review" | "public-beta" | "published";
  summary: string;
  limits: string[];
  steps: CorridorStep[];
  reasoningDimensions: CorridorReasoningDimension[];
  claims: EvidenceClaim[];
}

export interface ReleaseReadinessResult {
  ready: boolean;
  blockers: string[];
  warnings: string[];
  passed: string[];
}
