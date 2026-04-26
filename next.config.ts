import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Avoid picking a parent directory lockfile (e.g. home) as the workspace root.
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
