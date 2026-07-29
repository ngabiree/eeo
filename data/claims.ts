import type { Claim } from "@/types/eeo";

const CLAIM_LAST_REVIEWED = "2026-05-01";
const CLAIM_STALE_AFTER = "2026-11-01";

// ── Processing / trade ────────────────────────────────────────────────────────

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
  reviewStatus: "approved_for_release",
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
  lastReviewed: CLAIM_LAST_REVIEWED,
  staleAfter: CLAIM_STALE_AFTER,
};

// ── Endowment ─────────────────────────────────────────────────────────────────

const endowmentClaim: Claim = {
  id: "CLAIM-DRC-CO-002",
  title: "USGS estimates DRC holds about 55% of global cobalt reserves",
  plainLanguageClaim:
    "The U.S. Geological Survey's Mineral Commodity Summaries 2026 identifies the Democratic Republic of the Congo as the leading cobalt reserve jurisdiction and estimates that it holds about 55% of global cobalt reserves.",
  claimType: "descriptive",
  legalPosture: "factual_observation",
  corridorNode: "endowment",
  evidenceLinks: [
    {
      evidenceId: "EVID-USGS-CO-002",
      role: "supports",
      note: "The 2026 USGS cobalt commodity sheet is the primary basis for the estimated 55% reserve-share claim.",
    },
  ],
  entityIds: ["ENT-DRC", "ENT-COBALT"],
  confidence: "high",
  exposureRisk: "low",
  publicationDecision: "publish",
  reviewStatus: "method_review",
  rightOfReplyRequired: false,
  rightOfReplyStatus: "not_required",
  whatThisDoesNotProve: [
    "It does not establish the total amount of economically recoverable cobalt at any given price or technology level.",
    "It does not indicate the environmental or social conditions under which reserves are or will be extracted.",
    "It does not imply that EEO has independently verified the underlying reserve estimates.",
    "Reserve concentration in one jurisdiction does not determine global supply security, ownership, entitlement, or public benefit.",
  ],
  whatWouldReviseThisClaim: [
    "Updated USGS or equivalent authoritative reserve estimates.",
    "New geological surveys materially changing known reserve volumes.",
    "Significant reserve discoveries in other jurisdictions altering relative concentration.",
    "A methodological revision changing the definition or denominator used for global reserves.",
  ],
  lastUpdated: "2026-07-29",
  lastReviewed: CLAIM_LAST_REVIEWED,
  staleAfter: CLAIM_STALE_AFTER,
};

// ── Jurisdiction / governance ─────────────────────────────────────────────────

const jurisdictionClaim: Claim = {
  id: "CLAIM-DRC-CO-003",
  title: "Cobalt extraction in DRC operates under multiple overlapping governance regimes",
  plainLanguageClaim:
    "EITI DRC reports and public law sources indicate that cobalt extraction in the DRC is subject to national mining law, provincial authority, and the obligations of applicable international frameworks. These regimes overlap and interact in ways that are not always consistently enforced.",
  claimType: "descriptive",
  legalPosture: "factual_observation",
  corridorNode: "jurisdiction",
  evidenceLinks: [
    {
      evidenceId: "EVID-EITI-DRC-001",
      role: "supports",
      note: "EITI reports document the governance structure and transparency obligations applicable to extractive operations.",
    },
  ],
  entityIds: ["ENT-DRC"],
  confidence: "high",
  exposureRisk: "low",
  publicationDecision: "publish",
  reviewStatus: "approved_for_release",
  rightOfReplyRequired: false,
  rightOfReplyStatus: "not_required",
  whatThisDoesNotProve: [
    "It does not determine which governance regime is effectively enforced at a specific location or concession.",
    "It does not assess compliance by any specific operator or public authority.",
    "It does not determine whether Indigenous peoples or communities have provided informed consent for extraction affecting their territories.",
    "It does not constitute a legal opinion on DRC mining law or its application.",
  ],
  whatWouldReviseThisClaim: [
    "Formal legal changes to DRC's mining governance framework.",
    "Evidence that only one governance system is legally operative for cobalt extraction.",
    "Updated EITI or official sources clarifying governance structure.",
  ],
  lastUpdated: "2026-05-01",
  lastReviewed: CLAIM_LAST_REVIEWED,
  staleAfter: CLAIM_STALE_AFTER,
};

// ── Extraction / production ───────────────────────────────────────────────────

const extractionClaim: Claim = {
  id: "CLAIM-DRC-CO-004",
  title: "Artisanal and small-scale mining contributes a significant but poorly quantified share of DRC cobalt production",
  plainLanguageClaim:
    "Available public data indicate that artisanal and small-scale mining (ASM) contributes materially to total DRC cobalt production, but reliable disaggregated figures are not consistently published. Estimates vary considerably across reporting cycles and sources, and ASM activity is systematically under-measured in official statistics.",
  claimType: "gap",
  legalPosture: "methodological_limit",
  corridorNode: "extraction_production",
  evidenceLinks: [
    {
      evidenceId: "EVID-USGS-ASM-001",
      role: "supports",
      note: "USGS notes ASM contribution to DRC cobalt output without reliable disaggregation.",
    },
    {
      evidenceId: "EVID-USGS-CO-001",
      role: "limits",
      note: "National aggregates cannot disaggregate the formal and artisanal production share precisely.",
    },
  ],
  entityIds: ["ENT-DRC", "ENT-COBALT"],
  confidence: "medium",
  exposureRisk: "low",
  publicationDecision: "publish",
  reviewStatus: "method_review",
  rightOfReplyRequired: false,
  rightOfReplyStatus: "not_required",
  whatThisDoesNotProve: [
    "It does not establish the exact proportion of cobalt produced by ASM in any given year.",
    "It does not identify specific ASM sites, operators, communities, or individuals.",
    "It does not determine the labour conditions or ecological impacts at any specific ASM location.",
    "It does not distinguish between registered and unregistered artisanal operations.",
  ],
  whatWouldReviseThisClaim: [
    "Publication of reliable disaggregated production data distinguishing formal and artisanal mining.",
    "A credible independent survey of ASM production volumes.",
    "Updated USGS or equivalent estimates with improved ASM coverage.",
  ],
  lastUpdated: "2026-05-01",
  lastReviewed: CLAIM_LAST_REVIEWED,
  staleAfter: CLAIM_STALE_AFTER,
};

// ── Labor risk ────────────────────────────────────────────────────────────────

const laborClaim: Claim = {
  id: "CLAIM-DRC-CO-005",
  title: "Published research identifies documented labour risks in DRC artisanal cobalt mining, including child labour",
  plainLanguageClaim:
    "UNICEF research, Amnesty International investigations, and labour sector data document serious labour risks in DRC artisanal cobalt mining. Documented concerns include children working in or near mines, hazardous physical conditions, inadequate safety protections, and limited access to remedy. These are documented risks, not legal findings, and they do not uniformly apply to all ASM sites or operators.",
  claimType: "risk_flag",
  legalPosture: "normative_concern",
  corridorNode: "labor_risk",
  evidenceLinks: [
    {
      evidenceId: "EVID-UNICEF-ASM-001",
      role: "supports",
      note: "Documents child labour presence in DRC artisanal cobalt mining.",
    },
    {
      evidenceId: "EVID-AMNESTY-CO-001",
      role: "supports",
      note: "Documents labour conditions and rights concerns in DRC cobalt ASM.",
    },
    {
      evidenceId: "EVID-ILOSTAT-DRC-001",
      role: "contextualizes",
      note: "Provides sector-level labour context; formal data likely understates ASM risk.",
    },
  ],
  entityIds: ["ENT-DRC", "ENT-COBALT"],
  confidence: "high",
  exposureRisk: "medium",
  publicationDecision: "publish_with_redactions",
  reviewStatus: "exposure_review",
  rightOfReplyRequired: false,
  rightOfReplyStatus: "not_required",
  whatThisDoesNotProve: [
    "It does not constitute a legal finding against any specific company, operator, or individual.",
    "It does not establish that documented conditions apply uniformly to all ASM sites in DRC.",
    "It does not identify the specific supply chains or downstream buyers connected to any site where labour violations occur.",
    "It does not determine the scale or trend of child labour in cobalt mining with statistical precision.",
    "It does not replace site-level investigation, legal proceedings, or remediation assessment.",
  ],
  whatWouldReviseThisClaim: [
    "Credible evidence of systemic improvement in ASM labour conditions across the DRC cobalt sector.",
    "Updated independent research documenting material change in child labour prevalence.",
    "Published regulatory findings or court judgments materially changing the documented risk picture.",
    "Company or government right-of-reply providing evidence contradicting documented findings.",
  ],
  lastUpdated: "2026-05-01",
  lastReviewed: CLAIM_LAST_REVIEWED,
  staleAfter: CLAIM_STALE_AFTER,
};

// ── Public revenue ────────────────────────────────────────────────────────────

const publicRevenueClaim: Claim = {
  id: "CLAIM-DRC-CO-006",
  title: "DRC's mining royalty and tax regime applies to cobalt, but EITI reports show persistent revenue reporting gaps",
  plainLanguageClaim:
    "The DRC mining code requires royalties and taxes on cobalt extraction. EITI DRC reconciliation reports have identified persistent discrepancies between amounts reported by extractive companies and amounts recorded by government agencies, indicating gaps in revenue transparency.",
  claimType: "descriptive",
  legalPosture: "factual_observation",
  corridorNode: "public_revenue",
  evidenceLinks: [
    {
      evidenceId: "EVID-EITI-DRC-002",
      role: "supports",
      note: "EITI reconciliation data documents royalty and tax reporting gaps.",
    },
  ],
  entityIds: ["ENT-DRC", "ENT-COBALT"],
  confidence: "medium",
  exposureRisk: "low",
  publicationDecision: "publish",
  reviewStatus: "method_review",
  rightOfReplyRequired: false,
  rightOfReplyStatus: "not_required",
  whatThisDoesNotProve: [
    "It does not prove that discrepancies result from evasion, fraud, or illegal activity — they may reflect administrative inconsistencies.",
    "It does not determine how disclosed revenues were spent or whether communities received benefit.",
    "It does not cover non-EITI-reporting operators, whose revenues are not captured in reconciliation.",
    "Disclosed public revenue does not prove durable public benefit.",
  ],
  whatWouldReviseThisClaim: [
    "Updated EITI DRC reports showing materially improved reconciliation outcomes.",
    "Government publication of complete and verified revenue collection data.",
    "Independent audit findings materially changing the revenue transparency picture.",
  ],
  lastUpdated: "2026-05-01",
  lastReviewed: CLAIM_LAST_REVIEWED,
  staleAfter: CLAIM_STALE_AFTER,
};

// ── Evidence gap ──────────────────────────────────────────────────────────────

const evidenceGapClaim: Claim = {
  id: "CLAIM-DRC-CO-007",
  title: "Beneficial ownership of many DRC cobalt concession holders is not fully and publicly disclosed",
  plainLanguageClaim:
    "Open Ownership data and research indicate that beneficial ownership disclosure requirements for DRC extractive sector companies remain incomplete. Many concession holders do not publicly disclose ultimate beneficial owners in a machine-readable or consistently accessible format, limiting accountability tracking.",
  claimType: "gap",
  legalPosture: "factual_observation",
  corridorNode: "evidence_gap",
  evidenceLinks: [
    {
      evidenceId: "EVID-OPENOWNERSHIP-DRC-001",
      role: "supports",
      note: "Open Ownership data identifies the beneficial ownership disclosure gap in the DRC extractive sector.",
    },
  ],
  entityIds: ["ENT-DRC"],
  confidence: "high",
  exposureRisk: "low",
  publicationDecision: "publish",
  reviewStatus: "approved_for_release",
  rightOfReplyRequired: false,
  rightOfReplyStatus: "not_required",
  whatThisDoesNotProve: [
    "It does not identify any specific undisclosed beneficial owner.",
    "It does not prove that non-disclosure is intentional or illegal.",
    "It does not establish that all operators without disclosed ownership are improperly structured.",
    "Absence from a public register does not confirm non-compliance with domestic requirements.",
  ],
  whatWouldReviseThisClaim: [
    "Publication of a comprehensive and verified beneficial ownership register for DRC extractive sector concession holders.",
    "Updated Open Ownership or equivalent research showing materially improved disclosure coverage.",
  ],
  lastUpdated: "2026-05-01",
  lastReviewed: CLAIM_LAST_REVIEWED,
  staleAfter: CLAIM_STALE_AFTER,
};

export const claims: Claim[] = [
  sampleClaim,
  endowmentClaim,
  jurisdictionClaim,
  extractionClaim,
  laborClaim,
  publicRevenueClaim,
  evidenceGapClaim,
];
