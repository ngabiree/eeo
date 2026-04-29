import PilotRouteNav from "@/components/eeo/PilotRouteNav";

export default function PilotMethodsLimitsPage() {
  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <h1 className="text-3xl font-semibold tracking-tight">Methods and limits</h1>
        <p className="leading-7 text-stone-700">
          This pilot distinguishes between factual observations, methodological limits, risk indicators, analytical
          inferences, normative concerns, and legal findings.
        </p>
        <p className="leading-7 text-stone-700">
          EEO makes no legal finding unless explicitly supported by authoritative legal or regulatory sources.
        </p>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Reported trade data does not prove physical chain-of-custody. Spatial proximity does not prove causation.
          Public revenue does not prove durable public benefit.
        </div>
      </div>
    </main>
  );
}
