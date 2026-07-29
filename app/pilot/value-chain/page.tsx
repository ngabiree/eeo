import Link from "next/link";

import PilotRouteNav from "@/components/eeo/PilotRouteNav";

import CorridorChain from "@/components/eeo/CorridorChain";

export default function PilotValueChainPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <header className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Corridor value-chain view</h1>
          <p className="mt-2 leading-7 text-stone-700">
            This view traces the corridor reasoning spine from endowment to public-benefit question and evidence gap.
            It is a disciplined hypothesis map, not a legal adjudication or full chain-of-custody proof.
          </p>
        </header>
        <CorridorChain />
        <p className="text-sm text-stone-600">
          For claim-level evidence and limitations, open the{" "}
          <Link href="/pilot/evidence-dossier" className="underline">
            evidence dossier
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
