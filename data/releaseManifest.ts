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
    "Only claims listed in includedClaimIds are released claims for this manifest version; other visible claim cards are contextual or under review.",
    "This release does not assert chain-of-custody verification without underlying evidence.",
    "This release does not make legal findings outside cited authorities.",
    "This release does not identify specific products as containing cobalt from specific mines without substantiation.",
    "This release does not publish sensitive community or ecological location data.",
  ],
  mapSafetyRestrictions: [
    "Geographic detail is generalized for public release.",
    "Restricted or do_not_publish map layers are not publicly rendered.",
  ],
  sourceLimitationsSummary: [
    "USGS production and reserve data contextualize mineral scale but do not establish mine-to-product chain-of-custody.",
    "UN Comtrade reported trade flows contextualize cross-border reporting but do not prove product origin or specific shipment responsibility.",
  ],
  rightOfReplySummary:
    "Right-of-reply applies when a claim may materially affect an identifiable institution, company, agency, operator, or contested relationship. This is a publication discipline, not legal adjudication.",
  evidenceCompletenessSummary:
    "This release includes one fully inspectable methodological claim with linked evidence, linked sources, and explicit source limitations.",
};
