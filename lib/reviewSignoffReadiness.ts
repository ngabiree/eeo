import type {
  ReviewSignoff,
  ReviewSignoffRequirement,
} from "@/types/reviewSignoff";

export type ReviewRequirementState =
  | "satisfied"
  | "pending"
  | "blocked"
  | "expired";

export interface ReviewRequirementAssessment {
  requirementId: string;
  objectType: ReviewSignoffRequirement["objectType"];
  objectId: string;
  reviewType: ReviewSignoffRequirement["reviewType"];
  accountableRole: ReviewSignoffRequirement["accountableRole"];
  state: ReviewRequirementState;
  signoffId?: string;
  conditions: string[];
  publicSafeSummary: string;
}

export interface ReviewSignoffReadinessAssessment {
  objectId: string;
  requiredCount: number;
  satisfiedCount: number;
  pendingCount: number;
  blockedCount: number;
  expiredCount: number;
  releaseEligible: boolean;
  requirements: ReviewRequirementAssessment[];
  publicSafeSummary: string;
}

const SATISFYING_STATUSES = new Set<ReviewSignoff["status"]>([
  "approved",
  "conditioned",
]);

const BLOCKING_STATUSES = new Set<ReviewSignoff["status"]>([
  "blocked",
  "withdrawn",
]);

function newestFirst(a: ReviewSignoff, b: ReviewSignoff): number {
  return Date.parse(b.reviewedAt) - Date.parse(a.reviewedAt);
}

function isExpired(signoff: ReviewSignoff, now: Date): boolean {
  if (signoff.status === "expired") return true;
  if (!signoff.expiresAt) return false;
  return Date.parse(signoff.expiresAt) <= now.getTime();
}

function assessRequirement(params: {
  requirement: ReviewSignoffRequirement;
  signoffs: ReviewSignoff[];
  now: Date;
}): ReviewRequirementAssessment {
  const matchingSignoffs = params.signoffs
    .filter(
      (signoff) =>
        signoff.objectType === params.requirement.objectType &&
        signoff.objectId === params.requirement.objectId &&
        signoff.reviewType === params.requirement.reviewType &&
        signoff.status !== "superseded"
    )
    .sort(newestFirst);

  const latest = matchingSignoffs[0];

  if (!latest) {
    return {
      requirementId: params.requirement.id,
      objectType: params.requirement.objectType,
      objectId: params.requirement.objectId,
      reviewType: params.requirement.reviewType,
      accountableRole: params.requirement.accountableRole,
      state: "pending",
      conditions: [],
      publicSafeSummary: params.requirement.publicSafeSummary,
    };
  }

  if (isExpired(latest, params.now)) {
    return {
      requirementId: params.requirement.id,
      objectType: params.requirement.objectType,
      objectId: params.requirement.objectId,
      reviewType: params.requirement.reviewType,
      accountableRole: params.requirement.accountableRole,
      state: "expired",
      signoffId: latest.id,
      conditions: latest.conditions,
      publicSafeSummary:
        latest.publicSafeSummary || params.requirement.publicSafeSummary,
    };
  }

  if (BLOCKING_STATUSES.has(latest.status)) {
    return {
      requirementId: params.requirement.id,
      objectType: params.requirement.objectType,
      objectId: params.requirement.objectId,
      reviewType: params.requirement.reviewType,
      accountableRole: params.requirement.accountableRole,
      state: "blocked",
      signoffId: latest.id,
      conditions: latest.conditions,
      publicSafeSummary:
        latest.publicSafeSummary || params.requirement.publicSafeSummary,
    };
  }

  if (SATISFYING_STATUSES.has(latest.status)) {
    return {
      requirementId: params.requirement.id,
      objectType: params.requirement.objectType,
      objectId: params.requirement.objectId,
      reviewType: params.requirement.reviewType,
      accountableRole: params.requirement.accountableRole,
      state: "satisfied",
      signoffId: latest.id,
      conditions: latest.conditions,
      publicSafeSummary:
        latest.publicSafeSummary || params.requirement.publicSafeSummary,
    };
  }

  return {
    requirementId: params.requirement.id,
    objectType: params.requirement.objectType,
    objectId: params.requirement.objectId,
    reviewType: params.requirement.reviewType,
    accountableRole: params.requirement.accountableRole,
    state: "pending",
    signoffId: latest.id,
    conditions: latest.conditions,
    publicSafeSummary:
      latest.publicSafeSummary || params.requirement.publicSafeSummary,
  };
}

export function assessReviewSignoffReadiness(params: {
  objectId: string;
  requirements: ReviewSignoffRequirement[];
  signoffs: ReviewSignoff[];
  now?: Date;
}): ReviewSignoffReadinessAssessment {
  const now = params.now ?? new Date();
  const applicableRequirements = params.requirements.filter(
    (requirement) => requirement.objectId === params.objectId && requirement.required
  );

  const requirements = applicableRequirements.map((requirement) =>
    assessRequirement({ requirement, signoffs: params.signoffs, now })
  );

  const satisfiedCount = requirements.filter(
    (requirement) => requirement.state === "satisfied"
  ).length;
  const pendingCount = requirements.filter(
    (requirement) => requirement.state === "pending"
  ).length;
  const blockedCount = requirements.filter(
    (requirement) => requirement.state === "blocked"
  ).length;
  const expiredCount = requirements.filter(
    (requirement) => requirement.state === "expired"
  ).length;
  const releaseEligible =
    requirements.length > 0 &&
    satisfiedCount === requirements.length &&
    pendingCount === 0 &&
    blockedCount === 0 &&
    expiredCount === 0;

  return {
    objectId: params.objectId,
    requiredCount: requirements.length,
    satisfiedCount,
    pendingCount,
    blockedCount,
    expiredCount,
    releaseEligible,
    requirements,
    publicSafeSummary: releaseEligible
      ? "All required review lanes have current approved or conditioned sign-offs. Manifest inclusion remains a separate release-authority action."
      : "One or more required review lanes remain pending, blocked, or expired. The object is not eligible for manifest inclusion.",
  };
}
