import Link from "next/link";

import EeoLogo from "@/components/eeo/EeoLogo";
import ClaimCard from "@/components/eeo/ClaimCard";
import CorridorChain from "@/components/eeo/CorridorChain";
import { sampleClaim } from "@/data/claims";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";

export default function HomePage() {
  const corrections = listCorrectionSubmissions();
  const sampleClaimCorrectionSummary = getClaimCorrectionSummary(sampleClaim.id, corrections);
  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 md:px-6">
        <header className="space-y-4 rounded-3xl border border-stone-200 bg-white/80 p-8 shadow-sm">
          <div className="flex flex-wrap items-start gap-4">
            <EeoLogo priority className="-mt-0.5 self-start" />
            <div className="min-w-0 flex-1 space-y-4">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500">
                Public Evidence Prototype: Copper-Cobalt Corridor
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                See the source. Follow the value. Know the evidence.
              </h1>
              <p className="max-w-4xl leading-7 text-stone-700">
                The Earth Endowment Observatory is a governed civic intelligence system for tracing how natural endowments
                enter economic life. It connects claims about resources, governance, ownership, labor, trade, ecological
                condition, public revenue, and value capture—while distinguishing what is known, unknown, disputed,
                restricted, and unsafe to publish.
              </p>
              <p className="text-sm font-medium text-stone-700">
                Prototype scope: one copper-cobalt corridor, one evidence standard, one public release gate.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/pilot" className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800">
                  Open Pilot Overview
                </Link>
                <Link href="/pilot/evidence-dossier" className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white">
                  View Pilot Dossier
                </Link>
                <Link
                  href="/pilot/evidence-ledger"
                  className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800"
                >
                  Inspect Evidence Ledger
                </Link>
              </div>
              <p className="text-sm leading-6 text-stone-600">
                The Observatory does not claim authority over land, resources, communities, states, or firms. Its role is
                narrower and stricter: to make public claims about endowment-to-economy systems traceable, qualified,
                reviewable, and correctable.
              </p>
              <p className="text-sm font-semibold text-stone-800">
                Reveal systems. Protect peoples. Trace value. Respect sovereignty. Publish with evidence. Scale only after
                trust.
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Example claim</h2>
          <p className="text-sm leading-6 text-stone-700">
            Example claim: Public production and trade data can show cobalt production and export patterns, but they do
            not by themselves prove that a specific battery, vehicle, or consumer product contains cobalt from a
            specific mine.
          </p>
          <ClaimCard claim={sampleClaim} correctionSummary={sampleClaimCorrectionSummary} />
        </section>

        <CorridorChain />

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Evidence-first visual system</h2>
          <p className="mt-2 leading-7 text-stone-700">
            The visual atmosphere uses earth, water, forest, and gold tones to express the Observatory&apos;s public purpose.
            These visual signals are illustrative. They are not findings, scores, rankings, legal conclusions, or measured corridor indicators.
            Public evidence appears only in claim cards, evidence records, release manifests, and reviewed source notes.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/pilot/methods-and-limits" className="underline">
              Methods and limits
            </Link>
            <Link href="/pilot/safeguards" className="underline">
              Safeguards
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
