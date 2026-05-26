import type {
  CorridorDossier,
  CorridorDossierSectionRecord,
  DossierSectionStatus,
} from "@/types/corridorDossier";

type DossierReadinessSectionSummary = Pick<
  CorridorDossierSectionRecord,
  "id" | "section" | "title" | "status"
>;

export interface DossierReadinessAssessment {
  totalSections: number;
  readySections: number;
  notStartedSections: number;
  inProgressSections: number;
  blockedOrWithheldSections: number;
  sectionsMissingClaims: DossierReadinessSectionSummary[];
  sectionsMissingEvidence: DossierReadinessSectionSummary[];
  releaseReadiness: CorridorDossier["releaseReadiness"];
  publicSafeSummary: string;
}

type DossierSectionReadinessBucket =
  | "ready"
  | "not_started"
  | "in_progress"
  | "blocked_or_withheld";

function getReadinessBucket(
  status: DossierSectionStatus
): DossierSectionReadinessBucket {
  switch (status) {
    case "ready_for_release":
      return "ready";
    case "not_started":
      return "not_started";
    case "source_mapping":
    case "drafting":
    case "evidence_review":
    case "legal_review":
    case "exposure_review":
    case "partner_review":
      return "in_progress";
    case "withheld":
      return "blocked_or_withheld";
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

function toPublicSectionSummary(
  section: CorridorDossierSectionRecord
): DossierReadinessSectionSummary {
  return {
    id: section.id,
    section: section.section,
    title: section.title,
    status: section.status,
  };
}

function getPublicSafeSummary(params: {
  releaseReadiness: CorridorDossier["releaseReadiness"];
  notStartedSections: number;
  inProgressSections: number;
  blockedOrWithheldSections: number;
  missingClaims: number;
  missingEvidence: number;
}): string {
  if (params.blockedOrWithheldSections > 0) {
    return "This dossier is not ready for release. One or more sections are withheld or blocked, and remaining sections may still require review.";
  }

  if (params.notStartedSections > 0 || params.inProgressSections > 0) {
    return "This dossier is not ready for release. Several sections remain incomplete or under review.";
  }

  if (params.missingClaims > 0 || params.missingEvidence > 0) {
    return "This dossier is not ready for release. Section claim or evidence linkage remains incomplete.";
  }

  if (params.releaseReadiness === "release_candidate") {
    return "No section-readiness gaps are detected by this helper. Release still depends on ordinary governance and publication review.";
  }

  if (params.releaseReadiness === "released") {
    return "No section-readiness gaps are detected by this helper. This summary does not certify factual truth, legal status, or publication approval.";
  }

  return "This dossier is not ready for release. Release readiness remains under internal review.";
}

export function assessDossierReadiness(
  dossier: CorridorDossier
): DossierReadinessAssessment {
  let readySections = 0;
  let notStartedSections = 0;
  let inProgressSections = 0;
  let blockedOrWithheldSections = 0;

  const sectionsMissingClaims: DossierReadinessSectionSummary[] = [];
  const sectionsMissingEvidence: DossierReadinessSectionSummary[] = [];

  for (const section of dossier.sections) {
    const bucket = getReadinessBucket(section.status);

    if (bucket === "ready") {
      readySections += 1;
    } else if (bucket === "not_started") {
      notStartedSections += 1;
    } else if (bucket === "in_progress") {
      inProgressSections += 1;
    } else if (bucket === "blocked_or_withheld") {
      blockedOrWithheldSections += 1;
    }

    if (section.linkedClaimIds.length === 0) {
      sectionsMissingClaims.push(toPublicSectionSummary(section));
    }

    if (section.linkedEvidenceIds.length === 0) {
      sectionsMissingEvidence.push(toPublicSectionSummary(section));
    }
  }

  return {
    totalSections: dossier.sections.length,
    readySections,
    notStartedSections,
    inProgressSections,
    blockedOrWithheldSections,
    sectionsMissingClaims,
    sectionsMissingEvidence,
    releaseReadiness: dossier.releaseReadiness,
    publicSafeSummary: getPublicSafeSummary({
      releaseReadiness: dossier.releaseReadiness,
      notStartedSections,
      inProgressSections,
      blockedOrWithheldSections,
      missingClaims: sectionsMissingClaims.length,
      missingEvidence: sectionsMissingEvidence.length,
    }),
  };
}
