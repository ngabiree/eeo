import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const TARGET_DIRS = ["app", "components"];
const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const legacyPilotRoutePattern = /["']\/pilot(?:["'/?#])/g;
const REQUIRED_LEGACY_REDIRECTS = new Map([
  ["/pilot", "/corridors/copper-cobalt"],
  ["/pilot/corridor", "/corridors/copper-cobalt/system"],
  ["/pilot/corridor/:section", "/corridors/copper-cobalt/system/:section"],
  ["/pilot/evidence-dossier", "/corridors/copper-cobalt/dossier"],
  ["/pilot/evidence-ledger", "/evidence-ledger"],
  ["/pilot/governance-profile", "/corridors/copper-cobalt/governance"],
  ["/pilot/human-capability", "/corridors/copper-cobalt/human-capability"],
  ["/pilot/claim-lifecycle", "/corridors/copper-cobalt/claim-lifecycle"],
  ["/pilot/labor-ecology-revenue", "/corridors/copper-cobalt/labor-ecology-revenue"],
  ["/pilot/value-chain", "/corridors/copper-cobalt/value-chain"],
  ["/pilot/methods-and-limits", "/methods"],
  ["/pilot/safeguards", "/safeguards"],
  ["/pilot/corrections", "/corrections"],
]);

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
  const files = await walk(path.join(ROOT, dir));
  for (const file of files) {
    const content = await readFile(file, "utf8");
    if (legacyPilotRoutePattern.test(content)) {
      violations.push(path.relative(ROOT, file));
    }
    legacyPilotRoutePattern.lastIndex = 0;
  }
}

if (violations.length > 0) {
  console.error("Legacy /pilot route references detected. Use stable public routes instead:");
  for (const file of violations) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

const configUrl = pathToFileURL(path.join(ROOT, "next.config.mjs")).href;
const { default: nextConfig } = await import(configUrl);
const configuredRedirects = await nextConfig.redirects();
const missingRedirects = [...REQUIRED_LEGACY_REDIRECTS].filter(
  ([source, destination]) =>
    !configuredRedirects.some(
      (redirect) =>
        redirect.source === source &&
        redirect.destination === destination &&
        redirect.permanent === true,
    ),
);

if (missingRedirects.length > 0) {
  console.error("Required permanent legacy redirects are missing or incorrect:");
  for (const [source, destination] of missingRedirects) {
    console.error(`- ${source} -> ${destination}`);
  }
  process.exit(1);
}

console.log("Public route check passed: stable links and permanent /pilot redirects are in place.");
