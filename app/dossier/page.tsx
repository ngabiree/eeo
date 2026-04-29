import Link from "next/link";

import ClaimCard from "@/components/eeo/ClaimCard";
import CorridorChain from "@/components/eeo/CorridorChain";
import OwnershipControlNotice from "@/components/eeo/OwnershipControlNotice";
import ReleaseManifestPanel from "@/components/eeo/ReleaseManifest";
import { claims } from "@/data/claims";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";

export default function DossierPage() {
  const corrections = listCorrectionSubmissions();
  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <header className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Public Evidence Prototype: Copper-Cobalt Corridor</h1>
          <p className="mt-3 leading-7 text-stone-700">
            This prototype tests whether public claims about a critical-minerals corridor can be made traceable,
            qualified, reviewable, and correctable without overclaiming, exposing sensitive data, or collapsing legal
            distinctions.
          </p>
        </header>

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
          <Link href="/corrections" className="underline">
            Open correction route
          </Link>
        </div>
      </div>
    </main>
  );
}
