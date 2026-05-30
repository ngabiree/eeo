/**
 * All shipped corridor prototype routes under segment `app/pilot` child pages (excluding `/pilot` hub).
 * Keep aligned with `docs/mvp-evidence-loop.md`.
 */
export const PILOT_HUB_ROUTES: readonly { href: string; label: string }[] = [
  { href: "/pilot/corridor", label: "Corridor workspace" },
  { href: "/pilot/evidence-dossier", label: "Evidence dossier" },
  { href: "/pilot/evidence-ledger", label: "Evidence ledger" },
  { href: "/pilot/governance-profile", label: "Governance profile" },
  { href: "/pilot/human-capability", label: "Human capability" },
  { href: "/pilot/claim-lifecycle", label: "Claim lifecycle" },
  { href: "/pilot/implementation-readiness", label: "Implementation readiness" },
  { href: "/pilot/labor-ecology-revenue", label: "Labor · ecology · revenue" },
  { href: "/pilot/value-chain", label: "Value chain" },
  { href: "/pilot/methods-and-limits", label: "Methods and limits" },
  { href: "/pilot/safeguards", label: "Safeguards" },
  { href: "/pilot/corrections", label: "Corrections" },
];
