import { accessDecisionExamples } from "@/data/accessDecisionExamples";
import { claims } from "@/data/claims";
import { copperCobaltCorridorPilotSkeleton } from "@/data/corridorDossier";
import { evidenceItems } from "@/data/evidence";
import { releaseManifest } from "@/data/releaseManifest";
import { copperCobaltPilotSourceMap } from "@/data/sourceMap";
import { sources } from "@/data/sources";
import { getClaimEvidenceCompleteness } from "@/lib/claimUtils";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";
import { canRenderPublicMapLayer } from "@/lib/mapSafety";
import { requiresRightOfReply } from "@/lib/publicationRules";
import {
  getAccessDecisionForObject,
  getClaimReleaseGateBlockers,
  getReleaseGateStatus,
  makeReleaseGateCheck,
} from "@/lib/releaseGate";
import type { AccessDecisionStatus, RequiredReview } from "@/types/accessGovernance";
import type { AccessGovernanceDecision } from "@/types/accessGovernance";
import type { Claim } from "@/types/eeo";
import type { MapSafetyClassification } from "@/types/mapSafety";
import type { ReleaseGateStatus } from "@/types/releaseGate";

const SAMPLE_CLAIM_ID = "CLAIM-DRC-CO-001";

function getRightOfReplySatisfied(claim: Claim): boolean {
  if (!requiresRightOfReply(claim)) return true;
  return claim.rightOfReplyStatus === "received" || claim.rightOfReplyStatus === "declined";
}

function getMapSafetySatisfied(
  claim: Claim,
  accessDecision: AccessGovernanceDecision | undefined
): boolean {
  if (accessDecision?.mapSafetyClass) {
    return canRenderPublicMapLayer(accessDecision.mapSafetyClass as MapSafetyClassification);
  }
  /** Prototype heuristic when no mapSafetyClass is set: low-exposure claims align with public-safe map posture. */
  return claim.exposureRisk === "low";
}

function inferPrototypeCompletedReviews(params: {
  required: RequiredReview[];
  hasEvidence: boolean;
  hasSourceLimitations: boolean;
  claimLanguageReviewProxy: boolean;
  mapSafetySatisfied: boolean;
  rightOfReplySatisfied: boolean;
}): RequiredReview[] {
  const done: RequiredReview[] = [];
  for (const review of params.required) {
    if (review === "evidence_review" && params.hasEvidence && params.hasSourceLimitations) {
      done.push(review);
    }
    if (review === "language_safety_review" && params.claimLanguageReviewProxy) {
      done.push(review);
    }
    if (review === "map_safety_review" && params.mapSafetySatisfied) {
      done.push(review);
    }
    if (review === "right_of_reply_review" && params.rightOfReplySatisfied) {
      done.push(review);
    }
  }
  return done;
}

function derivePreviewStatus(
  blockers: Parameters<typeof getReleaseGateStatus>[0],
  accessStatus?: AccessDecisionStatus
): ReleaseGateStatus {
  if (getReleaseGateStatus(blockers) === "blocked") return "blocked";
  if (accessStatus === "needs_review" || accessStatus === "draft") return "needs_review";
  return "ready";
}

/**
 * Protected review workspace only — do not import from public routes.
 * Uses v1.1 release-gate helpers; inputs are composed from existing stores and data.
 */
export default function ReleaseReadinessPreview() {
  const claim = claims.find((c) => c.id === SAMPLE_CLAIM_ID);
  const submissions = listCorrectionSubmissions();

  if (!claim) {
    return (
      <section className="rounded-3xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-950">
        <p className="font-semibold">Release readiness preview</p>
        <p className="mt-1">Sample claim {SAMPLE_CLAIM_ID} is not present in pilot data.</p>
      </section>
    );
  }

  const completeness = getClaimEvidenceCompleteness(
    claim,
    evidenceItems,
    sources,
    copperCobaltPilotSourceMap
  );
  const accessDecision = getAccessDecisionForObject(claim.id, accessDecisionExamples);
  const correctionsForClaim = submissions.filter((s) => s.claimId === claim.id);
  const openCorrectionCountForClaim = correctionsForClaim.filter((s) => s.triageStatus !== "resolved")
    .length;
  const hasOpenCorrections = openCorrectionCountForClaim > 0;
  const rightOfReplySatisfied = getRightOfReplySatisfied(claim);
  const mapSafetySatisfied = getMapSafetySatisfied(claim, accessDecision);

  const blockers = getClaimReleaseGateBlockers({
    claim,
    accessDecision,
    hasEvidence: completeness.hasEvidence,
    hasSourceLimitations: completeness.hasSourceLimitations,
    rightOfReplySatisfied,
    mapSafetySatisfied,
    hasOpenCorrections,
  });

  const previewStatus = derivePreviewStatus(blockers, accessDecision?.status);

  const claimLanguageReviewProxy = claim.reviewStatus === "approved_for_release";
  const completedReviews = inferPrototypeCompletedReviews({
    required: accessDecision?.requiredReviews ?? [],
    hasEvidence: completeness.hasEvidence,
    hasSourceLimitations: completeness.hasSourceLimitations,
    claimLanguageReviewProxy,
    mapSafetySatisfied,
    rightOfReplySatisfied,
  });

  const dossierSections = copperCobaltCorridorPilotSkeleton.sections.filter((section) =>
    section.linkedClaimIds.includes(SAMPLE_CLAIM_ID)
  );
  const inManifestIncluded = releaseManifest.includedClaimIds.includes(SAMPLE_CLAIM_ID);
  const inManifestWithheld = releaseManifest.withheldClaimIds.includes(SAMPLE_CLAIM_ID);

  const gateCheck = makeReleaseGateCheck({
    id: "RG-CHECK-DRC-CO-001-preview",
    objectType: "claim",
    objectId: claim.id,
    publicationDecision: claim.publicationDecision,
    reviewStatus: claim.reviewStatus,
    accessTier: accessDecision?.accessTier,
    requiredReviews: accessDecision?.requiredReviews ?? [],
    completedReviews,
    blockers,
    publicLimitations: claim.whatThisDoesNotProve,
    checkedAt: new Date().toISOString(),
    checkedBy: "system_rule",
  });

  /** Display only safe summaries — avoid raw blocker message text in UI. */
  const safeBlockerLines = gateCheck.blockers
    .map((b) => b.publicSafeSummary)
    .filter((line): line is string => Boolean(line));

  const pendingReviews = gateCheck.requiredReviews.filter((r) => !gateCheck.completedReviews.includes(r));

  return (
    <section className="rounded-3xl border border-stone-200 bg-white/80 p-4 text-sm text-stone-800 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-950">Release readiness preview</h2>
      <p className="mt-2 leading-6 text-stone-700">
        This internal preview applies the release-gate helper to the current sample claim and release package. It does
        not publish, approve, or adjudicate the claim. It helps reviewers see whether publication conditions appear
        satisfied or blocked.
      </p>
      <p className="mt-2 text-xs text-stone-500">
        Open corrections for this claim are derived from linked correction submissions in this prototype session (
        {hasOpenCorrections ? `${openCorrectionCountForClaim} open row(s)` : "none open"}).
        Required vs completed reviews use a prototype inference from evidence, map-safety, right-of-reply, and claim
        review-state signals — not a substitute for governance sign-off.
      </p>

      <dl className="mt-4 grid gap-2 text-xs md:grid-cols-2 md:gap-x-6">
        <div>
          <dt className="font-semibold text-stone-600">Claim</dt>
          <dd className="font-mono text-stone-900">{claim.id}</dd>
        </div>
        <div>
          <dt className="font-semibold text-stone-600">Title</dt>
          <dd className="text-stone-900">{claim.title}</dd>
        </div>
        <div>
          <dt className="font-semibold text-stone-600">Preview status</dt>
          <dd className="text-stone-900">{previewStatus}</dd>
          <dd className="mt-1 text-[11px] text-stone-500">Blockers-only helper status: {gateCheck.status}</dd>
        </div>
        <div>
          <dt className="font-semibold text-stone-600">Blockers</dt>
          <dd className="text-stone-900">{gateCheck.blockers.length}</dd>
        </div>
        <div className="md:col-span-2">
          <dt className="font-semibold text-stone-600">Public-safe blocker summaries</dt>
          <dd>
            {safeBlockerLines.length === 0 ? (
              <span className="text-stone-600">None</span>
            ) : (
              <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-800">
                {safeBlockerLines.map((line, index) => (
                  <li key={`${line}-${index}`}>{line}</li>
                ))}
              </ul>
            )}
          </dd>
        </div>
        <div className="md:col-span-2">
          <dt className="font-semibold text-stone-600">Required reviews (access decision)</dt>
          <dd className="text-stone-900">{gateCheck.requiredReviews.length === 0 ? "None recorded" : gateCheck.requiredReviews.join(", ")}</dd>
        </div>
        <div className="md:col-span-2">
          <dt className="font-semibold text-stone-600">Completed reviews (prototype inference)</dt>
          <dd className="text-stone-900">{completedReviews.length === 0 ? "None inferred" : completedReviews.join(", ")}</dd>
          {pendingReviews.length > 0 ? (
            <p className="mt-1 text-[11px] text-amber-800">Pending inferred: {pendingReviews.join(", ")}</p>
          ) : null}
        </div>
        <div className="md:col-span-2">
          <dt className="font-semibold text-stone-600">Public limitations (claim)</dt>
          <dd>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-800">
              {gateCheck.publicLimitations.slice(0, 4).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="md:col-span-2">
          <dt className="font-semibold text-stone-600">Evidence / source-limitation readiness</dt>
          <dd className="text-stone-900">
            Evidence linked: <strong>{completeness.hasEvidence ? "yes" : "no"}</strong>; source limitations surfaced:{" "}
            <strong>{completeness.hasSourceLimitations ? "yes" : "no"}</strong>; sources linked:{" "}
            <strong>{completeness.hasSources ? "yes" : "no"}</strong>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-stone-600">Access decision</dt>
          <dd className="text-stone-900">{accessDecision ? `present (${accessDecision.id})` : "none for example set"}</dd>
          <dd className="mt-1 text-[11px] text-stone-500">
            Public rationale is intentionally not surfaced here beyond presence; rely on `/docs/access-governance` and
            inert rehearsal data.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-stone-600">Right-of-reply</dt>
          <dd className="text-stone-900">
            {requiresRightOfReply(claim)
              ? `required — satisfied: ${rightOfReplySatisfied ? "yes" : "no"} (status: ${claim.rightOfReplyStatus})`
              : "not required (helper)"}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-stone-600">Map safety (preview)</dt>
          <dd className="text-stone-900">{mapSafetySatisfied ? "satisfied for this preview" : "not satisfied"}</dd>
          {accessDecision?.mapSafetyClass ? (
            <dd className="mt-1 text-[11px] text-stone-500">Example map-safety class: {accessDecision.mapSafetyClass}</dd>
          ) : (
            <dd className="mt-1 text-[11px] text-stone-500">No mapSafetyClass on example decision — using low-exposure heuristic.</dd>
          )}
        </div>
        <div>
          <dt className="font-semibold text-stone-600">Open corrections linked to claim</dt>
          <dd className="text-stone-900">{hasOpenCorrections ? "yes" : "no"}</dd>
        </div>
        <div className="md:col-span-2">
          <dt className="font-semibold text-stone-600">Release manifest relation</dt>
          <dd className="text-stone-900">
            Manifest <span className="font-mono">{releaseManifest.id}</span> ({releaseManifest.title}) — included:{" "}
            <strong>{inManifestIncluded ? "yes" : "no"}</strong>, withheld: <strong>{inManifestWithheld ? "yes" : "no"}</strong>
          </dd>
        </div>
        <div className="md:col-span-2">
          <dt className="font-semibold text-stone-600">Corridor dossier link (pilot skeleton)</dt>
          <dd className="text-stone-900">
            Linked sections:{" "}
            {dossierSections.length === 0
              ? "none"
              : dossierSections.map((s) => s.section).join(", ")}{" "}
            — dossier record <span className="font-mono">{copperCobaltCorridorPilotSkeleton.id}</span>
          </dd>
        </div>
      </dl>
    </section>
  );
}
