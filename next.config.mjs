import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Avoid picking a parent directory lockfile (e.g. home) as the workspace root.
  outputFileTracingRoot: projectRoot,
  async redirects() {
    return [
      { source: "/evidence", destination: "/pilot/evidence-ledger", permanent: false },
      { source: "/methods", destination: "/pilot/methods-and-limits", permanent: false },
      { source: "/safeguards", destination: "/pilot/safeguards", permanent: false },
      { source: "/corrections", destination: "/pilot/corrections", permanent: false },
      { source: "/corridor", destination: "/pilot/value-chain", permanent: false },
      { source: "/evidence-ledger", destination: "/pilot/evidence-ledger", permanent: false },
      { source: "/source-registry", destination: "/pilot/evidence-dossier", permanent: false },
      { source: "/pilot/map", destination: "/pilot/corridor", permanent: false },
      { source: "/pilot/public-revenue", destination: "/pilot/labor-ecology-revenue", permanent: false },
    ];
  },
};

export default nextConfig;
