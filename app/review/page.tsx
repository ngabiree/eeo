import Link from "next/link";

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Review workspace</h1>
        <p className="leading-7 text-stone-700">
          Internal prototype workspace for method review, exposure review, and release discipline checks before public
          publication.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-stone-700">
          <li>Method review check</li>
          <li>Exposure review check</li>
          <li>Right-of-reply status check</li>
          <li>Release manifest sign-off check</li>
        </ul>
        <Link href="/release" className="text-sm underline">
          Open release manifest
        </Link>
      </div>
    </main>
  );
}
