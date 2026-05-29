import type { Claim, EvidenceItem, EvidenceRole, Source } from "@/types/eeo";
import { isContextualOnly } from "@/lib/evidenceUtils";

const PUBLIC_SAFE_SUMMARY =
  "This is a structural linkage check only. It does not validate factual truth, legal status, publication approval, or source quality.";

type ClaimSummary = Pick<Claim, "id" | "title">;
type EvidenceSummary = Pick<EvidenceItem, "id" | "title">;

export interface ClaimWithMissingEvidenceItems extends ClaimSummary {
  missingEvidenceIds: string[];
}

export interface EvidenceItemMissingSource extends EvidenceSummary {
  missingSourceId: string;
}

export interface ReciprocalLinkMismatch {
  claimId: string;
  evidenceId: string;
  issue:
    | "missing_evidence_backlink"
    | "missing_claim_forward_link"
    | "missing_claim_item"
    | "role_mismatch";
  claimRole?: EvidenceRole;
  evidenceRole?: EvidenceRole;
}

export interface EvidenceIntegrityAssessment {
  totalClaims: number;
  claimsMissingEvidenceLinks: ClaimSummary[];
  claimsWithMissingEvidenceItems: ClaimWithMissingEvidenceItems[];
  evidenceItemsMissingSources: EvidenceItemMissingSource[];
  evidenceItemsWithNoClaimLinks: EvidenceSummary[];
  reciprocalLinkMismatches: ReciprocalLinkMismatch[];
  claimsWithOnlyContextualEvidence: ClaimSummary[];
  publicSafeSummary: string;
}

export function assessEvidenceIntegrity(params: {
  claims: Claim[];
  evidenceItems: EvidenceItem[];
  sources: Source[];
}): EvidenceIntegrityAssessment {
  const claimById = new Map(params.claims.map((claim) => [claim.id, claim]));
  const evidenceById = new Map(
    params.evidenceItems.map((evidenceItem) => [
      evidenceItem.id,
      evidenceItem,
    ])
  );
  const sourceIds = new Set(params.sources.map((source) => source.id));

  const claimsMissingEvidenceLinks: ClaimSummary[] = [];
  const claimsWithMissingEvidenceItems: ClaimWithMissingEvidenceItems[] = [];
  const evidenceItemsMissingSources: EvidenceItemMissingSource[] = [];
  const evidenceItemsWithNoClaimLinks: EvidenceSummary[] = [];
  const reciprocalLinkMismatches: ReciprocalLinkMismatch[] = [];
  const claimsWithOnlyContextualEvidence: ClaimSummary[] = [];

  for (const claim of params.claims) {
    if (claim.evidenceLinks.length === 0) {
      claimsMissingEvidenceLinks.push(toClaimSummary(claim));
    }

    const missingEvidenceIds = claim.evidenceLinks
      .map((link) => link.evidenceId)
      .filter((evidenceId) => !evidenceById.has(evidenceId));

    if (missingEvidenceIds.length > 0) {
      claimsWithMissingEvidenceItems.push({
        ...toClaimSummary(claim),
        missingEvidenceIds,
      });
    }

    if (isContextualOnly(claim.evidenceLinks)) {
      claimsWithOnlyContextualEvidence.push(toClaimSummary(claim));
    }

    for (const claimEvidenceLink of claim.evidenceLinks) {
      const evidenceItem = evidenceById.get(claimEvidenceLink.evidenceId);

      if (!evidenceItem) {
        continue;
      }

      const evidenceBacklink = evidenceItem.claimLinks.find(
        (evidenceClaimLink) => evidenceClaimLink.claimId === claim.id
      );

      if (!evidenceBacklink) {
        reciprocalLinkMismatches.push({
          claimId: claim.id,
          evidenceId: evidenceItem.id,
          issue: "missing_evidence_backlink",
          claimRole: claimEvidenceLink.role,
        });
      } else if (evidenceBacklink.role !== claimEvidenceLink.role) {
        reciprocalLinkMismatches.push({
          claimId: claim.id,
          evidenceId: evidenceItem.id,
          issue: "role_mismatch",
          claimRole: claimEvidenceLink.role,
          evidenceRole: evidenceBacklink.role,
        });
      }
    }
  }

  for (const evidenceItem of params.evidenceItems) {
    if (!sourceIds.has(evidenceItem.sourceId)) {
      evidenceItemsMissingSources.push({
        ...toEvidenceSummary(evidenceItem),
        missingSourceId: evidenceItem.sourceId,
      });
    }

    if (evidenceItem.claimLinks.length === 0) {
      evidenceItemsWithNoClaimLinks.push(toEvidenceSummary(evidenceItem));
    }

    for (const evidenceClaimLink of evidenceItem.claimLinks) {
      const claim = claimById.get(evidenceClaimLink.claimId);

      if (!claim) {
        reciprocalLinkMismatches.push({
          claimId: evidenceClaimLink.claimId,
          evidenceId: evidenceItem.id,
          issue: "missing_claim_item",
          evidenceRole: evidenceClaimLink.role,
        });
        continue;
      }

      const claimForwardLink = claim.evidenceLinks.find(
        (claimEvidenceLink) => claimEvidenceLink.evidenceId === evidenceItem.id
      );

      if (!claimForwardLink) {
        reciprocalLinkMismatches.push({
          claimId: claim.id,
          evidenceId: evidenceItem.id,
          issue: "missing_claim_forward_link",
          evidenceRole: evidenceClaimLink.role,
        });
      }
    }
  }

  return {
    totalClaims: params.claims.length,
    claimsMissingEvidenceLinks,
    claimsWithMissingEvidenceItems,
    evidenceItemsMissingSources,
    evidenceItemsWithNoClaimLinks,
    reciprocalLinkMismatches,
    claimsWithOnlyContextualEvidence,
    publicSafeSummary: PUBLIC_SAFE_SUMMARY,
  };
}

function toClaimSummary(claim: Claim): ClaimSummary {
  return {
    id: claim.id,
    title: claim.title,
  };
}

function toEvidenceSummary(evidenceItem: EvidenceItem): EvidenceSummary {
  return {
    id: evidenceItem.id,
    title: evidenceItem.title,
  };
}
