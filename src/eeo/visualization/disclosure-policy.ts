import type { DisclosureTier } from "../types";

const DISCLOSURE_ORDER: DisclosureTier[] = [
  "open",
  "contextual public",
  "aggregated",
  "verified access",
  "community-governed",
  "suppressed",
];

export function maxDisclosureTier(tiers: DisclosureTier[]): DisclosureTier {
  return tiers.reduce(
    (mostRestrictive, tier) =>
      DISCLOSURE_ORDER.indexOf(tier) > DISCLOSURE_ORDER.indexOf(mostRestrictive)
        ? tier
        : mostRestrictive,
    "open" as DisclosureTier
  );
}

export function visualDisclosureTier(
  underlyingTiers: DisclosureTier[],
  requestedTier: DisclosureTier
): DisclosureTier {
  return maxDisclosureTier([...underlyingTiers, requestedTier]);
}
