import Link from "next/link";

import { claims } from "@/data/claims";
import { copperCobaltCorridorPilotSkeleton } from "@/data/corridorDossier";
import { copperCobaltPilotSourceMap } from "@/data/sourceMap";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";

export default function DossierPage() {
  const dossier = copperCobaltCorridorPilotSkeleton;
  const corrections = listCorrectionSubmissions();
  const governance = claims.map((claim) => getClaimCorrectionSummary(claim.id, corrections));

  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <header className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--eeo-muted)]">
            Public Evidence Prototype: Copper-Cobalt Corridor
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
            Map-safety posture: location detail may be restricted because publication could increase risk to communities,
            ecosystems, sensitive sites, or rights-protected knowledge.
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
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Claim list and governance posture</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            {claims.map((claim) => {
              const summary = governance.find((row) => row.claimId === claim.id);
              return (
                <li key={claim.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                  <p className="font-medium text-stone-900">{claim.id}</p>
                  <p>{claim.title}</p>
                  <p className="text-xs text-stone-600">
                    Governance: {summary?.governanceStatus.replaceAll("_", " ") ?? "stable"} · Linked corrections:{" "}
                    {summary?.linkedCorrections.length ?? 0}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Known exclusions and limitations</h2>
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
