import Link from "next/link";

import PilotRouteNav from "@/components/eeo/PilotRouteNav";

export default function GovernanceProfilePage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <h1 className="text-3xl font-semibold tracking-tight">Governance profile</h1>
        <p className="leading-7 text-stone-700">
          This corridor profile shows governance context through released claims and corridor notes. It does not make legal
          findings or claim adjudicatory authority.
        </p>
        <p className="text-sm text-stone-600">
          For claim-level governance posture, review the dossier and release manifest.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/pilot/evidence-dossier" className="underline">Open evidence dossier</Link>
          <Link href="/release" className="underline">Open release manifest</Link>
        </div>
      </div>
    </main>
  );
}
