import Link from "next/link";

import EvidenceLedger from "@/components/eeo/EvidenceLedger";
import PilotRouteNav from "@/components/eeo/PilotRouteNav";
import { PublicRecordStatusBadge, RecordModeBadge } from "@/components/eeo/StatusBadges";
import { evidenceItems } from "@/data/evidence";
import { sources } from "@/data/sources";
import { getDefaultPublicRecordStatus } from "@/lib/recordDisclosure";

export default function PilotEvidenceLedgerPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <header className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Evidence ledger</h1>
          <p className="mt-2 text-sm leading-6 text-stone-700">
            EEO does not treat production data, trade data, ownership data, labor-risk data, ecological data, or media
            reports as interchangeable forms of proof. Each source type has different evidentiary limits.
          </p>
        </header>

        <EvidenceLedger />

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Evidence roles and limitations</h2>
          <p className="mt-2 text-sm leading-6 text-stone-700">
            Evidence can support, limit, contradict, contextualize, or motivate review. Not all linked evidence is
            proof of a claim. Limitations are displayed for every evidence item and should be read before drawing
            conclusions.
          </p>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Source list</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            {sources.map((source) => (
              <li key={source.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span>{source.title} ({source.publisher}) — {source.sourceType}</span>
                  <RecordModeBadge value={source.recordMode} />
                  <PublicRecordStatusBadge value={getDefaultPublicRecordStatus(source.recordMode)} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[color:var(--eeo-muted)]">Evidence records in this ledger: {evidenceItems.length}</p>
        </section>

        <Link href="/corridors/copper-cobalt/dossier" className="text-sm underline">
          Back to claim cards
        </Link>
      </div>
    </main>
  );
}
