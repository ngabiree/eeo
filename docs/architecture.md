# Architecture

## Current build state: v1.3

The application is a **modular Next.js monolith** on Vercel, with file-backed prototype persistence.
Supabase is configured in `.env.example` but not yet integrated — planned for v0.7+.

---

## Product layers

| Layer | Status | Notes |
|---|---|---|
| Public evidence dossier | Shipped | Stable corridor, evidence ledger, governance, value chain, methods, safeguards, and corrections routes |
| Internal review workspace (`/review`, `/workspace/*`) | Shipped | Password-gated; correction triage, release readiness preview, sign-off review |
| File-backed prototype stores | Shipped | `.eeo/corrections.json`, `.eeo/release-governance-log.json` — single-node only |
| Supabase data plane | Deferred to v0.7+ | RLS, Auth, Postgres, Storage |

---

## Public boundaries

- Public pages query static data from `data/` and derived values from `lib/`.
- Review workspace routes are protected by `lib/reviewAuth.ts` cookie-based auth.
- The `server-only` package prevents accidental client-side imports of server utilities.
- `lib/mapSafety.ts`: `assertPublicMapLayerAllowed()` throws for non-public map layers.
- `lib/publicationRules.ts`: `canClaimBeApprovedForRelease()` enforces review status + publication decision.
- `lib/releaseGate.ts`: `toPublicReleaseGateCheck()` / `toPublicReleaseGateAssessment()` strip internal fields before public serialization.

---

## Type system: governance in types

Key type files enforce the institutional doctrine at compile time:

| File | What it governs |
|---|---|
| `types/eeo.ts` | Core claim, evidence, source, entity, and manifest interfaces |
| `types/accessGovernance.ts` | v0.9 — six access tiers, decision records, prohibited-collection contract |
| `types/releaseGate.ts` | v1.1 — release blockers, gate checks, assessment records |
| `types/reviewSignoff.ts` | v1.3 — nine formal review disciplines, sign-off records |
| `types/mapSafety.ts` | v0.6 — map layer classification and publication modes |
| `types/monitoringSignal.ts` | v0.8 — **type-only dormant contract** (no dashboard/feed/UI) |
| `types/temporalProfile.ts` | v1.5+ — **fully dormant boundary marker** (must not be imported in app/components/lib) |
| `types/humanLayer.ts` | v0.6 — human capability as relational stewardship, not inventory |

---

## File-backed persistence (prototype boundary)

```
.eeo/
  corrections.json       # Correction submissions and triage state
  release-governance-log.json  # Release governance activity log
```

These stores are:
- single-Node process only (no concurrent writes across instances)
- gitignored
- disabled under Vitest (`process.env.VITEST`)
- written with atomic rename to reduce corruption risk

**Migration to Supabase + RLS is required before handling real restricted evidence.**

---

## Deferred layers

- Durable database persistence (Supabase Postgres + PostGIS)
- Row Level Security enforced at DB layer
- Multi-user review auth and audit logging
- Formal release manifest signing workflow
- Temporal profile, monitoring, and scenario UI (v1.5+)

---

## System diagram (target: post-v0.7)

```
GitHub Repository
  → Pull Request → Vercel Preview Deployment → Review / QA
    → Merge to main → Vercel Production Deployment
      → Next.js App
        → Public Evidence Dossier (/corridors/copper-cobalt/dossier)
        → Restricted Review Workspace (/review, /workspace/*)
        → Server Actions / API Routes
          → Supabase Auth
          → Supabase Postgres + PostGIS (RLS enforced)
          → Supabase Storage — evidence-vault (private)
          → Supabase Storage — public-release-assets
          → Released Public Views (public.released_*)
```
