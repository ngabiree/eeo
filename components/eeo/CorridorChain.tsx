import { corridorNodes } from "@/data/corridorNodes";

export default function CorridorChain() {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold text-stone-950">Corridor chain</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {corridorNodes.map((node, idx) => {
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
    </section>
  );
}
