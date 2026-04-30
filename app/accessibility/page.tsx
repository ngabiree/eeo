import Link from "next/link";

import InstitutionalArticle from "@/components/eeo/InstitutionalArticle";

export default function AccessibilityPage() {
  return (
    <InstitutionalArticle eyebrow="Accessibility" title="Accessibility statement">
      <p>
        Earth Endowment Observatory aims to meet common public-sector accessibility expectations appropriate to an informational civic
        site: sufficient color contrast on core text and controls, visible keyboard focus outlines, descriptive link text where the link
        is intended to navigate, and respect for reduced-motion preferences where atmospheric backgrounds animate.
      </p>
      <p>
        If you encounter an accessibility barrier—including keyboard traps, unreadable contrast, missing labels, or video timing that
        cannot be paused—please use the{" "}
        <Link href="/contact" className="font-semibold text-[color:var(--eeo-primary)] underline underline-offset-2">
          Contact
        </Link>{" "}
        page with the subject prefilled (“Accessibility”).
      </p>
      <p>
        Accessibility is incremental: public releases should improve coverage over time rather than implying perfect conformance without
        an independently verified audit unless one is expressly published alongside the statement.
      </p>
    </InstitutionalArticle>
  );
}
