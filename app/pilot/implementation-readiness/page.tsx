import Link from "next/link";

import PilotRouteNav from "@/components/eeo/PilotRouteNav";
import {
  implementationPhases,
  implementationReadinessSummary,
  maintenanceCadences,
  readinessGates,
  riskControls,
} from "@/data/implementationFramework";
import type { ReadinessStatus } from "@/types/implementationFramework";

const statusLabel: Record<ReadinessStatus, string> = {
  complete: "Complete",
  in_progress: "In progress",
  blocked: "Blocked",
  deferred: "Deferred",
};

const statusClassName: Record<ReadinessStatus, string> = {
  complete: "border-emerald-200 bg-emerald-50 text-emerald-800",
  in_progress: "border-amber-200 bg-amber-50 text-amber-800",
  blocked: "border-rose-200 bg-rose-50 text-rose-800",
  deferred: "border-stone-200 bg-stone-50 text-stone-700",
};

function StatusBadge({ status }: { status: ReadinessStatus }) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClassName[status]}`}>
      {statusLabel[status]}
    </span>
  );
}

export default function ImplementationReadinessPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <PilotRouteNav />

        <header className="eeo-glass-card border-[color:var(--eeo-border)] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--eeo-muted)]">
            Implementation control plane
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--eeo-ink)]">
            Completion and maintenance readiness
          </h1>
          <p className="mt-3 max-w-4xl leading-7 text-[color:var(--eeo-text)]">
            This page turns the implementation framework into an inspectable pilot readiness surface. It is a governance
            and maintenance aid for the copper-cobalt corridor prototype, not a public release certificate, score, ranking,
            or legal finding.
          </p>
          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(implementationReadinessSummary).map(([status, count]) => (
              <div key={status} className="rounded-2xl border border-[color:var(--eeo-border)] bg-white/75 p-4">
                <p className="text-2xl font-semibold text-[color:var(--eeo-ink)]">{count}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[color:var(--eeo-muted)]">
                  {statusLabel[status as ReadinessStatus]}
                </p>
              </div>
            ))}
          </div>
        </header>

        <section className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-stone-950">Safe completion sequence</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-700">
                Completion means the corridor dossier can move through source, license, evidence, claim, review, exposure,
                right-of-reply where needed, release manifest, public dossier, and correction route. It does not mean a
                global atlas is complete.
              </p>
            </div>
            <Link href="/pilot/evidence-dossier" className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-800 hover:border-[color:var(--eeo-primary)]">
              Open dossier
            </Link>
          </div>
          <div className="mt-5 grid gap-4">
            {implementationPhases.map((phase) => (
              <article key={phase.id} className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">{phase.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-700">{phase.purpose}</p>
                  </div>
                  <StatusBadge status={phase.status} />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Deliverables</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-stone-700">
                      {phase.deliverables.map((deliverable) => (
                        <li key={deliverable}>{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Exit gate</p>
                    <p className="mt-2 text-sm leading-6 text-stone-700">{phase.exitGate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Doctrine boundary</p>
                    <p className="mt-2 text-sm leading-6 text-stone-700">{phase.doctrineBoundary}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-stone-950">Readiness gates</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-700">
            These gates convert the framework into blocking product rules. A blocked gate means the related public feature
            should remain contextual, synthetic, restricted, or deferred.
          </p>
          <div className="mt-5 grid gap-4">
            {readinessGates.map((gate) => (
              <article key={gate.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                      {gate.domain} · {gate.ownerRole}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-stone-950">{gate.title}</h3>
                  </div>
                  <StatusBadge status={gate.status} />
                </div>
                <div className="mt-4 grid gap-4 lg:grid-cols-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Evidence required</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-stone-700">
                      {gate.evidenceRequired.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Blocker rule</p>
                    <p className="mt-2 text-sm leading-6 text-stone-700">{gate.blockerRule}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Public UX implication</p>
                    <p className="mt-2 text-sm leading-6 text-stone-700">{gate.publicUxImplication}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Maintenance hook</p>
                    <p className="mt-2 text-sm leading-6 text-stone-700">{gate.maintenanceHook}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-stone-950">Maintenance cadences</h2>
            <div className="mt-5 space-y-4">
              {maintenanceCadences.map((cadence) => (
                <article key={cadence.id} className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                    {cadence.cadence} · {cadence.ownerRole}
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-stone-700">
                    {cadence.checks.map((check) => (
                      <li key={check}>{check}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm font-medium text-stone-800">Output: {cadence.output}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-stone-950">Risk controls</h2>
            <div className="mt-5 space-y-4">
              {riskControls.map((control) => (
                <article key={control.id} className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
                  <h3 className="font-semibold text-stone-950">{control.risk}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    <strong>Trigger:</strong> {control.trigger}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    <strong>Mitigation:</strong> {control.mitigation}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    <strong>Release gate:</strong> {control.releaseGate}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950 shadow-sm">
          <h2 className="text-xl font-semibold">Public-use limitation</h2>
          <p className="mt-2">
            This readiness page supports internal and public-interest review of the prototype. It does not approve a public
            release, certify the corridor, rank actors, determine legal responsibility, or activate live evidence workflows.
            Public launch still requires source licensing, review completion, exposure review, right-of-reply status where
            needed, a signed release manifest, and a live correction route.
          </p>
        </section>
      </div>
    </main>
  );
}
