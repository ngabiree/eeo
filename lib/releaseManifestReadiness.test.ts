import { describe, expect, it } from "vitest";

import { claims as currentClaims } from "@/data/claims";
import { copperCobaltCorridorPilotSkeleton } from "@/data/corridorDossier";
import { evidenceItems as currentEvidenceItems } from "@/data/evidence";
import { sources as currentSources } from "@/data/sources";
import { canClaimBeApprovedForRelease } from "@/lib/publicationRules";
import { assessReleaseManifestReadiness } from "@/lib/releaseManifestReadiness";
import type { CorridorDossier } from "@/types/corridorDossier";
import type { Claim, EvidenceItem, Source } from "@/types/eeo";

const baseSource: Source = {
  id: "SRC-TEST-001",
  title: "Test source",
  publisher: "Test publisher",
  sourceType: "other",
  accessedDate: "2026-05-25",
  licenseStatus: "open",
  notes: "Internal source note should not be returned.",
};

const baseClaim: Claim = {
  id: "CLAIM-TEST-001",
  title: "Test claim",
  plainLanguageClaim: "A test-only claim fixture.",
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
  whatThisDoesNotProve: ["It does not make a real-world factual assertion."],
  whatWouldReviseThisClaim: ["A changed test fixture."],
  lastUpdated: "2026-05-25",
  governanceNote: "Internal governance note should not be returned.",
};

const baseEvidenceItem: EvidenceItem = {
  id: "EVID-TEST-001",
  sourceId: "SRC-TEST-001",
  title: "Test evidence",
  summary: "Test-only evidence fixture.",
  evidenceClass: "official",
  confidenceContribution: "high",
  limitations: ["Test-only limitation."],
  exposureRisk: "low",
  publicationDecision: "publish",
  claimLinks: [{ claimId: "CLAIM-TEST-001", role: "supports" }],
};

const baseDossier: CorridorDossier = {
  id: "CDR-TEST-001",
  title: "Test dossier",
  corridor: "Test corridor",
  geography: "Test geography",
  commodityFocus: ["test"],
  purpose: "Exercise release manifest readiness helper behavior.",
  scopeStatement: "Test-only scope.",
  nonGoals: ["No factual claims are made by this test fixture."],
  sections: [
    {
      id: "CDS-TEST-scope",
      section: "scope",
      title: "Scope",
      status: "ready_for_release",
      summary: "Structural test section.",
      linkedClaimIds: ["CLAIM-TEST-001"],
      linkedEvidenceIds: ["EVID-TEST-001"],
      sourceIds: ["SRC-TEST-001"],
      publicLimitations: ["Prototype test limitation."],
      exposureNotes: ["Internal section note should not be returned."],
      lastUpdated: "2026-05-25T00:00:00.000Z",
    },
  ],
  releaseReadiness: "release_candidate",
  publicLimitations: ["Prototype test limitation."],
  lastUpdated: "2026-05-25T00:00:00.000Z",
};

function claimWith(overrides: Partial<Claim>): Claim {
  return { ...baseClaim, ...overrides };
}

function evidenceItemWith(overrides: Partial<EvidenceItem>): EvidenceItem {
  return { ...baseEvidenceItem, ...overrides };
}

function sourceWith(overrides: Partial<Source>): Source {
  return { ...baseSource, ...overrides };
}

function dossierWith(params: {
  linkedClaimIds: string[];
  linkedEvidenceIds: string[];
  sourceIds?: string[];
}): CorridorDossier {
  return {
    ...baseDossier,
    sections: [
      {
        ...baseDossier.sections[0],
        linkedClaimIds: params.linkedClaimIds,
        linkedEvidenceIds: params.linkedEvidenceIds,
        sourceIds: params.sourceIds ?? ["SRC-TEST-001"],
      },
    ],
  };
}

function issueTypes(
  assessment: ReturnType<typeof assessReleaseManifestReadiness>
): string[] {
  return assessment.blockingStructuralIssues.map((issue) => issue.type);
}

function reviewFlagTypes(
  assessment: ReturnType<typeof assessReleaseManifestReadiness>
): string[] {
  return assessment.reviewFlags.map((flag) => flag.type);
}

describe("assessReleaseManifestReadiness", () => {
  it("reports the current copper-cobalt dossier as not manifest-ready because the dossier remains not_ready and incomplete", () => {
    const assessment = assessReleaseManifestReadiness({
      dossier: copperCobaltCorridorPilotSkeleton,
      claims: currentClaims,
      evidenceItems: currentEvidenceItems,
      sources: currentSources,
    });

    expect(assessment.releaseReadiness).toBe("not_ready");
    expect(assessment.dossierReady).toBe(false);
    expect(issueTypes(assessment)).toContain("dossier_release_not_ready");
    expect(issueTypes(assessment)).toContain("dossier_sections_incomplete");
  });

  it("counts approvable claims using canClaimBeApprovedForRelease", () => {
    const nonApprovableClaim = claimWith({
      id: "CLAIM-TEST-002",
      title: "Non-approvable test claim",
      reviewStatus: "method_review",
      evidenceLinks: [{ evidenceId: "EVID-TEST-002", role: "supports" }],
    });
    const secondEvidenceItem = evidenceItemWith({
      id: "EVID-TEST-002",
      claimLinks: [{ claimId: "CLAIM-TEST-002", role: "supports" }],
    });
    const claims = [baseClaim, nonApprovableClaim];

    const assessment = assessReleaseManifestReadiness({
      dossier: dossierWith({
        linkedClaimIds: claims.map((claim) => claim.id),
        linkedEvidenceIds: ["EVID-TEST-001", "EVID-TEST-002"],
      }),
      claims,
      evidenceItems: [baseEvidenceItem, secondEvidenceItem],
      sources: [baseSource],
    });

    expect(assessment.approvableClaims).toBe(
      claims.filter(canClaimBeApprovedForRelease).length
    );
  });

  it("counts non-approvable claims", () => {
    const nonApprovableClaim = claimWith({
      id: "CLAIM-TEST-002",
      title: "Non-approvable test claim",
      publicationDecision: "publish_with_redactions",
      evidenceLinks: [{ evidenceId: "EVID-TEST-002", role: "supports" }],
    });
    const secondEvidenceItem = evidenceItemWith({
      id: "EVID-TEST-002",
      claimLinks: [{ claimId: "CLAIM-TEST-002", role: "supports" }],
    });

    const assessment = assessReleaseManifestReadiness({
      dossier: dossierWith({
        linkedClaimIds: ["CLAIM-TEST-001", "CLAIM-TEST-002"],
        linkedEvidenceIds: ["EVID-TEST-001", "EVID-TEST-002"],
      }),
      claims: [baseClaim, nonApprovableClaim],
      evidenceItems: [baseEvidenceItem, secondEvidenceItem],
      sources: [baseSource],
    });

    expect(assessment.nonApprovableClaims).toBe(1);
    expect(reviewFlagTypes(assessment)).toContain("non_approvable_claims");
  });

  it("creates structural blockers for missing evidence and source links", () => {
    const claimReferencingMissingEvidence = claimWith({
      evidenceLinks: [{ evidenceId: "EVID-MISSING", role: "supports" }],
    });
    const claimReferencingEvidenceWithMissingSource = claimWith({
      id: "CLAIM-TEST-002",
      title: "Missing source test claim",
      evidenceLinks: [{ evidenceId: "EVID-TEST-002", role: "supports" }],
    });
    const evidenceWithMissingSource = evidenceItemWith({
      id: "EVID-TEST-002",
      sourceId: "SRC-MISSING",
      claimLinks: [{ claimId: "CLAIM-TEST-002", role: "supports" }],
    });

    const assessment = assessReleaseManifestReadiness({
      dossier: dossierWith({
        linkedClaimIds: ["CLAIM-TEST-001", "CLAIM-TEST-002"],
        linkedEvidenceIds: ["EVID-MISSING", "EVID-TEST-002"],
        sourceIds: ["SRC-MISSING"],
      }),
      claims: [
        claimReferencingMissingEvidence,
        claimReferencingEvidenceWithMissingSource,
      ],
      evidenceItems: [evidenceWithMissingSource],
      sources: [],
    });

    expect(assessment.evidenceIntegrityPasses).toBe(false);
    expect(assessment.sourceReadinessPasses).toBe(false);
    expect(issueTypes(assessment)).toContain(
      "claims_reference_missing_evidence"
    );
    expect(issueTypes(assessment)).toContain(
      "evidence_references_missing_sources"
    );
  });

  it("creates review flags, not automatic blockers, for unknown, restricted, and permission-required source posture", () => {
    const sourceWithUnknownLicense = sourceWith({
      id: "SRC-UNKNOWN",
      licenseStatus: "unknown",
    });
    const restrictedSource = sourceWith({
      id: "SRC-RESTRICTED",
      licenseStatus: "restricted",
    });
    const permissionRequiredSource = sourceWith({
      id: "SRC-PERMISSION",
      licenseStatus: "permission_required",
    });
    const evidenceItems = [
      evidenceItemWith({
        id: "EVID-UNKNOWN",
        sourceId: "SRC-UNKNOWN",
        claimLinks: [{ claimId: "CLAIM-TEST-001", role: "supports" }],
      }),
      evidenceItemWith({
        id: "EVID-RESTRICTED",
        sourceId: "SRC-RESTRICTED",
        claimLinks: [{ claimId: "CLAIM-TEST-001", role: "supports" }],
      }),
      evidenceItemWith({
        id: "EVID-PERMISSION",
        sourceId: "SRC-PERMISSION",
        claimLinks: [{ claimId: "CLAIM-TEST-001", role: "supports" }],
      }),
    ];
    const claim = claimWith({
      evidenceLinks: evidenceItems.map((evidenceItem) => ({
        evidenceId: evidenceItem.id,
        role: "supports",
      })),
    });

    const assessment = assessReleaseManifestReadiness({
      dossier: dossierWith({
        linkedClaimIds: ["CLAIM-TEST-001"],
        linkedEvidenceIds: evidenceItems.map((evidenceItem) => evidenceItem.id),
        sourceIds: ["SRC-UNKNOWN", "SRC-RESTRICTED", "SRC-PERMISSION"],
      }),
      claims: [claim],
      evidenceItems,
      sources: [
        sourceWithUnknownLicense,
        restrictedSource,
        permissionRequiredSource,
      ],
    });

    expect(assessment.sourceReadinessPasses).toBe(true);
    expect(assessment.blockingStructuralIssues).toEqual([]);
    expect(reviewFlagTypes(assessment)).toEqual(
      expect.arrayContaining([
        "sources_with_unknown_license",
        "sources_restricted",
        "sources_permission_required",
      ])
    );
  });

  it("includes the internal-only, no-signing, and no-clearance limitation in the publicSafeSummary", () => {
    const assessment = assessReleaseManifestReadiness({
      dossier: baseDossier,
      claims: [baseClaim],
      evidenceItems: [baseEvidenceItem],
      sources: [baseSource],
    });

    expect(assessment.publicSafeSummary).toContain(
      "This is an internal structural readiness check only."
    );
    expect(assessment.publicSafeSummary).toContain(
      "It does not sign a release manifest"
    );
    expect(assessment.publicSafeSummary).toContain("determine legal status");
    expect(assessment.publicSafeSummary).toContain("clear source rights");
  });
});
