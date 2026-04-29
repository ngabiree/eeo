import Link from "next/link";

import { evidenceItems } from "@/data/evidence";
import { canClaimBeApprovedForRelease } from "@/lib/publicationRules";
import { getClaimIntegrityWarnings, type ClaimCorrectionSummary } from "@/lib/claimUtils";
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

  return (
    <article className="space-y-4 rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500">{claim.id}</div>
        <h3 className="text-2xl font-semibold text-stone-950">{claim.title}</h3>
        <p className="leading-7 text-stone-700">{claim.plainLanguageClaim}</p>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <p className="text-sm text-stone-700">
          <strong>Claim type:</strong> {claim.claimType}
        </p>
        <p className="text-sm text-stone-700">
          <strong>Corridor node:</strong> {claim.corridorNode}
        </p>
        <p className="text-sm text-stone-700 md:col-span-2">
          <strong>Right-of-reply status:</strong> {claim.rightOfReplyStatus}
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

      {(correctionSummary.governanceStatus === "challenged" ||
        correctionSummary.governanceStatus === "under_review") ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          This claim has an active correction or review item. Public text remains available, but users should review
          the claim limitations and current governance status.
        </div>
      ) : null}
      {correctionSummary.governanceStatus === "corrected" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          This claim has been corrected following review. Read the current claim text and limitations as the active
          public record.
        </div>
      ) : null}
      {correctionSummary.governanceStatus === "restricted" ? (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900">
          This claim is under publication restriction for harm, rights, or legal-sensitivity reasons. This is a
          protective publication decision, not a legal finding.
        </div>
      ) : null}
      {correctionSummary.governanceStatus === "withdrawn" ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          This claim is marked withdrawn and should not be relied upon in its previous form. This is not a legal determination.
        </div>
      ) : null}

      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
        <h4 className="font-semibold text-stone-950">Claim governance</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          <GovernanceStatusBadge value={correctionSummary.governanceStatus} />
        </div>
        <div className="mt-2 space-y-1 text-sm text-stone-700">
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
        <h4 className="font-semibold text-stone-950">Evidence links</h4>
        <div className="space-y-2">
          {linkedEvidence.map(({ evidenceId, role, note, evidence }) => (
            <div key={evidenceId} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="font-mono text-xs text-stone-600">{evidenceId}</span>
                <EvidenceRoleBadge value={role} />
              </div>
              <p className="text-sm text-stone-700">{evidence?.summary ?? "Evidence item not found in current release."}</p>
              {note ? <p className="mt-1 text-xs text-stone-500">note: {note}</p> : null}
            </div>
          ))}
        </div>
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

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-3">
        <span className="text-xs text-stone-500">Last updated: {claim.lastUpdated}</span>
        <Link
          href="/pilot/corrections"
          className="rounded-full border border-stone-900 bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800"
        >
          Challenge or correct this claim
        </Link>
      </div>
    </article>
  );
}
