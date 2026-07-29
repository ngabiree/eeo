import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function RightOfReplyPage() {
  return (
    <InstitutionalArticle eyebrow="Accountability" title="Right of reply">
      <p>
        Where publication could fairly affect identifiable parties, conscientious stewardship often includes procedural space for factual
        response—not as a concession that any claim is defamatory, but as civic discipline for high-stakes public records.
      </p>
      <p>
        The correction route collects structured challenges, factual corrections, and safety concerns; material that qualifies as right-of-reply under internal release rules should typically be lodged there alongside evidence links whenever possible so review can trace claims to sources.
      </p>
      <p>
        <Link href="/corrections" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Submit corrections or reply materials
        </Link>
      </p>
      <p>
        This description is informational—not a determination that any jurisdiction’s specific “right of reply” doctrine applies or that any particular submission must be honored without independent review aligned to disclosure safeguards.
      </p>
    </InstitutionalArticle>
  );
}
