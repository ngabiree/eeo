import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function GovernancePage() {
  return (
    <InstitutionalArticle eyebrow="Governance of the record" title="Transparency, stewardship, and authority">
      <p>
        “Governance” here describes how institutional decisions constrain what is shown in public evidence: tiers of disclosure,
        review posture, safeguards for retaliation or harm, and the separation between factual documentation and legal findings.
      </p>
      <p>
        The Observatory documents authority where it appears in reputable public sources—it does not replace sovereign institutions,
        courts, regulators, firms, communities, or land authorities. Publication choices should be read as methodological and
        safeguard-driven, not as endorsements of any license, concession arrangement, ownership structure, or trade relationship.
      </p>
      <p>
        For disclosure controls and withholding doctrine, see the{" "}
        <Link href="/disclosure-policy" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Disclosure Policy
        </Link>{" "}
        summary and{" "}
        <Link href="/pilot/safeguards" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Safeguards
        </Link>
        .
      </p>
    </InstitutionalArticle>
  );
}
