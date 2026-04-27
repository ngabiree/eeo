export default function SafeguardsPage() {
  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Safeguards</h1>
        <p className="leading-7 text-stone-700">Universal knowledge does not require universal exposure.</p>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-950">
          <p className="font-semibold">The prototype must not publish:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>sensitive community-submitted data without consent;</li>
            <li>sacred-site information;</li>
            <li>exact coordinates of vulnerable ecological sites;</li>
            <li>whistleblower-identifying information;</li>
            <li>unverified allegations against identifiable persons;</li>
            <li>
              sensitive data that could increase risk to local communities, workers, Indigenous peoples, or endangered
              species.
            </li>
          </ul>
        </div>

        <p className="font-semibold text-stone-800">
          The chain must be made visible without making vulnerable people, places, species, or knowledge more
          vulnerable.
        </p>
      </div>
    </main>
  );
}
