import PilotRouteNav from "@/components/eeo/PilotRouteNav";

export default function PilotSafeguardsPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--eeo-ink)]">Safeguards</h1>
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-[color:var(--eeo-muted)]">
          Public Evidence Prototype: Copper-Cobalt Corridor
        </p>
        <p className="leading-7 text-[color:var(--eeo-text)]">
          EEO maintains <strong>universal analytical concern</strong>, not universal exposure. Broad public-interest
          insight does not require indiscriminate publication — rights-aware disclosure comes first.
        </p>
        <section className="rounded-2xl border border-stone-200 bg-white/80 p-5 text-sm leading-6 text-stone-800 shadow-sm">
          <h2 className="text-base font-semibold text-stone-900">Knowledge governance</h2>
          <p className="mt-2">
            Knowledge held by Indigenous peoples, local communities, workers, or customary institutions is{" "}
            <strong>not automatically public evidence</strong>. It may be described only under authority, consent,
            context, and benefit rules. Open data is not always just data — some knowledge should be open, aggregated,
            restricted, consent-governed, or not collected at all.
          </p>
          <p className="mt-3 text-xs text-stone-600">
            See <span className="font-mono">GOVERNANCE.md</span> for the full caution list (sacred sites, IEK, artisanal
            mining geographies, whistleblowers, contested claims, etc.).
          </p>
        </section>
        <section className="rounded-2xl border border-stone-200 bg-white/80 p-5 text-sm leading-6 text-stone-800 shadow-sm">
          <h2 className="text-base font-semibold text-stone-900">Map safety gate</h2>
          <p className="mt-2">
            A map layer must not ship merely because it can be rendered. Each layer requires exposure review for
            community, worker, Indigenous, sacred-site, species, habitat, and security risks. Review types live in{" "}
            <span className="font-mono">types/mapSafety.ts</span>; protocol notes in{" "}
            <span className="font-mono">docs/map-safety-protocol.md</span>. This milestone adds documentation and types
            only — no new map products.
          </p>
        </section>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-950">
          This release does not publish sensitive community-submitted data without consent, sacred-site information,
          exact vulnerable ecological coordinates, or unverified allegations against identifiable persons.
        </div>
      </div>
    </main>
  );
}
