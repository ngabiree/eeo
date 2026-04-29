"use server";

import { revalidatePath } from "next/cache";

import {
  patchCorrectionSubmission,
  type CorrectionSubmission,
  type CorrectionTriagePatch,
  type CorrectionTriageStatus,
} from "@/lib/correctionsStore";

const MAX_TRIAGE_NOTE = 8_000;
const VALID_TRIAGE: CorrectionTriageStatus[] = ["queued", "in_review", "resolved"];

/** Public shape for reviewer UI (omit internal fields like raw email). */
export type CorrectionTriageView = Pick<
  CorrectionSubmission,
  "id" | "triageStatus" | "triageUpdatedAt"
> &
  Partial<Pick<CorrectionSubmission, "triageNote" | "submittedAt" | "category" | "claimId">>;

export async function patchCorrectionTriage(
  submissionId: string,
  patch: CorrectionTriagePatch
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (typeof submissionId !== "string" || !submissionId.trim()) {
    return { ok: false, error: "Invalid submission id." };
  }

  if (patch.triageStatus === undefined && patch.triageNote === undefined) {
    return { ok: false, error: "Provide a triage status change and/or a note." };
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

  const id = decodeURIComponent(submissionId.trim());
  const ok = patchCorrectionSubmission(id, patch);
  if (!ok) {
    return { ok: false, error: "Correction request not found." };
  }

  revalidatePath("/review");
  return { ok: true };
}
