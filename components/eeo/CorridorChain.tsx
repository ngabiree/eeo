import { corridorNodes } from "@/data/corridorNodes";

export default function CorridorChain() {
  const releasedNodes = corridorNodes.filter((node) => node.id === "processing_trade");
  const unreleasedNodes = corridorNodes.filter((node) => node.id !== "processing_trade");

  return (
    <section className="eeo-section space-y-6">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--eeo-muted)]">Corridor</p>
        <h2 className="text-xl font-semibold tracking-tight text-[color:var(--eeo-ink)] md:text-2xl">Corridor chain</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--eeo-text)]">
          Nodes summarize what the public record can support at this stage—limits apply at each step.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {releasedNodes.map((node, idx) => {
          return (
            <article key={node.id} className="eeo-chain-node p-4 md:p-5">
              <div className="eeo-chain-node-inner space-y-3">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--eeo-muted)]">
                  {idx + 1}. {node.label}
                </div>
                <dl className="space-y-2 text-sm text-[color:var(--eeo-text)]">
                  <div>
                    <dt className="font-semibold text-[color:var(--eeo-ink)]">Known:</dt>
                    <dd>{node.known}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[color:var(--eeo-ink)]">Unknown:</dt>
                    <dd>{node.unknown}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[color:var(--eeo-ink)]">Evidence:</dt>
                    <dd>{node.evidence}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[color:var(--eeo-ink)]">Risk:</dt>
                    <dd>{node.risk}</dd>
                  </div>
                </dl>
              </div>
            </article>
          );
        })}
      </div>
      <article className="rounded-3xl border border-[color:var(--eeo-border)] bg-white/85 p-5 shadow-[0_10px_28px_rgba(19,66,74,0.06)] md:p-6">
        <h3 className="text-lg font-semibold text-[color:var(--eeo-ink)]">Records not yet released</h3>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--eeo-text)]">
          Some corridor records are not yet public because source integration, review, or disclosure assessment is incomplete.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-[color:var(--eeo-text)] sm:grid-cols-2 lg:grid-cols-3">
          {unreleasedNodes.map((node) => (
            <li key={node.id} className="rounded-xl border border-[color:var(--eeo-border)] bg-[rgba(223,243,231,0.4)] px-3 py-2">
              {node.label}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
