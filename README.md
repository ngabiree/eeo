# Earth Endowment Observatory — corridor prototype

Governed **local** web prototype: controlled evidence product first, limited dashboard second. **Synthetic sample data only** — no live databases, APIs, or restricted files in this repo.

This matches the institutional systems specification: not a court, global atlas, composite score, certification product, blockchain layer, or AI decision authority.

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

Open [http://localhost:3000](http://localhost:3000). Use the top navigation to move between **Home**, **Evidence Dossier**, **Limited Dashboard**, **Evidence Ledger**, **Methods + Limits**, **Safeguards**, **Corrections**, and **Review Workspace** (in-app state; no separate routes in this MVP).

## Scripts

| Command             | Purpose                    |
|---------------------|----------------------------|
| `pnpm dev`          | Development server         |
| `pnpm build`        | Production build           |
| `pnpm start`        | Run production build       |
| `pnpm lint`         | ESLint CLI (`next/core-web-vitals` + `next/typescript` via `eslint.config.mjs`) |
| `pnpm typecheck`    | TypeScript (`tsc --noEmit`) |

## Package manager

This repository standardizes on **pnpm** with **`pnpm-lock.yaml`**. A root **`pnpm-workspace.yaml`** lists only this package (`"."`) so the directory is always a self-contained pnpm project root, even if you have a `pnpm-workspace.yaml` higher on your machine.

Do not commit `package-lock.json` (it is in `.gitignore`). CI uses **`pnpm install --frozen-lockfile`**.

## Project layout

- `app/` — Next.js App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `components/EarthEndowmentObservatoryOneFileApp.tsx` — corridor UI (client component)
- `docs/eeo_one_file_corridor_app.jsx` — small one-file corridor snapshot (reference; uses `lucide-react`)
- `docs/EarthEndowmentObservatoryImplementationApp.jsx` — broader implementation blueprint: extra tabs, static contracts, self-contained SVG icons (no `lucide` dependency for sandbox-style builds)
- `docs/EarthEndowmentObservatoryOneFileApp.tsx` — TypeScript mirror of the corridor UI for design review (kept close to `components/`)

## Environment

For the **static prototype**, you do not need a `.env` file. See `.env.example` for future Supabase/Vercel placeholders (service role **never** client-side).

## Deployment (Vercel)

The app is set up for **[Vercel](https://vercel.com/)** (CLI: `vercel whoami` — signed in as **engabire**; project scope: **uwanjye** team). Local link metadata lives in **`.vercel/`** (gitignored).

- **Project dashboard:** [vercel.com/uwanjye/eeo](https://vercel.com/uwanjye/eeo)  
- **Production URL:** [eeo-ten.vercel.app](https://eeo-ten.vercel.app) (and per-deployment preview URLs on each deploy)

**Connect GitHub for auto-deploys:** in the [Git settings](https://vercel.com/uwanjye/eeo/settings/git) for the project, connect **https://github.com/ngabiree/eeo**. If the link fails, install the [Vercel GitHub app](https://vercel.com/docs/git/vercel-for-github) for the **ngabiree** org (or your account) and ensure the Vercel team has access to that repo, then try **Connect** again (or import the repo from the Vercel dashboard). CLI: `vercel link --yes --scope uwanjye` (already run once) / `vercel deploy --yes`.

## Security

See `SECURITY.md`. Do not commit secrets, credentials, raw evidence, or sensitive geospatial files.

## Specification

The canonical build document is maintained outside this path as **Earth Endowment Observatory — Institutional Constitution and Systems Specification** (v2.x). Align new features with that doctrine and the MVP loop (dossier → limited dashboard → ledger → review → corrections) before expanding scope.
