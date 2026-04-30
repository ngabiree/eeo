import PilotRouteNav from "@/components/eeo/PilotRouteNav";

export default function PilotMethodsLimitsPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <h1 className="text-3xl font-semibold tracking-tight">Methods and limits</h1>
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-[color:var(--eeo-muted)]">
          Public Evidence Prototype: Copper-Cobalt Corridor
        </p>
        <p className="leading-7 text-stone-700">
          This page frames how the pilot may reason — not what it has already proven. For the full definition of
          Earth&apos;s endowments, human capability vs inventorying people, and exposure guardrails, see the root{" "}
          <span className="font-mono text-xs">README.md</span> (sections on core identity and endowment definition).
        </p>
        <p className="leading-7 text-stone-700">
          The pilot distinguishes factual observations, methodological limits, risk indicators, analytical inferences,
          normative concerns, and legal findings. <strong>EEO makes no legal finding</strong> unless explicitly
          supported by authoritative legal or regulatory sources.
        </p>
        <section className="rounded-2xl border border-stone-200 bg-white/80 p-5 text-sm leading-6 text-stone-800 shadow-sm">
          <h2 className="text-base font-semibold text-stone-900">What this copper–cobalt pilot will not prove</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Product-level physical chain-of-custody or mine-to-gadget traceability.</li>
            <li>That a named consumer good contains copper or cobalt from a specific mine or jurisdiction.</li>
            <li>Legal liability, adjudicated harm, or certification of good/bad actors.</li>
            <li>Completeness of community, Indigenous, worker, or whistleblower knowledge without consent pathways.</li>
            <li>Planetary coverage or &ldquo;atlas&rdquo; completeness — analytical concern is wide; exposure is tiered.</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-stone-200 bg-white/80 p-5 text-sm leading-6 text-stone-800 shadow-sm">
          <h2 className="text-base font-semibold text-stone-900">What structured methods can support</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Transparent linking between claims, evidence roles, limitations, review status, and release manifests.</li>
            <li>Honest description of public datasets and standards the corridor may cite, evaluate, integrate, or defer.</li>
            <li>Documentation of evidence gaps where disclosure would be unsafe, incomplete, or contested.</li>
          </ul>
        </section>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Reported trade data does not establish physical chain-of-custody. Spatial proximity does not establish
          causation without additional evidence. Public revenue disclosure does not demonstrate durable public benefit
          outcomes on its own.
        </div>
        <p className="text-xs leading-relaxed text-[color:var(--eeo-muted)]">
          Knowledge-governance caution and right-of-reply discipline: <span className="font-mono">GOVERNANCE.md</span>,{" "}
          <span className="font-mono">docs/right-of-reply.md</span>, <span className="font-mono">docs/map-safety-protocol.md</span>, and{" "}
          <span className="font-mono">types/mapSafety.ts</span>.
        </p>
      </div>
    </main>
  );
}
