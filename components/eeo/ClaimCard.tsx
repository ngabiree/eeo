import Link from "next/link";

import { evidenceItems } from "@/data/evidence";
import { copperCobaltPilotSourceMap } from "@/data/sourceMap";
import { sources } from "@/data/sources";
import { canClaimBeApprovedForRelease, requiresRightOfReply } from "@/lib/publicationRules";
import {
  getClaimEvidenceCompleteness,
  getClaimIntegrityWarnings,
  getSourceLimitationsForClaim,
  type ClaimCorrectionSummary,
} from "@/lib/claimUtils";
import type { Claim } from "@/types/eeo";

import {
  ConfidenceBadge,
  EvidenceRoleBadge,
  ExposureRiskBadge,
  GovernanceStatusBadge,
  LegalPostureBadge,
  PublicationDecisionBadge,
  ReviewStatusBadge,
} from "./StatusBadges";

function governanceMessage(status: ClaimCorrectionSummary["governanceStatus"]): string {
  if (status === "challenged" || status === "under_review") {
    return "This claim has an active correction or review item.";
  }
  if (status === "corrected") {
    return "This claim has been revised following review.";
  }
  if (status === "restricted") {
    return "Some evidence or detail is restricted due to harm, rights, or legal review. This is a publication protection measure, not a legal finding.";
  }
  if (status === "withdrawn") {
    return "This claim should not be relied upon in its previous form. This is not a legal determination.";
  }
  return "No active correction items are currently linked to this claim.";
}

export default function ClaimCard({
  claim,
  correctionSummary,
}: {
  claim: Claim;
  correctionSummary: ClaimCorrectionSummary;
}) {
  const linkedEvidence = claim.evidenceLinks.map((link) => ({
    ...link,
    evidence: evidenceItems.find((item) => item.id === link.evidenceId),
  }));
  const warnings = getClaimIntegrityWarnings(claim);
  const releaseReady = canClaimBeApprovedForRelease(claim) && warnings.length === 0;
  const rightOfReplyApplies = requiresRightOfReply(claim);
  const completeness = getClaimEvidenceCompleteness(claim, evidenceItems, sources, copperCobaltPilotSourceMap);
  const sourceLimitations = getSourceLimitationsForClaim(claim.id, evidenceItems, sources, copperCobaltPilotSourceMap);

  return (
    <article className="eeo-claim-card space-y-4 p-6 backdrop-blur-sm md:p-7">
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--eeo-muted)]">{claim.id}</div>
        <h3 className="text-xl font-semibold tracking-tight text-[color:var(--eeo-ink)] md:text-2xl">{claim.title}</h3>
        <p className="leading-7 text-[color:var(--eeo-text)]">{claim.plainLanguageClaim}</p>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <p className="text-sm text-[color:var(--eeo-text)]">
          <strong>Claim type:</strong> {claim.claimType}
        </p>
        <p className="text-sm text-[color:var(--eeo-text)]">
          <strong>Corridor node:</strong> {claim.corridorNode}
        </p>
        <p className="text-sm text-[color:var(--eeo-text)] md:col-span-2">
          <strong>Right of reply:</strong> {claim.rightOfReplyStatus.replaceAll("_", " ")}
        </p>
        <p className="text-sm text-[color:var(--eeo-text)] md:col-span-2">
          <strong>Right-of-reply applicability:</strong>{" "}
          {rightOfReplyApplies ? "may apply for materially affected identifiable actors" : "not required for this claim form"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <ConfidenceBadge value={claim.confidence} />
        <ExposureRiskBadge value={claim.exposureRisk} />
        <PublicationDecisionBadge value={claim.publicationDecision} />
        <ReviewStatusBadge value={claim.reviewStatus} />
        <LegalPostureBadge value={claim.legalPosture} />
      </div>

      {!releaseReady ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <p className="font-semibold">This claim is not ready for public release.</p>
          {warnings.length ? (
            <p className="mt-1">Reason: {warnings.join(" ")}</p>
          ) : (
            <p className="mt-1">Reason: release requirements are not fully satisfied.</p>
          )}
        </div>
      ) : null}
      {!completeness.isComplete ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          This claim is not evidence-complete. It should not be treated as a substantive finding until linked evidence and source limitations are provided.
        </div>
      ) : null}

      {(correctionSummary.governanceStatus === "challenged" || correctionSummary.governanceStatus === "under_review") ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          This claim has an active correction or review item. Public text remains available, but users should review the claim limitations and current governance status.
        </div>
      ) : null}
      {correctionSummary.governanceStatus === "corrected" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          This claim has been corrected following review. Read the current claim text and limitations as the active public record.
        </div>
      ) : null}
      {correctionSummary.governanceStatus === "restricted" ? (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">
          This claim is under publication restriction for harm, rights, or legal-sensitivity reasons. This is a protective publication decision, not a legal finding.
        </div>
      ) : null}
      {correctionSummary.governanceStatus === "withdrawn" ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          This claim is marked withdrawn and should not be relied upon in its previous form. This is not a legal determination.
        </div>
      ) : null}

      <section className="rounded-2xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.75)] p-4">
        <h4 className="font-semibold text-[color:var(--eeo-ink)]">Claim governance</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          <GovernanceStatusBadge value={correctionSummary.governanceStatus} />
        </div>
        <div className="mt-2 space-y-1 text-sm text-[color:var(--eeo-text)]">
          <p>
            <strong>Linked corrections:</strong> {correctionSummary.linkedCorrections.length}
          </p>
          <p>
            <strong>Latest correction activity:</strong>{" "}
            {correctionSummary.latestCorrectionAt
              ? new Date(correctionSummary.latestCorrectionAt).toLocaleString()
              : "No linked correction activity"}
          </p>
          <p>{governanceMessage(correctionSummary.governanceStatus)}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="font-semibold text-[color:var(--eeo-ink)]">Evidence links</h4>
        <div className="space-y-2">
          {linkedEvidence.map(({ evidenceId, role, note, evidence }) => (
            <div key={evidenceId} className="rounded-2xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.75)] p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="font-mono text-xs text-[color:var(--eeo-muted)]">{evidenceId}</span>
                <EvidenceRoleBadge value={role} />
              </div>
              <p className="text-sm text-[color:var(--eeo-text)]">{evidence?.summary ?? "Evidence item not found in current release."}</p>
              {note ? <p className="mt-1 text-xs text-[color:var(--eeo-muted)]">note: {note}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[color:var(--eeo-border)] bg-[rgba(223,243,231,0.35)] p-4">
        <h4 className="font-semibold text-[color:var(--eeo-ink)]">Source limitations in this claim path</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[color:var(--eeo-text)]">
          {sourceLimitations.length > 0 ? (
            sourceLimitations.map((limitation) => <li key={limitation}>{limitation}</li>)
          ) : (
            <li>No source limitations linked yet for this claim.</li>
          )}
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <h4 className="font-semibold text-amber-950">What this does not prove</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900">
            {claim.whatThisDoesNotProve.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <h4 className="font-semibold text-blue-950">What would revise this claim</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-blue-900">
            {claim.whatWouldReviseThisClaim.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--eeo-border)] pt-3">
        <span className="text-xs text-[color:var(--eeo-muted)]">Last updated: {claim.lastUpdated}</span>
        <Link
          href="/pilot/corrections"
          className="rounded-full bg-[color:var(--eeo-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--eeo-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2"
        >
          Challenge or correct this claim
        </Link>
      </div>
    </article>
  );
}
