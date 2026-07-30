/**
 * v1.4 contract — formal review requirements and completed sign-off records.
 *
 * A requirement states which accountable review lane must be completed for a
 * specific object. A sign-off records that a review decision actually occurred.
 * Keeping these concepts separate prevents a required or prepared review from
 * being mistaken for approval.
 *
 * This contract does not introduce persistence, public UI, automatic approval,
 * reviewer identity disclosure, or release-manifest authorization.
 */

import type { AccessObjectType } from "./accessGovernance";

/**
 * Formal review disciplines available to claim, evidence, map, dossier, press,
 * and release-manifest governance.
 */
export type FormalReviewSignoffType =
  | "method_review"
  | "evidence_review"
  | "language_safety_review"
  | "map_safety_review"
  | "right_of_reply_review"
  | "access_governance_review"
  | "legal_review"
  | "labor_or_human_rights_review"
  | "ecological_review"
  | "press_review"
  | "release_authority_review";

export type FormalReviewAccountableRole =
  | "method_reviewer"
  | "evidence_steward"
  | "language_safety_reviewer"
  | "map_safety_reviewer"
  | "right_of_reply_reviewer"
  | "access_governance_reviewer"
  | "legal_posture_reviewer"
  | "labor_or_human_rights_reviewer"
  | "ecological_reviewer"
  | "press_reviewer"
  | "release_authority";

/**
 * A required review lane. This is not evidence that a review occurred.
 */
export interface ReviewSignoffRequirement {
  id: string;

  objectType: AccessObjectType;

  objectId: string;

  reviewType: FormalReviewSignoffType;

  accountableRole: FormalReviewAccountableRole;

  required: boolean;

  /**
   * Internal explanation of why the lane is required. Do not render publicly
   * without a separate language and disclosure review.
   */
  rationale: string;

  /**
   * Safe to expose in an internal reviewer-facing checklist and, if separately
   * approved, in a public release-limitation summary.
   */
  publicSafeSummary: string;
}

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
