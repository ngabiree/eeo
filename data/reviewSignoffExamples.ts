import type { ReviewSignoff } from "@/types/reviewSignoff";

/**
 * Inert rehearsal examples for formal review sign-offs.
 * Non-sensitive, non-authoritative; not live governance records.
 */
export const reviewSignoffExamples: ReviewSignoff[] = [
  {
    id: "RSIGN-EX-001",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "evidence_review",
    status: "superseded",
    conditions: [],
    publicSafeSummary:
      "Prior evidence review approved linkage to cited public sources; superseded by a later conditioned review.",
    internalNotes: "Rehearsal-only placeholder chain for supersession.",
    reviewedAt: "2026-04-28T10:00:00.000Z",
    reviewedBy: "reviewer",
    expiresAt: undefined,
    supersedesSignoffId: undefined,
  },
  {
    id: "RSIGN-EX-010",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "evidence_review",
    status: "conditioned",
    conditions: [
      "Retain explicit limitations that trade statistics do not prove chain-of-custody.",
      "Keep evidence role labels visible where material.",
    ],
    publicSafeSummary:
      "Evidence linkage approved subject to retaining stated methodological limits and source roles.",
    reviewedAt: "2026-05-01T14:30:00.000Z",
    reviewedBy: "governance_protocol",
    supersedesSignoffId: "RSIGN-EX-001",
  },
  {
    id: "RSIGN-EX-002",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "language_safety_review",
    status: "approved",
    conditions: ["Avoid adjudicatory phrasing in any derived press lines."],
    publicSafeSummary:
      "Language review confirms non-adjudicatory framing consistent with methodology-and-limits posture.",
    reviewedAt: "2026-05-01T14:35:00.000Z",
    reviewedBy: "reviewer",
    expiresAt: "2027-05-01T14:35:00.000Z",
  },
  {
    id: "RSIGN-EX-003",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "map_safety_review",
    status: "approved",
    conditions: [],
    publicSafeSummary:
      "No publication of precise vulnerable-site coordinates in association with this methodological claim.",
    reviewedAt: "2026-05-01T14:36:00.000Z",
    reviewedBy: "governance_protocol",
  },
  {
    id: "RSIGN-EX-004",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "right_of_reply_review",
    status: "approved",
    conditions: [],
    publicSafeSummary:
      "Right-of-reply not required for this methodological claim under current applicability rules.",
    reviewedAt: "2026-05-01T14:37:00.000Z",
    reviewedBy: "system_rule",
  },
  {
    id: "RSIGN-EX-005",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "access_governance_review",
    status: "approved",
    conditions: ["Publication posture must remain consistent with access-governance classification."],
    publicSafeSummary:
      "Access-governance alignment confirmed for public-tier methodological release without restricted attachments.",
    reviewedAt: "2026-05-01T14:38:00.000Z",
    reviewedBy: "governance_protocol",
  },
  {
    id: "RSIGN-EX-006",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "legal_review",
    status: "conditioned",
    conditions: ["Do not phrase outputs as findings of liability or illegality."],
    publicSafeSummary:
      "Legal-style reading review confirms methodological-limit posture and limitation-first publication.",
    reviewedAt: "2026-05-01T14:39:00.000Z",
    reviewedBy: "reviewer",
  },
  {
    id: "RSIGN-EX-007",
    objectType: "map_layer",
    objectId: "MAP-LAYER-EX-GENERALIZED-001",
    reviewType: "labor_or_human_rights_review",
    status: "blocked",
    conditions: [],
    publicSafeSummary:
      "Human-rights lane review blocks publication of identifying worker or grievance detail pending aggregation plan.",
    internalNotes: "Example only — map layer identifier is synthetic.",
    reviewedAt: "2026-05-01T14:40:00.000Z",
    reviewedBy: "governance_protocol",
  },
  {
    id: "RSIGN-EX-008",
    objectType: "dossier_section",
    objectId: "CDS-CU-CO-processing_trade_profile",
    reviewType: "ecological_review",
    status: "conditioned",
    conditions: ["Any ecological mention stays generalized without sensitive locale precision."],
    publicSafeSummary:
      "Ecological review permits generalized corridor framing without publishing sensitive site-level ecology detail.",
    reviewedAt: "2026-05-01T14:41:00.000Z",
    reviewedBy: "reviewer",
  },
  {
    id: "RSIGN-EX-009",
    objectType: "press_material",
    objectId: "PRESS-EX-CORRIDOR-DRAFT-001",
    reviewType: "press_review",
    status: "blocked",
    conditions: [],
    publicSafeSummary:
      "Press review holds draft until release manifest and claim-level gates align; no amplification ahead of manifest.",
    reviewedAt: "2026-05-01T14:42:00.000Z",
    reviewedBy: "reviewer",
  },
];
