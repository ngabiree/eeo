import Link from "next/link";

import ClaimCard from "@/components/eeo/ClaimCard";
import CorridorChain from "@/components/eeo/CorridorChain";
import OwnershipControlNotice from "@/components/eeo/OwnershipControlNotice";
import PilotRouteNav from "@/components/eeo/PilotRouteNav";
import ReleaseManifestPanel from "@/components/eeo/ReleaseManifest";
import { claims } from "@/data/claims";
import { copperCobaltCorridorPilotSkeleton } from "@/data/corridorDossier";
import { releaseManifest } from "@/data/releaseManifest";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";

export default function PilotEvidenceDossierPage() {
  const dossier = copperCobaltCorridorPilotSkeleton;
  const corrections = listCorrectionSubmissions();
  const releasedClaims = claims.filter((claim) => releaseManifest.includedClaimIds.includes(claim.id));
  const nonManifestClaims = claims.filter((claim) => !releaseManifest.includedClaimIds.includes(claim.id));
  const governanceSummaries = claims.map((claim) => getClaimCorrectionSummary(claim.id, corrections));
  const challengedOrUnderReview = governanceSummaries.filter(
    (summary) => summary.governanceStatus === "challenged" || summary.governanceStatus === "under_review"
  );
  const corrected = governanceSummaries.filter((summary) => summary.governanceStatus === "corrected");
  const restricted = governanceSummaries.filter((summary) => summary.governanceStatus === "restricted");
  const withdrawn = governanceSummaries.filter((summary) => summary.governanceStatus === "withdrawn");

  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <header className="eeo-glass-card border-[color:var(--eeo-border)] p-6 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--eeo-ink)]">Copper–Cobalt corridor evidence dossier</h1>
          <p className="mt-3 leading-7 text-[color:var(--eeo-text)]">
            This dossier frames public claims about a critical-minerals corridor so they stay traceable, qualified, reviewable, and correctable—without overclaiming, exposing sensitive data, or collapsing
            legal distinctions.
          </p>
        </header>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Claim governance states in this release</h2>
          <div className="mt-3 grid gap-2 text-sm text-stone-700 md:grid-cols-2">
            <p>
              <strong>Challenged / under review:</strong>{" "}
              {challengedOrUnderReview.map((summary) => summary.claimId).join(", ") || "None"}
            </p>
            <p>
              <strong>Corrected:</strong> {corrected.map((summary) => summary.claimId).join(", ") || "None"}
            </p>
            <p>
              <strong>Restricted:</strong> {restricted.map((summary) => summary.claimId).join(", ") || "None"}
            </p>
            <p>
              <strong>Withdrawn:</strong> {withdrawn.map((summary) => summary.claimId).join(", ") || "None"}
            </p>
          </div>
          <p className="mt-2 text-xs text-stone-600">
            Governance states summarize correction-linked review outcomes and publication posture; they are not legal
            determinations.
          </p>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Corridor dossier sections</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-700">
              These sections document available evidence, public-safe limits, deferred questions, and safeguard posture. They do not make legal findings, approve publication, or establish chain-of-custody.
            </p>
          </div>
          <div className="grid gap-4">
            {dossier.sections.map((section) => {
              const evidenceLayer =
                section.linkedEvidenceIds.length > 0
                  ? `${section.linkedEvidenceIds.length} evidence reference${section.linkedEvidenceIds.length === 1 ? "" : "s"}`
                  : "evidence linkage deferred";
              const claimLayer =
                section.linkedClaimIds.length > 0
                  ? `${section.linkedClaimIds.length} claim link${section.linkedClaimIds.length === 1 ? "" : "s"}`
                  : "no public claim link";
              const sourceLayer =
                section.sourceIds.length > 0
                  ? `${section.sourceIds.length} source or source-map reference${section.sourceIds.length === 1 ? "" : "s"}`
                  : "source posture deferred";

              return (
                <article key={section.id} className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-950">{section.title}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.08em] text-stone-500">
                        {section.status.replaceAll("_", " ")}
                      </p>
                    </div>
                    <p className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-600">
                      {claimLayer} · {evidenceLayer}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{section.summary}</p>
                  <p className="mt-3 text-xs text-stone-600">
                    <strong>Evidence layer:</strong> {sourceLayer}. Trade data is contextual, not chain-of-custody proof. Public revenue is a question, not proof of public benefit.
                  </p>
                  {section.publicLimitations.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-5 text-stone-600">
                      {section.publicLimitations.map((limitation) => (
                        <li key={limitation}>{limitation}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Released claim cards</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-700">
              Full public claim cards are shown only for claims included in the current release manifest.
              Other corridor claims remain visible as review-scope records below until release review,
              exposure review, and right-of-reply discipline are satisfied where applicable.
            </p>
          </div>
          {releasedClaims.map((claim) => (
            <ClaimCard
              key={claim.id}
              claim={claim}
              correctionSummary={getClaimCorrectionSummary(claim.id, corrections)}
            />
          ))}
        </section>

        {nonManifestClaims.length > 0 ? (
          <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-amber-950">Claims not in the current release manifest</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-amber-900">
              These claim records help track dossier development, but they are not part of the current public
              release. They should not be treated as released findings or quoted without completing the release
              checklist.
            </p>
            <div className="mt-4 grid gap-3">
              {nonManifestClaims.map((claim) => (
                <article key={claim.id} className="rounded-2xl border border-amber-200 bg-white/70 p-4 text-sm text-amber-950">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-amber-800">{claim.id}</p>
                      <h3 className="mt-1 font-semibold">{claim.title}</h3>
                    </div>
                    <p className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs">
                      {claim.reviewStatus.replaceAll("_", " ")}
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-5">
                    Release posture: not included in {releaseManifest.id}. Publication decision:{" "}
                    {claim.publicationDecision.replaceAll("_", " ")}. Right of reply:{" "}
                    {claim.rightOfReplyStatus.replaceAll("_", " ")}.
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <OwnershipControlNotice />
        <CorridorChain />
        <ReleaseManifestPanel />

        <div className="text-sm">
          <Link href="/pilot/corrections" className="underline">
            Open correction route
          </Link>
        </div>
      </div>
    </main>
  );
}
