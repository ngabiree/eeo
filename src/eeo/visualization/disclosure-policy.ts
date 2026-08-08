import type { DisclosureTier } from "../types";

const DISCLOSURE_ORDER = [
  "open",
  "contextual public",
  "aggregated",
  "verified access",
  "community-governed",
  "suppressed",
] as const satisfies readonly DisclosureTier[];

export interface DisclosureResolution {
  effectiveTier: DisclosureTier;
  hasUnknownTier: boolean;
}

function isDisclosureTier(value: unknown): value is DisclosureTier {
  return typeof value === "string" && DISCLOSURE_ORDER.includes(value as DisclosureTier);
}

export function resolveVisualDisclosureTier(
  underlyingTiers: unknown[],
  requestedTier: unknown
): DisclosureResolution {
  const tiers = [...underlyingTiers, requestedTier];
  if (tiers.some((tier) => !isDisclosureTier(tier))) {
    return { effectiveTier: "suppressed", hasUnknownTier: true };
  }

  return {
    effectiveTier: (tiers as DisclosureTier[]).reduce(
    (mostRestrictive, tier) =>
      DISCLOSURE_ORDER.indexOf(tier) > DISCLOSURE_ORDER.indexOf(mostRestrictive)
        ? tier
        : mostRestrictive,
    "open" as DisclosureTier
    ),
    hasUnknownTier: false,
  };
}
