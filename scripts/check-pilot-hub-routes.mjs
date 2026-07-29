import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const HUB_FILE = path.join(ROOT, "lib", "pilotHubRoutes.ts");
const NAV_FILE = path.join(ROOT, "lib", "pilotPublicNav.ts");

function extractHrefs(source) {
  return [...source.matchAll(/\{\s*href:\s*"([^"]+)"\s*,/g)].map((match) => match[1]);
}

async function fileExists(candidate) {
  try {
    await access(candidate, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function routePagePath(route) {
  const segments = route.split("/").filter(Boolean);
  return path.join(ROOT, "app", ...segments, "page.tsx");
}

async function assertUniqueRoutes(routes, sourceName) {
  if (routes.length !== new Set(routes).size) {
    console.error(`${sourceName} contains duplicate href entries.`);
    process.exit(1);
  }
}

const hubSource = await readFile(HUB_FILE, "utf8");
const navSource = await readFile(NAV_FILE, "utf8");
const hubRoutes = extractHrefs(hubSource);
const navRoutes = extractHrefs(navSource);

await assertUniqueRoutes(hubRoutes, "pilotHubRoutes.ts");
await assertUniqueRoutes(navRoutes, "pilotPublicNav.ts");

const declaredRoutes = new Set(["/corridors/copper-cobalt", ...hubRoutes]);
const missingPages = [];

for (const route of declaredRoutes) {
  if (!(await fileExists(routePagePath(route)))) {
    missingPages.push(route);
  }
}

const badShortcuts = navRoutes.filter((route) => route !== "/" && !declaredRoutes.has(route));

if (missingPages.length > 0 || badShortcuts.length > 0) {
  console.error("Public route index drift detected.");
  if (missingPages.length > 0) {
    console.error("Declared routes missing an App Router page:");
    for (const route of missingPages.sort()) {
      console.error(`  - ${route}`);
    }
  }
  if (badShortcuts.length > 0) {
    console.error("Header shortcuts missing from the public route index:");
    for (const route of [...new Set(badShortcuts)].sort()) {
      console.error(`  - ${route}`);
    }
  }
  process.exit(1);
}

console.log("Public route index check passed: declared routes resolve to App Router pages.");
