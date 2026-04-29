import type { ReleaseManifest } from "@/types/eeo";

export const releaseManifest: ReleaseManifest = {
  id: "REL-CC-001",
  title: "Copper–Cobalt corridor public record",
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
    "This release does not assert chain-of-custody verification without underlying evidence.",
    "This release does not make legal findings outside cited authorities.",
    "This release does not identify specific products as containing cobalt from specific mines without substantiation.",
    "This release does not publish sensitive community or ecological location data.",
  ],
};
