"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import EeoLogo from "@/components/eeo/EeoLogo";

const PRIMARY_NAV = [
  { href: "/", label: "Observatory" },
  { href: "/pilot/corridor", label: "First Corridor" },
  { href: "/pilot/evidence-ledger", label: "Evidence Ledger" },
  { href: "/pilot/methods-and-limits", label: "Methods" },
  { href: "/pilot/safeguards", label: "Safeguards" },
  { href: "/pilot/corrections", label: "Corrections" },
] as const;

export default function EeoSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.88)] backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 max-w-2xl items-start gap-3 rounded-xl outline-none ring-offset-2 transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)]"
            onClick={() => setMenuOpen(false)}
          >
            <EeoLogo decorative priority size="sm" className="shrink-0" />
            <span className="min-w-0 space-y-0.5 text-left">
              <span className="block font-serif text-lg font-semibold leading-snug tracking-tight text-[color:var(--eeo-ink)]">
                Earth Endowment Observatory
              </span>
              <span className="block text-sm text-[color:var(--eeo-muted)]">From Earth to economy, made visible.</span>
              <span className="block text-xs leading-relaxed text-[color:var(--eeo-muted)]">
                A public observatory for natural wealth, stewardship, and accountability.
              </span>
            </span>
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="eeo-primary-nav"
            className="rounded-full border border-[color:var(--eeo-border)] bg-white/80 px-3 py-2 text-sm font-medium text-[color:var(--eeo-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            Menu
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--eeo-border)] pt-3">
          <nav
            id="eeo-primary-nav"
            aria-label="Primary navigation"
            className={`${menuOpen ? "flex" : "hidden"} w-full flex-col gap-2 md:flex md:w-auto md:flex-row md:flex-wrap md:items-center`}
          >
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-[color:var(--eeo-border)] bg-white/70 px-3 py-1.5 text-sm font-medium text-[color:var(--eeo-text)] shadow-sm hover:border-[color:var(--eeo-primary)] hover:text-[color:var(--eeo-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
            <span className="rounded-full border border-[color:var(--eeo-border)] bg-[color:var(--eeo-green-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--eeo-green-dark)]">
              Pilot Preview
            </span>
            <Link
              href="/pilot/corridor"
              className="rounded-full bg-[color:var(--eeo-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--eeo-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2"
            >
              Explore First Corridor
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
