import CorridorChain from "@/components/eeo/CorridorChain";

export default function CorridorPage() {
  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <header className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Corridor chain</h1>
          <p className="mt-2 leading-7 text-stone-700">
            The corridor chain is the reasoning spine of the prototype. It is not decorative: each node states knowns,
            unknowns, linked evidence, and inference risk.
          </p>
        </header>
        <CorridorChain />
      </div>
    </main>
  );
}
