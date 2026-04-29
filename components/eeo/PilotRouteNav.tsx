"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import EeoLogo from "@/components/eeo/EeoLogo";

const ROUTES: { href: string; label: string }[] = [
  { href: "/pilot", label: "Overview" },
  { href: "/pilot/evidence-dossier", label: "Evidence Dossier" },
  { href: "/pilot/evidence-ledger", label: "Evidence Ledger" },
  { href: "/pilot/governance-profile", label: "Governance Profile" },
  { href: "/pilot/value-chain", label: "Value-chain" },
  { href: "/pilot/labor-ecology-revenue", label: "Labor/Ecology/Revenue" },
  { href: "/pilot/methods-and-limits", label: "Methods + Limits" },
  { href: "/pilot/safeguards", label: "Safeguards" },
  { href: "/pilot/corrections", label: "Corrections" },
];

export default function PilotRouteNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-3">
      <Link
        href="/"
        className="flex flex-wrap items-center gap-3 rounded-2xl border border-stone-200/70 bg-[#EFE8D8]/70 px-3 py-2.5 shadow-sm hover:border-stone-300 hover:bg-[#EFE8D8]"
      >
        <EeoLogo decorative size="sm" />
        <span className="font-serif text-base font-semibold tracking-tight text-stone-950">
          Earth Endowment Observatory
        </span>
      </Link>
      <nav
        aria-label="Pilot route navigation"
        className="rounded-2xl border border-stone-200 bg-white/80 p-3 shadow-sm"
      >
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.14em] text-stone-500">
          Limited corridor prototype routes
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          {ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              aria-current={pathname === route.href ? "page" : undefined}
              className={
                pathname === route.href
                  ? "rounded-full border border-stone-900 bg-stone-900 px-3 py-1.5 text-white"
                  : "rounded-full border border-stone-300 bg-white px-3 py-1.5 text-stone-700 hover:border-stone-500"
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
