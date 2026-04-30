import { describe, expect, it, beforeEach } from "vitest";

import { POST } from "@/app/api/corrections/route";
import { listCorrectionSubmissions, resetCorrectionsStoreForTests } from "@/lib/correctionsStore";

describe("POST /api/corrections", () => {
  beforeEach(() => {
    resetCorrectionsStoreForTests();
  });

  it("accepts optional claimId and stores it", async () => {
    const res = await POST(
      new Request("http://localhost/api/corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "A User",
          email: "a@example.com",
          category: "Factual correction",
          details: "Please fix X.",
          claimId: "CLAIM-DRC-CO-001",
        }),
      })
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as { id: string };
    const stored = listCorrectionSubmissions().find((s) => s.id === body.id);
    expect(stored?.claimId).toBe("CLAIM-DRC-CO-001");
  });

  it("auto-links claimId when only claimReference matches a known claim id", async () => {
    const res = await POST(
      new Request("http://localhost/api/corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "A User",
          email: "b@example.com",
          category: "Source update",
          details: "See claim id in reference.",
          claimReference: "CLAIM-DRC-CO-001",
        }),
      })
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as { id: string };
    const stored = listCorrectionSubmissions().find((s) => s.id === body.id);
    expect(stored?.claimId).toBe("CLAIM-DRC-CO-001");
    expect(stored?.claimReference).toBe("CLAIM-DRC-CO-001");
  });

  it("stores explicit claimId even when not in the prototype claims list", async () => {
    await POST(
      new Request("http://localhost/api/corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "A User",
          email: "c@example.com",
          category: "Factual correction",
          details: "Text",
          claimId: "UNKNOWN-CLAIM",
        }),
      })
    );
    const stored = listCorrectionSubmissions()[0];
    expect(stored?.claimId).toBe("UNKNOWN-CLAIM");
  });

});
