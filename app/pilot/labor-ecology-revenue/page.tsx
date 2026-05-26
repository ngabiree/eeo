import Link from "next/link";

import PilotRouteNav from "@/components/eeo/PilotRouteNav";

import EvidenceLedger from "@/components/eeo/EvidenceLedger";

export default function PilotLaborEcologyRevenuePage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <header className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Pilot labor, ecology, and revenue panel</h1>
          <p className="mt-2 leading-7 text-stone-700">
            This panel foregrounds evidence limitations: labor risk indicators, ecological signals, and public-revenue
            context are not interchangeable proof and should not be read as legal findings.
          </p>
        </header>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Interpretation guardrails</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-700">
            <li>Trade and production context does not establish product-level traceability.</li>
            <li>Labor indicators can be sectoral or national and may undercount informal work.</li>
            <li>Ecological proximity does not establish causation without additional evidence.</li>
            <li>Disclosed public revenue does not establish durable public benefit outcomes.</li>
          </ul>
        </section>

        <EvidenceLedger />

        <p className="text-sm text-stone-600">
          Continue to the{" "}
          <Link href="/pilot/methods-and-limits" className="underline">
            methods and limits
          </Link>{" "}
          page for evidence-layer and confidence interpretation.
        </p>
      </div>
    </main>
  );
}
