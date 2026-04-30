import type {
  ConfidenceLevel,
  ExposureRisk,
  PublicationDecision,
  ReviewStatus,
} from "@/types/eeo";

export type CapabilityFamily =
  | "foundational"
  | "technical"
  | "ecological_knowledge"
  | "institutional"
  | "scientific"
  | "entrepreneurial"
  | "care"
  | "civic";

export type HumanEndowmentRelationType =
  | "subsistence"
  | "labor"
  | "stewardship"
  | "sacred"
  | "knowledge"
  | "governance"
  | "harm_exposure"
  | "repair"
  | "future_inheritance";

export type HumanLayerDisclosureRule =
  | "public_aggregated"
  | "contextual_public"
  | "restricted"
  | "community_governed"
  | "suppressed"
  | "do_not_collect";

export interface CapabilityIndicator {
  id: string;
  family: CapabilityFamily;
  label: string;
  valueStatement: string;
  geography: string;
  temporalScope: string;
  sourceSummary: string;
  confidence: ConfidenceLevel;
  exposureRisk: ExposureRisk;
  publicationDecision: PublicationDecision;
  limitation: string;
}

export interface BioculturalRelation {
  id: string;
  relationType: HumanEndowmentRelationType;
  publicLabel: string;
  publicSummary: string;
  disclosureRule: HumanLayerDisclosureRule;
  authorityOrConsentStatus: string;
  limitation: string;
}

export interface LiveEvidenceBoundary {
  id: string;
  workType: string;
  liveSupported: boolean;
  belongsIn: string;
  publicByDefault: boolean;
  rule: string;
}

export interface HumanCapabilityProfile {
  id: string;
  title: string;
  corridor: string;
  doctrine: string;
  publicSummary: string;
  operatingPrinciple: string;
  redLines: string[];
  capabilityIndicators: CapabilityIndicator[];
  bioculturalRelations: BioculturalRelation[];
  liveEvidenceBoundaries: LiveEvidenceBoundary[];
  reviewStatus: ReviewStatus;
  lastUpdated: string;
}
