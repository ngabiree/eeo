import Link from "next/link";

import ClaimCard from "@/components/eeo/ClaimCard";
import CorridorChain from "@/components/eeo/CorridorChain";
import OwnershipControlNotice from "@/components/eeo/OwnershipControlNotice";
import PilotRouteNav from "@/components/eeo/PilotRouteNav";
import ReleaseManifestPanel from "@/components/eeo/ReleaseManifest";
import { claims } from "@/data/claims";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";

export default function PilotEvidenceDossierPage() {
  const corrections = listCorrectionSubmissions();
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
          <h2 className="text-2xl font-semibold">Claim cards</h2>
          {claims.map((claim) => (
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
