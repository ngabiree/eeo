import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CorrectionTriageActions from "@/components/eeo/CorrectionTriageActions";
import ReviewGovernanceSignoff from "@/components/eeo/ReviewGovernanceSignoff";
import { claims } from "@/data/claims";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";
import { listReleaseGovernanceLogEntries } from "@/lib/releaseGovernanceLogStore";
import { isReviewAuthorizedFromCookies } from "@/lib/reviewAuth";

export const dynamic = "force-dynamic";

function maskEmail(email: string): string {
  const [name = "", domain = ""] = email.split("@");
  if (!name || !domain) return "invalid-email";
  const visible = name.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(2, name.length - 2))}@${domain}`;
}

function formatActivityLine(activity: {
  type: string;
  createdAt: string;
  fromStatus?: string;
  toStatus?: string;
  note?: string;
  actor: string;
  reviewerLabel?: string;
}): string {
  const at = new Date(activity.createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (activity.type === "triage_status_changed") {
    const reviewer = activity.reviewerLabel ? ` by ${activity.reviewerLabel}` : "";
    return `${at} — Status changed from ${activity.fromStatus ?? "unknown"} to ${activity.toStatus ?? "unknown"}${reviewer}`;
  }
  if (activity.type === "triage_note_added") {
    const reviewer = activity.reviewerLabel ? ` by ${activity.reviewerLabel}` : "";
    return `${at} — Reviewer note added${reviewer}`;
  }
  if (activity.type === "triage_note_updated") {
    const reviewer = activity.reviewerLabel ? ` by ${activity.reviewerLabel}` : "";
    return `${at} — Reviewer note updated${reviewer}`;
  }
  if (activity.type === "submitted") {
    return `${at} — Submitted by public user`;
  }
  if (activity.type === "governance_outcome_changed") {
    const reviewer = activity.reviewerLabel ? ` by ${activity.reviewerLabel}` : "";
    const outcome = activity.note ? activity.note.replace(/_/g, " ") : "not set";
    return `${at} — Governance outcome updated to ${outcome}${reviewer}`;
  }
  return `${at} — ${activity.type.replace(/_/g, " ")} (${activity.actor.replace(/_/g, " ")})`;
}

export default async function ReviewPage() {
  const cookieStore = await cookies();
  if (!isReviewAuthorizedFromCookies(cookieStore)) {
    redirect("/review/login");
  }

  const submissions = listCorrectionSubmissions();
  const governanceLog = listReleaseGovernanceLogEntries();
  const claimById = new Map(claims.map((claim) => [claim.id, claim]));

  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Review workspace</h1>
        <p className="leading-7 text-stone-700">
          Internal prototype workspace for method review, exposure review, and release discipline checks before public
          publication.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-stone-700">
          <li>Method review check</li>
          <li>Exposure review check</li>
          <li>Right-of-reply status check</li>
          <li>Release manifest sign-off check</li>
        </ul>
        <Link href="/release" className="text-sm underline">
          Open release manifest
        </Link>
        <ReviewGovernanceSignoff />
        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-950">Release governance review log</h2>
          <p className="mt-1 text-xs text-stone-600">
            Internal sign-off history for claim governance and open correction posture.
          </p>
          {governanceLog.length === 0 ? (
            <p className="mt-3 text-sm text-stone-600">No governance sign-off has been recorded in this runtime session.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              {governanceLog.map((entry) => (
                <li key={entry.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                  <p>
                    <strong>{new Date(entry.createdAt).toLocaleString()}</strong>
                    {entry.reviewerLabel ? ` — ${entry.reviewerLabel}` : ""}
                  </p>
                  <p className="text-xs text-stone-600">
                    challenged: {entry.challengedClaimCount}, corrected: {entry.correctedClaimCount}, restricted:{" "}
                    {entry.restrictedClaimCount}, withdrawn: {entry.withdrawnClaimCount}, open corrections:{" "}
                    {entry.openCorrectionCount}
                  </p>
                  {entry.note ? <p className="mt-1 text-xs text-stone-600">Note: {entry.note}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-4 rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Correction intake queue</h2>
          <p className="text-sm leading-6 text-stone-600">
            Prototype triage view for correction requests submitted through the public correction route.
          </p>
          <p className="text-xs leading-5 text-stone-500">
            This workflow helps EEO review corrections, challenges, source updates, harm-risk concerns, and methodological disputes. It does not adjudicate legal liability.
          </p>

          {submissions.length === 0 ? (
            <p className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600">
              No correction submissions received in this runtime session.
            </p>
          ) : (
            <div className="space-y-3">
              {submissions.map((submission) => (
                <article key={submission.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  {(() => {
                    const linkedClaim = submission.claimId ? claimById.get(submission.claimId) : undefined;
                    const governance = linkedClaim
                      ? getClaimCorrectionSummary(linkedClaim.id, submissions)
                      : undefined;
                    return (
                      <>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-stone-500">
                      {submission.id}
                    </span>
                  </div>
                  <div className="mb-3 text-xs text-stone-500">
                    <p>Submitted {new Date(submission.submittedAt).toLocaleString()}</p>
                    <p>Last triage update {new Date(submission.triageUpdatedAt).toLocaleString()}</p>
                  </div>
                  <div className="grid gap-1 text-sm text-stone-700 md:grid-cols-2">
                    <p><strong>Current status:</strong> {submission.triageStatus.replace(/_/g, " ")}</p>
                    <p><strong>Latest triage note:</strong> {submission.triageNote || "No note added"}</p>
                    <p>
                      <strong>Governance outcome:</strong>{" "}
                      {submission.triageGovernanceOutcome
                        ? submission.triageGovernanceOutcome.replace(/_/g, " ")
                        : "Not set"}
                    </p>
                    <p><strong>Category:</strong> {submission.category}</p>
                    <p><strong>Claim:</strong> {submission.claimId || "No linked claim"}</p>
                    {submission.claimReference ? (
                      <p><strong>Claim reference:</strong> {submission.claimReference}</p>
                    ) : (
                      <p><strong>Claim reference:</strong> Not provided</p>
                    )}
                    <p><strong>Submitted by:</strong> {submission.name}</p>
                    <p><strong>Contact:</strong> {maskEmail(submission.email)}</p>
                    <p><strong>Claim title:</strong> {linkedClaim?.title ?? "No linked claim title"}</p>
                    <p><strong>Claim review status:</strong> {linkedClaim?.reviewStatus ?? "Not linked"}</p>
                    <p><strong>Publication decision:</strong> {linkedClaim?.publicationDecision ?? "Not linked"}</p>
                    <p>
                      <strong>Claim governance status:</strong>{" "}
                      {governance ? governance.governanceStatus.replace(/_/g, " ") : "Not linked"}
                    </p>
                  </div>
                  {submission.claimId ? (
                    <p className="mt-2 text-xs text-stone-500">
                      <Link className="underline" href="/dossier">
                        Open dossier claims
                      </Link>
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    <strong>Details:</strong> {submission.details}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-stone-600">
                    <li>This correction may require claim review.</li>
                    <li>This correction may require evidence update.</li>
                    <li>This correction may require release manifest update.</li>
                    <li>This correction may require harm-risk restriction.</li>
                  </ul>
                  <CorrectionTriageActions
                    submissionId={submission.id}
                    currentStatus={submission.triageStatus}
                    initialNote={submission.triageNote}
                    initialGovernanceOutcome={submission.triageGovernanceOutcome}
                  />
                  <div className="mt-3 rounded-2xl border border-stone-200 bg-white p-3">
                    <h3 className="text-sm font-semibold text-stone-900">Activity history</h3>
                    <ul className="mt-2 space-y-1 text-xs text-stone-600">
                      {submission.activities.length === 0 ? (
                        <li>No activity recorded.</li>
                      ) : (
                        [...submission.activities]
                          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                          .map((activity) => (
                            <li key={activity.id}>{formatActivityLine(activity)}</li>
                          ))
                      )}
                    </ul>
                  </div>
                      </>
                    );
                  })()}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
