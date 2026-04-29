import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { isReviewAuthorizedFromCookies } from "@/lib/reviewAuth";

const WORKSPACE_ROUTES: { href: string; label: string; note: string }[] = [
  { href: "/workspace/sources", label: "Sources", note: "Source registry shell" },
  { href: "/workspace/licenses", label: "Licenses", note: "License review shell" },
  { href: "/workspace/evidence", label: "Evidence", note: "Evidence workspace shell" },
  { href: "/workspace/entities", label: "Entities", note: "Entity registry shell" },
  { href: "/workspace/entity-resolution", label: "Entity Resolution", note: "Identity matching shell" },
  { href: "/workspace/claims", label: "Claims", note: "Claim drafting shell" },
  { href: "/workspace/review", label: "Review", note: "Review queue shell" },
  { href: "/workspace/exposure", label: "Exposure", note: "Exposure review shell" },
  { href: "/workspace/right-of-reply", label: "Right of Reply", note: "ROR workflow shell" },
  { href: "/workspace/releases", label: "Releases", note: "Release assembly shell" },
  { href: "/workspace/corrections", label: "Corrections", note: "Correction inbox shell" },
  { href: "/workspace/audit", label: "Audit", note: "Audit log shell" },
];

export default async function WorkspaceIndexPage() {
  const cookieStore = await cookies();
  if (!isReviewAuthorizedFromCookies(cookieStore)) {
    redirect("/review/login");
  }

  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Workspace</h1>
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          Internal workspace demo — not connected to production evidence, review, release, legal, safeguards, or correction systems.
        </p>
        <p className="text-sm text-stone-700">
          Use <Link href="/review" className="underline">/review</Link> for the active internal review queue.
        </p>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WORKSPACE_ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm transition hover:border-stone-400"
            >
              <h2 className="text-base font-semibold text-stone-900">{route.label}</h2>
              <p className="mt-1 text-sm text-stone-600">{route.note}</p>
              <p className="mt-2 font-mono text-[11px] text-stone-500">{route.href}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
