import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function StewardshipPage() {
  return (
    <InstitutionalArticle eyebrow="Stewardship" title="Precaution for people, ecosystems, and the public record">
      <p>
        Stewardship commits the Observatory to conservative publication where harm exposure is plausible: withheld or generalized sites,
        delayed publication where safety is uncertain, and aggregation where individual or community identifiers would increase risk.
      </p>
      <p>
        Natural wealth is intertwined with sovereignty, customary knowledge, livelihoods, and future generations—the public record
        should respect those equities while still enabling accountability questions.
      </p>
      <p>
        For operational safeguards aligned with OECD-style methodological seriousness and civic accountability, review{" "}
        <Link href="/pilot/safeguards" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Safeguards
        </Link>{" "}
        and{" "}
        <Link href="/disclosure-policy" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Disclosure Policy
        </Link>
        .
      </p>
    </InstitutionalArticle>
  );
}
