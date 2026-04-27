import ReleaseManifestPanel from "@/components/eeo/ReleaseManifest";

export default function ReleasePage() {
  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <header className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Release manifest</h1>
          <p className="mt-2 leading-7 text-stone-700">
            This is the release gate document for public claims. It states what is included, withheld, reviewed, and
            limited in this corridor release.
          </p>
        </header>
        <ReleaseManifestPanel />
      </div>
    </main>
  );
}
