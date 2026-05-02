# MVP publication chain (visibility rule)

Founding document index (constitution, policies, protocols): [docs/founding/README.md](./founding/README.md).

This repository ships a **prototype-only** web surface. Data are **synthetic / sample** unless otherwise labeled. There is no production evidence vault, durable audit persistence, live APIs, or release signing in this codebase.

The canonical doctrine lives in `docs/canonical/eeo_institutional_constitution_and_systems_specification-final.md` (see repository README, Canonical Specification).

## Ordered chain (reference)

```text
source -> license -> evidence -> claim -> entity resolution -> review -> exposure review -> right-of-reply if needed -> release manifest -> public evidence dossier -> correction route
```

This is a **visibility rule** for governance-first alignment — not an executable workflow promise in the static build.

## Header shortcuts vs full pilot surface

Navigation shortcuts use **`lib/pilotPublicNav.ts`** — including **`/pilot`** (Pilot hub) and a deliberate **subset** of segment routes for clarity. The full set of shipped pilot `page.tsx` routes under **`app/pilot/`** is listed below; use **`/pilot`** in the app as the hub for deep links not repeated in the header.

## Canonical pilot URLs (`app/pilot/`)

Programmatic index (for the **`/pilot`** hub UI): **`lib/pilotHubRoutes.ts`**.

| Path | Notes |
|------|--------|
| `/pilot` | Pilot overview + MVP chain panel |
| `/pilot/corridor` | Corridor workspace UI |
| `/pilot/evidence-dossier` | Evidence dossier / claim cards |
| `/pilot/evidence-ledger` | Evidence ledger |
| `/pilot/governance-profile` | Governance profile |
| `/pilot/value-chain` | Corridor / value-chain framing |
| `/pilot/labor-ecology-revenue` | Labor, ecology, revenue |
| `/pilot/human-capability` | Human capability layer (prototype) |
| `/pilot/claim-lifecycle` | Claim lifecycle explainer |
| `/pilot/methods-and-limits` | Methods and limits |
| `/pilot/safeguards` | Safeguards |
| `/pilot/corrections` | Corrections route |

Adjacent public routes: **`/dossier`** (runtime dossier object view), **`/trust`** (Trust index), **`/`** (Observatory landing).

## Legacy public URLs → redirects

Implemented in **`next.config.mjs`** (and mirrored in some `app/*/page.tsx` redirects).

| Legacy path | Destination |
|-------------|-------------|
| `/evidence` | `/pilot/evidence-ledger` |
| `/methods` | `/pilot/methods-and-limits` |
| `/safeguards` | `/pilot/safeguards` |
| `/corrections` | `/pilot/corrections` |
| `/corridor` | `/pilot/value-chain` |
| `/evidence-ledger` | `/pilot/evidence-ledger` |
| `/source-registry` | `/pilot/evidence-dossier` |
| `/pilot/map` | `/pilot/corridor` |
| `/pilot/public-revenue` | `/pilot/labor-ecology-revenue` |

## CI: pilot route discipline

`pnpm check:pilot-routes` scans `app/` and `components/` for legacy top-level path string references.

`pnpm check:pilot-hub-routes` ensures **`lib/pilotHubRoutes.ts`** stays aligned with direct child segments under **`app/pilot/`** that ship a **`page.tsx`**, and that every **`/pilot/...`** shortcut in **`lib/pilotPublicNav.ts`** resolves to one of those pages.

Both run in **`pnpm verify`** and GitHub Actions.
