"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import EeoLogo from "@/components/eeo/EeoLogo";
import { PILOT_PUBLIC_NAV } from "@/lib/pilotPublicNav";

export default function EeoSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (menuOpen) document.documentElement.classList.add("eeo-nav-open");
    else document.documentElement.classList.remove("eeo-nav-open");
    return () => document.documentElement.classList.remove("eeo-nav-open");
  }, [menuOpen]);

  const linkClass =
    "flex min-h-11 w-full items-center justify-center rounded-full border border-[color:var(--eeo-border)] bg-white/70 px-4 py-2 text-sm font-medium text-[color:var(--eeo-text)] shadow-sm transition hover:border-[color:var(--eeo-primary)] hover:text-[color:var(--eeo-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2 md:min-h-0 md:w-auto md:justify-start md:px-3 md:py-1.5";

  return (
    <>
      {/* Mobile overlay — prevents stray taps behind expanded nav */}
      <button
        type="button"
        aria-hidden={!menuOpen}
        tabIndex={-1}
        className={`fixed inset-0 z-40 bg-[color:var(--eeo-ink)]/15 backdrop-blur-[2px] transition-opacity duration-200 ease-out md:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMenuOpen(false)}
      />

      <header className="sticky top-0 z-50 border-b border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.88)] shadow-[0_1px_0_rgba(19,66,74,0.06)] backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-[rgba(255,255,255,0.78)]">
        <div className="eeo-page-gutter-x eeo-pt-safe-header mx-auto flex max-w-7xl flex-col gap-4 pb-4">
          <div className="flex items-start justify-between gap-3">
            <Link
              href="/"
              className="flex min-w-0 max-w-[min(100%,36rem)] items-start gap-2.5 rounded-xl outline-none ring-offset-2 transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] sm:gap-3 sm:max-w-2xl"
              onClick={() => setMenuOpen(false)}
            >
              <EeoLogo decorative priority size="sm" className="shrink-0" />
              <span className="min-w-0 space-y-0.5 text-left">
                <span className="block font-serif text-base font-semibold leading-snug tracking-tight text-[color:var(--eeo-ink)] sm:text-lg">
                  Earth Endowment Observatory
                </span>
                <span className="block text-xs font-medium text-[color:var(--eeo-muted)] sm:text-sm">From Earth to economy, made visible.</span>
                <span className="hidden text-xs leading-relaxed text-[color:var(--eeo-muted)] lg:block">
                  A public observatory for natural wealth, stewardship, and accountability.
                </span>
              </span>
            </Link>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="eeo-primary-nav"
              className="min-h-11 min-w-11 shrink-0 rounded-full border border-[color:var(--eeo-border)] bg-white/85 px-3 text-sm font-semibold text-[color:var(--eeo-text)] shadow-sm transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>

          <div
            className={`flex flex-col gap-3 border-t border-[color:var(--eeo-border)] pt-3 md:flex-row md:flex-wrap md:items-center md:justify-between ${
              menuOpen
                ? "rounded-2xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.72)] p-3 shadow-sm md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:border-[color:var(--eeo-border)] md:bg-transparent md:p-0 md:shadow-none"
                : ""
            }`}
          >
            <nav
              id="eeo-primary-nav"
              aria-label="Primary navigation"
              className={`${menuOpen ? "flex" : "hidden"} w-full flex-col gap-2 md:flex md:w-auto md:flex-row md:flex-wrap md:items-stretch`}
            >
              {PILOT_PUBLIC_NAV.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={linkClass}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end md:w-auto md:justify-end">
              <span className="inline-flex min-h-10 items-center justify-center rounded-full border border-[color:var(--eeo-border)] bg-[color:var(--eeo-green-soft)] px-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--eeo-green-dark)]">
                Pilot Preview
              </span>
              <Link
                href="/pilot/corridor"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--eeo-primary)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--eeo-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2 active:scale-[0.99]"
              >
                Explore First Corridor
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
