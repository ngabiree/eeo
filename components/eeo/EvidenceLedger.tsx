import Link from "next/link";

import { claims } from "@/data/claims";
import { evidenceItems } from "@/data/evidence";
import { sources } from "@/data/sources";
import { getDefaultPublicRecordStatus } from "@/lib/recordDisclosure";

import {
  EvidenceRoleBadge,
  PublicRecordStatusBadge,
  RecordModeBadge,
} from "./StatusBadges";

export default function EvidenceLedger() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">Evidence ledger</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Not all evidence supports a claim. Some evidence limits, contradicts, contextualizes, or motivates review.
          Every item below states what it can and cannot prove.
        </p>
      </div>

      <div className="space-y-4">
        {evidenceItems.map((item) => {
          const source = sources.find((s) => s.id === item.sourceId);
          return (
            <article key={item.id} className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500">{item.id}</span>
                <span className="rounded-full border border-stone-300 bg-stone-50 px-2.5 py-1 text-xs text-stone-700">
                  evidence class: {item.evidenceClass}
                </span>
                <RecordModeBadge value={item.recordMode} />
                <PublicRecordStatusBadge value={getDefaultPublicRecordStatus(item.recordMode)} />
              </div>

              <h3 className="text-lg font-semibold text-stone-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-700">{item.summary}</p>

              <div className="mt-4 grid gap-2 text-sm md:grid-cols-2">
                <p className="flex flex-wrap items-center gap-2">
                  <strong>Source:</strong> {source?.title}
                  {source ? <RecordModeBadge value={source.recordMode} /> : null}
                  {source ? (
                    <PublicRecordStatusBadge value={getDefaultPublicRecordStatus(source.recordMode)} />
                  ) : null}
                </p>
                <p><strong>Publisher:</strong> {source?.publisher}</p>
                <p><strong>Source type:</strong> {source?.sourceType}</p>
                <p><strong>Confidence contribution:</strong> {item.confidenceContribution}</p>
                <p><strong>Exposure risk:</strong> {item.exposureRisk}</p>
                <p><strong>Public status:</strong> {getDefaultPublicRecordStatus(item.recordMode).replaceAll("_", " ")}</p>
                <p><strong>Date accessed:</strong> {source?.accessedDate}</p>
                <p><strong>License status:</strong> {source?.licenseStatus}</p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-stone-900">Limitations</h4>
                <ul className="mt-1 list-disc pl-5 text-sm text-stone-700">
                  {item.limitations.map((limitation) => (
                    <li key={limitation}>{limitation}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-stone-900">Claims linked</h4>
                <div className="mt-2 space-y-2">
                  {item.claimLinks.map((link) => (
                    <div key={`${item.id}-${link.claimId}`} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-stone-600">{link.claimId}</span>
                        <EvidenceRoleBadge value={link.role} />
                      </div>
                      {link.note ? <p className="text-sm text-stone-700">{link.note}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="text-sm text-stone-600">
        Trace forward from evidence to claims in the <Link href="/corridors/copper-cobalt/dossier" className="underline">corridor dossier</Link>.
        Trace corrections in the <Link href="/corrections" className="underline">correction route</Link>.
      </p>

      <p className="text-xs text-stone-500">
        Claims currently in this release: {claims.map((c) => c.id).join(", ")}
      </p>
    </section>
  );
}
