import type { Claim } from "@/types/eeo";

export const sampleClaim: Claim = {
  id: "CLAIM-DRC-CO-001",
  title: "Reported cobalt production is not the same as traceable product origin",
  plainLanguageClaim:
    "Public production and trade data can show cobalt production and export patterns, but they do not by themselves prove that a specific downstream battery, vehicle, or consumer product contains cobalt from a specific mine.",
  claimType: "method_limit",
  legalPosture: "methodological_limit",
  corridorNode: "processing_trade",
  evidenceLinks: [
    {
      evidenceId: "EVID-USGS-CO-001",
      role: "contextualizes",
      note: "Provides production and reserve context, but not mine-to-product traceability.",
    },
    {
      evidenceId: "EVID-UNCOMTRADE-CO-001",
      role: "limits",
      note: "Trade data can show reported flows but not full chain-of-custody.",
    },
  ],
  entityIds: ["ENT-DRC", "ENT-COBALT"],
  confidence: "high",
  exposureRisk: "low",
  publicationDecision: "publish",
  reviewStatus: "prototype_release",
  rightOfReplyRequired: false,
  rightOfReplyStatus: "not_required",
  whatThisDoesNotProve: [
    "It does not prove that any specific product contains cobalt from a specific mine.",
    "It does not prove absence of DRC-origin cobalt in downstream products.",
    "It does not identify a specific company as responsible for a specific shipment.",
    "It does not replace chain-of-custody verification.",
  ],
  whatWouldReviseThisClaim: [
    "Verified chain-of-custody records.",
    "Audited supplier disclosures.",
    "Regulatory findings.",
    "Company right-of-reply evidence.",
    "Updated official trade or production data.",
  ],
  lastUpdated: "2026-04-27",
};

export const claims: Claim[] = [sampleClaim];
