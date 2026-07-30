import type { ReviewSignoff } from "@/types/reviewSignoff";

/**
 * Governed review decisions used for release gating.
 *
 * Intentionally empty: no accountable human sign-off has been recorded in the
 * repository for the current claim candidates. Rehearsal-only examples remain
 * in `data/reviewSignoffExamples.ts` and must never satisfy a release gate.
 */
export const reviewSignoffs: ReviewSignoff[] = [];
