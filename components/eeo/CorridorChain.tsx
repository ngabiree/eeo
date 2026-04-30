import { corridorNodes } from "@/data/corridorNodes";

export default function CorridorChain() {
  const releasedNodes = corridorNodes.filter((node) => node.id === "processing_trade");
  const unreleasedNodes = corridorNodes.filter((node) => node.id !== "processing_trade");

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold text-stone-950">Corridor chain</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {releasedNodes.map((node, idx) => {
          return (
            <article key={node.id} className="rounded-3xl border border-stone-200 bg-white/80 p-4 shadow-sm">
              <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
                {idx + 1}. {node.label}
              </div>
              <dl className="space-y-2 text-sm text-stone-700">
                <div><dt className="font-semibold">Known:</dt><dd>{node.known}</dd></div>
                <div><dt className="font-semibold">Unknown:</dt><dd>{node.unknown}</dd></div>
                <div><dt className="font-semibold">Evidence:</dt><dd>{node.evidence}</dd></div>
                <div><dt className="font-semibold">Risk:</dt><dd>{node.risk}</dd></div>
              </dl>
            </article>
          );
        })}
      </div>
      <article className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-stone-900">Records not yet released</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">
          Some corridor records are not yet public because source integration, review, or disclosure assessment is incomplete.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-stone-700 sm:grid-cols-2 lg:grid-cols-3">
          {unreleasedNodes.map((node) => (
            <li key={node.id} className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
              {node.label}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
