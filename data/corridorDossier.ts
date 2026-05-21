import type {
  CorridorDossier,
  CorridorDossierSectionRecord,
} from "@/types/corridorDossier";

const STUB_UPDATED = "2026-04-30T12:00:00.000Z";
const V07_UPDATED = "2026-05-21T00:00:00.000Z";
const STUB_LIMIT = "Structural-only milestone — no adjudicated dossier assertions yet.";

function stubSection(
  section: CorridorDossierSectionRecord["section"],
  title: string
): CorridorDossierSectionRecord {
  return {
    id: `CDS-CU-CO-${section}`,
    section,
    title,
    status: "not_started",
    summary: "Placeholder — substantive drafting awaits later evidence milestones.",
    linkedClaimIds: [],
    linkedEvidenceIds: [],
    sourceIds: [],
    publicLimitations: [STUB_LIMIT],
    exposureNotes: [],
    lastUpdated: STUB_UPDATED,
  };
}

const sections: CorridorDossierSectionRecord[] = [
  // ── Scope ──────────────────────────────────────────────────────────────────
  {
    id: "CDS-CU-CO-scope",
    section: "scope",
    title: "Scope & pilot framing",
    status: "source_mapping",
    summary:
      "The pilot covers one copper-cobalt critical-minerals corridor. It focuses on public, low-exposure evidence connecting the endowment to economic value through governance, concessions, operators, ownership/control structures, extraction, processing, trade, labour conditions, ecological signals, public revenue, and value-capture questions. The pilot does not verify supply-chain custody, adjudicate legal liability, or create scores.",
    linkedClaimIds: [],
    linkedEvidenceIds: [],
    sourceIds: ["SM-USGS-MM", "SM-UNCOMTRADE"],
    publicLimitations: [
      "Scope is pilot-only. Claims are limited to public evidence available for the corridor at this stage.",
      "Temporal profiling, monitoring signals, and scenario analysis are deferred milestones.",
    ],
    exposureNotes: [],
    lastUpdated: V07_UPDATED,
  },

  // ── Source map ──────────────────────────────────────────────────────────────
  {
    id: "CDS-CU-CO-source_map",
    section: "source_map",
    title: "Source map & non-duplication",
    status: "source_mapping",
    summary:
      "Indexing planned sources and non-duplication posture; see data/sourceMap.ts. EEO cites, evaluates, and defers to authoritative systems rather than duplicating them.",
    linkedClaimIds: [],
    linkedEvidenceIds: [],
    sourceIds: ["SM-USGS-MM", "SM-UNCOMTRADE"],
    publicLimitations: [STUB_LIMIT],
    exposureNotes: [],
    lastUpdated: STUB_UPDATED,
  },

  // ── Endowment ───────────────────────────────────────────────────────────────
  {
    id: "CDS-CU-CO-endowment_profile",
    section: "endowment_profile",
    title: "Endowment profile",
    status: "source_mapping",
    summary:
      "The DRC holds the largest known cobalt reserves globally (USGS). Reserve concentration does not determine extraction conditions, social outcomes, or chain-of-custody. One claim currently linked; deeper endowment characterisation (geological system, regeneration limits, intergenerational liability) is deferred.",
    linkedClaimIds: ["CLAIM-DRC-CO-002"],
    linkedEvidenceIds: ["EVID-USGS-CO-002"],
    sourceIds: ["SRC-USGS-CO-001"],
    publicLimitations: [
      "Reserve data reflects USGS reported figures; independent verification not performed by EEO.",
      "This section does not assess the recoverable fraction, extraction timeline, or intergenerational endowment liability.",
    ],
    exposureNotes: [],
    lastUpdated: V07_UPDATED,
  },

  // ── Governance profile ───────────────────────────────────────────────────────
  {
    id: "CDS-CU-CO-governance_profile",
    section: "governance_profile",
    title: "Governance profile",
    status: "source_mapping",
    summary:
      "Cobalt extraction in DRC operates under multiple overlapping governance regimes including national mining law, provincial authority, and international transparency frameworks such as EITI. One claim currently linked; concession-level governance, customary authority, and community consent questions are deferred to later milestones.",
    linkedClaimIds: ["CLAIM-DRC-CO-003"],
    linkedEvidenceIds: ["EVID-EITI-DRC-001"],
    sourceIds: ["SRC-EITI-DRC-001"],
    publicLimitations: [
      "Governance framework description does not assess enforcement effectiveness at specific sites.",
      "Community and Indigenous governance rights are not yet characterised in this section.",
    ],
    exposureNotes: [],
    lastUpdated: V07_UPDATED,
  },

  // ── Concession / permit ─────────────────────────────────────────────────────
  stubSection("concession_permit_profile", "Concession / permit profile"),

  // ── Operator profile ─────────────────────────────────────────────────────────
  stubSection("operator_profile", "Operator profile"),

  // ── Ownership / control ──────────────────────────────────────────────────────
  stubSection("ownership_control_profile", "Ownership / control profile"),

  // ── Extraction / production ───────────────────────────────────────────────────
  {
    id: "CDS-CU-CO-extraction_production_profile",
    section: "extraction_production_profile",
    title: "Extraction / production profile",
    status: "source_mapping",
    summary:
      "Artisanal and small-scale mining (ASM) contributes a significant but poorly quantified share of DRC cobalt production. USGS and other sources note the ASM contribution without reliable disaggregation. One gap claim currently linked; site-level production profiles, concession-level output, and ecological footprint are deferred.",
    linkedClaimIds: ["CLAIM-DRC-CO-004"],
    linkedEvidenceIds: ["EVID-USGS-ASM-001", "EVID-USGS-CO-001"],
    sourceIds: ["SRC-USGS-CO-001"],
    publicLimitations: [
      "Production data reflects national aggregates; ASM share is not reliably disaggregated.",
      "Claim CLAIM-DRC-CO-004 is under method review and not yet in the public release manifest.",
    ],
    exposureNotes: [],
    lastUpdated: V07_UPDATED,
  },

  // ── Processing / trade ────────────────────────────────────────────────────────
  {
    id: "CDS-CU-CO-processing_trade_profile",
    section: "processing_trade_profile",
    title: "Processing / trade profile",
    status: "source_mapping",
    summary:
      "Reported trade data shows cobalt export flows but does not establish mine-to-product traceability. One method-limit claim currently linked (CLAIM-DRC-CO-001). Downstream processing pathways, value-add nodes, and trade-mirror reconciliation are planned for later milestones.",
    linkedClaimIds: ["CLAIM-DRC-CO-001"],
    linkedEvidenceIds: ["EVID-USGS-CO-001", "EVID-UNCOMTRADE-CO-001"],
    sourceIds: ["SM-USGS-MM", "SM-UNCOMTRADE"],
    publicLimitations: [
      "Reported trade data does not prove physical chain-of-custody or origin.",
      "Processing intermediaries are not characterised at this stage.",
    ],
    exposureNotes: [],
    lastUpdated: V07_UPDATED,
  },

  // ── Labour risk ───────────────────────────────────────────────────────────────
  {
    id: "CDS-CU-CO-labor_profile",
    section: "labor_profile",
    title: "Labour risk profile",
    status: "source_mapping",
    summary:
      "Published research from UNICEF, Amnesty International, and ILO documents serious labour risks in DRC artisanal cobalt mining, including child labour, hazardous conditions, and inadequate safety protections. One risk-flag claim currently linked; this claim is under exposure review and not yet in the public release manifest.",
    linkedClaimIds: ["CLAIM-DRC-CO-005"],
    linkedEvidenceIds: ["EVID-ILOSTAT-DRC-001", "EVID-UNICEF-ASM-001", "EVID-AMNESTY-CO-001"],
    sourceIds: ["SRC-ILOSTAT-001", "SRC-UNICEF-ASM-001", "SRC-AMNESTY-COBALT-001"],
    publicLimitations: [
      "Claim CLAIM-DRC-CO-005 is under exposure review; publication posture is publish_with_redactions pending review completion.",
      "Labour risk documentation covers artisanal mining; formal sector conditions are separately governed.",
      "Findings are documented risks and normative concerns — not legal determinations.",
    ],
    exposureNotes: [
      "Labour risk claims carry medium exposure risk due to sensitivity of child labour documentation. Exposure review required before public release.",
    ],
    lastUpdated: V07_UPDATED,
  },

  // ── Ecological signal ─────────────────────────────────────────────────────────
  stubSection("ecological_profile", "Ecological profile"),

  // ── Public revenue ────────────────────────────────────────────────────────────
  {
    id: "CDS-CU-CO-public_revenue_profile",
    section: "public_revenue_profile",
    title: "Public revenue profile",
    status: "source_mapping",
    summary:
      "DRC's mining code requires royalties and taxes on cobalt extraction. EITI reconciliation reports identify persistent gaps between company-reported and government-recorded revenues. One claim currently linked; benefit distribution, community revenue sharing, and fiscal impact on public services are deferred.",
    linkedClaimIds: ["CLAIM-DRC-CO-006"],
    linkedEvidenceIds: ["EVID-EITI-DRC-002"],
    sourceIds: ["SRC-EITI-DRC-001"],
    publicLimitations: [
      "Claim CLAIM-DRC-CO-006 is under method review and not yet in the public release manifest.",
      "Disclosed revenue does not prove durable public benefit.",
      "EITI coverage excludes non-participating operators.",
    ],
    exposureNotes: [],
    lastUpdated: V07_UPDATED,
  },

  // ── Value capture ─────────────────────────────────────────────────────────────
  stubSection("value_capture_profile", "Value capture profile"),

  // ── Human capability & stewardship ───────────────────────────────────────────
  stubSection("human_capability_stewardship_profile", "Human capability & stewardship profile"),

  // ── Evidence gaps ─────────────────────────────────────────────────────────────
  {
    id: "CDS-CU-CO-evidence_gaps",
    section: "evidence_gaps",
    title: "Evidence gaps",
    status: "source_mapping",
    summary:
      "Beneficial ownership of many DRC cobalt concession holders is not fully and publicly disclosed, limiting accountability tracking. One gap claim currently linked. Additional gaps to be documented: site-level production data, concession boundaries, community benefit arrangements, ecological monitoring data, and formal supply-chain linkages.",
    linkedClaimIds: ["CLAIM-DRC-CO-007"],
    linkedEvidenceIds: ["EVID-OPENOWNERSHIP-DRC-001"],
    sourceIds: ["SRC-OPENOWNERSHIP-001"],
    publicLimitations: [
      "Evidence gap documentation is itself incomplete at this stage.",
      "Not all gaps can be safely enumerated without risking disclosure of restricted information.",
    ],
    exposureNotes: [],
    lastUpdated: V07_UPDATED,
  },

  // ── Methods & limits ──────────────────────────────────────────────────────────
  stubSection("methods_limits", "Methods & limits"),

  // ── Safeguards & map safety ────────────────────────────────────────────────────
  stubSection("safeguards_map_safety", "Safeguards & map safety"),

  // ── Right-of-reply ────────────────────────────────────────────────────────────
  stubSection("right_of_reply", "Right-of-reply discipline"),

  // ── Release manifest ──────────────────────────────────────────────────────────
  stubSection("release_manifest", "Release manifest"),
];

export const copperCobaltCorridorPilotSkeleton: CorridorDossier = {
  id: "CDR-CU-CO-PILOT-001",
  title: "Earth Endowment Observatory: Critical Minerals Corridor Evidence Pilot",
  corridor: "Copper-Cobalt Critical Minerals Corridor",
  geography:
    "Corridor framing only — jurisdictions to be enumerated with evidence-backed boundary notes in later milestones.",
  commodityFocus: ["copper", "cobalt"],
  purpose:
    "To test whether EEO can produce one safe, sourced, reviewable, correctable endowment-to-economy corridor dossier before attempting broader observatory scope.",
  scopeStatement:
    "This pilot focuses on public, low-exposure evidence about the copper-cobalt corridor. It examines how a critical mineral endowment enters economic life through governance, concessions, operators, ownership/control structures, extraction, processing, trade, labour conditions, ecological signals, public revenue, value-capture questions, and public-benefit implications.",
  nonGoals: [
    "It does not provide product-level chain-of-custody verification.",
    "It does not claim that a specific consumer product contains cobalt or copper from a specific mine.",
    "It does not adjudicate legal liability.",
    "It does not publish sensitive community, sacred-site, whistleblower, or vulnerable ecological location data.",
    "It does not create a public score or index.",
    "It does not claim authority over states, Indigenous peoples, communities, firms, or resources.",
    "It does not launch a global atlas.",
  ],
  sections,
  releaseReadiness: "not_ready",
  publicLimitations: [
    "Pilot build in progress. Several sections remain stubs awaiting evidence-population milestones.",
    "Claims CLAIM-DRC-CO-004 (extraction/ASM) and CLAIM-DRC-CO-006 (public revenue) are under method review.",
    "Claim CLAIM-DRC-CO-005 (labour risk) is under exposure review; publication posture is publish_with_redactions.",
    "Temporal profiling, monitoring signals, and forecasting UI remain deferred milestones (see ROADMAP.md).",
  ],
  lastUpdated: V07_UPDATED,
};
