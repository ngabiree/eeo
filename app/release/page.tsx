import Link from "next/link";

import ReleaseManifestPanel from "@/components/eeo/ReleaseManifest";

export default function ReleasePage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <header className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
            Release readiness
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Release manifest and publication gate</h1>
          <p className="mt-3 max-w-3xl leading-7 text-stone-700">
            This page shows whether the corridor record is structurally ready for public release. It connects the
            release manifest to evidence-operating checks, right-of-reply posture, correction status, source limitations,
            map-safety constraints, and public limitations.
          </p>
          <p className="mt-3 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            This is a publication-discipline surface. It does not certify truth, assign liability, verify product-level
            origin, approve legal sufficiency, or make legal findings.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/review" className="rounded-full border border-stone-300 bg-white px-4 py-2 font-medium text-stone-800 hover:bg-stone-50">
              Open review workspace
            </Link>
            <Link href="/pilot/evidence-dossier" className="rounded-full border border-stone-300 bg-white px-4 py-2 font-medium text-stone-800 hover:bg-stone-50">
              Open evidence dossier
            </Link>
            <Link href="/pilot/corrections" className="rounded-full border border-stone-300 bg-white px-4 py-2 font-medium text-stone-800 hover:bg-stone-50">
              Open corrections route
            </Link>
          </div>
        </header>

        <ReleaseManifestPanel />
      </div>
    </main>
  );
}
