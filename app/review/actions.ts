"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { claims } from "@/data/claims";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";
import {
  type CorrectionGovernanceOutcome,
  getCorrectionSubmissionById,
  listCorrectionSubmissions,
  patchCorrectionSubmission,
  type CorrectionTriagePatch,
  type CorrectionTriageStatus,
} from "@/lib/correctionsStore";
import { addReleaseGovernanceLogEntry, listReleaseGovernanceLogEntries } from "@/lib/releaseGovernanceLogStore";
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

export async function recordReleaseGovernanceReview(
  note?: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const cookieStore = await cookies();
  if (!isReviewAuthorizedFromCookies(cookieStore)) {
    return { ok: false, error: "Unauthorized review session." };
  }

  const corrections = listCorrectionSubmissions();
  const summaries = claims.map((claim) => getClaimCorrectionSummary(claim.id, corrections));
  const challengedClaimCount = summaries.filter(
    (summary) => summary.governanceStatus === "challenged" || summary.governanceStatus === "under_review"
  ).length;
  const correctedClaimCount = summaries.filter((summary) => summary.governanceStatus === "corrected").length;
  const restrictedClaimCount = summaries.filter((summary) => summary.governanceStatus === "restricted").length;
  const withdrawnClaimCount = summaries.filter((summary) => summary.governanceStatus === "withdrawn").length;
  const openCorrectionCount = corrections.filter((correction) => correction.triageStatus !== "resolved").length;
  const reviewer = getReviewerIdentity();
  const trimmedNote = note?.trim();

  addReleaseGovernanceLogEntry({
    actor: "reviewer",
    reviewerId: reviewer.reviewerId,
    reviewerLabel: reviewer.reviewerLabel,
    challengedClaimCount,
    correctedClaimCount,
    restrictedClaimCount,
    withdrawnClaimCount,
    openCorrectionCount,
    note: trimmedNote ? trimmedNote : undefined,
  });

  revalidatePath("/review");
  return { ok: true };
}

export async function getLatestReleaseGovernanceReview() {
  const cookieStore = await cookies();
  if (!isReviewAuthorizedFromCookies(cookieStore)) return null;
  return listReleaseGovernanceLogEntries()[0] ?? null;
}
