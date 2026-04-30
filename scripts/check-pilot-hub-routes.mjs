import { access, readdir, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PILOT_APP = path.join(ROOT, "app", "pilot");
const HUB_FILE = path.join(ROOT, "lib", "pilotHubRoutes.ts");
const NAV_FILE = path.join(ROOT, "lib", "pilotPublicNav.ts");

/** @param {string} source */
function extractPilotHrefs(source) {
  return [...source.matchAll(/\{\s*href:\s*"(\/pilot\/[^"]+)"\s*,/g)].map((m) => m[1]);
}

async function fileExists(candidate) {
  try {
    await access(candidate, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function collectFilesystemRoutes() {
  const entries = await readdir(PILOT_APP, { withFileTypes: true });
  const routes = new Set();
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const pagePath = path.join(PILOT_APP, entry.name, "page.tsx");
    if (await fileExists(pagePath)) {
      routes.add(`/pilot/${entry.name}`);
    }
  }
  return routes;
}

function collectDeclaredHubRoutes(source) {
  const routes = extractPilotHrefs(source);
  const set = new Set(routes);
  if (routes.length !== set.size) {
    console.error("pilotHubRoutes.ts contains duplicate href entries.");
    process.exit(1);
  }
  return set;
}

const fsRoutes = await collectFilesystemRoutes();
const hubSource = await readFile(HUB_FILE, "utf8");
const declared = collectDeclaredHubRoutes(hubSource);

const missingInHub = [...fsRoutes].filter((r) => !declared.has(r)).sort();
const extraInHub = [...declared].filter((r) => !fsRoutes.has(r)).sort();

if (missingInHub.length > 0 || extraInHub.length > 0) {
  console.error("Pilot hub route drift: each app/pilot/<segment>/page.tsx must have a matching PILOT_HUB_ROUTES href.");
  if (missingInHub.length > 0) {
    console.error("Missing from lib/pilotHubRoutes.ts:");
    for (const route of missingInHub) {
      console.error(`  - ${route}`);
    }
  }
  if (extraInHub.length > 0) {
    console.error("Extra in lib/pilotHubRoutes.ts (no app/pilot/<segment>/page.tsx):");
    for (const route of extraInHub) {
      console.error(`  - ${route}`);
    }
  }
  process.exit(1);
}

const navSource = await readFile(NAV_FILE, "utf8");
const shortcutHrefs = extractPilotHrefs(navSource);
const badShortcuts = shortcutHrefs.filter((r) => !fsRoutes.has(r));
if (badShortcuts.length > 0) {
  console.error(
    "pilotPublicNav.ts references /pilot paths with no matching app/pilot/<segment>/page.tsx:",
  );
  for (const route of [...new Set(badShortcuts)].sort()) {
    console.error(`  - ${route}`);
  }
  process.exit(1);
}

console.log(
  "Pilot hub route check passed: pilotHubRoutes aligns with app/pilot; pilotPublicNav /pilot shortcuts resolve.",
);
