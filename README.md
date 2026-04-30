# Earth Endowment Observatory — public web app

**Local** civic intelligence surface: stewarded evidence, transparent public record, and safeguards-first publication. This public repository contains application code, public documentation, schema/migration scaffolding, methods, and synthetic sample data.

The operational EEO system is designed to support live source registries, restricted review workspaces, raw evidence preservation, verified reporting, private evidence files, and controlled geospatial analysis through governed databases, private storage, RLS, audit logs, and release-gated public views.

Do not commit raw evidence, restricted files, sensitive geospatial data, partner-confidential data, personal data, production database dumps, legal review notes, secrets, or right-of-reply packets to this repository. Live evidence work belongs in governed databases and private storage, not in GitHub.

The product is framed as a public observatory, not a court, atlas, certification scheme, composite headline index, blockchain layer, or automated decision authority.

## Doctrine anchor (north star)

EEO is the **evidence institution** for how Earth’s endowments become — or fail to become — **shared human capability** over time. That is intentional scope: **not** an atlas fantasy, **not** a generic dashboard product, **not** a campaign surface, and **not** a universal ownership registry.

**Demonstrated today in the prototype:** a governed publication loop — claim ↔ evidence ↔ correction ↔ review ↔ governance status ↔ release manifest.

**Ahead (full corridor intelligence, still under-built in the shipped surface):** the longer arc runs endowment → governance → labor → trade → ecology → revenue → value capture → public benefit → **temporal future**. Temporal Endowment Profile work (**`v0.6`**, schema and data-model only — see **`GOVERNANCE.md`** / **`ROADMAP.md`**) anchors that temporal step in evidence-bound contracts before any monitoring-style UI.

## Founding documents

Doctrine, institutional policies, protocols, governance, roadmap, and how to cite them: **[docs/founding/README.md](./docs/founding/README.md)**. The [**docs/README.md**](./docs/README.md) landing page opens with the same hub.

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

Open [http://localhost:3000](http://localhost:3000). The site header lists **shortcut links** defined in **`lib/pilotPublicNav.ts`** — Observatory home, First Corridor, Evidence Ledger, Methods, Safeguards, and Corrections — to keep navigation compact. **`/pilot`** surfaces additional corridor prototype pages (overview, evidence dossier and ledger, governance profile, claim lifecycle, human capability, labor/ecology/revenue, value-chain view, and others); see **`docs/mvp-evidence-loop.md`** for paths. Corridor workspace tabs live inside `/pilot/corridor`; **`/trust`** exposes the public Trust index; internal reviewer routes under **`/review`** and **`/workspace`** omit the public chrome.

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
| `pnpm check:pilot-hub-routes` | Fails if **`lib/pilotHubRoutes.ts`** drifts from **`app/pilot/<segment>/page.tsx`** segments |
| `pnpm verify`       | Same sequence as CI: `check:pilot-routes`, lint, typecheck, test, build |

`pnpm check:pilot-routes`, `pnpm check:pilot-hub-routes`, and the rest of `pnpm verify` run in GitHub Actions on pushes and pull requests. Short legacy bookmark paths (for example `/dossier` → `/pilot/evidence-dossier`) are listed in `docs/mvp-evidence-loop.md` and implemented in `next.config.ts`.

## Package manager

This repository standardizes on **pnpm** with **`pnpm-lock.yaml`**. A root **`pnpm-workspace.yaml`** lists only this package (`"."`) so the directory is always a self-contained pnpm project root, even if you have a `pnpm-workspace.yaml` higher on your machine.

Do not commit `package-lock.json` (it is in `.gitignore`). CI uses **`pnpm install --frozen-lockfile`**.

## Project layout

- `app/` — Next.js App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `lib/pilotPublicNav.ts` — header shortcut pilot links; **`lib/pilotHubRoutes.ts`** — full **`/pilot`** exploration index (surfaced on **`/pilot`**).
- `components/EarthEndowmentObservatoryOneFileApp.tsx` — **canonical** corridor workspace UI (client component); treat this as the source of shipped behavior.
- `docs/eeo_one_file_corridor_app.jsx` — small one-file corridor snapshot (reference; uses `lucide-react`)
- `docs/eeo_one_file_corridor_app_data_reactive.jsx` — curated repaired data-reactive atmospheric/public-evidence variant imported from local download
- `docs/EarthEndowmentObservatoryImplementationApp.jsx` — broader implementation blueprint: extra tabs, static contracts, self-contained SVG icons (no `lucide` dependency for sandbox-style builds)
- `docs/EarthEndowmentObservatoryOneFileApp.tsx` — TypeScript mirror of the corridor UI for design review (**line-for-line** with `components/EarthEndowmentObservatoryOneFileApp.tsx` aside from the header block; refresh with `pnpm sync:corridor-docs` when the component drifts).

## Environment

For the **static prototype**, you do not need a `.env` file. See `.env.example` for future Supabase/Vercel placeholders (service role **never** client-side).

## Deployment (Vercel)

The app is set up for **[Vercel](https://vercel.com/)**. Local link metadata lives in **`.vercel/`** (gitignored).

- **Project dashboard:** use your team/project dashboard in Vercel  
- **Production URL:** use the domain configured for your deployment

**Connect GitHub for auto-deploys:** in your project Git settings, connect this repository. If the link fails, install the [Vercel GitHub app](https://vercel.com/docs/git/vercel-for-github) for your org/account and ensure the Vercel team has repo access, then retry connect (or import from the Vercel dashboard). CLI examples: `vercel link --yes` and `vercel deploy --yes`.

## Security

See `SECURITY.md`. Do not commit secrets, credentials, raw evidence, or sensitive geospatial files.

## Human Capability and Live Evidence Boundary

The north star (**Earth endowments → shared human capability**) is implemented through layers that treat **people as rights-bearing agents** in relation to endowments — never as extractive inventory.

The Human Capability, Labor, Stewardship, and Relationship layer treats people as rights-bearing agents in relation to endowments, not as endowments, resources, or talent inventory. Public implementation uses only synthetic, aggregated, non-sensitive sample data until governed live evidence workflows are available.

Core rule: EEO should be live where evidence is governed, and restrained where evidence is exposed.

Supabase-backed live-data tables for this layer are deferred until RLS, private buckets, audit logs, release views, and review workflows are ready. **Live data is allowed** in governed backends; **uncontrolled public exposure** is not.

## Live-Data Delivery Checklist

Before merging any live-data feature, run the reusable checklist in
`docs/live-data-definition-of-done.md`.

## Changelog

Release posture and routing notes for this prototype are summarized in `CHANGELOG.md`.

## Canonical Specification

The controlling institutional and systems specification for product scope and engineering posture is checked into this repository at:

- `docs/canonical/eeo_institutional_constitution_and_systems_specification-final.md`

Align new features with that doctrine before expanding runtime scope. A short companion summary of the MVP publication chain is in `docs/mvp-evidence-loop.md`.

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

Also echoed on the `/pilot` overview page (static panel). Full text: `docs/mvp-evidence-loop.md`.

```text
source -> license -> evidence -> claim -> entity resolution -> review -> exposure review -> right-of-reply if needed -> release manifest -> public evidence dossier -> correction route
```
