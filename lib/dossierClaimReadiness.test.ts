import { describe, expect, it } from "vitest";

import { claims } from "@/data/claims";
import { evidenceItems } from "@/data/evidence";
import { releaseManifest } from "@/data/releaseManifest";
import { copperCobaltPilotSourceMap } from "@/data/sourceMap";
import { sources } from "@/data/sources";
import { assessDossierClaimReadiness } from "@/lib/dossierClaimReadiness";
import type { Claim } from "@/types/eeo";

const baseParams = {
  claims,
  evidenceItems,
  sources,
  sourceMap: copperCobaltPilotSourceMap,
  releaseManifest,
  corrections: [],
};

describe("assessDossierClaimReadiness", () => {
  it("assesses all current corridor claims without making public-certification claims", () => {
    const assessment = assessDossierClaimReadiness(baseParams);

    expect(assessment.totalClaims).toBe(claims.length);
    expect(assessment.rows).toHaveLength(claims.length);
    expect(
      assessment.readyClaimCount +
        assessment.needsReviewClaimCount +
        assessment.blockedClaimCount
    ).toBe(claims.length);
    expect(assessment.publicSafeSummary).toContain("does not certify factual truth");
    expect(assessment.publicSafeSummary).toContain("does not");
  });

  it("marks the current release-manifest claim as structurally ready", () => {
    const assessment = assessDossierClaimReadiness(baseParams);
    const releaseClaim = assessment.rows.find((row) => row.claimId === "CLAIM-DRC-CO-001");

    expect(releaseClaim).toBeDefined();
    expect(releaseClaim?.releaseManifestDisposition).toBe("included");
    expect(releaseClaim?.status).toBe("ready");
    expect(releaseClaim?.evidenceCount).toBeGreaterThan(0);
    expect(releaseClaim?.sourceCount).toBeGreaterThan(0);
    expect(releaseClaim?.sourceLimitationCount).toBeGreaterThan(0);
  });

  it("blocks a claim that references a missing evidence record", () => {
    const damagedClaim: Claim = {
      ...claims[0],
      id: "CLAIM-TEST-MISSING-EVIDENCE",
      evidenceLinks: [
        {
          evidenceId: "EVID-DOES-NOT-EXIST",
          role: "supports",
          note: "Intentional missing evidence fixture.",
        },
      ],
    };

    const assessment = assessDossierClaimReadiness({
      ...baseParams,
      claims: [damagedClaim],
      releaseManifest: {
        ...releaseManifest,
        includedClaimIds: [damagedClaim.id],
      },
    });

    expect(assessment.blockedClaimCount).toBe(1);
    expect(assessment.rows[0].status).toBe("blocked");
    expect(assessment.rows[0].issues.map((issue) => issue.type)).toContain(
      "missing_evidence_record"
    );
  });

  it("blocks a claim when required right-of-reply is unresolved", () => {
    const replyClaim: Claim = {
      ...claims[0],
      id: "CLAIM-TEST-ROR-PENDING",
      rightOfReplyRequired: true,
      rightOfReplyStatus: "requested",
      rightOfReplyReason: "Actor-affecting test fixture.",
    };

    const assessment = assessDossierClaimReadiness({
      ...baseParams,
      claims: [replyClaim],
      releaseManifest: {
        ...releaseManifest,
        includedClaimIds: [replyClaim.id],
      },
    });

    expect(assessment.blockedClaimCount).toBe(1);
    expect(assessment.rows[0].issues.map((issue) => issue.type)).toContain(
      "right_of_reply_pending"
    );
  });

  it("flags claims not listed in the release manifest for review", () => {
    const assessment = assessDossierClaimReadiness(baseParams);
    const unlistedRows = assessment.rows.filter(
      (row) => row.releaseManifestDisposition === "not_listed"
    );

    expect(unlistedRows.length).toBeGreaterThan(0);
    expect(
      unlistedRows.some((row) =>
        row.issues.some((issue) => issue.type === "not_listed_in_release_manifest")
      )
    ).toBe(true);
  });
});
