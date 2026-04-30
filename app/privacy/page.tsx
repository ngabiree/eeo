import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function PrivacyPage() {
  const year = new Date().getFullYear();

  return (
    <InstitutionalArticle eyebrow="Privacy" title="Privacy notice">
      <p className="rounded-xl border border-[color:var(--eeo-border)] bg-white/60 px-4 py-3 text-xs leading-relaxed text-[color:var(--eeo-muted)]">
        This notice summarizes high-level expectations for the current public web surface. It is <strong>informational</strong> and not
        tailored legal advice for your jurisdiction. Production-scale processing requires a fuller record: retention tables, subprocessors,
        lawful bases, international transfer mechanisms, and escalation contacts—indexed from the{" "}
        <Link href="/trust" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Trust
        </Link>{" "}
        materials when published.
      </p>

      <section className="space-y-3" aria-labelledby="privacy-scope">
        <h2 id="privacy-scope" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Scope: pilot versus production
        </h2>
        <p>
          Today the site is <strong>predominantly informational</strong> and may include <strong>demonstration</strong> data and interfaces
          for review. Pilot deployments may use simplified persistence and hosting defaults. A future production privacy program should
          supersede pilot summaries with versioned policy documents and change logs.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="privacy-categories">
        <h2 id="privacy-categories" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Categories of information
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Technical and security logs</strong> typical of web hosting and edge delivery (for example request metadata, approximate
            geography, and abuse signals). Exact fields depend on the hosting provider and configuration.
          </li>
          <li>
            <strong>Voluntary submissions</strong> when you use public accountability routes (for example corrections intake), commonly
            including contact details and free-text narrative you provide. Where file-based persistence is enabled on a deploy, those
            records may be written to operator-controlled server storage for triage—not for public display by default.
          </li>
        </ul>
      </section>

      <section className="space-y-3" aria-labelledby="privacy-use">
        <h2 id="privacy-use" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Purposes
        </h2>
        <p>
          Processing supports operating the public site, securing it, triaging accountability submissions, and improving accessibility and
          stewardship posture. The Observatory does not use this surface to build marketing profiles or to sell personal data.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="privacy-retention">
        <h2 id="privacy-retention" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Retention (pilot)
        </h2>
        <p>
          Retention for logs and triage records should be governed by deploy environment policy and maintainership decisions. As of{" "}
          <strong>{year}</strong>, this page does not substitute for a published retention schedule; production programs should attach
          explicit schedules to governance documentation.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="privacy-rights">
        <h2 id="privacy-rights" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Rights and requests
        </h2>
        <p>
          Depending on your location, you may have rights to access, correct, delete, or restrict certain processing. This pilot notice does
          not determine which rights apply. Route requests via{" "}
          <Link href="/contact" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
            Contact
          </Link>{" "}
          with &ldquo;Privacy&rdquo; and enough detail to locate your submission without over-sharing sensitive identifiers in email.
        </p>
        <p className="text-[color:var(--eeo-muted)]">
          For readers in the <strong>EEA, UK, or similar regimes</strong>, lawful bases (where required) may include legitimate interests or
          public-interest documentation—stated here only as a <strong>non-binding orientation</strong>, not a determination of legal
          compliance.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="privacy-children">
        <h2 id="privacy-children" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Children
        </h2>
        <p>
          The Observatory is not directed at children under 13, and accountability submissions should not be used to collect children&apos;s
          personal data without appropriate authority and safeguards.
        </p>
      </section>

      <section className="space-y-3" aria-labelledby="privacy-changes">
        <h2 id="privacy-changes" className="text-base font-semibold text-[color:var(--eeo-ink)]">
          Changes
        </h2>
        <p>
          Material updates to public processing assumptions should be reflected in revised notice text with a dated change summary when
          production governance is active.
        </p>
      </section>
    </InstitutionalArticle>
  );
}
