import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CorrectionTriageActions from "@/components/eeo/CorrectionTriageActions";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";
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
  actor: string;
}): string {
  const at = new Date(activity.createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (activity.type === "triage_status_changed") {
    return `${at} — Status changed from ${activity.fromStatus ?? "unknown"} to ${activity.toStatus ?? "unknown"}`;
  }
  if (activity.type === "triage_note_added") {
    return `${at} — Reviewer note added`;
  }
  if (activity.type === "triage_note_updated") {
    return `${at} — Reviewer note updated`;
  }
  if (activity.type === "submitted") {
    return `${at} — Submitted by public user`;
  }
  return `${at} — ${activity.type.replace(/_/g, " ")} (${activity.actor.replace(/_/g, " ")})`;
}

export default async function ReviewPage() {
  const cookieStore = await cookies();
  if (!isReviewAuthorizedFromCookies(cookieStore)) {
    redirect("/review/login");
  }

  const submissions = listCorrectionSubmissions();

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

        <section className="space-y-4 rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Correction intake queue</h2>
          <p className="text-sm leading-6 text-stone-600">
            Prototype triage view for correction requests submitted through the public correction route.
          </p>

          {submissions.length === 0 ? (
            <p className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600">
              No correction submissions received in this runtime session.
            </p>
          ) : (
            <div className="space-y-3">
              {submissions.map((submission) => (
                <article key={submission.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
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
                    <p><strong>Category:</strong> {submission.category}</p>
                    <p><strong>Claim:</strong> {submission.claimId || "Not specified"}</p>
                    <p><strong>Submitted by:</strong> {submission.name}</p>
                    <p><strong>Contact:</strong> {maskEmail(submission.email)}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    <strong>Details:</strong> {submission.details}
                  </p>
                  <CorrectionTriageActions
                    submissionId={submission.id}
                    currentStatus={submission.triageStatus}
                    initialNote={submission.triageNote}
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
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
