/**
 * Header + in-page **shortcut** pilot links (single source for labels).
 * Deeper pilots still exist under `/pilot/*` — see `/pilot` overview and `docs/mvp-evidence-loop.md`.
 */
export const PILOT_PUBLIC_NAV: readonly { href: string; label: string }[] = [
  { href: "/", label: "Observatory" },
  { href: "/pilot", label: "Pilot hub" },
  { href: "/pilot/corridor", label: "First Corridor" },
  { href: "/pilot/evidence-ledger", label: "Evidence Ledger" },
  { href: "/pilot/methods-and-limits", label: "Methods" },
  { href: "/pilot/safeguards", label: "Safeguards" },
  { href: "/pilot/corrections", label: "Corrections" },
];
