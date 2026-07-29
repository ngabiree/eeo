/**
 * Header + in-page **shortcut** pilot links (single source for labels).
 * Deeper pilots still exist under `/pilot/*` — see `/pilot` overview and `docs/mvp-evidence-loop.md`.
 */
export const PILOT_PUBLIC_NAV: readonly { href: string; label: string }[] = [
  { href: "/", label: "Observatory" },
  { href: "/pilot", label: "Corridor" },
  { href: "/pilot/corridor", label: "Copper-Cobalt Corridor" },
  { href: "/pilot/evidence-ledger", label: "Evidence Ledger" },
  { href: "/pilot/methods-and-limits", label: "Methods & Limits" },
  { href: "/pilot/safeguards", label: "Disclosure Safeguards" },
  { href: "/pilot/corrections", label: "Corrections & Reply" },
];
