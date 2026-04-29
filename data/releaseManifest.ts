import type { ReleaseManifest } from "@/types/eeo";

export const releaseManifest: ReleaseManifest = {
  id: "REL-CC-001",
  title: "Public Evidence Prototype: Copper-Cobalt Corridor",
  corridor: "Copper-Cobalt Critical Minerals Corridor",
  releaseDate: "2026-04-27",
  includedClaimIds: ["CLAIM-DRC-CO-001"],
  withheldClaimIds: [],
  unresolvedDisputes: [],
  exposureReviewSummary:
    "The current release includes only low-exposure public methodological claims based on official and multilateral sources. It does not publish sensitive community data, exact vulnerable-site data, or allegations against specific firms.",
  methodologyVersion: "0.2",
  approvedBy: ["Method review", "Exposure review"],
  publicLimitations: [
    "This prototype does not provide chain-of-custody verification.",
    "This prototype does not make legal findings.",
    "This prototype does not identify specific products as containing cobalt from specific mines.",
    "This prototype does not publish sensitive community or ecological location data.",
  ],
};
