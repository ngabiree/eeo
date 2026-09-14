import type { GovernedReviewSignoff } from "@/types/reviewSignoff";

/**
 * Governed review decisions used for release gating.
 *
 * Intentionally empty: no accountable human sign-off has been recorded in the
 * repository for the current claim candidates. Rehearsal-only examples remain
 * in `data/reviewSignoffExamples.ts` and must never satisfy a release gate.
 *
 * Future records must carry immutable object-version and accountable-authority
 * bindings in addition to the base review decision fields.
 */
export const reviewSignoffs: GovernedReviewSignoff[] = [];
