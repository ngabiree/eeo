import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { isReviewAuthorizedFromCookies } from "@/lib/reviewAuth";

const workspaceRoutes = [
  {
    href: "/workspace/sources",
    label: "Sources",
    description: "Track source identity, access posture, freshness, and reuse limits.",
  },
  {
    href: "/workspace/licenses",
    label: "Licenses",
    description: "Review license/use basis before evidence or claims move toward release.",
  },
  {
    href: "/workspace/evidence",
    label: "Evidence",
    description: "Prepare evidence records with source links, limitations, and disclosure posture.",
  },
  {
    href: "/workspace/claims",
    label: "Claims",
    description: "Review claim text, confidence, legal posture, limits, and revision triggers.",
  },
  {
    href: "/workspace/entities",
    label: "Entities",
    description: "Track public-safe entity references without implying ownership or adjudication.",
  },
  {
    href: "/workspace/entity-resolution",
    label: "Entity Resolution",
    description: "Resolve names and identifiers conservatively before actor-affecting claims.",
  },
  {
    href: "/workspace/review",
    label: "Review",
    description: "Coordinate method review, evidence checks, and publication discipline.",
  },
  {
    href: "/workspace/exposure",
    label: "Exposure",
    description: "Review disclosure risk before anything sensitive becomes public.",
  },
  {
    href: "/workspace/right-of-reply",
    label: "Right of Reply",
    description: "Track reply posture for claims that may materially affect identifiable actors.",
  },
  {
    href: "/workspace/corrections",
    label: "Corrections",
    description: "Triage correction requests, challenges, and source updates.",
  },
  {
    href: "/workspace/releases",
    label: "Releases",
    description: "Prepare release candidates, manifest checks, and limitation summaries.",
  },
  {
    href: "/workspace/audit",
    label: "Audit",
    description: "Preserve internal review traceability without publishing sensitive notes.",
  },
];

const operatingLoop = [
  "source",
  "license",
  "evidence",
  "claim",
  "entity resolution",
  "review",
  "exposure review",
  "right-of-reply if needed",
  "release manifest",
  "public evidence dossier",
  "correction route",
];

export default async function WorkspaceShellPage({ title }: { title: string }) {
  const cookieStore = await cookies();
  if (!isReviewAuthorizedFromCookies(cookieStore)) {
    redirect("/review/login");
  }

  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 md:px-6">
        <header className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
            Internal workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-700">
            Internal workspace demo for evidence preparation, source discipline, exposure review,
            right-of-reply posture, correction handling, and release readiness. This area supports
            review before publication; it does not approve publication by itself.
          </p>
          <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
            Internal workspace demo — not connected to production evidence, review, release, legal,
            safeguards, or correction systems. Do not place raw evidence, personal data, legal review
            notes, restricted files, or sensitive geospatial data here.
          </p>
        </header>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-950">MVP evidence loop</h2>
          <p className="mt-2 text-sm leading-6 text-stone-700">
            Workspace routes should support the release path without expanding EEO into a court,
            ownership registry, certification product, ranking system, or public exposure engine.
          </p>
          <ol className="mt-4 grid gap-2 text-xs text-stone-700 md:grid-cols-3">
            {operatingLoop.map((step, index) => (
              <li
                key={step}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone-500">
                  Step {index + 1}
                </span>
                <p className="mt-1 font-medium capitalize text-stone-900">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Link
            href="/review"
            className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm hover:bg-stone-50"
          >
            <p className="text-sm font-semibold text-stone-950">Active review workspace</p>
            <p className="mt-2 text-xs leading-5 text-stone-600">
              Review correction queue, release governance recency, and evidence-operating checks.
            </p>
          </Link>
          <Link
            href="/release"
            className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm hover:bg-stone-50"
          >
            <p className="text-sm font-semibold text-stone-950">Release manifest</p>
            <p className="mt-2 text-xs leading-5 text-stone-600">
              Inspect publication-gate posture, limitations, correction status, and release readiness.
            </p>
          </Link>
          <Link
            href="/corridors/copper-cobalt/dossier"
            className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm hover:bg-stone-50"
          >
            <p className="text-sm font-semibold text-stone-950">Public evidence dossier</p>
            <p className="mt-2 text-xs leading-5 text-stone-600">
              Compare internal readiness against the public-safe dossier surface.
            </p>
          </Link>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-950">Workspace route map</h2>
          <p className="mt-2 text-sm leading-6 text-stone-700">
            These routes are internal scaffolds. They should remain restrained until governed backend
            storage, row-level security, audit logs, private buckets, and release-gated public views
            are available.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {workspaceRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4 hover:bg-white"
              >
                <p className="text-sm font-semibold text-stone-950">{route.label}</p>
                <p className="mt-1 font-mono text-[11px] text-stone-500">{route.href}</p>
                <p className="mt-2 text-xs leading-5 text-stone-600">{route.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-950">
          <h2 className="font-semibold">Internal red lines</h2>
          <p className="mt-2">
            Do not use the workspace to publish restricted evidence, expose vulnerable communities,
            create rankings, certify actors, make legal findings, imply physical-origin verification
            from trade data alone, or bypass correction and right-of-reply review.
          </p>
        </section>
      </div>
    </main>
  );
}
