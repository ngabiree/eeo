/**
 * Fails if temporalProfile is imported anywhere outside types/.
 *
 * TemporalEndowmentProfile is a dormant boundary marker (v1.5+).
 * It must not drive UI, monitoring feeds, dashboards, or forecasting
 * before the designated milestone. This script enforces that.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components", "lib", "data"];
const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const FORBIDDEN_PATTERN = /from\s+["'][^"']*temporalProfile["']/;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const resolved = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      files.push(...(await walk(resolved)));
    } else if (FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(resolved);
    }
  }
  return files;
}

const violations = [];

for (const dir of SCAN_DIRS) {
  const absoluteDir = path.join(ROOT, dir);
  const files = await walk(absoluteDir);
  for (const file of files) {
    const content = await readFile(file, "utf8");
    if (FORBIDDEN_PATTERN.test(content)) {
      violations.push(path.relative(ROOT, file));
    }
  }
}

if (violations.length > 0) {
  console.error(
    "temporalProfile imported outside types/ — this type is dormant until v1.5+.",
    "\nDo not import it into runtime routes, dashboards, or forecasting features.",
    "\nViolating files:"
  );
  for (const v of violations) console.error(`  - ${v}`);
  process.exit(1);
}

console.log("Temporal profile dormancy check passed.");
