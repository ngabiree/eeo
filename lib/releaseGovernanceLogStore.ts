export type ReleaseGovernanceLogEntry = {
  id: string;
  createdAt: string;
  actor: "reviewer" | "system";
  reviewerId?: string;
  reviewerLabel?: string;
  challengedClaimCount: number;
  correctedClaimCount: number;
  restrictedClaimCount: number;
  withdrawnClaimCount: number;
  openCorrectionCount: number;
  note?: string;
};

const releaseGovernanceLogStore: ReleaseGovernanceLogEntry[] = [];

function logId(): string {
  return `RGL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function cloneEntry(entry: ReleaseGovernanceLogEntry): ReleaseGovernanceLogEntry {
  return { ...entry };
}

export function addReleaseGovernanceLogEntry(
  entry: Omit<ReleaseGovernanceLogEntry, "id" | "createdAt">
): ReleaseGovernanceLogEntry {
  const created: ReleaseGovernanceLogEntry = {
    id: logId(),
    createdAt: new Date().toISOString(),
    ...entry,
  };
  releaseGovernanceLogStore.push(created);
  return cloneEntry(created);
}

export function listReleaseGovernanceLogEntries(): ReleaseGovernanceLogEntry[] {
  return releaseGovernanceLogStore
    .map(cloneEntry)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getLatestReleaseGovernanceLogEntry(): ReleaseGovernanceLogEntry | null {
  return listReleaseGovernanceLogEntries()[0] ?? null;
}

export function hasRecentReleaseGovernanceSignoff(maxAgeHours: number): boolean {
  const latest = getLatestReleaseGovernanceLogEntry();
  if (!latest) return false;
  const ageMs = Date.now() - new Date(latest.createdAt).getTime();
  return ageMs <= maxAgeHours * 60 * 60 * 1000;
}
