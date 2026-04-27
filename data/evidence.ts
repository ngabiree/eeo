import type { EvidenceItem } from "@/types/eeo";

export const evidenceItems: EvidenceItem[] = [
  {
    id: "EVID-USGS-CO-001",
    sourceId: "SRC-USGS-CO-001",
    title: "Cobalt production and reserve context",
    summary:
      "USGS mineral data can provide production and reserve context for cobalt, but it does not identify the custody chain of specific downstream products.",
    evidenceClass: "official",
    confidenceContribution: "high",
    limitations: [
      "Does not provide mine-to-product traceability.",
      "Does not identify specific downstream products.",
      "Does not establish company responsibility for individual shipments.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      {
        claimId: "CLAIM-DRC-CO-001",
        role: "contextualizes",
        note: "Provides production and reserve context.",
      },
    ],
  },
  {
    id: "EVID-UNCOMTRADE-CO-001",
    sourceId: "SRC-UNCOMTRADE-CO-001",
    title: "Reported cobalt-related trade flows",
    summary:
      "UN Comtrade can show reported trade flows between countries, but trade data alone does not establish full chain-of-custody from mine to final product.",
    evidenceClass: "official",
    confidenceContribution: "medium",
    limitations: [
      "Trade data may be aggregated.",
      "Reported flows may not reflect actual origin after processing or re-export.",
      "Does not prove product-level traceability.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      {
        claimId: "CLAIM-DRC-CO-001",
        role: "limits",
        note: "Clarifies what trade data cannot prove.",
      },
    ],
  },
];
