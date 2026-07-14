import Link from "next/link";

/**
 * Static MVP evidence-chain visibility — not an interactive workflow engine.
 */
export default function EvidenceLoopPanel() {
  const steps = [
    "Source",
    "License",
    "Evidence",
    "Claim",
    "Entity resolution",
    "Review",
    "Exposure review",
    "Right-of-reply if needed",
    "Release manifest",
    "Public evidence dossier",
    "Correction route",
  ];

  return (
    <section
      aria-labelledby="evidence-loop-heading"
      className="rounded-3xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.78)] p-6 shadow-sm backdrop-blur-sm"
    >
      <h2 id="evidence-loop-heading" className="text-lg font-semibold text-[color:var(--eeo-ink)]">
        MVP publication chain (reference)
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[color:var(--eeo-muted)]">
        Prototype-only: synthetic sample data; no live evidence vault, durable audit log, or production release signing.
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[color:var(--eeo-text)]">
        {steps.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ol>
      <p className="mt-4 text-sm leading-relaxed text-[color:var(--eeo-text)]">
        <Link
          href="/pilot/claim-lifecycle"
          className="font-medium text-[color:var(--eeo-primary)] underline underline-offset-2 hover:text-[color:var(--eeo-primary-dark)]"
        >
          See one sample claim traced through the chain
        </Link>{" "}
        <span className="text-[color:var(--eeo-muted)]">(mock IDs only).</span>
      </p>
      <p className="mt-4 text-xs leading-relaxed text-[color:var(--eeo-muted)]">
        For the public methods, limits, and disclosure posture, use the Methods and Safeguards pages in this pilot.
      </p>
    </section>
  );
}
