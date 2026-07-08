import type { Claim } from "@/types/eeo";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const STALE_SOON_DAYS = 30;

export type ClaimFreshnessStatus =
  | "current"
  | "stale_soon"
  | "stale"
  | "invalid_review_dates";

export interface ClaimFreshnessAssessment {
  status: ClaimFreshnessStatus;
  lastReviewed: string;
  staleAfter: string;
  daysUntilStale: number | null;
  message: string;
}

function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.valueOf())) {
    return null;
  }

  return date;
}

function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function assessClaimFreshness(
  claim: Pick<Claim, "lastReviewed" | "staleAfter">,
  asOf: Date = new Date()
): ClaimFreshnessAssessment {
  const lastReviewed = parseDateOnly(claim.lastReviewed);
  const staleAfter = parseDateOnly(claim.staleAfter);
  const reviewDateSummary = `Last reviewed ${claim.lastReviewed}; stale after ${claim.staleAfter}.`;

  if (!lastReviewed || !staleAfter || staleAfter < lastReviewed) {
    return {
      status: "invalid_review_dates",
      lastReviewed: claim.lastReviewed,
      staleAfter: claim.staleAfter,
      daysUntilStale: null,
      message: `${reviewDateSummary} Review dates need correction before this claim can be treated as freshness-ready.`,
    };
  }

  const asOfDay = startOfUtcDay(asOf);
  const daysUntilStale = Math.ceil((staleAfter.getTime() - asOfDay.getTime()) / DAY_IN_MS);

  if (daysUntilStale < 0) {
    return {
      status: "stale",
      lastReviewed: claim.lastReviewed,
      staleAfter: claim.staleAfter,
      daysUntilStale,
      message: `${reviewDateSummary} This claim is stale and needs review before public release reliance.`,
    };
  }

  if (daysUntilStale <= STALE_SOON_DAYS) {
    return {
      status: "stale_soon",
      lastReviewed: claim.lastReviewed,
      staleAfter: claim.staleAfter,
      daysUntilStale,
      message: `${reviewDateSummary} This claim should be queued for review soon.`,
    };
  }

  return {
    status: "current",
    lastReviewed: claim.lastReviewed,
    staleAfter: claim.staleAfter,
    daysUntilStale,
    message: `${reviewDateSummary} This claim is within its current review window.`,
  };
}
