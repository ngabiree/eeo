export default function MethodsPage() {
  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Methods and limits</h1>
        <p className="leading-7 text-stone-700">
          This prototype distinguishes between:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-stone-700">
          <li>factual observations;</li>
          <li>methodological limits;</li>
          <li>risk indicators;</li>
          <li>analytical inferences;</li>
          <li>normative concerns;</li>
          <li>legal findings.</li>
        </ul>
        <p className="leading-7 text-stone-700">
          The prototype does not make legal findings unless explicitly supported by authoritative legal or regulatory
          sources.
        </p>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          EEO does not treat production data, trade data, ownership data, labor-risk data, ecological data, or media
          reports as interchangeable forms of proof. Each source type has different evidentiary limits.
        </div>
      </div>
    </main>
  );
}
