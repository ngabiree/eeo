import { claims } from "@/data/claims";
import { evidenceItems } from "@/data/evidence";
import { releaseManifest } from "@/data/releaseManifest";
import { copperCobaltPilotSourceMap } from "@/data/sourceMap";
import { sources } from "@/data/sources";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";
import { assessDossierClaimReadiness } from "@/lib/dossierClaimReadiness";

function statusClass(status: "ready" | "needs_review" | "blocked"): string {
  if (status === "ready") {
    return "border-emerald-200 bg-emerald-50 text-emerald-950";
  }

  if (status === "needs_review") {
    return "border-amber-200 bg-amber-50 text-amber-950";
  }

  return "border-red-200 bg-red-50 text-red-950";
}

function formatToken(value: string): string {
  return value.replaceAll("_", " ");
}

export default function DossierReadinessPanel() {
  const corrections = listCorrectionSubmissions();
  const assessment = assessDossierClaimReadiness({
    claims,
    evidenceItems,
    sources,
    sourceMap: copperCobaltPilotSourceMap,
    releaseManifest,
    corrections,
  });

  const hasBlockers = assessment.blockedClaimCount > 0;
  const hasReviewItems = assessment.needsReviewClaimCount > 0;

  return (
    <section
      className={
        hasBlockers
          ? "rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-950"
          : hasReviewItems
            ? "rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950"
            : "rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-950"
      }
    >
      <p className="font-semibold">
        Dossier claim-readiness pass:{" "}
        {hasBlockers ? "Blocked" : hasReviewItems ? "Review required" : "Pass"}
      </p>
      <p className="mt-2 text-xs leading-5">{assessment.publicSafeSummary}</p>

      <div className="mt-4 grid gap-2 text-xs sm:grid-cols-4">
        <p>
          <strong>Total claims:</strong> {assessment.totalClaims}
        </p>
        <p>
          <strong>Ready:</strong> {assessment.readyClaimCount}
        </p>
        <p>
          <strong>Needs review:</strong> {assessment.needsReviewClaimCount}
        </p>
        <p>
          <strong>Blocked:</strong> {assessment.blockedClaimCount}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {assessment.rows.map((row) => (
          <article
            key={row.claimId}
            className={`rounded-2xl border p-4 ${statusClass(row.status)}`}
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                  {row.claimId}
                </p>
                <h3 className="mt-1 font-semibold">{row.title}</h3>
              </div>
              <p className="rounded-full border border-current/30 px-3 py-1 text-xs font-medium capitalize">
                {formatToken(row.status)}
              </p>
            </div>

            <div className="mt-3 grid gap-2 text-xs md:grid-cols-4">
              <p>
                <strong>Manifest:</strong> {formatToken(row.releaseManifestDisposition)}
              </p>
              <p>
                <strong>Evidence:</strong> {row.evidenceCount}
              </p>
              <p>
                <strong>Sources:</strong> {row.sourceCount}
              </p>
              <p>
                <strong>Source limits:</strong> {row.sourceLimitationCount}
              </p>
              <p>
                <strong>Review:</strong> {formatToken(row.reviewStatus)}
              </p>
              <p>
                <strong>Confidence:</strong> {formatToken(row.confidence)}
              </p>
              <p>
                <strong>Exposure:</strong> {formatToken(row.exposureRisk)}
              </p>
              <p>
                <strong>Right of reply:</strong> {formatToken(row.rightOfReplyStatus)}
              </p>
            </div>

            {row.issues.length > 0 ? (
              <ul className="mt-3 space-y-1 rounded-2xl border border-current/20 bg-white/65 p-3 text-xs">
                {row.issues.map((issue) => (
                  <li key={`${row.claimId}-${issue.type}`}>
                    <strong className="capitalize">{issue.severity}:</strong>{" "}
                    {formatToken(issue.type)} — {issue.publicSafeSummary}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 rounded-2xl border border-current/20 bg-white/65 p-3 text-xs">
                No structural dossier-readiness issues detected for this claim.
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
