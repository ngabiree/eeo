import type { EvidenceItem, EvidenceRole } from "@/types/eeo";

export function collectEvidenceRoles(
  evidenceLinks: { evidenceId: string; role: EvidenceRole }[]
): Set<EvidenceRole> {
  return new Set(evidenceLinks.map((l) => l.role));
}

export function isContextualOnly(
  evidenceLinks: { evidenceId: string; role: EvidenceRole }[]
): boolean {
  const roles = collectEvidenceRoles(evidenceLinks);
  return roles.size > 0 && [...roles].every((r) => r === "contextualizes");
}

export function hasContradictoryEvidence(
  evidenceLinks: { evidenceId: string; role: EvidenceRole }[]
): boolean {
  return evidenceLinks.some((l) => l.role === "contradicts");
}

export function getLinkedEvidence(
  evidenceIds: string[],
  evidenceItems: EvidenceItem[]
): EvidenceItem[] {
  return evidenceItems.filter((item) => evidenceIds.includes(item.id));
}
