import type { ReactNode } from "react";

import { humanCapabilityProfile } from "@/data/humanCapabilityProfile";

import PilotRouteNav from "@/components/eeo/PilotRouteNav";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="eeo-glass-card space-y-4 border-[color:var(--eeo-border)] p-6">
      <h2 className="text-2xl font-semibold text-[color:var(--eeo-ink)]">{title}</h2>
      {children}
    </section>
  );
}

function formatToken(value: string) {
  return value.replaceAll("_", " ");
}

export default function HumanCapabilityPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10 md:px-6 md:py-14">
        <PilotRouteNav />
        <header className="eeo-glass-card space-y-5 border-[color:var(--eeo-border)] p-8 shadow-md md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--eeo-muted)]">
            Human Capability Layer
          </p>
          <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[color:var(--eeo-ink)] md:text-5xl">
            Humans are not resources. They are rights-bearing agents in relation to Earth&apos;s endowments.
          </h1>
          <p className="max-w-4xl text-lg leading-relaxed text-[color:var(--eeo-text)]">
            {humanCapabilityProfile.publicSummary}
          </p>
          <div className="rounded-2xl border border-[color:var(--eeo-border)] bg-white/60 p-4 text-sm leading-relaxed text-[color:var(--eeo-text)]">
            <strong>Doctrine:</strong> {humanCapabilityProfile.doctrine}
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-950">
            <strong>Operating principle:</strong> {humanCapabilityProfile.operatingPrinciple}
          </div>
        </header>

        <Section title="Core frame">
          <p className="leading-relaxed text-[color:var(--eeo-text)]">
            Earth&apos;s endowments become economic value through human capability: labor, knowledge, technology,
            care, law, institutions, imagination, and ecological relationship. Human dignity is the constraint; public
            capability is the return; ecological regeneration is the test; future life is the auditor.
          </p>
        </Section>

        <Section title="Capability indicators">
          <div className="grid gap-4 md:grid-cols-3">
            {humanCapabilityProfile.capabilityIndicators.map((indicator) => (
              <article
                key={indicator.id}
                className="rounded-2xl border border-[color:var(--eeo-border)] bg-white/70 p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--eeo-muted)]">
                  {formatToken(indicator.family)}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[color:var(--eeo-ink)]">{indicator.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--eeo-text)]">
                  {indicator.valueStatement}
                </p>
                <dl className="mt-4 grid gap-2 text-xs text-[color:var(--eeo-muted)]">
                  <div>
                    <dt className="font-semibold text-[color:var(--eeo-text)]">Geography</dt>
                    <dd>{indicator.geography}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[color:var(--eeo-text)]">Evidence basis</dt>
                    <dd>{indicator.sourceSummary}</dd>
                  </div>
                </dl>
                <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-950">
                  <strong>Limit:</strong> {indicator.limitation}
                </p>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Human-endowment relationships">
          <div className="grid gap-4 md:grid-cols-2">
            {humanCapabilityProfile.bioculturalRelations.map((relation) => (
              <article
                key={relation.id}
                className="rounded-2xl border border-[color:var(--eeo-border)] bg-white/70 p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--eeo-muted)]">
                  {formatToken(relation.relationType)}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[color:var(--eeo-ink)]">{relation.publicLabel}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--eeo-text)]">
                  {relation.publicSummary}
                </p>
                <dl className="mt-4 space-y-2 text-xs leading-relaxed text-[color:var(--eeo-muted)]">
                  <div>
                    <dt className="font-semibold text-[color:var(--eeo-text)]">Disclosure rule</dt>
                    <dd>{formatToken(relation.disclosureRule)}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[color:var(--eeo-text)]">Consent / authority</dt>
                    <dd>{relation.authorityOrConsentStatus}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[color:var(--eeo-text)]">Limitation</dt>
                    <dd>{relation.limitation}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Live evidence boundary">
          <div className="grid gap-4 md:grid-cols-2">
            {humanCapabilityProfile.liveEvidenceBoundaries.map((boundary) => (
              <article
                key={boundary.id}
                className="rounded-2xl border border-[color:var(--eeo-border)] bg-white/70 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[color:var(--eeo-ink)]">{boundary.workType}</h3>
                  <span className="rounded-full border border-[color:var(--eeo-border)] bg-white px-3 py-1 text-xs font-medium text-[color:var(--eeo-text)]">
                    {boundary.publicByDefault ? "Public by default" : "Private by default"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--eeo-text)]">
                  <strong>Belongs in:</strong> {boundary.belongsIn}
                </p>
                <p className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs leading-relaxed text-blue-950">
                  {boundary.rule}
                </p>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Constitutional red lines">
          <ul className="grid gap-3 md:grid-cols-2">
            {humanCapabilityProfile.redLines.map((line) => (
              <li
                key={line}
                className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-950"
              >
                {line}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </main>
  );
}
