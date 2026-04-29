"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import {
  type CorrectionGovernanceOutcome,
  getCorrectionSubmissionById,
  patchCorrectionSubmission,
  type CorrectionTriagePatch,
  type CorrectionTriageStatus,
} from "@/lib/correctionsStore";
import { getReviewerIdentity, isReviewAuthorizedFromCookies } from "@/lib/reviewAuth";

const MAX_TRIAGE_NOTE = 8_000;
const VALID_TRIAGE: CorrectionTriageStatus[] = ["queued", "in_review", "needs_review", "resolved"];
const VALID_GOVERNANCE_OUTCOMES: CorrectionGovernanceOutcome[] = [
  "requires_claim_review",
  "claim_unchanged",
  "claim_corrected",
  "claim_restricted",
  "claim_withdrawn",
];

export async function patchCorrectionTriage(
  submissionId: string,
  patch: CorrectionTriagePatch
): Promise<{ ok: true } | { ok: false; error: string }> {
  const cookieStore = await cookies();
  if (!isReviewAuthorizedFromCookies(cookieStore)) {
    return { ok: false, error: "Unauthorized review session." };
  }

  if (typeof submissionId !== "string" || !submissionId.trim()) {
    return { ok: false, error: "Invalid submission id." };
  }

  if (
    patch.triageStatus === undefined &&
    patch.triageNote === undefined &&
    patch.triageGovernanceOutcome === undefined
  ) {
    return { ok: false, error: "Provide a triage status change, note, and/or governance outcome." };
  }

  if (
    patch.triageStatus !== undefined &&
    !VALID_TRIAGE.includes(patch.triageStatus)
  ) {
    return { ok: false, error: "Invalid triage status." };
  }

  if (
    patch.triageNote !== undefined &&
    patch.triageNote !== null &&
    typeof patch.triageNote !== "string"
  ) {
    return { ok: false, error: "Review note must be text or cleared." };
  }

  if (typeof patch.triageNote === "string" && patch.triageNote.length > MAX_TRIAGE_NOTE) {
    return { ok: false, error: "Review note is too long." };
  }
  if (
    patch.triageGovernanceOutcome !== undefined &&
    patch.triageGovernanceOutcome !== null &&
    !VALID_GOVERNANCE_OUTCOMES.includes(patch.triageGovernanceOutcome)
  ) {
    return { ok: false, error: "Invalid governance outcome." };
  }

  const id = decodeURIComponent(submissionId.trim());
  const current = getCorrectionSubmissionById(id);
  if (!current) {
    return { ok: false, error: "Correction request not found." };
  }
  const normalizedIncomingNote =
    patch.triageNote === undefined || patch.triageNote === null || patch.triageNote.trim() === ""
      ? undefined
      : patch.triageNote.trim();
  const noStatusChange =
    patch.triageStatus === undefined || patch.triageStatus === current.triageStatus;
  const noNoteChange =
    patch.triageNote === undefined || (current.triageNote ?? "") === (normalizedIncomingNote ?? "");
  const normalizedIncomingGovernanceOutcome = patch.triageGovernanceOutcome ?? undefined;
  const noGovernanceOutcomeChange =
    patch.triageGovernanceOutcome === undefined ||
    current.triageGovernanceOutcome === normalizedIncomingGovernanceOutcome;
  if (noStatusChange && noNoteChange && noGovernanceOutcomeChange) {
    return { ok: false, error: "Patch must include at least one actual change." };
  }

  const reviewer = getReviewerIdentity();
  const ok = patchCorrectionSubmission(id, {
    ...patch,
    reviewerId: reviewer.reviewerId,
    reviewerLabel: reviewer.reviewerLabel,
  });
  if (!ok) {
    return { ok: false, error: "Correction request not found." };
  }

  revalidatePath("/review");
  return { ok: true };
}
