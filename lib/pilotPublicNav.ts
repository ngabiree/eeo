/**
 * Canonical public pilot routes — single source for header and in-page pilot navigation.
 * Keep labels aligned to avoid competing terminology.
 */
export const PILOT_PUBLIC_NAV: readonly { href: string; label: string }[] = [
  { href: "/pilot", label: "Pilot overview" },
  { href: "/pilot/claim-lifecycle", label: "Claim lifecycle" },
  { href: "/pilot/corridor", label: "Corridors" },
  { href: "/pilot/evidence-dossier", label: "Evidence dossier" },
  { href: "/pilot/evidence-ledger", label: "Evidence ledger" },
  { href: "/pilot/governance-profile", label: "Governance profile" },
  { href: "/pilot/value-chain", label: "Value chain" },
  { href: "/pilot/labor-ecology-revenue", label: "Labor · ecology · revenue" },
  { href: "/pilot/methods-and-limits", label: "Methods" },
  { href: "/pilot/safeguards", label: "Safeguards" },
  { href: "/pilot/corrections", label: "Corrections" },
];
