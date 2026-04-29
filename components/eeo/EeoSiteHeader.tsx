import Link from "next/link";

import EeoLogo from "@/components/eeo/EeoLogo";

const NAV: { href: string; label: string }[] = [
  { href: "/pilot/corridor", label: "Corridors" },
  { href: "/pilot/evidence-ledger", label: "Evidence Ledger" },
  { href: "/pilot/methods-and-limits", label: "Methods" },
  { href: "/pilot/safeguards", label: "Safeguards" },
  { href: "/pilot/corrections", label: "Corrections" },
];

export default function EeoSiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.88)] backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex max-w-xl items-start gap-3 rounded-xl outline-none ring-offset-2 transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)]"
        >
          <EeoLogo decorative priority size="sm" className="shrink-0" />
          <span className="min-w-0 text-left">
            <span className="block font-serif text-lg font-semibold leading-snug tracking-tight text-[color:var(--eeo-ink)]">
              Earth Endowment Observatory
            </span>
            <span className="mt-0.5 block text-sm text-[color:var(--eeo-muted)]">
              From Earth to economy, made visible.
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 md:justify-end">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-[color:var(--eeo-border)] bg-white/70 px-3 py-1.5 text-sm font-medium text-[color:var(--eeo-text)] shadow-sm hover:border-[color:var(--eeo-primary)] hover:text-[color:var(--eeo-primaryDark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
