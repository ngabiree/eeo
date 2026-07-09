import Link from "next/link";

import { claims } from "@/data/claims";
import { copperCobaltCorridorPilotSkeleton } from "@/data/corridorDossier";
import { copperCobaltPilotSourceMap } from "@/data/sourceMap";
import { evidenceItems } from "@/data/evidence";
import { sources } from "@/data/sources";
import { canRenderPublicMapLayer } from "@/lib/mapSafety";
import { getClaimCorrectionSummary, getClaimEvidenceCompleteness } from "@/lib/claimUtils";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";

export default function DossierPage() {
  const dossier = copperCobaltCorridorPilotSkeleton;
  const corrections = listCorrectionSubmissions();
  const governance = claims.map((claim) => getClaimCorrectionSummary(claim.id, corrections));
  const claimCompleteness = claims.map((claim) =>
    getClaimEvidenceCompleteness(claim, evidenceItems, sources, copperCobaltPilotSourceMap)
  );
  const completeClaims = claimCompleteness.filter((row) => row.isComplete).length;
  const mapSafetyClassification = "generalized" as const;
  const mapLayerRenderable = canRenderPublicMapLayer(mapSafetyClassification);

  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <header className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--eeo-muted)]">
            Public Evidence Dossier: Copper-Cobalt Corridor
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--eeo-ink)]">{dossier.title}</h1>
          <p className="mt-3 leading-7 text-[color:var(--eeo-text)]">{dossier.scopeStatement}</p>
          <p className="mt-2 text-sm text-[color:var(--eeo-muted)]">
            Prototype structure only. This dossier view does not yet make substantive corridor assertions.
          </p>
        </header>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Core scope</h2>
          <div className="mt-3 grid gap-2 text-sm text-stone-700 md:grid-cols-2">
            <p>
              <strong>Corridor:</strong> {dossier.corridor}
            </p>
            <p>
              <strong>Endowment category:</strong> Non-regenerative critical mineral endowment (copper, cobalt)
            </p>
            <p>
              <strong>Commodity focus:</strong> {dossier.commodityFocus.join(", ")}
            </p>
            <p className="md:col-span-2">
              <strong>Geography:</strong> {dossier.geography}
            </p>
            <p>
              <strong>Release status:</strong> {dossier.releaseReadiness.replaceAll("_", " ")}
            </p>
            <p>
              <strong>Last updated:</strong> {new Date(dossier.lastUpdated).toLocaleString()}
            </p>
          </div>
          <p className="mt-4 text-xs text-stone-600">
            Map-safety posture: geographic detail is {mapSafetyClassification} for public release.{" "}
            {mapLayerRenderable
              ? "Location detail remains generalized to reduce exposure risk."
              : "Location detail restricted because publication could increase risk to communities, ecosystems, sensitive sites, or rights-protected knowledge."}
          </p>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Dossier sections</h2>
          <ul className="mt-3 space-y-3">
            {dossier.sections.map((section) => (
              <li key={section.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <p className="font-medium text-stone-900">{section.title}</p>
                <p className="text-xs uppercase tracking-[0.08em] text-stone-500">{section.status.replaceAll("_", " ")}</p>
                <p className="mt-2 text-sm text-stone-700">{section.summary}</p>
                {section.status === "not_started" ? (
                  <div className="mt-2 text-xs text-stone-600">
                    <p>Known: Not yet established in this prototype.</p>
                    <p>Unknown: Pending source integration.</p>
                    <p>Evidence: Not yet linked.</p>
                    <p>Risk: Avoid inference without evidence.</p>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Source map summary</h2>
          <p className="mt-2 text-sm text-stone-700">
            {copperCobaltPilotSourceMap.length} mapped source domains with explicit intended use and limitations.
          </p>
          <p className="mt-2 text-xs text-stone-600">
            EEO does not replace source hosts. It integrates, cites, compares, evaluates, defers, or explicitly does not
            duplicate.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            {copperCobaltPilotSourceMap
              .filter((entry) => (entry.linkedClaimIds ?? []).includes("CLAIM-DRC-CO-001"))
              .map((entry) => (
                <li key={entry.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                  <p className="font-medium text-stone-900">{entry.name}</p>
                  <p className="text-xs text-stone-600">
                    Used for: {(entry.usedFor ?? []).join("; ") || entry.whatItHelpsAnswer}
                  </p>
                  <p className="text-xs text-stone-600">
                    Source limitations: {(entry.sourceLimitations ?? entry.limitations).join(" ")}
                  </p>
                  <p className="text-xs text-stone-600">
                    Accessed: {entry.accessedDate ?? "Unknown"} · License: {entry.licenseStatus ?? "unknown"} · Publication:{" "}
                    {entry.publicationStatus ?? "unknown"}
                  </p>
                </li>
              ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Claim list and governance posture</h2>
          <p className="mt-2 text-sm text-stone-700">
            Evidence completeness: {completeClaims}/{claims.length} claims have linked evidence, linked sources, and
            source limitations.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            {claims.map((claim, idx) => {
              const summary = governance.find((row) => row.claimId === claim.id);
              const completeness = claimCompleteness[idx];
              return (
                <li key={claim.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                  <p className="font-medium text-stone-900">{claim.id}</p>
                  <p>{claim.title}</p>
                  <p className="text-xs text-stone-600">
                    Governance: {summary?.governanceStatus.replaceAll("_", " ") ?? "stable"} · Linked corrections:{" "}
                    {summary?.linkedCorrections.length ?? 0}
                  </p>
                  <p className="text-xs text-stone-600">
                    {completeness.isComplete
                      ? "Evidence-populated: This section has linked evidence and source limitations."
                      : "Partially evidence-populated: This section has some linked evidence but remains incomplete."}
                  </p>
                  {!completeness.isComplete ? (
                    <p className="mt-1 text-xs text-stone-600">
                      This claim is not evidence-complete. It should not be treated as a substantive finding until linked
                      evidence and source limitations are provided.
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Evidence completeness status by dossier section</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            {dossier.sections.map((section) => (
              <li key={section.id}>
                <strong>{section.title}:</strong>{" "}
                {section.linkedEvidenceIds.length > 0
                  ? "Evidence-populated: This section has linked evidence and source limitations."
                  : "Structure-only: This section is structurally defined but not yet evidence-populated. It should not be treated as a substantive finding."}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Known exclusions and limitations</h2>
          <p className="mt-2 text-sm text-stone-700">
            Includes: one low-exposure methodological claim path with linked evidence, linked sources, source
            limitations, correction route, governance status, and release-manifest context.
          </p>
          <p className="mt-1 text-sm text-stone-700">
            Excludes: product-level traceability findings, legal adjudication, sensitive location disclosure, new
            commodities, and new geographies.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-700">
            {dossier.nonGoals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
            {dossier.publicLimitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/pilot/corrections" className="underline">
            Correction route
          </Link>
          <Link href="/right-of-reply" className="underline">
            Right-of-reply route
          </Link>
          <Link href="/release" className="underline">
            Release manifest
          </Link>
        </div>
      </div>
    </main>
  );
}
