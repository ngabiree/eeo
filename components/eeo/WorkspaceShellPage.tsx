import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { isReviewAuthorizedFromCookies } from "@/lib/reviewAuth";

export default async function WorkspaceShellPage({ title }: { title: string }) {
  const cookieStore = await cookies();
  if (!isReviewAuthorizedFromCookies(cookieStore)) {
    redirect("/review/login");
  }

  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          Internal workspace demo — not connected to production evidence, review, release, legal, safeguards, or correction systems.
        </p>
        <p className="text-sm text-stone-700">
          Use <Link href="/review" className="underline">/review</Link> for the active internal review workspace.
        </p>
      </div>
    </main>
  );
}
