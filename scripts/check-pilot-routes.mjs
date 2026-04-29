import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = ["app", "components"];
const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const LEGACY_SEGMENTS = ["dossier", "evidence", "methods", "safeguards", "corrections", "corridor"];
const legacyRoutePattern = new RegExp(`["']\\/(${LEGACY_SEGMENTS.join("|")})(?:["'/?#])`, "g");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const resolved = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") {
        continue;
      }
      files.push(...(await walk(resolved)));
    } else if (FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(resolved);
    }
  }

  return files;
}

const violations = [];

for (const dir of TARGET_DIRS) {
  const absoluteDir = path.join(ROOT, dir);
  const files = await walk(absoluteDir);
  for (const file of files) {
    const relPath = path.relative(ROOT, file);
    const content = await readFile(file, "utf8");
    const matches = [...content.matchAll(legacyRoutePattern)];
    for (const match of matches) {
      violations.push({ file: relPath, route: match[1] });
    }
  }
}

if (violations.length > 0) {
  console.error("Legacy public route references detected. Use canonical /pilot/* routes instead:");
  for (const v of violations) {
    console.error(`- ${v.file}: /${v.route}`);
  }
  process.exit(1);
}

console.log("Pilot route check passed: no legacy public route references found.");
