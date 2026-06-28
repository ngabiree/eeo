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
  const releasedClaimIds = new Set(releaseManifest.includedClaimIds);
  const withheldClaimIds = new Set(releaseManifest.withheldClaimIds);
  const releasedClaims = claims.filter((claim) => releasedClaimIds.has(claim.id));
  const contextualClaims = claims.filter(
    (claim) => !releasedClaimIds.has(claim.id) && !withheldClaimIds.has(claim.id)
  );
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
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500">Release claim status</p>
          <h2 className="mt-2 text-xl font-semibold text-stone-950">What is released in this manifest</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-700">
            Only claims listed in the release manifest as included claims are treated as released claims for this dossier version.
            Other visible claim cards are contextual or under review: they help show evidence boundaries, source limits, and review posture,
            but they are not presented as released findings or legal determinations.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-stone-700 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
              <p className="font-semibold">Released claims</p>
              <p className="mt-1 text-xs leading-5">{releasedClaims.map((claim) => claim.id).join(", ") || "None"}</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
              <p className="font-semibold">Contextual / under review</p>
              <p className="mt-1 text-xs leading-5">{contextualClaims.map((claim) => claim.id).join(", ") || "None"}</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-stone-700">
              <p className="font-semibold">Withheld claims</p>
              <p className="mt-1 text-xs leading-5">{releaseManifest.withheldClaimIds.join(", ") || "None"}</p>
            </div>
          </div>
        </section>

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
              These claims are included in the current release manifest. They remain qualified by their source limits,
              non-proof language, correction route, and release posture.
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

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Contextual and under-review claim cards</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-700">
              These cards remain visible to document evidence boundaries and review posture, but they are not included as released claims in this manifest.
            </p>
          </div>
          {contextualClaims.map((claim) => (
            <ClaimCard
              key={claim.id}
              claim={claim}
              correctionSummary={getClaimCorrectionSummary(claim.id, corrections)}
            />
          ))}
        </section>

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
