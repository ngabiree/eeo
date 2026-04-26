# Earth Endowment Observatory — corridor prototype

Governed **local** web prototype: controlled evidence product first, limited dashboard second. **Synthetic sample data only** — no live databases, APIs, or restricted files in this repo.

This matches the institutional systems specification: not a court, global atlas, composite score, certification product, blockchain layer, or AI decision authority.

## Requirements

- Node.js **20+** (LTS recommended)
- npm (ships with Node)

## Run locally

```bash
cd /path/to/eeo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the top navigation to move between **Home**, **Evidence Dossier**, **Limited Dashboard**, **Evidence Ledger**, **Methods + Limits**, **Safeguards**, **Corrections**, and **Review Workspace** (in-app state; no separate routes in this MVP).

## Scripts

| Command        | Purpose                    |
|----------------|----------------------------|
| `npm run dev`  | Development server         |
| `npm run build`| Production build           |
| `npm run start`| Run production build       |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |

## Project layout

- `app/` — Next.js App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `components/EarthEndowmentObservatoryOneFileApp.tsx` — corridor UI (client component)
- `docs/eeo_one_file_corridor_app.jsx` — original one-file snapshot (reference)

## Environment

For the **static prototype**, you do not need a `.env` file. See `.env.example` for future Supabase/Vercel placeholders (service role **never** client-side).

## Security

See `SECURITY.md`. Do not commit secrets, credentials, raw evidence, or sensitive geospatial files.

## Specification

The canonical build document is maintained outside this path as **Earth Endowment Observatory — Institutional Constitution and Systems Specification** (v2.x). Align new features with that doctrine and the MVP loop (dossier → limited dashboard → ledger → review → corrections) before expanding scope.
