"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Pilot-only deep dives — primary routes (Corridors, Evidence Ledger, Methods, Safeguards, Corrections) sit in `EeoSiteHeader`. */
const ROUTES: { href: string; label: string }[] = [
  { href: "/pilot", label: "Overview" },
  { href: "/pilot/corridor", label: "Corridor workspace" },
  { href: "/pilot/evidence-dossier", label: "Evidence dossier" },
  { href: "/pilot/governance-profile", label: "Governance profile" },
  { href: "/pilot/value-chain", label: "Value-chain" },
  { href: "/pilot/labor-ecology-revenue", label: "Labor / ecology / revenue" },
];

export default function PilotRouteNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-3">
      <nav
        aria-label="Pilot deep-dive navigation"
        className="rounded-2xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.88)] p-3 shadow-sm backdrop-blur-sm"
      >
        <p className="mb-1 text-xs font-mono uppercase tracking-[0.14em] text-[color:var(--eeo-muted)]">Pilot deep dives</p>
        <p className="mb-3 text-xs leading-relaxed text-[color:var(--eeo-muted)]">
          Primary routes (Corridors, Evidence Ledger, Methods, Safeguards, Corrections) are in the site header above.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          {ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              aria-current={pathname === route.href ? "page" : undefined}
              className={
                pathname === route.href
                  ? "rounded-full border border-[color:var(--eeo-primary)] bg-[color:var(--eeo-primary)] px-3 py-1.5 font-medium text-white shadow-sm"
                  : "rounded-full border border-[color:var(--eeo-border)] bg-white/90 px-3 py-1.5 font-medium text-[color:var(--eeo-text)] hover:border-[color:var(--eeo-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2"
              }
            >
              {route.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
