import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function DisclosurePolicyPage() {
  return (
    <InstitutionalArticle eyebrow="Public policy" title="Disclosure Policy">
      <p className="font-medium text-[color:var(--eeo-ink)]">Universal knowledge does not require universal exposure.</p>
      <p>Mandatory controls for public-facing disclosures include:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Tiered disclosure for claims, evidence, and map layers.</li>
        <li>No publication of unverified allegations targeting identifiable persons as fact.</li>
        <li>No publication of sensitive community or sacred-site information.</li>
        <li>No publication of exact vulnerable ecological coordinates absent explicit public-safety rationale and review.</li>
        <li>No implication of legal findings without authoritative legal or regulatory basis.</li>
      </ul>
      <p>Product-facing constraints include avoiding global-atlas posture, composite scoring or certification claims, blockchain trust assertions, or automated adjudication over publication decisions.</p>
      <p>
        Maintainership publishes the authoritative policy text at the repository root as <code className="rounded bg-black/5 px-1 py-0.5 text-xs">DISCLOSURE_POLICY.md</code> —
        versioning follows repository history alongside public release notes where applicable.
      </p>
      <p>
        <Link href="/pilot/safeguards" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Safeguards
        </Link>{" "}
        describes tiers and harm-aware defaults aligned with these rules.
      </p>
    </InstitutionalArticle>
  );
}
