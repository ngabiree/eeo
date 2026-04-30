import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function PrivacyPage() {
  return (
    <InstitutionalArticle eyebrow="Privacy" title="Privacy notice">
      <p>
        This site is predominantly informational and demonstration-oriented during pilot phases. Typical processing may include standard
        web hosting logs (for example HTTP requests and approximate geography at the CDN edge) and voluntary information you submit through
        public channels such as corrections intake.
      </p>
      <p>
        The Observatory publishes with harm-aware defaults: it does not attempt to assemble sensitive dossiers about individuals through
        the public ledger, and it discourages uploading sensitive identifiers in free-text fields intended for factual corrections unless
        that submission is expressly necessary for accountability and lawful.
      </p>
      <p>
        Detailed processor practices, retention windows, lawful bases where applicable (for jurisdictions that use them), subprocessors,
        and escalation contacts should accompany any production-era personal-data processing—not implied by this summarized notice alone.
      </p>
      <p>
        Questions: route via the{" "}
        <Link href="/contact" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Contact
        </Link>{" "}
        page noting “Privacy.”
      </p>
    </InstitutionalArticle>
  );
}
