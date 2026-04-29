import Link from "next/link";

import ClaimCard from "@/components/eeo/ClaimCard";
import CorridorChain from "@/components/eeo/CorridorChain";
import { sampleClaim } from "@/data/claims";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";

export default function HomePage() {
  const corrections = listCorrectionSubmissions();
  const sampleClaimCorrectionSummary = getClaimCorrectionSummary(sampleClaim.id, corrections);
  return (
    <main className="relative flex flex-1 flex-col text-[color:var(--eeo-text)]">
      <div className="relative flex flex-1 flex-col py-10 md:py-14">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 md:px-6 lg:gap-14">
          <header className="eeo-glass-card space-y-5 border-[color:var(--eeo-border)] p-8 shadow-md md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--eeo-muted)]">Public Observatory</p>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[color:var(--eeo-ink)] md:text-5xl">
              A public view of Earth&apos;s endowment-to-economy chain.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-[color:var(--eeo-text)]">
              Explore how a critical mineral corridor connects natural endowment, governance, labor, trade, ecological pressure, public revenue, and value-capture questions through a transparent public record.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/pilot/corridor"
                className="rounded-full bg-[color:var(--eeo-primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--eeo-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2"
              >
                Explore First Corridor
              </Link>
              <Link
                href="/pilot/evidence-ledger"
                className="rounded-full border border-[color:var(--eeo-primary)] px-6 py-3 text-sm font-semibold text-[color:var(--eeo-primary)] transition hover:bg-[color:var(--eeo-green-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2"
              >
                View Evidence Ledger
              </Link>
            </div>
            <div className="rounded-2xl border border-[color:var(--eeo-border)] bg-white/60 px-4 py-4 text-sm leading-relaxed text-[color:var(--eeo-muted)]">
              <p className="font-medium text-[color:var(--eeo-text)]">
                Stewardship-aware publication · Uncertainty-preserving disclosures · Accountability for corrections
              </p>
              <p className="mt-2">
                The Observatory articulates stewardship and governance questions—it does not assert authority over land, communities, sovereign institutions, firms, or title.
              </p>
            </div>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-[color:var(--eeo-ink)]">Illustrative claim</h2>
            <p className="text-sm leading-relaxed text-[color:var(--eeo-text)]">
              Public production and trade data can show cobalt production and export patterns, but they do not by themselves establish that a specific downstream product contains cobalt from a specific mine.
            </p>
            <ClaimCard claim={sampleClaim} correctionSummary={sampleClaimCorrectionSummary} />
          </section>

          <CorridorChain />

          <section className="eeo-glass-card space-y-3 border-[color:var(--eeo-border)] p-6">
            <h2 className="text-xl font-semibold text-[color:var(--eeo-ink)]">Reading the visual language</h2>
            <p className="leading-relaxed text-[color:var(--eeo-text)]">
              Earth, water, forest, and mineral tones support orientation. They are atmosphere only — not findings, rankings, legal conclusions, or corridor metrics. Substantive evidence appears in claim cards,
              ledgers, release notes, and reviewed source documentation.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              <Link href="/pilot/methods-and-limits" className="font-medium underline decoration-[color:var(--eeo-primary)] underline-offset-2">
                Methods
              </Link>
              <Link href="/pilot/safeguards" className="font-medium underline decoration-[color:var(--eeo-primary)] underline-offset-2">
                Safeguards
              </Link>
              <Link href="/pilot/corrections" className="font-medium underline decoration-[color:var(--eeo-primary)] underline-offset-2">
                Corrections
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
