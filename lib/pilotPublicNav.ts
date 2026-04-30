/**
 * Canonical public pilot routes — single source for header and in-page pilot navigation.
 * Keep labels aligned to avoid competing terminology.
 */
export const PILOT_PUBLIC_NAV: readonly { href: string; label: string }[] = [
  { href: "/", label: "Observatory" },
  { href: "/pilot/corridor", label: "First Corridor" },
  { href: "/pilot/evidence-ledger", label: "Evidence Ledger" },
  { href: "/pilot/methods-and-limits", label: "Methods" },
  { href: "/pilot/safeguards", label: "Safeguards" },
  { href: "/pilot/corrections", label: "Corrections" },
];
