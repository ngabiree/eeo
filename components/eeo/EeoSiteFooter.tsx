import Link from "next/link";

import EeoLogo from "@/components/eeo/EeoLogo";

const REFERENCE_TAGS = ["UN Comtrade", "USGS", "EITI", "Open Ownership", "ResourceContracts", "Global Forest Watch", "ILOSTAT", "SEEA", "OECD", "IPBES"];

export default function EeoSiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--eeo-border)] bg-[color:var(--eeo-water)]/65 px-4 py-10 text-[color:var(--eeo-text)] md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-xl items-start gap-4">
            <EeoLogo decorative size="sm" />
            <div>
              <div className="font-serif text-lg font-semibold text-[color:var(--eeo-ink)]">
                Earth Endowment Observatory
              </div>
              <p className="mt-2 max-w-prose leading-7">
                A public observatory for natural wealth, stewardship, and accountability.
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.85)] px-5 py-4 text-sm leading-6 text-[color:var(--eeo-muted)] shadow-sm backdrop-blur">
            EEO content is informational and does not constitute legal, financial, investment, certification, or traceability advice.
          </div>
        </div>

        <div className="rounded-3xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.78)] px-5 py-4 shadow-sm backdrop-blur">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--eeo-muted)]">
            Reference Standards &amp; Data Systems
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--eeo-muted)]">
            Used for citation, interoperability, or methodological alignment — not endorsement.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {REFERENCE_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[color:var(--eeo-border)] bg-white/70 px-2.5 py-1 text-xs text-[color:var(--eeo-text)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[color:var(--eeo-border)] pt-6 text-sm text-[color:var(--eeo-muted)] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4">
          <p className="max-w-prose leading-relaxed">
            Make the chain visible. Keep the record accountable. Protect what exposure could harm.
          </p>
          <Link href="/pilot/evidence-dossier" className="font-medium underline decoration-[color:var(--eeo-primary)] underline-offset-2 hover:text-[color:var(--eeo-primaryDark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] rounded">
            Evidence dossier
          </Link>
        </div>
      </div>
    </footer>
  );
}
