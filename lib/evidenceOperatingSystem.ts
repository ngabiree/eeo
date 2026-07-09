import type { Claim, EvidenceItem, Source } from "@/types/eeo";
import { requiresRightOfReply } from "@/lib/publicationRules";

export type EvidenceOperatingSeverity = "blocker" | "warning" | "passed";

export type EvidenceOperatingRecordType = "claim" | "evidence" | "source";

export interface EvidenceOperatingFinding {
  severity: EvidenceOperatingSeverity;
  recordType: EvidenceOperatingRecordType;
  recordId: string;
  issue: string;
  remedy: string;
}

export interface EvidenceOperatingSystemAssessment {
  blockers: EvidenceOperatingFinding[];
  warnings: EvidenceOperatingFinding[];
  passed: EvidenceOperatingFinding[];
  publicSafeSummary: string;
}

const PUBLIC_SAFE_SUMMARY =
  "This check validates evidence-operating metadata for publication discipline. It does not validate factual truth, legal liability, chain-of-custody, ownership, or certification.";

const PUBLICATION_DECISIONS = new Set<Claim["publicationDecision"]>([
  "publish",
  "publish_aggregated",
  "publish_with_redactions",
]);

const SOURCE_LICENSE_BLOCKERS = new Set<Source["licenseStatus"]>([
  "restricted",
  "permission_required",
]);

const SOURCE_LICENSE_WARNINGS = new Set<Source["licenseStatus"]>(["unknown"]);

const RIGHT_OF_REPLY_READY_STATUSES = new Set<Claim["rightOfReplyStatus"]>([
  "not_required",
  "received",
  "declined",
]);

export function assessEvidenceOperatingSystem(params: {
  claims: Claim[];
  evidenceItems: EvidenceItem[];
  sources: Source[];
}): EvidenceOperatingSystemAssessment {
  const blockers: EvidenceOperatingFinding[] = [];
  const warnings: EvidenceOperatingFinding[] = [];
  const passed: EvidenceOperatingFinding[] = [];

  const evidenceById = new Map(
    params.evidenceItems.map((evidenceItem) => [evidenceItem.id, evidenceItem])
  );
  const sourceById = new Map(params.sources.map((source) => [source.id, source]));

  for (const claim of params.claims) {
    if (claim.evidenceLinks.length === 0) {
      blockers.push(
        finding("blocker", "claim", claim.id, "Claim has no linked evidence.", "Link at least one evidence record before public use.")
      );
    }

    if (claim.whatThisDoesNotProve.length === 0) {
      blockers.push(
        finding("blocker", "claim", claim.id, "Claim does not state what it does not prove.", "Add non-claim limits to prevent overreading.")
      );
    }

    if (claim.whatWouldReviseThisClaim.length === 0) {
      blockers.push(
        finding("blocker", "claim", claim.id, "Claim lacks revision conditions.", "State what evidence would revise, correct, or withdraw the claim.")
      );
    }

    if (!claim.lastUpdated) {
      warnings.push(
        finding("warning", "claim", claim.id, "Claim has no last-updated date.", "Add a lastUpdated date for maintenance discipline.")
      );
    }

    if (claim.publicationDecision === "publish" && claim.exposureRisk === "medium") {
      warnings.push(
        finding("warning", "claim", claim.id, "Medium-exposure claim is marked for open publication.", "Consider aggregation, redaction, or exposure review before release.")
      );
    }

    if (
      PUBLICATION_DECISIONS.has(claim.publicationDecision) &&
      (claim.exposureRisk === "high" || claim.exposureRisk === "do_not_publish")
    ) {
      blockers.push(
        finding("blocker", "claim", claim.id, "Publication decision conflicts with exposure risk.", "Withhold, aggregate, redact, or complete exposure review before publication.")
      );
    }

    if (
      claim.rightOfReplyRequired &&
      !RIGHT_OF_REPLY_READY_STATUSES.has(claim.rightOfReplyStatus)
    ) {
      blockers.push(
        finding("blocker", "claim", claim.id, "Right-of-reply is required but not publication-ready.", "Complete or document the right-of-reply process before release.")
      );
    }

    if (requiresRightOfReply(claim) && !claim.rightOfReplyRequired) {
      warnings.push(
        finding("warning", "claim", claim.id, "Claim may trigger right-of-reply review but is not explicitly flagged.", "Review whether the claim materially affects an identifiable entity.")
      );
    }

    for (const link of claim.evidenceLinks) {
      const evidenceItem = evidenceById.get(link.evidenceId);

      if (!evidenceItem) {
        continue;
      }

      if (evidenceItem.limitations.length === 0) {
        blockers.push(
          finding("blocker", "evidence", evidenceItem.id, "Evidence record has no limitations.", "Add limitations so users do not overread the evidence.")
        );
      }

      const source = sourceById.get(evidenceItem.sourceId);

      if (!source) {
        blockers.push(
          finding("blocker", "evidence", evidenceItem.id, "Evidence record references a missing source.", "Create or correct the linked source record.")
        );
        continue;
      }

      if (PUBLICATION_DECISIONS.has(claim.publicationDecision)) {
        if (SOURCE_LICENSE_BLOCKERS.has(source.licenseStatus)) {
          blockers.push(
            finding("blocker", "source", source.id, "Source license does not support public release.", "Use a public source, obtain permission, or restrict the public claim.")
          );
        }

        if (SOURCE_LICENSE_WARNINGS.has(source.licenseStatus)) {
          warnings.push(
            finding("warning", "source", source.id, "Source license status is unknown.", "Clarify license or use basis before public release.")
          );
        }

        if (!source.accessedDate) {
          warnings.push(
            finding("warning", "source", source.id, "Source has no accessed date.", "Add accessedDate for source freshness and auditability.")
          );
        }
      }
    }
  }

  if (blockers.length === 0) {
    passed.push(
      finding("passed", "claim", "ALL", "No evidence-operating blockers found.", "Continue with release-readiness and publication-gate checks.")
    );
  }

  return {
    blockers,
    warnings,
    passed,
    publicSafeSummary: PUBLIC_SAFE_SUMMARY,
  };
}

function finding(
  severity: EvidenceOperatingSeverity,
  recordType: EvidenceOperatingRecordType,
  recordId: string,
  issue: string,
  remedy: string
): EvidenceOperatingFinding {
  return {
    severity,
    recordType,
    recordId,
    issue,
    remedy,
  };
}
