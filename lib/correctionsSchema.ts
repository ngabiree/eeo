/**
 * Correction intake types and category constants — no Node or `fs` imports
 * (safe to import from Client Components).
 */

export type CorrectionCategory =
  | "Factual correction"
  | "Source update"
  | "Right of reply"
  | "Harm-risk restriction request"
  | "Indigenous or community-sensitive review"
  | "Defamation or legal concern"
  | "Methodological dispute"
  | "Data freshness concern"
  | "Withdrawal request";

/** Canonical list for forms and API validation (must stay aligned with CorrectionCategory). */
export const CORRECTION_CATEGORIES: readonly CorrectionCategory[] = [
  "Factual correction",
  "Source update",
  "Right of reply",
  "Harm-risk restriction request",
  "Indigenous or community-sensitive review",
  "Defamation or legal concern",
  "Methodological dispute",
  "Data freshness concern",
  "Withdrawal request",
];

export function isCorrectionCategory(value: unknown): value is CorrectionCategory {
  return (
    typeof value === "string" && (CORRECTION_CATEGORIES as readonly string[]).includes(value)
  );
}

/** Prototype-only triage states for the review workspace */
export type CorrectionTriageStatus = "queued" | "in_review" | "needs_review" | "resolved";
export type CorrectionGovernanceOutcome =
  | "requires_claim_review"
  | "claim_unchanged"
  | "claim_corrected"
  | "claim_restricted"
  | "claim_withdrawn";
export type CorrectionActivityType =
  | "submitted"
  | "triage_status_changed"
  | "triage_note_added"
  | "triage_note_updated"
  | "governance_outcome_changed"
  | "reviewed"
  | "resolved"
  | "withdrawn";

export type CorrectionActivity = {
  id: string;
  correctionId: string;
  type: CorrectionActivityType;
  note?: string;
  fromStatus?: CorrectionTriageStatus;
  toStatus?: CorrectionTriageStatus;
  actor: "public_submitter" | "reviewer" | "system";
  reviewerId?: string;
  reviewerLabel?: string;
  createdAt: string;
};

export interface CorrectionSubmission {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  category: CorrectionCategory;
  claimId?: string;
  claimReference?: string;
  details: string;
  triageStatus: CorrectionTriageStatus;
  triageGovernanceOutcome?: CorrectionGovernanceOutcome;
  /** Last time triage fields changed. ISO string. */
  triageUpdatedAt: string;
  /** Optional reviewer note (prototype workspace only). */
  triageNote?: string;
  activities: CorrectionActivity[];
}

export interface CorrectionTriagePatch {
  triageStatus?: CorrectionTriageStatus;
  triageGovernanceOutcome?: CorrectionGovernanceOutcome | null;
  /** Omit to leave unchanged; `null` clears the note */
  triageNote?: string | null;
  reviewerId?: string;
  reviewerLabel?: string;
}
