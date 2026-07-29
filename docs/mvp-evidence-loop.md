# MVP publication chain (visibility rule)

Founding document index (constitution, policies, protocols): [docs/founding/README.md](./founding/README.md).

This repository ships a **prototype-only** web surface. Data are **synthetic / sample** unless otherwise labeled. There is no production evidence vault, durable audit persistence, live APIs, or release signing in this codebase.

The canonical doctrine lives in `docs/canonical/eeo_institutional_constitution_and_systems_specification-final.md` (see repository README, Canonical Specification).

## Ordered chain (reference)

```text
source -> license -> evidence -> claim -> entity resolution -> review -> exposure review -> right-of-reply if needed -> release manifest -> public evidence dossier -> correction route
```

This is a **visibility rule** for governance-first alignment — not an executable workflow promise in the static build.

## Header shortcuts vs full public surface

Navigation shortcuts use **`lib/pilotPublicNav.ts`** and a deliberate subset of stable public routes for clarity. The full set of shipped corridor routes is listed below; use **`/corridors/copper-cobalt`** as the index for deep links not repeated in the header.

## Stable public URLs

Programmatic index for the corridor overview: **`lib/pilotHubRoutes.ts`**.

| Path | Notes |
|------|--------|
| `/corridors/copper-cobalt` | Corridor overview + publication-chain panel |
| `/corridors/copper-cobalt/system` | Corridor system view |
| `/corridors/copper-cobalt/dossier` | Evidence dossier / claim cards |
| `/evidence-ledger` | Evidence ledger |
| `/corridors/copper-cobalt/governance` | Governance profile |
| `/corridors/copper-cobalt/value-chain` | Corridor / value-chain framing |
| `/corridors/copper-cobalt/labor-ecology-revenue` | Labor, ecology, revenue |
| `/corridors/copper-cobalt/human-capability` | Human capability layer |
| `/corridors/copper-cobalt/claim-lifecycle` | Claim lifecycle explainer |
| `/methods` | Methods and limits |
| `/safeguards` | Safeguards |
| `/corrections` | Corrections route |

Adjacent public routes: **`/dossier`** (runtime dossier object view), **`/trust`** (Trust index), **`/`** (Observatory landing).

## Legacy public URLs → redirects

Implemented in **`next.config.mjs`** (and mirrored in some `app/*/page.tsx` redirects).

| Legacy path | Destination |
|-------------|-------------|
| `/pilot` | `/corridors/copper-cobalt` |
| `/pilot/corridor` | `/corridors/copper-cobalt/system` |
| `/pilot/evidence-dossier` | `/corridors/copper-cobalt/dossier` |
| `/pilot/evidence-ledger` | `/evidence-ledger` |
| `/pilot/governance-profile` | `/corridors/copper-cobalt/governance` |
| `/pilot/value-chain` | `/corridors/copper-cobalt/value-chain` |
| `/pilot/labor-ecology-revenue` | `/corridors/copper-cobalt/labor-ecology-revenue` |
| `/pilot/human-capability` | `/corridors/copper-cobalt/human-capability` |
| `/pilot/claim-lifecycle` | `/corridors/copper-cobalt/claim-lifecycle` |
| `/pilot/methods-and-limits` | `/methods` |
| `/pilot/safeguards` | `/safeguards` |
| `/pilot/corrections` | `/corrections` |
| `/evidence` | `/evidence-ledger` |
| `/corridor` | `/corridors/copper-cobalt/value-chain` |
| `/source-registry` | `/corridors/copper-cobalt/dossier` |
| `/pilot/map` | `/corridors/copper-cobalt/system` |
| `/pilot/public-revenue` | `/corridors/copper-cobalt/labor-ecology-revenue` |

## CI: pilot route discipline

`pnpm check:pilot-routes` scans `app/` and `components/` for legacy `/pilot` path references.

`pnpm check:pilot-hub-routes` ensures **`lib/pilotHubRoutes.ts`** and **`lib/pilotPublicNav.ts`** resolve to stable App Router pages.

Both run in **`pnpm verify`** and GitHub Actions.
