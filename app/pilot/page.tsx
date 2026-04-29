import Link from "next/link";

import PilotRouteNav from "@/components/eeo/PilotRouteNav";

export default function PilotOverviewPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--eeo-ink)]">Pilot overview</h1>
        <p className="leading-7 text-[color:var(--eeo-text)]">
          This pilot walks the publication chain: stewarded sources through evidence and claims into review, release, and corrections.
          It is not a global atlas, certification scheme, adjudication portal, or marketing ranking surface.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/pilot/corridor" className="underline">
            Corridor (full observatory workspace)
          </Link>
          <Link href="/pilot/evidence-dossier" className="underline">Evidence dossier</Link>
          <Link href="/pilot/evidence-ledger" className="underline">Evidence ledger</Link>
          <Link href="/pilot/governance-profile" className="underline">Governance profile</Link>
          <Link href="/pilot/value-chain" className="underline">Value-chain view</Link>
          <Link href="/pilot/labor-ecology-revenue" className="underline">Labor / ecology / revenue</Link>
          <Link href="/pilot/methods-and-limits" className="underline">Methods and limits</Link>
          <Link href="/pilot/safeguards" className="underline">Safeguards</Link>
          <Link href="/pilot/corrections" className="underline">Corrections</Link>
        </div>
      </div>
    </main>
  );
}
