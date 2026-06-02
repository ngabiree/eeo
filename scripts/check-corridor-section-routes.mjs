import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CORRIDOR_VIEW_FILE = path.join(ROOT, "components", "CorridorSystemView.tsx");
const CORRIDOR_SECTION_ROUTE_FILE = path.join(
  ROOT,
  "app",
  "pilot",
  "corridor",
  "[section]",
  "page.tsx",
);

async function fileExists(candidate) {
  try {
    await access(candidate, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function collectUniqueMatches(source, pattern) {
  return new Set([...source.matchAll(pattern)].map((match) => match[1]));
}

function collectRouteRedirects(source) {
  return new Map(
    [...source.matchAll(/"([^"]+)": "\/pilot\/corridor\?expand=([^"]+)",/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );
}

function formatList(values) {
  return [...values].sort().map((value) => `  - ${value}`).join("\n");
}

if (!(await fileExists(CORRIDOR_SECTION_ROUTE_FILE))) {
  console.error(
    "Missing app/pilot/corridor/[section]/page.tsx for declared corridor section page links.",
  );
  process.exit(1);
}

const viewSource = await readFile(CORRIDOR_VIEW_FILE, "utf8");
const routeSource = await readFile(CORRIDOR_SECTION_ROUTE_FILE, "utf8");

const declaredPageSlugs = collectUniqueMatches(
  viewSource,
  /page: "\/pilot\/corridor\/([^"]+)"/g,
);
const declaredExpansionSlugs = collectUniqueMatches(
  viewSource,
  /expansion: "\/pilot\/corridor\?expand=([^"]+)"/g,
);
const routeRedirects = collectRouteRedirects(routeSource);
const routeSlugs = new Set(routeRedirects.keys());

const missingRouteSlugs = [...declaredPageSlugs].filter((slug) => !routeSlugs.has(slug));
const extraRouteSlugs = [...routeSlugs].filter((slug) => !declaredPageSlugs.has(slug));
const missingExpansionSlugs = [...declaredPageSlugs].filter(
  (slug) => !declaredExpansionSlugs.has(slug),
);
const mismatchedRedirects = [...routeRedirects.entries()].filter(([slug, expansion]) => slug !== expansion);

if (
  missingRouteSlugs.length > 0 ||
  extraRouteSlugs.length > 0 ||
  missingExpansionSlugs.length > 0 ||
  mismatchedRedirects.length > 0
) {
  console.error(
    "Corridor section route drift: section page links, expansion links, and route redirects must stay aligned.",
  );

  if (missingRouteSlugs.length > 0) {
    console.error("Declared page links missing from app/pilot/corridor/[section]/page.tsx:");
    console.error(formatList(missingRouteSlugs));
  }

  if (extraRouteSlugs.length > 0) {
    console.error("Route redirects with no matching CorridorSystemView page link:");
    console.error(formatList(extraRouteSlugs));
  }

  if (missingExpansionSlugs.length > 0) {
    console.error("Declared page links missing matching CorridorSystemView expansion links:");
    console.error(formatList(missingExpansionSlugs));
  }

  if (mismatchedRedirects.length > 0) {
    console.error("Route redirects whose expand target does not match the section slug:");
    console.error(
      mismatchedRedirects
        .map(([slug, expansion]) => `  - ${slug} -> ${expansion}`)
        .sort()
        .join("\n"),
    );
  }

  process.exit(1);
}

console.log(
  "Corridor section route check passed: section page links, expansion links, and redirects align.",
);
