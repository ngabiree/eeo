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
    typeof value === "string" &&
    (CORRECTION_CATEGORIES as readonly string[]).includes(value)
  );
}

/** Prototype-only triage states for the review workspace */
export type CorrectionTriageStatus = "queued" | "in_review" | "needs_review" | "resolved";
export type CorrectionActivityType =
  | "submitted"
  | "triage_status_changed"
  | "triage_note_added"
  | "triage_note_updated"
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
  details: string;
  triageStatus: CorrectionTriageStatus;
  /** Last time status or reviewer note changed (prototype; in-memory only). ISO string. */
  triageUpdatedAt: string;
  /** Optional reviewer note (prototype workspace only). */
  triageNote?: string;
  activities: CorrectionActivity[];
}

/** In-memory only: resets between server cold starts — OK for prototype triage demos. */
const correctionsStore: CorrectionSubmission[] = [];

function cloneSubmission(submission: CorrectionSubmission): CorrectionSubmission {
  const activities = submission.activities ?? [];
  return {
    ...submission,
    activities: activities.map((activity) => ({ ...activity })),
  };
}

export function addCorrectionSubmission(submission: CorrectionSubmission) {
  correctionsStore.push(submission);
}

export function listCorrectionSubmissions(): CorrectionSubmission[] {
  return correctionsStore
    .map(cloneSubmission)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function getCorrectionSubmissionById(id: string): CorrectionSubmission | undefined {
  const match = correctionsStore.find((s) => s.id === id);
  return match ? cloneSubmission(match) : undefined;
}

export interface CorrectionTriagePatch {
  triageStatus?: CorrectionTriageStatus;
  /** Omit to leave unchanged; `null` clears the note */
  triageNote?: string | null;
  reviewerId?: string;
  reviewerLabel?: string;
}

function activityId(): string {
  return `ACT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

/** Single append-only entry point for activity log records. */
function appendActivity(entry: CorrectionSubmission, activity: Omit<CorrectionActivity, "id" | "correctionId">) {
  entry.activities = entry.activities ?? [];
  entry.activities.push({
    id: activityId(),
    correctionId: entry.id,
    ...activity,
  });
}

/**
 * Applies a partial triage patch. Updates `triageUpdatedAt` when anything changes.
 * Returns false if submission id does not exist.
 */
export function patchCorrectionSubmission(id: string, patch: CorrectionTriagePatch): boolean {
  const entry = correctionsStore.find((s) => s.id === id);
  if (!entry) return false;

  let touched = false;
  const now = new Date().toISOString();

  if (
    patch.triageStatus !== undefined &&
    patch.triageStatus !== entry.triageStatus
  ) {
    const fromStatus = entry.triageStatus;
    entry.triageStatus = patch.triageStatus;
    appendActivity(entry, {
      type: "triage_status_changed",
      fromStatus,
      toStatus: patch.triageStatus,
      actor: "reviewer",
      reviewerId: patch.reviewerId,
      reviewerLabel: patch.reviewerLabel,
      createdAt: now,
    });
    touched = true;
  }

  if (patch.triageNote !== undefined) {
    const normalized =
      patch.triageNote === null || patch.triageNote.trim() === ""
        ? undefined
        : patch.triageNote.trim();
    const prev = entry.triageNote ?? "";
    const next = normalized ?? "";
    if (prev !== next) {
      entry.triageNote = normalized;
      appendActivity(entry, {
        type: prev ? "triage_note_updated" : "triage_note_added",
        note: normalized,
        actor: "reviewer",
        reviewerId: patch.reviewerId,
        reviewerLabel: patch.reviewerLabel,
        createdAt: now,
      });
      touched = true;
    }
  }

  if (touched) {
    entry.triageUpdatedAt = now;
  }

  return true;
}
