# Earth Endowment Observatory — public web app

## Public Evidence Prototype: Copper-Cobalt Corridor

**Local** civic intelligence surface: stewarded evidence, transparent public record, and safeguards-first publication. This public repository contains application code, public documentation, corridor dossier typing, source-map planning records, schema/migration scaffolding, methods language, and **synthetic sample data only** unless governed elsewhere.

**Baseline shipped in-repo:** **`v0.3`** evidence core · **`v0.4`** review activity log · **`v0.5`** claim governance + release consequences · **password-gated** review workspace · working corrections intake/triage · **Temporal profile types remain a dormant boundary marker** (`types/temporalProfile.ts`) — **not activated** as UI or monitoring.

Live evidence work belongs in governed databases and private storage, not GitHub — do **not** commit raw evidence, restricted geospatial payloads, confidential partner packs, identities, dumps, secrets, legal review notes, or right-of-reply packets.

## Core identity & governing doctrine

EEO is **not** a headline dashboard SKU, VC-style startup app, composite ESG score, campaign NGO, consulting portal, blockchain project, or generic open-data platform. It is **public-interest evidence infrastructure** for **endowment-to-economy chains**.

**Governing mantra:** *Reveal systems. Protect peoples. Trace value. Respect sovereignty. Publish with evidence. Scale only after trust.*

The Observatory helps societies interpret how Earth’s endowments enter economic life: **what exists; where governance applies; how labor, capital, technology, ecology, ownership, concessions, extraction, processing, trade, public revenue, and value capture interconnect; where benefit reaches communities or fails to; where evidence is missing.** It does **not** substitute for courts, registries that assert universal truth, atlas fantasies that expose everyone everywhere, blockchain trust layers, or AI judgment.

## Anchored analytic chain

```text
Endowment → Governance → Concession / Permit → Operator → Ownership / Control
→ Extraction / Production → Processing / Trade → Labor Risk → Ecological Signal
→ Public Revenue → Public Benefit → Evidence Gap
```

## Strategic posture: dossier-first

Move **from architecture-first to dossier-first**. Enough evidence/review scaffolding exists for the current corridor pilot; **`v0.6`–`v0.7`** focus on documenting doctrine, dossier typing, source humility, methods language, safeguards, release discipline — **then populating corridor evidence**.

**Do-not-build list:** global atlas ambitions, public composite scores/index systems, temporal profile **UI**, monitoring dashboards/feeds/registries, scenario/forecast UI, accusatory company pages framed as adjudication, SKU-level traceability claims, adjudicated legal findings, speculative new commodities/regions beyond pilot scope — see **`GOVERNANCE.md`**.

Temporal, monitoring, and scenario features belong to **`v1.3+`** after the corridor dossier is trustworthy.

## Definition — Earth’s endowments

Earth’s endowments are the **biophysical, ecological, spatial, atmospheric, geological, hydrological, biological, human-cultivated, knowledge-mediated, and capability-bearing conditions** that precede, enable, constrain, or sustain economic life.

They include:

- **Natural stocks:** minerals, soils, aquifers, forests, fisheries, biodiversity, genetic resources.  
- **Natural flows:** sunlight, wind, rainfall, river flows, ocean currents, carbon cycling, pollination.  
- **Ecological functions:** fertility, habitat, filtration, carbon storage, flood regulation, disease buffering.  
- **Spatial potentials:** arable land, transport corridors, ports, renewable-energy zones, settlement geography.  
- **Regenerative endowments:** forests, fisheries, soils, watersheds, biodiversity when maintained inside renewal bounds.  
- **Non-regenerative endowments:** minerals, fossil fuels, ancient groundwater, some geological formations.  
- **Human-maintained endowments:** terraces, irrigation networks, seed diversity, working landscapes, agroforestry, restored ecosystems.  
- **Animal-mediated endowments:** pollination, grazing systems, seed dispersal, soil aeration, aquatic webs.  
- **Knowledge-mediated & community-governed capacities:** Indigenous ecological knowledge, agronomic practice, stewardship traditions, technological know-how — **only where authority, consent, context, and the rights of knowledge holders permit reference**.  
- **Human capability & stewardship capacities:** labor, skill, ingenuity, care, stewardship practice, ecological relationship, institutional memory — **relational**, not inventories of “talent stocks.”  

**Humans are not endowments to be inventoried.** Capabilities describe **relational stewardship** roles.
EEO studies human labor, knowledge, stewardship, rights, harm, and capability. It does not classify people as natural resources, assets, or inventory.

**Conceptual anchor:** Endowments are **capacities in relation** connecting nature, labor, knowledge, law, ecology, infrastructure, and time.

**Exposure guardrail:** EEO maintains **universal analytical concern**, not universal exposure — we may inquire globally but must **not expose every ecosystem or community hazard everywhere**.

## Doctrine anchor (north star)

Evidence institution posture: steward how **Earth endowments ↔ shared human capability** without collapsing into dashboards, campaigning, or speculative planetary surveillance. Temporal futures remain **explicitly deferred** until corridor trust is demonstrated (**`ROADMAP.md`**).

**Demonstrated prototype loop:** claim ↔ evidence ↔ correction ↔ review ↔ governance status ↔ release manifest.

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

Open [http://localhost:3000](http://localhost:3000). The site header lists **shortcut links** from **`lib/pilotPublicNav.ts`** — Observatory, **Pilot hub** (`/pilot`), First Corridor, Evidence Ledger, Methods, Safeguards, and Corrections — to keep navigation compact. **`/pilot`** surfaces additional corridor prototype pages (overview, evidence dossier and ledger, governance profile, claim lifecycle, human capability, labor/ecology/revenue, value-chain view, and others); see **`docs/mvp-evidence-loop.md`** for paths. Corridor workspace tabs live inside `/pilot/corridor`; **`/trust`** exposes the public Trust index; internal reviewer routes under **`/review`** and **`/workspace`** omit the public chrome.

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
| `pnpm check:pilot-hub-routes` | Fails if **`app/pilot/page.tsx`** is missing, **`lib/pilotHubRoutes.ts`** drifts from segment **`page.tsx`** files, or **`lib/pilotPublicNav.ts`** **`/pilot/...`** shortcuts miss a matching segment |
| `pnpm verify`       | Same sequence as CI: `check:pilot-routes`, `check:pilot-hub-routes`, lint, typecheck, test, build |

`pnpm check:pilot-routes`, `pnpm check:pilot-hub-routes`, and the rest of `pnpm verify` run in GitHub Actions on pushes and pull requests. Short legacy bookmark paths are listed in `docs/mvp-evidence-loop.md` and implemented in `next.config.ts`.

## Package manager

This repository standardizes on **pnpm** with **`pnpm-lock.yaml`**. A root **`pnpm-workspace.yaml`** lists only this package (`"."`) so the directory is always a self-contained pnpm project root, even if you have a `pnpm-workspace.yaml` higher on your machine.

Do not commit `package-lock.json` (it is in `.gitignore`). CI uses **`pnpm install --frozen-lockfile`**.

## Project layout

- `app/` — Next.js App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `types/corridorDossier.ts` · `types/mapSafety.ts` · `types/temporalProfile.ts` (**dormant temporal stub**)  
- `data/corridorDossier.ts` — copper–cobalt dossier skeleton; **`data/sourceMap.ts`** — pilot source / non-duplication map  
- `lib/pilotPublicNav.ts` — header shortcuts; **`lib/pilotHubRoutes.ts`** — full **`/pilot`** exploration list  
- `components/EarthEndowmentObservatoryOneFileApp.tsx` — **canonical** corridor workspace UI (client component); treat this as the source of shipped behavior.
- `docs/eeo_one_file_corridor_app.jsx` — small one-file corridor snapshot (reference; uses `lucide-react`)
- `docs/eeo_one_file_corridor_app_data_reactive.jsx` — curated repaired data-reactive atmospheric/public-evidence variant imported from local download
- `docs/EarthEndowmentObservatoryImplementationApp.jsx` — broader implementation blueprint: extra tabs, static contracts, self-contained SVG icons (no `lucide` dependency for sandbox-style builds)
- `docs/EarthEndowmentObservatoryOneFileApp.tsx` — TypeScript mirror of the corridor UI for design review (**line-for-line** with `components/EarthEndowmentObservatoryOneFileApp.tsx` aside from the header block; refresh with `pnpm sync:corridor-docs` when the component drifts).

## Environment

For the **static prototype**, you do not need a `.env` file. See `.env.example` for future Supabase/Vercel placeholders (service role **never** client-side).

## Prototype persistence boundary

Correction submissions, triage state, reviewer notes, and activity logs currently use prototype storage and may not be durable across process restarts unless persistent storage has been separately configured. Production deployment requires persistent storage, migration design, backup policy, retention rules, access controls, and security review.

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
