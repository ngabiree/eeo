import { NextRequest, NextResponse } from "next/server";

import {
  type CorrectionGovernanceOutcome,
  getCorrectionSubmissionById,
  patchCorrectionSubmission,
  type CorrectionTriageStatus,
} from "@/lib/correctionsStore";
import {
  getReviewerIdentity,
  isReviewAuthorizedCookieValue,
  REVIEW_AUTH_COOKIE_NAME,
} from "@/lib/reviewAuth";

const VALID: CorrectionTriageStatus[] = ["queued", "in_review", "needs_review", "resolved"];
const VALID_GOVERNANCE_OUTCOMES: CorrectionGovernanceOutcome[] = [
  "requires_claim_review",
  "claim_unchanged",
  "claim_corrected",
  "claim_restricted",
  "claim_withdrawn",
];
const MAX_TRIAGE_NOTE = 8_000;

function isTriageStatus(v: unknown): v is CorrectionTriageStatus {
  return typeof v === "string" && VALID.includes(v as CorrectionTriageStatus);
}

type PatchBody = {
  triageStatus?: unknown;
  triageNote?: unknown;
  triageGovernanceOutcome?: unknown;
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
  const hasGovernanceOutcomeKey = Object.prototype.hasOwnProperty.call(body, "triageGovernanceOutcome");

  if (!hasStatusKey && !hasNoteKey && !hasGovernanceOutcomeKey) {
    return NextResponse.json(
      { error: "Provide triageStatus, triageNote, and/or triageGovernanceOutcome." },
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
    triageGovernanceOutcome?: CorrectionGovernanceOutcome | null;
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
  if (hasGovernanceOutcomeKey) {
    if (
      body.triageGovernanceOutcome !== null &&
      body.triageGovernanceOutcome !== undefined &&
      (typeof body.triageGovernanceOutcome !== "string" ||
        !VALID_GOVERNANCE_OUTCOMES.includes(body.triageGovernanceOutcome as CorrectionGovernanceOutcome))
    ) {
      return NextResponse.json(
        {
          error:
            "triageGovernanceOutcome must be requires_claim_review, claim_unchanged, claim_corrected, claim_restricted, claim_withdrawn, or null.",
        },
        { status: 400 }
      );
    }
    patch.triageGovernanceOutcome =
      body.triageGovernanceOutcome === undefined
        ? undefined
        : (body.triageGovernanceOutcome as CorrectionGovernanceOutcome | null);
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
    return NextResponse.json(
      { error: "Patch must include at least one actual change." },
      { status: 400 }
    );
  }

  const reviewer = getReviewerIdentity();
  const ok = patchCorrectionSubmission(id, {
    ...patch,
    reviewerId: reviewer.reviewerId,
    reviewerLabel: reviewer.reviewerLabel,
  });
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
    triageGovernanceOutcome: updated.triageGovernanceOutcome ?? null,
    triageUpdatedAt: updated.triageUpdatedAt,
  });
}
