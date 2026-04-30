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
    <main className="relative flex min-h-0 min-w-0 flex-1 flex-col text-[color:var(--eeo-text)]">
      <div className="relative flex min-h-0 flex-1 flex-col py-10 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] md:py-14">
        <div className="eeo-page-gutter-x mx-auto flex w-full max-w-6xl min-w-0 flex-1 flex-col gap-10 lg:gap-14">
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
                Pilot preview · Demonstration data may be used for interface review. Not a public data release.
              </p>
              <p className="mt-2 border-t border-[color:var(--eeo-border)] pt-2 font-medium text-[color:var(--eeo-text)]">
                A public observatory for natural wealth, stewardship, and accountability.
              </p>
              <p className="mt-2">
                The Observatory helps users see how natural endowment becomes economic value: who governs it, who transforms it, who benefits, who bears risk, and what remains uncertain.
              </p>
              <p className="font-medium text-[color:var(--eeo-text)]">
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

          <section className="eeo-glass-card space-y-5 border-[color:var(--eeo-border)] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--eeo-muted)]">How to read this profile</p>
            <h2 className="text-2xl font-semibold text-[color:var(--eeo-ink)]">Evidence for inquiry, not a verdict.</h2>
            <p className="leading-relaxed text-[color:var(--eeo-text)]">
              The Observatory makes public evidence easier to inspect while preserving uncertainty, disagreement, and disclosure limits.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Use for public inquiry",
                "Do not use as a verdict",
                "Inspect the evidence",
                "Challenge the record",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[color:var(--eeo-border)] bg-white/75 px-4 py-3 text-sm text-[color:var(--eeo-text)]">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
