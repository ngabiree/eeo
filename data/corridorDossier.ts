/**
 * Skeleton corridor dossier — structure only / no substantive evidenced claims yet.
 */

import type {
  CorridorDossier,
  CorridorDossierSection,
  CorridorDossierSectionRecord,
  DossierSectionStatus,
} from "@/types/corridorDossier";

const STUB_UPDATED = "2026-04-30T12:00:00.000Z";

const SECTION_BLUEPRINT: { section: CorridorDossierSection; title: string; status: DossierSectionStatus }[] = [
  { section: "scope", title: "Scope & pilot framing", status: "not_started" },
  { section: "source_map", title: "Source map & non-duplication", status: "source_mapping" },
  { section: "endowment_profile", title: "Endowment profile", status: "not_started" },
  { section: "governance_profile", title: "Governance profile", status: "not_started" },
  { section: "concession_permit_profile", title: "Concession / permit profile", status: "not_started" },
  { section: "operator_profile", title: "Operator profile", status: "not_started" },
  { section: "ownership_control_profile", title: "Ownership / control profile", status: "not_started" },
  { section: "extraction_production_profile", title: "Extraction / production profile", status: "not_started" },
  { section: "processing_trade_profile", title: "Processing / trade profile", status: "not_started" },
  { section: "labor_profile", title: "Labor risk profile", status: "not_started" },
  { section: "ecological_profile", title: "Ecological profile", status: "not_started" },
  { section: "public_revenue_profile", title: "Public revenue profile", status: "not_started" },
  { section: "value_capture_profile", title: "Value capture profile", status: "not_started" },
  { section: "human_capability_stewardship_profile", title: "Human capability & stewardship profile", status: "not_started" },
  { section: "evidence_gaps", title: "Evidence gaps", status: "not_started" },
  { section: "methods_limits", title: "Methods & limits", status: "not_started" },
  { section: "safeguards_map_safety", title: "Safeguards & map safety", status: "not_started" },
  { section: "right_of_reply", title: "Right-of-reply discipline", status: "not_started" },
  { section: "release_manifest", title: "Release manifest", status: "not_started" },
];

function mkSectionRecord(s: CorridorDossierSection, title: string, status: DossierSectionStatus): CorridorDossierSectionRecord {
  const baseLimit = "Structural-only milestone — no adjudicated dossier assertions yet.";
  return {
    id: `CDS-CU-CO-${s}`,
    section: s,
    title,
    status,
    summary:
      s === "source_map"
        ? "Indexing planned sources and non-duplication posture; see data/sourceMap.ts."
        : "Placeholder — substantive drafting awaits v0.7 evidence content milestones.",
    linkedClaimIds: [],
    linkedEvidenceIds: [],
    sourceIds: [],
    publicLimitations: [baseLimit],
    exposureNotes: [],
    lastUpdated: STUB_UPDATED,
  };
}

export const copperCobaltCorridorPilotSkeleton: CorridorDossier = {
  id: "CDR-CU-CO-PILOT-001",
  title: "Earth Endowment Observatory: Critical Minerals Corridor Evidence Pilot",
  corridor: "Copper-Cobalt Critical Minerals Corridor",
  geography: "Corridor framing only — jurisdictions to be enumerated with evidence-backed boundary notes in later milestones.",
  commodityFocus: ["copper", "cobalt"],
  purpose:
    "To test whether EEO can produce one safe, sourced, reviewable, correctable endowment-to-economy corridor dossier before attempting broader observatory scope.",
  scopeStatement:
    "This pilot focuses on public, low-exposure evidence about the copper-cobalt corridor. It examines how a critical mineral endowment enters economic life through governance, concessions, operators, ownership/control structures, extraction, processing, trade, labor conditions, ecological signals, public revenue, value-capture questions, and public-benefit implications.",
  nonGoals: [
    "It does not provide product-level chain-of-custody verification.",
    "It does not claim that a specific consumer product contains cobalt or copper from a specific mine.",
    "It does not adjudicate legal liability.",
    "It does not publish sensitive community, sacred-site, whistleblower, or vulnerable ecological location data.",
    "It does not create a public score or index.",
    "It does not claim authority over states, Indigenous peoples, communities, firms, or resources.",
    "It does not launch a global atlas.",
  ],
  sections: SECTION_BLUEPRINT.map((row) => mkSectionRecord(row.section, row.title, row.status)),
  releaseReadiness: "not_ready",
  publicLimitations: [
    "Skeleton record only — all interpretive judgments await evidence linkage and reviewer sign-off.",
    "Temporal profiling, monitoring signals, and forecasting UI remain deferred milestones (see ROADMAP.md).",
  ],
  lastUpdated: STUB_UPDATED,
};
