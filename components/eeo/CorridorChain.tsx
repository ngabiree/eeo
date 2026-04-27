const corridorNodes = [
  "Endowment",
  "Jurisdiction",
  "Concession / Permit",
  "Operator",
  "Ownership / Control",
  "Extraction / Production",
  "Processing / Trade",
  "Labor Risk",
  "Ecological Signal",
  "Public Revenue",
  "Public Benefit Question",
  "Evidence Gap",
] as const;

type NodeDetail = {
  known: string;
  unknown: string;
  evidence: string;
  risk: string;
};

const DEFAULT_DETAIL: NodeDetail = {
  known: "Not yet established in this prototype.",
  unknown: "Pending source integration.",
  evidence: "Not yet linked.",
  risk: "Avoid inference without evidence.",
};

const NODE_DETAILS: Partial<Record<(typeof corridorNodes)[number], NodeDetail>> = {
  "Processing / Trade": {
    known: "Public production and trade datasets can show macro cobalt flow patterns.",
    unknown: "Product-level chain-of-custody linkage from mine to downstream goods.",
    evidence: "EVID-USGS-CO-001 and EVID-UNCOMTRADE-CO-001.",
    risk: "Overclaiming traceability beyond available evidence.",
  },
};

export default function CorridorChain() {
  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold text-stone-950">Corridor chain</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {corridorNodes.map((node, idx) => {
          const detail = NODE_DETAILS[node] ?? DEFAULT_DETAIL;
          return (
            <article key={node} className="rounded-3xl border border-stone-200 bg-white/80 p-4 shadow-sm">
              <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-stone-500">
                {idx + 1}. {node}
              </div>
              <dl className="space-y-2 text-sm text-stone-700">
                <div><dt className="font-semibold">Known:</dt><dd>{detail.known}</dd></div>
                <div><dt className="font-semibold">Unknown:</dt><dd>{detail.unknown}</dd></div>
                <div><dt className="font-semibold">Evidence:</dt><dd>{detail.evidence}</dd></div>
                <div><dt className="font-semibold">Risk:</dt><dd>{detail.risk}</dd></div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}
