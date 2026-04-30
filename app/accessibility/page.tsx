import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function AccessibilityPage() {
  const year = new Date().getFullYear();

  return (
    <InstitutionalArticle eyebrow="Accessibility" title="Accessibility statement">
      <section className="space-y-3" aria-labelledby="a11y-target">
        <h2 id="a11y-target" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Conformance target
        </h2>
        <p>
          For substantive public pages, Earth Endowment Observatory treats{" "}
          <strong>Web Content Accessibility Guidelines (WCAG) 2.2, Level AA</strong> as the primary technical target for design and
          front-end implementation, where feasible for an informational civic site.
        </p>
        <p>
          Many United States federal accessibility expectations for information and communication technology are expressed in terms
          compatible with WCAG 2.x success criteria. This statement uses <strong>WCAG 2.2 AA</strong> as the engineering north star; it
          does <strong>not</strong> assert Section 508 certification, a Voluntary Product Accessibility Template (VPAT), or equivalent
          third-party attestation unless such a document is published alongside this page.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="a11y-status">
        <h2 id="a11y-status" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Conformance status and audit boundary
        </h2>
        <p>
          As of <strong>{year}</strong>, the Observatory does <strong>not</strong> publish an independent third-party accessibility audit
          report, WCAG conformance claim with full test evidence, or remediated issue register on this domain. Engineering and editorial
          practices aim toward the target above; gaps may remain, especially in rapidly iterated pilot interfaces, embedded media, and
          complex data tables.
        </p>
        <p>
          When a formal audit is completed, maintainership should link the report (or an equivalent public summary with scope, date, and
          contact) from this page or from an adjacent &ldquo;Trust&rdquo; index without removing this historical boundary language.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="a11y-measures">
        <h2 id="a11y-measures" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Measures in use (non-exhaustive)
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Visible keyboard focus styles on interactive controls where styles are controlled by the application shell.</li>
          <li>
            Respect for <code className="rounded bg-black/5 px-1 py-0.5 text-xs">prefers-reduced-motion</code> for atmospheric background
            layers (see site styles for <code className="rounded bg-black/5 px-1 py-0.5 text-xs">.eeo-bg-*</code>).
          </li>
          <li>Semantic page structure and institutional reading order on static content pages such as this statement.</li>
        </ul>
      </section>

      <section className="space-y-3" aria-labelledby="a11y-feedback">
        <h2 id="a11y-feedback" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Feedback and remediation
        </h2>
        <p>
          If you encounter a barrier—keyboard traps, insufficient contrast, missing names/labels, time-based content you cannot control, or
          other access failures—please report it via{" "}
          <Link href="/contact" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
            Contact
          </Link>{" "}
          with &ldquo;Accessibility&rdquo; noted in the message. Maintainership should triage serious blockers on a best-effort basis
          appropriate to pilot resourcing; production programs should publish a target response window.
        </p>
      </section>
    </InstitutionalArticle>
  );
}
