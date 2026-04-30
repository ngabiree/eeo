import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function TrustIndexPage() {
  const year = new Date().getFullYear();

  return (
    <InstitutionalArticle eyebrow="Trust & assurance" title="Public trust materials">
      <p className="rounded-xl border border-[color:var(--eeo-border)] bg-white/60 px-4 py-3 text-xs leading-relaxed text-[color:var(--eeo-muted)]">
        Index of substantive public disclosures about accessibility, privacy, disclosure doctrine, and accountability routes.
        Institutional artifacts that require independent verification appear only when explicitly published—not implied by placeholders.
      </p>

      <section className="space-y-3" aria-labelledby="trust-published">
        <h2 id="trust-published" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Published disclosures
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed">
          <li>
            <Link href="/accessibility" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
              Accessibility statement
            </Link>{" "}
            — WCAG 2.2 Level AA engineering target and explicit audit boundary.
          </li>
          <li>
            <Link href="/privacy" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
              Privacy notice
            </Link>{" "}
            — pilot-scope processing summary and boundary on substantive production claims.
          </li>
          <li>
            <Link href="/disclosure-policy" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
              Disclosure Policy
            </Link>{" "}
            — public summary aligned to repository stewardship rules.
          </li>
          <li>
            <Link href="/pilot/corrections" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
              Corrections
            </Link>{" "}
            — public factual challenge route.
          </li>
          <li>
            <Link href="/right-of-reply" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
              Right of reply
            </Link>{" "}
            — civic procedural framing tied to corrections intake where applicable.
          </li>
        </ul>
      </section>

      <section className="space-y-3" aria-labelledby="trust-planned">
        <h2 id="trust-planned" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Planned conformance artifacts (not yet published)
        </h2>
        <p className="text-sm leading-relaxed">
          As of <strong>{year}</strong>, the following items are <strong>intentionally unfilled</strong> until maintainership attaches dated,
          authoritative documents—typically at or after production readiness—not during silent pilot posture.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-[color:var(--eeo-muted)]">
          <li>Independent WCAG conformance or accessibility audit summary (scope, date, evaluator, remediation link).</li>
          <li>Optional VPAT / Accessibility Conformance Report (ACR), only if warranted by procurement context.</li>
          <li>
            Expanded privacy appendix: definitive subprocessors, retention schedule, lawful bases ledger, jurisdictional annexes—only when processing stabilizes beyond pilot defaults.
          </li>
          <li>Operational security summary appropriate to publication (threat assumptions out of scope for this civic index).</li>
        </ul>
      </section>

      <section className="space-y-2 text-xs leading-relaxed text-[color:var(--eeo-muted)]">
        <p id="trust-version">
          <strong>Effective view:</strong> rolling; substantive edits should carry a dated change note inside the originating policy page when governance is mature.
        </p>
      </section>
    </InstitutionalArticle>
  );
}
