import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function ContactPage() {
  return (
    <InstitutionalArticle eyebrow="Contact" title="Contact the Observatory">
      <p>
        For factual corrections to published claims and related governance requests, prefer the Corrections intake so identifiers and evidence can be routed consistently:
      </p>
      <p>
        <Link href="/pilot/corrections" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Open Corrections / challenge route
        </Link>
      </p>
      <p>
        Other institutional inquiries—for example methodological questions, coordinated disclosure assessments, accessibility barriers, or operational security concerns unrelated to corrections—may be summarized by email channels published by institutional maintainership at the discretion of stewards reviewing release posture (not staffed as omnibus customer support).
      </p>
      <p className="text-[color:var(--eeo-muted)]">
        This page does not solicit sensitive personal narratives that could identify vulnerable people at actionable resolution unless you are using the Corrections pathway with stewardship-aware guidance.
      </p>
      <p>
        Policies &amp; trust index:{" "}
        <Link href="/trust" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Trust materials
        </Link>
        {" · "}
        <Link href="/privacy" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Privacy notice
        </Link>
        {" · "}
        <Link href="/accessibility" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Accessibility statement
        </Link>
        .
      </p>
    </InstitutionalArticle>
  );
}
