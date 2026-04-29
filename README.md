# Earth Endowment Observatory — public web app

**Local** civic intelligence surface: stewarded evidence, transparent public record, and safeguards-first publication. **Synthetic sample data only** — no live databases, APIs, or restricted files in this repo.

The product is framed as a public observatory, not a court, atlas, certification scheme, composite headline index, blockchain layer, or automated decision authority.

## Requirements

- Node.js **20+** (LTS recommended)
- [pnpm](https://pnpm.io/installation) **9.x** (this repo uses **Corepack** via the `packageManager` field in `package.json` so everyone resolves the same pnpm)

## Run locally

```bash
cd /path/to/eeo
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The site header lists primary routes (**Corridors**, **Evidence Ledger**, **Methods**, **Safeguards**, **Corrections**). Deeper corridor workspace tabs (dossier, ledger, review tools) live inside `/pilot/corridor`; internal reviewer routes under `/review` and `/workspace` omit the public chrome.

### npm fallback

This repository is standardized on `pnpm`, but npm can be used if needed:

```bash
npm install
npm run dev
```

If you use npm locally, keep committed lockfile/package-manager conventions unchanged (`pnpm-lock.yaml` remains canonical for CI and team consistency).

## Scripts

| Command             | Purpose                    |
|---------------------|----------------------------|
| `pnpm dev`          | Development server         |
| `pnpm build`        | Production build           |
| `pnpm start`        | Run production build       |
| `pnpm lint`         | ESLint CLI (`next/core-web-vitals` + `next/typescript` via `eslint.config.mjs`) |
| `pnpm typecheck`    | TypeScript (`tsc --noEmit`) |
| `pnpm check:pilot-routes` | Fails if legacy public routes are referenced instead of canonical `/pilot/*` routes |

This route-discipline check also runs in CI on pushes and pull requests.

## Package manager

This repository standardizes on **pnpm** with **`pnpm-lock.yaml`**. A root **`pnpm-workspace.yaml`** lists only this package (`"."`) so the directory is always a self-contained pnpm project root, even if you have a `pnpm-workspace.yaml` higher on your machine.

Do not commit `package-lock.json` (it is in `.gitignore`). CI uses **`pnpm install --frozen-lockfile`**.

## Project layout

- `app/` — Next.js App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `components/EarthEndowmentObservatoryOneFileApp.tsx` — **canonical** corridor workspace UI (client component); treat this as the source of shipped behavior.
- `docs/eeo_one_file_corridor_app.jsx` — small one-file corridor snapshot (reference; uses `lucide-react`)
- `docs/eeo_one_file_corridor_app_data_reactive.jsx` — curated repaired data-reactive atmospheric/public-evidence variant imported from local download
- `docs/EarthEndowmentObservatoryImplementationApp.jsx` — broader implementation blueprint: extra tabs, static contracts, self-contained SVG icons (no `lucide` dependency for sandbox-style builds)
- `docs/EarthEndowmentObservatoryOneFileApp.tsx` — TypeScript mirror of the corridor UI for design review (**line-for-line** with `components/EarthEndowmentObservatoryOneFileApp.tsx`; refresh via the `cp` command in the file header if the component drifts).

## Environment

For the **static prototype**, you do not need a `.env` file. See `.env.example` for future Supabase/Vercel placeholders (service role **never** client-side).

## Deployment (Vercel)

The app is set up for **[Vercel](https://vercel.com/)**. Local link metadata lives in **`.vercel/`** (gitignored).

- **Project dashboard:** use your team/project dashboard in Vercel  
- **Production URL:** use the domain configured for your deployment

**Connect GitHub for auto-deploys:** in your project Git settings, connect this repository. If the link fails, install the [Vercel GitHub app](https://vercel.com/docs/git/vercel-for-github) for your org/account and ensure the Vercel team has repo access, then retry connect (or import from the Vercel dashboard). CLI examples: `vercel link --yes` and `vercel deploy --yes`.

## Security

See `SECURITY.md`. Do not commit secrets, credentials, raw evidence, or sensitive geospatial files.

## Specification

The canonical build document is maintained outside this path as **Earth Endowment Observatory — Institutional Constitution and Systems Specification** (v2.x). Align new features with that doctrine and the MVP loop (dossier → limited dashboard → ledger → review → corrections) before expanding scope.

## Canonical Specification

The controlling source of truth is now checked into this repository at:

- `docs/canonical/eeo_institutional_constitution_and_systems_specification-final.md`

This canonical specification governs:

- product scope and MVP boundaries;
- evidence discipline and claim-level provenance;
- source/license/evidence/claim/review/release workflow;
- disclosure tiers and rights-aware publication constraints;
- map safety and geospatial exposure limits;
- right-of-reply expectations;
- correction workflow posture;
- no-score/no-ranking/no-certification doctrine;
- no-blockchain/no-AI-authority doctrine;
- prototype-only implementation boundaries.

### MVP evidence loop (visibility rule)

```text
source -> license -> evidence -> claim -> entity resolution -> review -> exposure review -> right-of-reply if needed -> release manifest -> public evidence dossier -> correction route
```
