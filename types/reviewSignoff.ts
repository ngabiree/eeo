/**
 * v1.3 contract only — formal review sign-off record.
 *
 * Defines how EEO records that a specific review pass occurred for a specific object.
 * Does not introduce persistence, public UI, runtime enforcement, or release-manifest automation.
 */

import type { AccessObjectType } from "./accessGovernance";

/**
 * The nine formal review disciplines shipped for v1.3 sign-off modeling.
 * Aligns with RequiredReview where applicable; adds access_governance_review as its own sign-off lane.
 */
export type FormalReviewSignoffType =
  | "evidence_review"
  | "language_safety_review"
  | "map_safety_review"
  | "right_of_reply_review"
  | "access_governance_review"
  | "legal_review"
  | "labor_or_human_rights_review"
  | "ecological_review"
  | "press_review";

export type ReviewSignoffStatus =
  | "approved"
  | "blocked"
  | "conditioned"
  | "superseded"
  | "withdrawn"
  | "expired";

export interface ReviewSignoff {
  id: string;

  objectType: AccessObjectType;

  objectId: string;

  reviewType: FormalReviewSignoffType;

  status: ReviewSignoffStatus;

  /**
   * Conditions attached to approval (e.g., required wording changes, disclosure bullets).
   * Empty when none.
   */
  conditions: string[];

  /**
   * Safe for release-manifest or public limitation summaries when sign-offs are surfaced publicly.
   * Must not contain reviewer identity, private rationale, coordinates, or submitter information.
   */
  publicSafeSummary: string;

  /**
   * Internal only. Must not appear on public routes without explicit review.
   */
  internalNotes?: string;

  reviewedAt: string;

  /**
   * Attribution lane — not a personal name on public surfaces unless policy explicitly allows.
   */
  reviewedBy: "system_rule" | "reviewer" | "governance_protocol";

  /**
   * When set, this sign-off should be revisited before relying on it for publication.
   */
  expiresAt?: string;

  /**
   * Prior sign-off record replaced by this decision (same or refined scope).
   */
  supersedesSignoffId?: string;
}
