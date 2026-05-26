import { describe, expect, it } from "vitest";

import {
  canClaimBeApprovedForRelease,
  requiresRightOfReply,
} from "@/lib/publicationRules";
import type { Claim } from "@/types/eeo";

const baseClaim: Claim = {
  id: "CLAIM-TEST-001",
  title: "Test claim",
  plainLanguageClaim: "Available public records indicate a test condition.",
  claimType: "descriptive",
  legalPosture: "factual_observation",
  corridorNode: "endowment",
  evidenceLinks: [{ evidenceId: "EVID-TEST-001", role: "supports" }],
  entityIds: ["ENT-TEST"],
  confidence: "high",
  exposureRisk: "low",
  publicationDecision: "publish",
  reviewStatus: "approved_for_release",
  rightOfReplyRequired: false,
  rightOfReplyStatus: "not_required",
  whatThisDoesNotProve: ["It does not establish legal responsibility."],
  whatWouldReviseThisClaim: ["Updated authoritative public records."],
  lastUpdated: "2026-05-25",
};

function claimWith(overrides: Partial<Claim>): Claim {
  return { ...baseClaim, ...overrides };
}

describe("canClaimBeApprovedForRelease", () => {
  it("allows approved publish claims with low exposure risk", () => {
    expect(canClaimBeApprovedForRelease(baseClaim)).toBe(true);
  });

  it("allows approved aggregated publication claims", () => {
    expect(
      canClaimBeApprovedForRelease(
        claimWith({ publicationDecision: "publish_aggregated" })
      )
    ).toBe(true);
  });

  it("blocks claims that have not completed release review", () => {
    expect(
      canClaimBeApprovedForRelease(claimWith({ reviewStatus: "method_review" }))
    ).toBe(false);
  });

  it("blocks high exposure claims even when otherwise approved", () => {
    expect(
      canClaimBeApprovedForRelease(claimWith({ exposureRisk: "high" }))
    ).toBe(false);
  });

  it("blocks do-not-publish claims even when otherwise approved", () => {
    expect(
      canClaimBeApprovedForRelease(
        claimWith({ exposureRisk: "do_not_publish" })
      )
    ).toBe(false);
  });

  it("blocks redacted publication decisions from release approval", () => {
    expect(
      canClaimBeApprovedForRelease(
        claimWith({ publicationDecision: "publish_with_redactions" })
      )
    ).toBe(false);
  });
});

describe("requiresRightOfReply", () => {
  it("does not require right-of-reply for method-limit claims", () => {
    expect(
      requiresRightOfReply(
        claimWith({
          claimType: "method_limit",
          legalPosture: "methodological_limit",
          corridorNode: "processing_trade",
        })
      )
    ).toBe(false);
  });

  it("requires right-of-reply when explicitly flagged", () => {
    expect(requiresRightOfReply(claimWith({ rightOfReplyRequired: true }))).toBe(
      true
    );
  });

  it("requires right-of-reply for materially affecting corridor nodes with entities", () => {
    expect(
      requiresRightOfReply(claimWith({ corridorNode: "public_revenue" }))
    ).toBe(true);
  });

  it("does not require right-of-reply when no entity is materially affected", () => {
    expect(
      requiresRightOfReply(
        claimWith({ corridorNode: "public_revenue", entityIds: [] })
      )
    ).toBe(false);
  });
});
