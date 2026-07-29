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
          <header className="eeo-section eeo-glass-card eeo-surface-elevated space-y-6 border-[color:var(--eeo-border)] p-8 shadow-md md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--eeo-muted)]">Public Observatory</p>
            <h1 className="eeo-hero-title max-w-3xl font-serif font-semibold tracking-tight text-[color:var(--eeo-ink)]">
              A public view of Earth&apos;s endowments, human dependency, and value movement.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-[color:var(--eeo-text)] md:text-[1.0625rem] md:leading-8">
              Start with a critical mineral corridor and see how available evidence connects natural endowment, human dependency, governance, labor, trade, ecological pressure, public revenue, and value-capture questions through a transparent public record.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/corridors/copper-cobalt"
                className="rounded-full bg-[color:var(--eeo-primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--eeo-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2"
              >
                Explore Copper-Cobalt Corridor
              </Link>
              <Link
                href="/evidence-ledger"
                className="rounded-full border border-[color:var(--eeo-primary)] px-6 py-3 text-sm font-semibold text-[color:var(--eeo-primary)] transition hover:bg-[color:var(--eeo-green-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2"
              >
                Inspect Evidence Ledger
              </Link>
            </div>
            <div className="eeo-prose-tight rounded-2xl border border-[color:var(--eeo-border)] bg-white/60 px-4 py-4 text-sm leading-relaxed text-[color:var(--eeo-muted)] md:px-5">
              <p className="font-medium text-[color:var(--eeo-text)]">
                Public Evidence Observatory · Some records may be synthetic or demonstration-only. No public data release is implied unless a signed release manifest is present.
              </p>
              <p className="mt-2 border-t border-[color:var(--eeo-border)] pt-2 font-medium text-[color:var(--eeo-text)]">
                A public observatory for natural endowments, human dependency, stewardship, and accountability.
              </p>
              <p className="mt-2">
                The Observatory helps users see how natural endowments support life, who depends on them, how they become economic value, who governs them, who transforms them, who benefits, who bears risk, and what remains uncertain.
              </p>
              <p className="font-medium text-[color:var(--eeo-text)]">
                The Observatory articulates stewardship and governance questions—it does not assert authority over land, communities, sovereign institutions, firms, or title.
              </p>
            </div>
          </header>

          <section className="eeo-section space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-[color:var(--eeo-ink)] md:text-2xl">Example evidence claim</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[color:var(--eeo-text)] md:text-[0.9375rem] md:leading-7">
              Public production and trade data can show cobalt production and export patterns, but they do not by themselves establish that a specific downstream product contains cobalt from a specific mine.
            </p>
            <ClaimCard claim={sampleClaim} correctionSummary={sampleClaimCorrectionSummary} />
          </section>

          <CorridorChain />

          <section className="eeo-section eeo-glass-card eeo-surface-elevated space-y-5 border-[color:var(--eeo-border)] p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--eeo-muted)]">How to read this profile</p>
            <h2 className="text-xl font-semibold tracking-tight text-[color:var(--eeo-ink)] md:text-2xl">Evidence for inquiry, not a verdict.</h2>
            <p className="leading-relaxed text-[color:var(--eeo-text)]">
              The Observatory makes public evidence easier to inspect while preserving uncertainty, disagreement, and disclosure limits.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Use for public inquiry",
                "Do not use as a verdict",
                "Inspect the evidence",
                "Challenge the record",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[color:var(--eeo-border)] bg-white/75 px-4 py-3 text-sm text-[color:var(--eeo-text)] shadow-[0_1px_0_rgba(19,66,74,0.04)]"
                >
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
