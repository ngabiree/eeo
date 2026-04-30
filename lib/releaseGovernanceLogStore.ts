import "server-only";
import { join } from "path";

import { atomicWriteJsonSync, getEeoDataDir, readJsonFileSync } from "@/lib/eeoJsonPersistence";

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

const RELEASE_GOVERNANCE_SCHEMA_VERSION = 1 as const;

const releaseGovernanceLogStore: ReleaseGovernanceLogEntry[] = [];

let releaseGovernanceLoaded = false;

function getReleaseGovernanceLogPath(): string {
  const env = process.env.RELEASE_GOVERNANCE_LOG_PATH?.trim();
  if (env) return env;
  return join(getEeoDataDir(), "release-governance-log.json");
}

function releaseGovernancePersistenceEnabled(): boolean {
  if (process.env.VITEST === "true") return false;
  if (process.env.DISABLE_EEO_FILE_PERSISTENCE === "true") return false;
  return true;
}

function parsePersistedLog(data: unknown): ReleaseGovernanceLogEntry[] | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  if (o.schemaVersion !== RELEASE_GOVERNANCE_SCHEMA_VERSION) return null;
  if (!Array.isArray(o.entries)) return null;
  return o.entries as ReleaseGovernanceLogEntry[];
}

function ensureReleaseGovernanceLoadedSync(): void {
  if (releaseGovernanceLoaded) return;
  releaseGovernanceLoaded = true;
  if (!releaseGovernancePersistenceEnabled()) return;

  const path = getReleaseGovernanceLogPath();
  try {
    const raw = readJsonFileSync<unknown>(path);
    if (!raw) return;
    const parsed = parsePersistedLog(raw);
    if (!parsed) {
      console.error("[eeo] Invalid release governance log JSON; ignoring file:", path);
      return;
    }
    releaseGovernanceLogStore.push(...parsed);
  } catch (e) {
    console.error("[eeo] Failed to load release governance log:", e);
  }
}

function persistReleaseGovernanceSync(): void {
  if (!releaseGovernancePersistenceEnabled()) return;
  try {
    atomicWriteJsonSync(getReleaseGovernanceLogPath(), {
      schemaVersion: RELEASE_GOVERNANCE_SCHEMA_VERSION,
      entries: releaseGovernanceLogStore.map((e) => ({ ...e })),
    });
  } catch (e) {
    console.error("[eeo] Failed to persist release governance log:", e);
  }
}

function logId(): string {
  return `RGL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function cloneEntry(entry: ReleaseGovernanceLogEntry): ReleaseGovernanceLogEntry {
  return { ...entry };
}

export function addReleaseGovernanceLogEntry(
  entry: Omit<ReleaseGovernanceLogEntry, "id" | "createdAt">
): ReleaseGovernanceLogEntry {
  ensureReleaseGovernanceLoadedSync();
  const created: ReleaseGovernanceLogEntry = {
    id: logId(),
    createdAt: new Date().toISOString(),
    ...entry,
  };
  releaseGovernanceLogStore.push(created);
  persistReleaseGovernanceSync();
  return cloneEntry(created);
}

export function listReleaseGovernanceLogEntries(): ReleaseGovernanceLogEntry[] {
  ensureReleaseGovernanceLoadedSync();
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
