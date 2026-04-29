import { NextResponse } from "next/server";
import {
  addCorrectionSubmission,
  isCorrectionCategory,
  type CorrectionSubmission,
} from "@/lib/correctionsStore";

const MAX_NAME = 300;
const MAX_EMAIL = 320;
const MAX_DETAILS = 20_000;
const MAX_CLAIM_ID = 128;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Partial<CorrectionSubmission>;
  try {
    body = (await request.json()) as Partial<CorrectionSubmission>;
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const emailRaw = body.email?.trim() ?? "";
  const details = body.details?.trim() ?? "";
  const category = body.category;
  const email = emailRaw.slice(0, MAX_EMAIL);

  if (!name || !email || !details || !isCorrectionCategory(category)) {
    return NextResponse.json(
      { error: "name, a valid email, a known category, and details are required." },
      { status: 400 }
    );
  }

  if (name.length > MAX_NAME || details.length > MAX_DETAILS) {
    return NextResponse.json({ error: "Name or details exceed allowed length." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid contact email is required." }, { status: 400 });
  }

  const claimIdRaw = body.claimId?.trim();
  if (claimIdRaw && claimIdRaw.length > MAX_CLAIM_ID) {
    return NextResponse.json({ error: "claimId is too long." }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const submissionId = `CORR-${Date.now().toString(36).toUpperCase()}`;
  const activityId = `ACT-${Date.now().toString(36).toUpperCase()}-SUB`;

  const submission: CorrectionSubmission = {
    id: submissionId,
    submittedAt,
    name,
    email,
    category,
    claimId: claimIdRaw || undefined,
    details,
    triageStatus: "queued",
    triageUpdatedAt: submittedAt,
    activities: [
      {
        id: activityId,
        correctionId: submissionId,
        type: "submitted",
        actor: "public_submitter",
        createdAt: submittedAt,
      },
    ],
  };

  addCorrectionSubmission(submission);

  return NextResponse.json({
    id: submission.id,
    submittedAt: submission.submittedAt,
    message: "Correction request received for triage.",
  });
}
