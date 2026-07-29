import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function ObservatoryPage() {
  return (
    <InstitutionalArticle eyebrow="Observatory" title="Earth Endowment Observatory">
      <p>
        The Observatory is a public-interest surface for understanding how natural endowments enter the economy—and who governs,
        transforms, benefits, bears risk, and remains accountable across that chain.
      </p>
      <p>
        The work emphasizes inspectable claims, methodological humility, safeguards for disclosure, and routes for correction—not
        certifications, adjudicated liability, rankings, or implied legal conclusions unless supported by authoritative sources.
      </p>
      <p>
        Explore the{" "}
        <Link href="/corridors/copper-cobalt" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Copper-Cobalt Corridor
        </Link>{" "}
        demonstration profile, or review{" "}
        <Link href="/evidence-ledger" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Evidence Ledger
        </Link>{" "}
        and{" "}
        <Link href="/methods" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Methods
        </Link>
        .
      </p>
    </InstitutionalArticle>
  );
}
