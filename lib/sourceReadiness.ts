import type { EvidenceItem, Source } from "@/types/eeo";

const PUBLIC_SAFE_SUMMARY =
  "This is a structural source/license posture check only. It does not provide legal clearance, validate reuse rights, assess source quality, validate factual truth, or approve publication.";

type SourceSummary = Pick<Source, "id" | "title" | "publisher" | "licenseStatus">;
type EvidenceSourceSummary = Pick<EvidenceItem, "id" | "title"> & {
  missingSourceId: string;
};

export interface SourceReadinessAssessment {
  totalSources: number;
  sourcesMissingAccessedDate: SourceSummary[];
  sourcesWithUnknownLicense: SourceSummary[];
  sourcesPermissionRequired: SourceSummary[];
  sourcesRestricted: SourceSummary[];
  sourcesUnusedByEvidence: SourceSummary[];
  evidenceUsingMissingSources: EvidenceSourceSummary[];
  publicSafeSummary: string;
}

export function assessSourceReadiness(params: {
  sources: Source[];
  evidenceItems: EvidenceItem[];
}): SourceReadinessAssessment {
  const sourceIds = new Set(params.sources.map((source) => source.id));
  const evidenceSourceIds = new Set(
    params.evidenceItems.map((evidenceItem) => evidenceItem.sourceId)
  );

  const sourcesMissingAccessedDate: SourceSummary[] = [];
  const sourcesWithUnknownLicense: SourceSummary[] = [];
  const sourcesPermissionRequired: SourceSummary[] = [];
  const sourcesRestricted: SourceSummary[] = [];
  const sourcesUnusedByEvidence: SourceSummary[] = [];
  const evidenceUsingMissingSources: EvidenceSourceSummary[] = [];

  for (const source of params.sources) {
    const sourceSummary = toSourceSummary(source);

    if (source.accessedDate.trim().length === 0) {
      sourcesMissingAccessedDate.push(sourceSummary);
    }

    if (source.licenseStatus === "unknown") {
      sourcesWithUnknownLicense.push(sourceSummary);
    } else if (source.licenseStatus === "permission_required") {
      sourcesPermissionRequired.push(sourceSummary);
    } else if (source.licenseStatus === "restricted") {
      sourcesRestricted.push(sourceSummary);
    }

    if (!evidenceSourceIds.has(source.id)) {
      sourcesUnusedByEvidence.push(sourceSummary);
    }
  }

  for (const evidenceItem of params.evidenceItems) {
    if (!sourceIds.has(evidenceItem.sourceId)) {
      evidenceUsingMissingSources.push({
        id: evidenceItem.id,
        title: evidenceItem.title,
        missingSourceId: evidenceItem.sourceId,
      });
    }
  }

  return {
    totalSources: params.sources.length,
    sourcesMissingAccessedDate,
    sourcesWithUnknownLicense,
    sourcesPermissionRequired,
    sourcesRestricted,
    sourcesUnusedByEvidence,
    evidenceUsingMissingSources,
    publicSafeSummary: PUBLIC_SAFE_SUMMARY,
  };
}

function toSourceSummary(source: Source): SourceSummary {
  return {
    id: source.id,
    title: source.title,
    publisher: source.publisher,
    licenseStatus: source.licenseStatus,
  };
}
