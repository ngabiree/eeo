import { NextRequest, NextResponse } from "next/server";

import {
  getCorrectionSubmissionById,
  patchCorrectionSubmission,
  type CorrectionTriageStatus,
} from "@/lib/correctionsStore";
import { isReviewAuthorizedCookieValue, REVIEW_AUTH_COOKIE_NAME } from "@/lib/reviewAuth";

const VALID: CorrectionTriageStatus[] = ["queued", "in_review", "needs_review", "resolved"];
const MAX_TRIAGE_NOTE = 8_000;

function isTriageStatus(v: unknown): v is CorrectionTriageStatus {
  return typeof v === "string" && VALID.includes(v as CorrectionTriageStatus);
}

type PatchBody = {
  triageStatus?: unknown;
  triageNote?: unknown;
};

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isReviewAuthorizedCookieValue(request.cookies.get(REVIEW_AUTH_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: "Unauthorized review session." }, { status: 401 });
  }

  const { id: rawId } = await context.params;
  const id = decodeURIComponent(rawId);
  const current = getCorrectionSubmissionById(id);
  if (!current) {
    return NextResponse.json({ error: "Correction request not found." }, { status: 404 });
  }

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const hasStatusKey = Object.prototype.hasOwnProperty.call(body, "triageStatus");
  const hasNoteKey = Object.prototype.hasOwnProperty.call(body, "triageNote");

  if (!hasStatusKey && !hasNoteKey) {
    return NextResponse.json(
      { error: "Provide triageStatus and/or triageNote." },
      { status: 400 }
    );
  }

  if (
    hasNoteKey &&
    body.triageNote !== null &&
    body.triageNote !== undefined &&
    typeof body.triageNote !== "string"
  ) {
    return NextResponse.json({ error: "triageNote must be a string or null." }, { status: 400 });
  }

  if (typeof body.triageNote === "string" && body.triageNote.length > MAX_TRIAGE_NOTE) {
    return NextResponse.json({ error: "triageNote is too long." }, { status: 400 });
  }

  const patch: {
    triageStatus?: CorrectionTriageStatus;
    triageNote?: string | null;
  } = {};

  if (hasStatusKey && body.triageStatus !== undefined) {
    if (!isTriageStatus(body.triageStatus)) {
      return NextResponse.json(
        { error: "triageStatus must be queued, in_review, needs_review, or resolved." },
        { status: 400 }
      );
    }
    patch.triageStatus = body.triageStatus;
  }
  if (hasNoteKey) {
    patch.triageNote = body.triageNote === undefined ? undefined : (body.triageNote as string | null);
  }

  const normalizedIncomingNote =
    patch.triageNote === undefined || patch.triageNote === null || patch.triageNote.trim() === ""
      ? undefined
      : patch.triageNote.trim();
  const noStatusChange =
    patch.triageStatus === undefined || patch.triageStatus === current.triageStatus;
  const noNoteChange =
    patch.triageNote === undefined || (current.triageNote ?? "") === (normalizedIncomingNote ?? "");
  if (noStatusChange && noNoteChange) {
    return NextResponse.json(
      { error: "Patch must include at least one actual change." },
      { status: 400 }
    );
  }

  const ok = patchCorrectionSubmission(id, patch);
  if (!ok) {
    return NextResponse.json({ error: "Correction request not found." }, { status: 404 });
  }

  const updated = getCorrectionSubmissionById(id);
  if (!updated) {
    return NextResponse.json({ error: "Correction request not found." }, { status: 404 });
  }

  return NextResponse.json({
    id: updated.id,
    triageStatus: updated.triageStatus,
    triageNote: updated.triageNote ?? null,
    triageUpdatedAt: updated.triageUpdatedAt,
  });
}
