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
      { source: "/pilot", destination: "/corridors/copper-cobalt", permanent: true },
      { source: "/pilot/corridor", destination: "/corridors/copper-cobalt/system", permanent: true },
      {
        source: "/pilot/corridor/:section",
        destination: "/corridors/copper-cobalt/system/:section",
        permanent: true,
      },
      { source: "/pilot/evidence-dossier", destination: "/corridors/copper-cobalt/dossier", permanent: true },
      { source: "/pilot/evidence-ledger", destination: "/evidence-ledger", permanent: true },
      { source: "/pilot/governance-profile", destination: "/corridors/copper-cobalt/governance", permanent: true },
      { source: "/pilot/human-capability", destination: "/corridors/copper-cobalt/human-capability", permanent: true },
      { source: "/pilot/claim-lifecycle", destination: "/corridors/copper-cobalt/claim-lifecycle", permanent: true },
      {
        source: "/pilot/labor-ecology-revenue",
        destination: "/corridors/copper-cobalt/labor-ecology-revenue",
        permanent: true,
      },
      { source: "/pilot/value-chain", destination: "/corridors/copper-cobalt/value-chain", permanent: true },
      { source: "/pilot/methods-and-limits", destination: "/methods", permanent: true },
      { source: "/pilot/safeguards", destination: "/safeguards", permanent: true },
      { source: "/pilot/corrections", destination: "/corrections", permanent: true },
      { source: "/pilot/map", destination: "/corridors/copper-cobalt/system", permanent: true },
      {
        source: "/pilot/public-revenue",
        destination: "/corridors/copper-cobalt/labor-ecology-revenue",
        permanent: true,
      },
      { source: "/evidence", destination: "/evidence-ledger", permanent: true },
      { source: "/corridor", destination: "/corridors/copper-cobalt/value-chain", permanent: true },
      { source: "/source-registry", destination: "/corridors/copper-cobalt/dossier", permanent: true },
    ];
  },
};

export default nextConfig;
