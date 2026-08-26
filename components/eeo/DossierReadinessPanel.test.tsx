import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";

import DossierReadinessPanel from "@/components/eeo/DossierReadinessPanel";
import { resetCorrectionsStoreForTests } from "@/lib/correctionsStore";

describe("DossierReadinessPanel", () => {
  beforeEach(() => {
    resetCorrectionsStoreForTests();
  });

  it("shows the governed manifest gate and keeps claim 002 ineligible", () => {
    const html = renderToStaticMarkup(<DossierReadinessPanel />);

    expect(html).toContain("Governed manifest signoff gate");
    expect(html).toContain("Manifest REL-CC-001");
    expect(html).toContain("Rehearsal examples do not satisfy this gate");
    expect(html).toContain("CLAIM-DRC-CO-002");
    expect(html).toContain("Not eligible");
    expect(html).toContain("Release authority must approve the exact claim version before manifest inclusion");
    expect(html).toContain("method review");
    expect(html).toContain("withheld");
  });

  it("renders a read-only public-safe diagnostic without internal review rationale", () => {
    const html = renderToStaticMarkup(<DossierReadinessPanel />);

    expect(html).not.toContain("<button");
    expect(html).not.toContain("<form");
    expect(html).not.toContain("Confirm that the reported 55% share is faithfully derived");
    expect(html).not.toContain("reviewedBy");
    expect(html).not.toContain("internalNotes");
  });
});
