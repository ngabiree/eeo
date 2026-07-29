import type { Claim, ReleaseDecision } from "@/types/eeo";

/**
 * Inert governance records for the observed copper-cobalt corridor claims.
 *
 * These records do not publish, withhold, restrict, correct, or withdraw a
 * claim at runtime. They make the current release posture explicit so a future
 * release manifest can account for every claim without inferring approval from
 * presence in the repository or UI.
 *
 * A disposition describes treatment within a manifest. It does not itself
 * authorize corridor publication; release authorization remains a separate
 * corridor-level gate.
 */
export const claimReleaseDispositions = [
  {
    claimId: "CLAIM-DRC-CO-001",
    disposition: "included",
    publicReason:
      "Included in the current draft bounded manifest as a low-exposure methodological claim explaining that reported production and trade data do not establish product-level origin.",
    decisionBasis:
      "The claim is marked approved for release, links to official and multilateral evidence, carries explicit source limits, and does not identify a person, community, site, shipment, or firm. Corridor release authorization remains pending.",
    requiredReviewLanes: [
      "method",
      "legal_posture",
      "exposure",
      "release_authorization",
    ],
    completedReviewLanes: ["method", "legal_posture", "exposure"],
    releaseManifestId: "REL-CC-001",
  },
  {
    claimId: "CLAIM-DRC-CO-002",
    disposition: "deferred",
    publicReason:
      "Not included in the current draft manifest. It remains eligible for a later bounded release after explicit manifest review and authorization.",
    decisionBasis:
      "Repository presence and an approved-for-release claim status do not by themselves authorize publication or manifest inclusion.",
    requiredReviewLanes: ["release_authorization"],
    completedReviewLanes: [],
  },
  {
    claimId: "CLAIM-DRC-CO-003",
    disposition: "deferred",
    publicReason:
      "Not included in the current draft manifest. Any later release must preserve the claim's non-adjudicatory legal and governance limitations.",
    decisionBasis:
      "The claim concerns governance context and must not imply enforcement findings, consent findings, legal adequacy, or wrongdoing by an identifiable actor.",
    requiredReviewLanes: ["legal_posture", "release_authorization"],
    completedReviewLanes: [],
  },
  {
    claimId: "CLAIM-DRC-CO-004",
    disposition: "deferred",
    publicReason:
      "Deferred while methodological review and source-limit treatment remain incomplete.",
    decisionBasis:
      "The claim remains in method review and uses national production context that cannot establish site-level output, formal or artisanal attribution, custody, labour conditions, or ecological causation.",
    requiredReviewLanes: ["method", "release_authorization"],
    completedReviewLanes: [],
  },
  {
    claimId: "CLAIM-DRC-CO-005",
    disposition: "deferred",
    publicReason:
      "Deferred while exposure review remains incomplete. Any later release must use a public-safe, non-identifying, and appropriately redacted posture.",
    decisionBasis:
      "The claim concerns labour-risk evidence involving potentially vulnerable people and locations. Exposure review must resolve aggregation, identification, retaliation, and misuse risk before any manifest inclusion.",
    requiredReviewLanes: ["exposure", "release_authorization"],
    completedReviewLanes: [],
  },
  {
    claimId: "CLAIM-DRC-CO-006",
    disposition: "deferred",
    publicReason:
      "Deferred while methodological review remains incomplete and the distinction between reported public revenue and demonstrated public benefit requires continued protection.",
    decisionBasis:
      "Reported revenue can support a public-interest question but cannot by itself establish distribution, service delivery, stewardship, or public benefit.",
    requiredReviewLanes: ["method", "release_authorization"],
    completedReviewLanes: [],
  },
  {
    claimId: "CLAIM-DRC-CO-007",
    disposition: "deferred",
    publicReason:
      "Not included in the current draft manifest. Any later release must retain evidence-gap language and avoid adjudicating ownership, control, or wrongdoing.",
    decisionBasis:
      "Incomplete public ownership disclosure supports an evidence-gap statement only. It does not establish improper ownership, legal non-compliance, or actual control by a specific actor.",
    requiredReviewLanes: ["legal_posture", "release_authorization"],
    completedReviewLanes: [],
  },
] as const satisfies readonly ReleaseDecision[];

export function getClaimReleaseDisposition(
  claimId: Claim["id"],
): ReleaseDecision | undefined {
  return claimReleaseDispositions.find(
    (disposition) => disposition.claimId === claimId,
  );
}
