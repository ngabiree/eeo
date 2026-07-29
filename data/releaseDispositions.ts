import type { Claim } from "@/types/eeo";

export type ReleaseDispositionStatus =
  | "included"
  | "withheld"
  | "restricted"
  | "challenged"
  | "corrected"
  | "withdrawn"
  | "deferred";

export interface ClaimReleaseDisposition {
  claimId: Claim["id"];
  status: ReleaseDispositionStatus;
  publicReason: string;
  manifestId?: string;
  decidedAt?: string;
}

/**
 * Inert governance records for the observed copper-cobalt corridor claims.
 *
 * These records do not publish, withhold, restrict, correct, or withdraw a
 * claim at runtime. They make the current release posture explicit so a future
 * release manifest can account for every claim without inferring approval from
 * presence in the repository or UI.
 */
export const claimReleaseDispositions = [
  {
    claimId: "CLAIM-DRC-CO-001",
    status: "included",
    publicReason:
      "Included in the current bounded release as a low-exposure methodological claim explaining that reported production and trade data do not establish product-level origin.",
    manifestId: "RELEASE-DRC-CO-001",
  },
  {
    claimId: "CLAIM-DRC-CO-002",
    status: "deferred",
    publicReason:
      "Not included in the current release manifest. It remains eligible for a later bounded release after explicit manifest review and approval.",
  },
  {
    claimId: "CLAIM-DRC-CO-003",
    status: "deferred",
    publicReason:
      "Not included in the current release manifest. Any later release must preserve the claim's non-adjudicatory legal and governance limitations.",
  },
  {
    claimId: "CLAIM-DRC-CO-004",
    status: "deferred",
    publicReason:
      "Deferred while methodological review and source-limit treatment remain incomplete.",
  },
  {
    claimId: "CLAIM-DRC-CO-005",
    status: "deferred",
    publicReason:
      "Deferred while exposure review remains incomplete. Any later release must use a public-safe, non-identifying, and appropriately redacted posture.",
  },
  {
    claimId: "CLAIM-DRC-CO-006",
    status: "deferred",
    publicReason:
      "Deferred while methodological review remains incomplete and the distinction between reported public revenue and demonstrated public benefit requires continued protection.",
  },
  {
    claimId: "CLAIM-DRC-CO-007",
    status: "deferred",
    publicReason:
      "Not included in the current release manifest. Any later release must retain evidence-gap language and avoid adjudicating ownership, control, or wrongdoing.",
  },
] as const satisfies readonly ClaimReleaseDisposition[];

export function getClaimReleaseDisposition(
  claimId: Claim["id"],
): ClaimReleaseDisposition | undefined {
  return claimReleaseDispositions.find(
    (disposition) => disposition.claimId === claimId,
  );
}
