import type { Claim } from "@/types/eeo";
import type { AccessGovernanceDecision } from "@/types/accessGovernance";
import type {
  ReleaseGateAssessment,
  ReleaseGateBlocker,
  ReleaseGateCheck,
  ReleaseGateStatus,
} from "@/types/releaseGate";

export function getReleaseGateStatus(blockers: ReleaseGateBlocker[]): ReleaseGateStatus {
  return blockers.length > 0 ? "blocked" : "ready";
}

export function getAccessDecisionForObject(
  objectId: string,
  decisions: AccessGovernanceDecision[]
): AccessGovernanceDecision | undefined {
  return decisions.find((decision) => decision.objectId === objectId);
}

export function getClaimReleaseGateBlockers(params: {
  claim: Claim;
  accessDecision?: AccessGovernanceDecision;
  hasEvidence: boolean;
  hasSourceLimitations: boolean;
  rightOfReplySatisfied: boolean;
  mapSafetySatisfied: boolean;
  hasOpenCorrections: boolean;
}): ReleaseGateBlocker[] {
  const blockers: ReleaseGateBlocker[] = [];

  if (!params.hasEvidence) {
    blockers.push({
      type: "missing_evidence",
      message: "Claim cannot be released without linked evidence.",
      objectId: params.claim.id,
      publicSafeSummary: "Linked evidence is required before release.",
    });
  }

  if (!params.hasSourceLimitations) {
    blockers.push({
      type: "missing_source_limitations",
      message: "Claim cannot be released without visible source limitations.",
      objectId: params.claim.id,
      publicSafeSummary: "Source limitations are required before release.",
    });
  }

  if (!params.accessDecision) {
    blockers.push({
      type: "access_decision_missing",
      message: "Claim has no access-governance decision.",
      objectId: params.claim.id,
      publicSafeSummary: "Access-governance review is required before release.",
    });
  } else if (
    params.accessDecision.collectionProhibited ||
    !params.accessDecision.publicationAllowed ||
    params.accessDecision.accessTier === "not_collected"
  ) {
    blockers.push({
      type: "access_decision_blocks_publication",
      message: "Access-governance decision blocks public release.",
      objectId: params.claim.id,
      publicSafeSummary: "Publication is blocked by access-governance review.",
    });
  } else if (params.accessDecision.accessTier === "restricted") {
    blockers.push({
      type: "restricted_data_exposure",
      message: "Restricted access tier cannot be auto-promoted to public release.",
      objectId: params.claim.id,
      publicSafeSummary: "Restricted publication posture must be resolved before release.",
    });
  }

  if (!params.rightOfReplySatisfied) {
    blockers.push({
      type: "right_of_reply_unresolved",
      message: "Right-of-reply review is unresolved.",
      objectId: params.claim.id,
      publicSafeSummary: "Right-of-reply review must be resolved before release.",
    });
  }

  if (!params.mapSafetySatisfied) {
    blockers.push({
      type: "map_safety_unresolved",
      message: "Map-safety review is unresolved.",
      objectId: params.claim.id,
      publicSafeSummary: "Map-safety review must be resolved before release.",
    });
  }

  if (params.hasOpenCorrections) {
    blockers.push({
      type: "correction_unresolved",
      message: "Claim has open correction or review items.",
      objectId: params.claim.id,
      publicSafeSummary: "Open correction items must be resolved or disclosed before release.",
    });
  }

  if (params.claim.publicationDecision !== "publish" && params.claim.publicationDecision !== "publish_aggregated") {
    blockers.push({
      type: "publication_decision_blocks_release",
      message: "Claim publication decision blocks release.",
      objectId: params.claim.id,
      publicSafeSummary: "Publication decision currently blocks release.",
    });
  }

  return blockers;
}

export function makeReleaseGateCheck(params: {
  id: string;
  objectType: ReleaseGateCheck["objectType"];
  objectId: string;
  publicationDecision?: ReleaseGateCheck["publicationDecision"];
  reviewStatus?: ReleaseGateCheck["reviewStatus"];
  accessTier?: ReleaseGateCheck["accessTier"];
  requiredReviews: ReleaseGateCheck["requiredReviews"];
  completedReviews: ReleaseGateCheck["completedReviews"];
  blockers: ReleaseGateBlocker[];
  publicLimitations: string[];
  checkedAt: string;
  checkedBy: ReleaseGateCheck["checkedBy"];
  internalNotes?: string;
}): ReleaseGateCheck {
  return {
    id: params.id,
    objectType: params.objectType,
    objectId: params.objectId,
    status: getReleaseGateStatus(params.blockers),
    publicationDecision: params.publicationDecision,
    reviewStatus: params.reviewStatus,
    accessTier: params.accessTier,
    requiredReviews: params.requiredReviews,
    completedReviews: params.completedReviews,
    blockers: params.blockers,
    publicLimitations: params.publicLimitations,
    internalNotes: params.internalNotes,
    checkedAt: params.checkedAt,
    checkedBy: params.checkedBy,
  };
}

/**
 * Strips internal-only fields before any serialization to public routes or API responses.
 * Call this before returning a ReleaseGateCheck or ReleaseGateAssessment in a public handler.
 */
export function toPublicReleaseGateCheck(
  check: ReleaseGateCheck
): Omit<ReleaseGateCheck, "internalNotes"> {
  const { internalNotes: _internal, ...publicCheck } = check;
  return publicCheck;
}

export function toPublicReleaseGateAssessment(
  assessment: ReleaseGateAssessment
): Omit<ReleaseGateAssessment, "internalSummary"> & { checks: Omit<ReleaseGateCheck, "internalNotes">[] } {
  const { internalSummary: _internal, ...publicAssessment } = assessment;
  return {
    ...publicAssessment,
    checks: assessment.checks.map(toPublicReleaseGateCheck),
  };
}

export function assessReleaseGate(params: {
  id: string;
  releaseManifestId?: string;
  dossierId?: string;
  checks: ReleaseGateCheck[];
  publicSummary: string;
  assessedAt: string;
  assessedBy: ReleaseGateAssessment["assessedBy"];
  internalSummary?: string;
}): ReleaseGateAssessment {
  const readyObjectIds = params.checks.filter((check) => check.status === "ready").map((check) => check.objectId);
  const blockedObjectIds = params.checks.filter((check) => check.status === "blocked").map((check) => check.objectId);
  const needsReviewObjectIds = params.checks
    .filter((check) => check.status === "needs_review")
    .map((check) => check.objectId);

  const status: ReleaseGateStatus =
    blockedObjectIds.length > 0 ? "blocked" : needsReviewObjectIds.length > 0 ? "needs_review" : "ready";

  return {
    id: params.id,
    releaseManifestId: params.releaseManifestId,
    dossierId: params.dossierId,
    status,
    checks: params.checks,
    readyObjectIds,
    blockedObjectIds,
    needsReviewObjectIds,
    publicSummary: params.publicSummary,
    internalSummary: params.internalSummary,
    assessedAt: params.assessedAt,
    assessedBy: params.assessedBy,
  };
}
