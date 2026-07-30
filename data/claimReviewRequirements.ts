import type { ReviewSignoffRequirement } from "@/types/reviewSignoff";

/**
 * Required review lanes for claims that are included in, or are candidates for,
 * a release manifest. These records state obligations only; they are not approvals.
 */
export const claimReviewRequirements: ReviewSignoffRequirement[] = [
  {
    id: "RREQ-DRC-CO-001-METHOD",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "method_review",
    accountableRole: "method_reviewer",
    required: true,
    rationale:
      "Confirm that the claim remains a methodological limit and does not overstate what production or trade data can establish.",
    publicSafeSummary:
      "Method review must confirm that the claim states a data limitation rather than product-level traceability.",
  },
  {
    id: "RREQ-DRC-CO-001-EVIDENCE",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "evidence_review",
    accountableRole: "evidence_steward",
    required: true,
    rationale:
      "Confirm the linked USGS and UN Comtrade records, their source-use posture, evidence roles, limitations, and freshness.",
    publicSafeSummary:
      "Evidence stewardship must confirm the linked sources, roles, limitations, and freshness.",
  },
  {
    id: "RREQ-DRC-CO-001-LANGUAGE",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "language_safety_review",
    accountableRole: "language_safety_reviewer",
    required: true,
    rationale:
      "Keep the wording non-adjudicatory and explicit that reported flows do not prove mine-to-product custody or company responsibility.",
    publicSafeSummary:
      "Language review must preserve non-adjudicatory, limitation-first wording.",
  },
  {
    id: "RREQ-DRC-CO-001-LEGAL",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "legal_review",
    accountableRole: "legal_posture_reviewer",
    required: true,
    rationale:
      "Confirm that the claim makes no finding of illegality, liability, ownership, origin, or responsibility for a shipment or product.",
    publicSafeSummary:
      "Legal-posture review must confirm that no liability, illegality, ownership, or origin finding is implied.",
  },
  {
    id: "RREQ-DRC-CO-001-ACCESS",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "access_governance_review",
    accountableRole: "access_governance_reviewer",
    required: true,
    rationale:
      "Confirm that only public aggregate source material and public-safe limitations are exposed.",
    publicSafeSummary:
      "Disclosure review must confirm that no restricted evidence or private review material is exposed.",
  },
  {
    id: "RREQ-DRC-CO-001-MAP",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "map_safety_review",
    accountableRole: "map_safety_reviewer",
    required: true,
    rationale:
      "Confirm that the methodological claim is not paired with sensitive mine, worker, community, ecological, or grievance locations.",
    publicSafeSummary:
      "Map-safety review must confirm that no sensitive location detail is introduced.",
  },
  {
    id: "RREQ-DRC-CO-001-ROR",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "right_of_reply_review",
    accountableRole: "right_of_reply_reviewer",
    required: true,
    rationale:
      "Record whether the general methodological wording remains non-actor-affecting or whether a changed version triggers notice and reply obligations.",
    publicSafeSummary:
      "Right-of-reply posture must be recorded for the exact claim version released.",
  },
  {
    id: "RREQ-DRC-CO-001-RELEASE",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-001",
    reviewType: "release_authority_review",
    accountableRole: "release_authority",
    required: true,
    rationale:
      "Approve or block the exact reviewed claim version and its limitations for manifest inclusion.",
    publicSafeSummary:
      "Release authority must approve the exact claim version and limitations used by the manifest.",
  },
  {
    id: "RREQ-DRC-CO-002-METHOD",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-002",
    reviewType: "method_review",
    accountableRole: "method_reviewer",
    required: true,
    rationale:
      "Confirm that the reported 55% share is faithfully derived from the cited USGS reserve rows and denominator for the exact edition under review.",
    publicSafeSummary:
      "Method review must confirm the estimate, denominator, edition, and bounded wording before release.",
  },
  {
    id: "RREQ-DRC-CO-002-EVIDENCE",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-002",
    reviewType: "evidence_review",
    accountableRole: "evidence_steward",
    required: true,
    rationale:
      "Confirm the DOI, commodity-sheet locator, lawful-use basis, confidence explanation, limitations, and stale-after posture.",
    publicSafeSummary:
      "Evidence stewardship must confirm provenance, source use, limitations, confidence, and freshness.",
  },
  {
    id: "RREQ-DRC-CO-002-LANGUAGE",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-002",
    reviewType: "language_safety_review",
    accountableRole: "language_safety_reviewer",
    required: true,
    rationale:
      "Keep the wording descriptive, attributed, non-certifying, and explicit that EEO did not independently measure reserves.",
    publicSafeSummary:
      "Language review must preserve attribution, uncertainty, and non-adjudicatory framing.",
  },
  {
    id: "RREQ-DRC-CO-002-LEGAL",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-002",
    reviewType: "legal_review",
    accountableRole: "legal_posture_reviewer",
    required: true,
    rationale:
      "Confirm that reserve concentration is presented as a sourced factual observation and not as a statement of ownership, entitlement, sovereignty, allocation, or legal responsibility.",
    publicSafeSummary:
      "Legal-posture review must confirm that the claim creates no ownership, entitlement, or liability inference.",
  },
  {
    id: "RREQ-DRC-CO-002-ACCESS",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-002",
    reviewType: "access_governance_review",
    accountableRole: "access_governance_reviewer",
    required: true,
    rationale:
      "Confirm that the national aggregate can be disclosed at the proposed tier without exposing restricted evidence, private reviewer reasoning, or sensitive supporting material.",
    publicSafeSummary:
      "Disclosure review must confirm that only public-safe national aggregate information is released.",
  },
  {
    id: "RREQ-DRC-CO-002-MAP",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-002",
    reviewType: "map_safety_review",
    accountableRole: "map_safety_reviewer",
    required: true,
    rationale:
      "Confirm that the claim remains national in granularity and is not paired with precise mine, community, concession, ecological, or vulnerable-site geography.",
    publicSafeSummary:
      "Map-safety review must confirm national granularity and no sensitive location disclosure.",
  },
  {
    id: "RREQ-DRC-CO-002-ROR",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-002",
    reviewType: "right_of_reply_review",
    accountableRole: "right_of_reply_reviewer",
    required: true,
    rationale:
      "Record whether right-of-reply is not required for the neutral aggregate wording or whether a changed actor-affecting version triggers notice and reply obligations.",
    publicSafeSummary:
      "Right-of-reply posture must be recorded for the exact claim version proposed for release.",
  },
  {
    id: "RREQ-DRC-CO-002-RELEASE",
    objectType: "claim",
    objectId: "CLAIM-DRC-CO-002",
    reviewType: "release_authority_review",
    accountableRole: "release_authority",
    required: true,
    rationale:
      "Approve or block the exact reviewed claim version for a separate release-manifest change after all preceding lanes are satisfied.",
    publicSafeSummary:
      "Release authority must approve the exact claim version before manifest inclusion.",
  },
];