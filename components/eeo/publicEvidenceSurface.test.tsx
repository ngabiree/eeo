import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, beforeEach } from "vitest";

import ReleaseManifestPanel from "@/components/eeo/ReleaseManifest";
import ClaimCard from "@/components/eeo/ClaimCard";
import { sampleClaim } from "@/data/claims";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";
import {
  addCorrectionSubmission,
  resetCorrectionsStoreForTests,
} from "@/lib/correctionsStore";

describe("public evidence surfaces", () => {
  beforeEach(() => {
    resetCorrectionsStoreForTests();
  });

  it("ReleaseManifestPanel shows correction/governance summary and not reviewer-only fields", () => {
    const now = new Date().toISOString();
    addCorrectionSubmission({
      id: "CORR-TEST",
      submittedAt: now,
      name: "Public",
      email: "p@example.com",
      category: "Factual correction",
      claimId: "CLAIM-DRC-CO-001",
      details: "Public details only.",
      triageStatus: "queued",
      triageUpdatedAt: now,
      triageNote: "SECRET_REVIEWER_NOTE_SHOULD_NOT_APPEAR_ON_PUBLIC",
      activities: [],
    });

    const html = renderToStaticMarkup(<ReleaseManifestPanel />);
    expect(html).toContain("Correction/governance summary:");
    expect(html).toContain("total correction submissions");
    expect(html).toContain("Record mode: Illustrative");
    expect(html).toContain("Public status: Under Review");
    expect(html).not.toContain("Public status: Blocked");
    expect(html).not.toContain("SECRET_REVIEWER_NOTE_SHOULD_NOT_APPEAR_ON_PUBLIC");
    expect(html).not.toContain("Latest triage note");
    expect(html).not.toContain("Activity history");
    expect(html).not.toContain("Reviewer note");
  });

  it("ClaimCard does not render triage notes or activity logs", () => {
    const summary = getClaimCorrectionSummary("CLAIM-DRC-CO-001", [
      {
        id: "C1",
        submittedAt: "2026-01-01T00:00:00.000Z",
        name: "X",
        email: "x@example.com",
        category: "Factual correction",
        claimId: "CLAIM-DRC-CO-001",
        details: "d",
        triageStatus: "queued",
        triageUpdatedAt: "2026-01-01T00:00:00.000Z",
        triageNote: "SHOULD_NOT_LEAK_TO_PUBLIC_CARD",
        activities: [{ id: "A1", correctionId: "C1", type: "submitted", actor: "public_submitter", createdAt: "2026-01-01T00:00:00.000Z" }],
      },
    ]);

    const html = renderToStaticMarkup(
      <ClaimCard claim={sampleClaim} correctionSummary={summary} />
    );
    expect(html).toContain("Claim governance");
    expect(html).toContain("Record mode: Synthetic");
    expect(html).toContain("Public status: Under Review");
    expect(html).not.toContain("approved_for_release");
    expect(html).not.toContain("SHOULD_NOT_LEAK_TO_PUBLIC_CARD");
    expect(html).not.toContain("Activity history");
    expect(html).not.toContain("Reviewer note");
  });
});
