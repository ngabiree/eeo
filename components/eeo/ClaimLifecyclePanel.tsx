import type { ReactNode } from "react";
import Link from "next/link";

import { claims } from "@/data/claims";
import { entities } from "@/data/entities";
import { evidenceItems } from "@/data/evidence";
import { releaseManifest } from "@/data/releaseManifest";
import { sources } from "@/data/sources";

/**
 * Illustrative trace for one public claim using demonstration data.
 * Not a workflow engine, dashboard, or live evidence system.
 */
export default function ClaimLifecyclePanel() {
  const claim = claims[0];
  if (!claim) {
    return (
      <p className="text-sm text-[color:var(--eeo-muted)]">
        No demonstration claims are currently loaded in this pilot build.
      </p>
    );
  }

  const linkedEvidence = evidenceItems.filter((item) =>
    item.claimLinks.some((link) => link.claimId === claim.id)
  );
  const linkedSources = linkedEvidence
    .map((item) => sources.find((s) => s.id === item.sourceId))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const linkedEntities = claim.entityIds
    .map((id) => entities.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const steps: {
    id: string;
    title: string;
    illustrativeNote: string;
    body: ReactNode;
  }[] = [
    {
      id: "source",
      title: "Source",
      illustrativeNote:
        "Stewarded bibliographic records for official or third-party materials (demonstration rows only).",
      body: (
        <ul className="mt-2 space-y-2 text-sm text-[color:var(--eeo-text)]">
          {linkedSources.map((src) => (
            <li key={src.id} className="rounded-xl border border-[color:var(--eeo-border)] bg-white/70 px-3 py-2">
              <span className="font-mono text-xs text-[color:var(--eeo-muted)]">{src.id}</span>
              <span className="mx-2 text-[color:var(--eeo-muted)]">—</span>
              <span>{src.title}</span>
              <span className="mt-1 block text-xs text-[color:var(--eeo-muted)]">{src.publisher}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "license",
      title: "License / access posture",
      illustrativeNote:
        "Publication stance for each source (open, restricted, permission required). Not legal advice.",
      body: (
        <ul className="mt-2 space-y-2 text-sm text-[color:var(--eeo-text)]">
          {linkedSources.map((src) => (
            <li key={`${src.id}-lic`} className="rounded-xl border border-[color:var(--eeo-border)] bg-white/70 px-3 py-2">
              <span className="font-mono text-xs">{src.id}</span>
              <span className="mx-2">→</span>
              <strong>{src.licenseStatus}</strong>
              <span className="text-[color:var(--eeo-muted)]"> (sample field)</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "evidence",
      title: "Evidence items",
      illustrativeNote:
        "Structured extracts with roles, limitations, and exposure posture — not interchangeable proof.",
      body: (
        <ul className="mt-2 space-y-2 text-sm text-[color:var(--eeo-text)]">
          {linkedEvidence.map((ev) => (
            <li key={ev.id} className="rounded-xl border border-[color:var(--eeo-border)] bg-white/70 px-3 py-2">
              <div className="font-mono text-xs text-[color:var(--eeo-muted)]">{ev.id}</div>
              <div className="mt-1 font-medium">{ev.title}</div>
              <div className="mt-1 text-xs text-[color:var(--eeo-muted)]">
                Roles toward this claim:{" "}
                {ev.claimLinks
                  .filter((l) => l.claimId === claim.id)
                  .map((l) => l.role)
                  .join(", ")}
              </div>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "claim",
      title: "Claim",
      illustrativeNote: "Atomic public statement with explicit limits and review posture (sample claim).",
      body: (
        <div className="mt-2 rounded-xl border border-[color:var(--eeo-border)] bg-white/70 px-3 py-2 text-sm">
          <div className="font-mono text-xs text-[color:var(--eeo-muted)]">{claim.id}</div>
          <div className="mt-1 font-semibold text-[color:var(--eeo-ink)]">{claim.title}</div>
          <p className="mt-2 leading-relaxed">{claim.plainLanguageClaim}</p>
        </div>
      ),
    },
    {
      id: "entities",
      title: "Entity resolution",
      illustrativeNote:
        "How jurisdictions, resources, and actors are referenced without over-identifying sensitive parties (sample registry).",
      body: (
        <ul className="mt-2 space-y-2 text-sm text-[color:var(--eeo-text)]">
          {linkedEntities.map((ent) => (
            <li key={ent.id} className="rounded-xl border border-[color:var(--eeo-border)] bg-white/70 px-3 py-2">
              <span className="font-mono text-xs text-[color:var(--eeo-muted)]">{ent.id}</span>
              <span className="mx-2">—</span>
              {ent.name}
              <span className="ml-2 text-xs text-[color:var(--eeo-muted)]">({ent.entityType})</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "review",
      title: "Review (method / publication readiness)",
      illustrativeNote:
        "Illustrative placeholder — this build does not run a real review queue or legal clearance workflow.",
      body: (
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--eeo-text)]">
          Sample <strong>review status</strong> on this claim:{" "}
          <span className="font-mono">{claim.reviewStatus}</span>. Method and publication checks would gate release in
          a full system; here they are static fields on mock data.
        </p>
      ),
    },
    {
      id: "exposure",
      title: "Exposure review",
      illustrativeNote: "Harm, rights, and sensitivity posture before any public surfacing.",
      body: (
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--eeo-text)]">
          Sample <strong>exposure risk</strong>: <span className="font-mono">{claim.exposureRisk}</span>.{" "}
          <strong>Publication decision</strong>: <span className="font-mono">{claim.publicationDecision}</span>.
        </p>
      ),
    },
    {
      id: "ror",
      title: "Right of reply (if needed)",
      illustrativeNote: "When required by policy, affected parties may respond before release.",
      body: (
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--eeo-text)]">
          For this sample claim: <strong>right of reply</strong> is{" "}
          <span className="font-mono">{claim.rightOfReplyStatus}</span>
          {claim.rightOfReplyRequired ? " (required)" : " (not required for this illustrative row)"}.
        </p>
      ),
    },
    {
      id: "manifest",
      title: "Release manifest",
      illustrativeNote: "Bundle of what this pilot release includes and its stated limitations.",
      body: (
        <div className="mt-2 rounded-xl border border-[color:var(--eeo-border)] bg-white/70 px-3 py-2 text-sm">
          <div className="font-mono text-xs text-[color:var(--eeo-muted)]">{releaseManifest.id}</div>
          <div className="mt-1">
            <strong>Included claim IDs:</strong> {releaseManifest.includedClaimIds.join(", ") || "None"}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[color:var(--eeo-muted)]">
            {releaseManifest.exposureReviewSummary.length > 160
              ? `${releaseManifest.exposureReviewSummary.slice(0, 160)}…`
              : releaseManifest.exposureReviewSummary}
          </p>
        </div>
      ),
    },
    {
      id: "dossier",
      title: "Public evidence dossier",
      illustrativeNote: "Where approved claims are shown with evidence links and governance context.",
      body: (
        <p className="mt-2 text-sm">
          <Link
            href="/pilot/evidence-dossier"
            className="font-medium text-[color:var(--eeo-primary)] underline underline-offset-2 hover:text-[color:var(--eeo-primary-dark)]"
          >
            Open the pilot evidence dossier
          </Link>{" "}
          <span className="text-[color:var(--eeo-muted)]">(same sample claim cards)</span>
        </p>
      ),
    },
    {
      id: "corrections",
      title: "Correction route",
      illustrativeNote: "Public intake for challenges and corrections — triage is pilot-build only.",
      body: (
        <p className="mt-2 text-sm">
          <Link
            href="/pilot/corrections"
            className="font-medium text-[color:var(--eeo-primary)] underline underline-offset-2 hover:text-[color:var(--eeo-primary-dark)]"
          >
            Open the correction route
          </Link>
        </p>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="claim-lifecycle-heading"
      className="space-y-6 rounded-3xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.78)] p-6 shadow-sm backdrop-blur-sm"
    >
      <div>
        <h2 id="claim-lifecycle-heading" className="text-xl font-semibold text-[color:var(--eeo-ink)]">
          Demonstration-data claim lifecycle (one reviewed public claim)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--eeo-muted)]">
          Evidence lifecycle preview: demonstration data shows how identifiers chain from stewarded sources through evidence and
          review-shaped fields to the public dossier and correction route. This is not a public data release, legal
          finding surface, or global atlas.
        </p>
      </div>

      <ol className="relative space-y-0 border-l-2 border-[color:var(--eeo-border)] pl-6">
        {steps.map((step, index) => (
          <li key={step.id} className="relative pb-10 last:pb-0">
            <span
              className="absolute -left-[29px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-[color:var(--eeo-primary)] bg-white text-xs font-bold text-[color:var(--eeo-primary)]"
              aria-hidden
            >
              {index + 1}
            </span>
            <div className="rounded-2xl border border-[color:var(--eeo-border)] bg-white/80 px-4 py-3">
              <h3 className="text-base font-semibold text-[color:var(--eeo-ink)]">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[color:var(--eeo-muted)]">{step.illustrativeNote}</p>
              {step.body}
            </div>
          </li>
        ))}
      </ol>

      <p className="text-xs leading-relaxed text-[color:var(--eeo-muted)]">
        Canonical chain (visibility rule):{" "}
        <span className="font-mono text-[11px]">
          source → license → evidence → claim → entity resolution → review → exposure review → right-of-reply if needed
          → release manifest → public dossier → correction route
        </span>
        . See <code className="rounded bg-stone-100 px-1 py-0.5 text-[10px]">docs/mvp-evidence-loop.md</code> and the
        repository README (Canonical Specification).
      </p>
    </section>
  );
}
