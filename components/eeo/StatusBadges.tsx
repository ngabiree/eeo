import type {
  ClaimGovernanceStatus,
  ConfidenceLevel,
  EvidenceRole,
  ExposureRisk,
  LegalPosture,
  PublicationDecision,
  PublicRecordStatus,
  RecordMode,
  ReviewStatus,
} from "@/types/eeo";

function badgeClass(color: string) {
  return `inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${color}`;
}

function toLabel(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const tone = {
  neutral: "border-stone-300 bg-stone-50 text-stone-700",
  blue: "border-blue-200 bg-blue-50 text-blue-900",
  green: "border-emerald-200 bg-emerald-50 text-emerald-900",
  amber: "border-amber-200 bg-amber-50 text-amber-900",
  red: "border-red-200 bg-red-50 text-red-900",
};

export function ConfidenceBadge({ value }: { value: ConfidenceLevel }) {
  const map: Record<ConfidenceLevel, string> = {
    high: tone.green,
    medium: tone.blue,
    low: tone.amber,
    insufficient: tone.neutral,
    disputed: tone.red,
  };
  return <span className={badgeClass(map[value])}>Confidence: {toLabel(value)}</span>;
}

export function ExposureRiskBadge({ value }: { value: ExposureRisk }) {
  const map: Record<ExposureRisk, string> = {
    low: tone.green,
    medium: tone.blue,
    high: tone.amber,
    restricted: tone.neutral,
    do_not_publish: tone.red,
  };
  return <span className={badgeClass(map[value])}>Exposure risk: {toLabel(value)}</span>;
}

export function PublicationDecisionBadge({ value }: { value: PublicationDecision }) {
  const map: Record<PublicationDecision, string> = {
    publish: tone.green,
    publish_aggregated: tone.blue,
    publish_with_redactions: tone.amber,
    withhold: tone.neutral,
    do_not_collect: tone.red,
  };
  return <span className={badgeClass(map[value])}>Publication: {toLabel(value)}</span>;
}

export function ReviewStatusBadge({ value }: { value: ReviewStatus }) {
  const map: Record<ReviewStatus, string> = {
    draft: tone.neutral,
    method_review: tone.blue,
    legal_review: tone.blue,
    exposure_review: tone.blue,
    right_of_reply_pending: tone.amber,
    approved_for_release: tone.green,
    challenged: tone.amber,
    corrected: tone.green,
    withdrawn: tone.red,
  };
  return <span className={badgeClass(map[value])}>Review status: {toLabel(value)}</span>;
}

export function LegalPostureBadge({ value }: { value: LegalPosture }) {
  return <span className={badgeClass(tone.neutral)}>Legal posture: {toLabel(value)}</span>;
}

export function EvidenceRoleBadge({ value }: { value: EvidenceRole }) {
  const map: Record<EvidenceRole, string> = {
    supports: tone.green,
    limits: tone.amber,
    contradicts: tone.red,
    contextualizes: tone.blue,
    motivates_review: tone.neutral,
  };
  return <span className={badgeClass(map[value])}>Evidence role: {toLabel(value)}</span>;
}

export function GovernanceStatusBadge({ value }: { value: ClaimGovernanceStatus }) {
  const map: Record<ClaimGovernanceStatus, string> = {
    stable: tone.green,
    challenged: tone.amber,
    under_review: tone.blue,
    corrected: tone.green,
    restricted: tone.neutral,
    withdrawn: tone.red,
  };
  return <span className={badgeClass(map[value])}>Governance: {toLabel(value)}</span>;
}

export function RecordModeBadge({ value }: { value: RecordMode }) {
  const map: Record<RecordMode, string> = {
    synthetic: tone.amber,
    illustrative: tone.blue,
    governed: tone.green,
    released: tone.green,
    restricted: tone.neutral,
  };
  return <span className={badgeClass(map[value])}>Record mode: {toLabel(value)}</span>;
}

export function PublicRecordStatusBadge({ value }: { value: PublicRecordStatus }) {
  const map: Record<PublicRecordStatus, string> = {
    released: tone.green,
    under_review: tone.blue,
    corrected: tone.green,
    challenged: tone.amber,
    withdrawn: tone.red,
    restricted: tone.neutral,
  };
  return <span className={badgeClass(map[value])}>Public status: {toLabel(value)}</span>;
}
