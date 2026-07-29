# EEO Agent State

## Last updated

2026-07-29

## Current repo observations

- framework: Next.js App Router application with TypeScript, React, Tailwind CSS, Vitest, and ESLint.
- package manager: pnpm, standardized by `packageManager` in `package.json` and `pnpm-lock.yaml`.
- routing: `app/` uses App Router routes. Public surfaces include `/`, `/pilot`, `/pilot/corridor`, `/pilot/evidence-dossier`, `/pilot/evidence-ledger`, `/pilot/methods-and-limits`, `/pilot/safeguards`, `/pilot/corrections`, `/right-of-reply`, `/trust`, and related governance/disclosure pages. Internal or reviewer-oriented surfaces include `/review` and `/workspace`.
- styling: Tailwind plus EEO-specific CSS tokens and utilities in `app/globals.css`.
- data approach: prototype TypeScript data modules under `data/`, including claims, evidence, sources, entities, corridor dossier, source map, release manifest, release decisions, corridor lifecycle, and review/access examples. Public live evidence is not stored in GitHub.
- schema/type approach: TypeScript contracts under `types/`, including corridor dossier, lifecycle gates, EEO domain types, human layer, map safety, release gate, review signoff, monitoring signal, and dormant temporal profile types.
- known build/test commands:
  - `pnpm dev`
  - `pnpm build`
  - `pnpm start`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm verify`
  - `pnpm check:pilot-routes`
  - `pnpm check:pilot-hub-routes`
  - `pnpm check:corridor-section-routes`
  - `pnpm check:temporal-dormancy`
  - `pnpm check:brand-assets`
  - `pnpm sync:corridor-docs`

## Current doctrine and public posture

EEO is public-interest evidence infrastructure for endowment-to-economy chains. It is evidence for inquiry, not a verdict.

Public claims must preserve uncertainty, source limits, correction pathways, disclosure safeguards, and right-of-reply discipline where claims materially affect identifiable actors.

EEO must not be framed as:

- a legal tribunal;
- a court;
- a universal ownership registry;
- a global resource owner;
- an ESG score or ranking product;
- a certification system;
- a blockchain trust layer;
- an AI decision authority;
- a public exposure platform;
- a replacement for competent public, Indigenous, community, statistical, legal, or civil-society institutions.

## Observed doctrine surfaces

- `README.md` describes the public evidence prototype, live evidence boundary, core identity, anchored analytic chain, strategic dossier-first posture, and run scripts.
- `GOVERNANCE.md` defines version governance, right-of-reply discipline, temporal/monitoring deferral, public/private boundaries, and scope red lines.
- `DISCLOSURE_POLICY.md` defines tiered disclosure and product constraints.
- `DATA_POLICY.md`, `SECURITY.md`, and `AI_USE_POLICY.md` define operational boundaries.
- `docs/language-safety.md` provides public copy and claim language safety rules.
- `docs/map-safety-protocol.md` defines spatial disclosure defaults and map release gates.
- `docs/right-of-reply.md` and `docs/right-of-reply-protocol.md` cover reply/correction discipline.
- `docs/mvp-evidence-loop.md` documents the corridor-first evidence loop and public routes.
- `docs/founding/README.md` is the founding-document hub.
- `docs/release-checklist.md` completes release-manifest, corridor authorization, stop-condition, and post-release checks.
- `docs/corridor-dossier-readiness.md` records the first corridor claim/evidence/release-readiness matrix and identifies release-manifest disposition gaps.

## Completed increments

- Repository already includes a Next.js App Router prototype with public EEO surfaces, corridor pilot routes, evidence/correction/review/release helpers, and doctrine docs.
- Repository already includes route discipline scripts, Vitest tests, lint, typecheck, and CI.
- 2026-07-29: Completed `docs/release-checklist.md`, adding bounded release-manifest requirements, corridor authorization checks, stop conditions, and post-release checks.
- 2026-07-29: Added `docs/corridor-dossier-readiness.md`, documenting seven observed corridor claims, their evidence-link counts, review status, release-manifest status, and blockers before broader release.
- 2026-07-29: Added first-class `ReleaseDecision` typing and inert claim release-decision records. Publication treatment is no longer inferred only from arrays of claim IDs.
- 2026-07-29: Added a canonical corridor lifecycle model with an overall phase plus independent source-rights, provenance, method, legal-posture, exposure, map-safety, right-of-reply, correction, manifest, and authorization gates.
- 2026-07-29: Added an inert copper-cobalt lifecycle record. It explicitly records that the corridor is in review and has not received corridor-level release authorization.

## Current safe next step

Reconcile the draft release manifest with the canonical `ReleaseDecision` records. Every observed claim should appear exactly once in the decision set, manifest summaries should be derived from those decisions rather than maintained independently, and no helper should treat manifest inclusion as corridor authorization.

Begin with typed validation or tests. Do not expose lifecycle internals, reviewer reasons, or authorization controls in public UI during this increment.

## Open risks

- Prototype persistence boundaries remain: correction submissions, reviewer notes, and activity logs may not be durable unless persistent storage is separately configured.
- Public/private boundary must remain strict. Do not expose reviewer notes, submitter identities, restricted map coordinates, internal triage reasoning, or sensitive harm-review details.
- The public homepage and pilot pages already contain strong posture language, but every new claim card or dossier paragraph still requires language-safety review.
- The draft release manifest includes only `CLAIM-DRC-CO-001`; other observed claims now have inert release decisions but have not received corridor release authorization.
- `releaseReadiness` remains for compatibility and is deprecated for new governance work. New decisions should use lifecycle phase plus explicit gate status.
- CI currently runs route checks, temporal dormancy, lint, typecheck, tests, and build. If `pnpm verify` includes additional checks, keep CI and verify aligned intentionally.

## Deferred items

- Global atlas, rankings, composite scores, certification seals, monitoring dashboards, alerts, scenario/forecast UI, temporal profile UI, blockchain modules, AI judgment surfaces, and public community reporting modules are deferred.
- Live data ingestion and governed evidence storage are deferred until access controls, private storage, audit logs, release views, review workflows, backups, retention rules, and security review are ready.
- Monitoring and temporal profile runtime features remain deferred until the corridor dossier and release discipline are coherent.

## Last checks run

- No local checks were run. Changes were made through the GitHub connector because the repository could not be cloned in the workspace due to network restrictions.
- Static consistency was reviewed across `types/eeo.ts`, `types/corridorDossier.ts`, `data/releaseDispositions.ts`, and `data/corridorLifecycle.ts`.
