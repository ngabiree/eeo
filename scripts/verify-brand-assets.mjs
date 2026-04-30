import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const BRAND_DIR = resolve(ROOT, "public/brand");
const MANIFEST_PATH = resolve(BRAND_DIR, "EEO_logo_repro_manifest.json");

function sha256ForFile(path) {
  const content = readFileSync(path);
  return createHash("sha256").update(content).digest("hex");
}

function getPngSize(path) {
  const bytes = readFileSync(path);
  const signature = "89504e470d0a1a0a";
  const fileSig = bytes.subarray(0, 8).toString("hex");
  if (fileSig !== signature) {
    throw new Error(`Not a PNG file: ${path}`);
  }
  // IHDR width/height are big-endian uint32 at offsets 16 and 20.
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

function fail(message) {
  console.error(`Brand asset check failed: ${message}`);
  process.exit(1);
}

if (!existsSync(MANIFEST_PATH)) {
  fail(`Missing manifest: ${MANIFEST_PATH}`);
}

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const expectedHashes = manifest?.files ?? {};
const expectedCanvas = manifest?.canvas_px;

if (!Array.isArray(expectedCanvas) || expectedCanvas.length !== 2) {
  fail("Manifest must include canvas_px as [width, height].");
}

for (const [filename, expectedHash] of Object.entries(expectedHashes)) {
  const path = resolve(BRAND_DIR, filename);
  if (!existsSync(path)) {
    fail(`Missing brand asset file listed in manifest: ${filename}`);
  }

  const actualHash = sha256ForFile(path);
  if (actualHash !== expectedHash) {
    fail(
      `Checksum mismatch for ${filename}. Expected ${expectedHash}, got ${actualHash}.`
    );
  }
}

const requiredPngs = [
  "EEO_logo_fixed_QA_preview.png",
  "EEO_logo_fixed_cream_master.png",
  "EEO_logo_fixed_transparent_master.png",
];

for (const filename of requiredPngs) {
  const path = resolve(BRAND_DIR, filename);
  if (!existsSync(path)) {
    fail(`Missing required PNG: ${filename}`);
  }
  const { width, height } = getPngSize(path);
  if (filename === "EEO_logo_fixed_QA_preview.png") {
    if (width !== 1024 || height !== 1024) {
      fail(`Expected ${filename} to be 1024x1024, got ${width}x${height}.`);
    }
  } else if (width !== expectedCanvas[0] || height !== expectedCanvas[1]) {
    fail(
      `Expected ${filename} to match canvas ${expectedCanvas[0]}x${expectedCanvas[1]}, got ${width}x${height}.`
    );
  }
}

console.log("Brand asset check passed.");
