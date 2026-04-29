import PilotRouteNav from "@/components/eeo/PilotRouteNav";

export default function PilotSafeguardsPage() {
  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <h1 className="text-3xl font-semibold tracking-tight">Safeguards</h1>
        <p className="leading-7 text-stone-700">Universal knowledge does not require universal exposure.</p>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-950">
          This prototype does not publish sensitive community-submitted data without consent, sacred-site
          information, exact vulnerable ecological coordinates, or unverified allegations against identifiable persons.
        </div>
      </div>
    </main>
  );
}
