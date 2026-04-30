import "server-only";
import { randomBytes } from "crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";

/** Local durable data directory (gitignored). Override with `EEO_DATA_DIR`. */
export function getEeoDataDir(): string {
  const env = process.env.EEO_DATA_DIR?.trim();
  return env || join(process.cwd(), ".eeo");
}

/**
 * Atomically replace a JSON file (same-volume rename).
 * Suitable for single-node Next.js / local deploys; serverless multi-instance needs a shared DB.
 */
export function atomicWriteJsonSync(filePath: string, payload: unknown): void {
  mkdirSync(dirname(filePath), { recursive: true });
  const tmp = `${filePath}.${randomBytes(8).toString("hex")}.tmp`;
  const body = `${JSON.stringify(payload, null, 2)}\n`;
  writeFileSync(tmp, body, "utf-8");
  renameSync(tmp, filePath);
}

export function readJsonFileSync<T>(filePath: string): T | null {
  if (!existsSync(filePath)) return null;
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
