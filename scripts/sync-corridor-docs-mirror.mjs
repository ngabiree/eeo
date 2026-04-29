import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CANONICAL = path.join(ROOT, "components", "EarthEndowmentObservatoryOneFileApp.tsx");
const DOC_MIRROR = path.join(ROOT, "docs", "EarthEndowmentObservatoryOneFileApp.tsx");

const canon = readFileSync(CANONICAL, "utf8");

if (!canon.startsWith('"use client";')) {
  console.error(`Expected ${path.relative(ROOT, CANONICAL)} to start with '"use client";'.`);
  process.exit(1);
}

/** Everything after the first line (\`"use client"\`), preserving newline(s) before \`import\`. */
const afterDirective = canon.slice(canon.indexOf("\n") + 1);

const mirrorComment = `/**
 * Design-review mirror of \`components/EarthEndowmentObservatoryOneFileApp.tsx\` — kept line-for-line with that file aside from this block.
 * Regenerate with \`pnpm sync:corridor-docs\` (see \`scripts/sync-corridor-docs-mirror.mjs\`).
 */`;

const output = `"use client";

${mirrorComment}${afterDirective}`;

writeFileSync(DOC_MIRROR, output, "utf8");
console.log(`Wrote ${path.relative(ROOT, DOC_MIRROR)} from ${path.relative(ROOT, CANONICAL)}.`);
