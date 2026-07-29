# EEO Agent State

## Last updated

2026-07-29

## Current repo observations

- framework: Next.js App Router application with TypeScript, React, Tailwind CSS, Vitest, and ESLint.
- package manager: pnpm, standardized by `packageManager` in `package.json` and `pnpm-lock.yaml`.
- routing: `app/` uses App Router routes. Public surfaces include `/`, `/corridors/copper-cobalt`, `/corridors/copper-cobalt/dossier`, `/evidence-ledger`, `/methods`, `/safeguards`, `/corrections`, `/right-of-reply`, `/trust`, and related governance/disclosure pages. Internal or reviewer-oriented surfaces include `/review` and `/workspace`; `/pilot/*` paths are redirects only.
- styling: Tailwind plus EEO-specific CSS tokens and utilities in `app/globals.css`.
- data approach: prototype TypeScript data modules under `data/`, including claims, evidence, sources, entities, corridor dossier, source map, release manifest, and review/access examples. Public live evidence is not stored in GitHub.
- schema/type approach: TypeScript contracts under `types/`, including corridor dossier, EEO domain types, human layer, map safety, release gate, review signoff, monitoring signal, and dormant temporal profile types.
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
- `docs/corridor-charter-template.md` defines the authorization gate for any corridor before it moves beyond roadmap or candidate status.
- `docs/copper-cobalt-claim-readiness.md` records claim-by-claim release-readiness status for the current pilot corridor.
- `docs/founding/README.md` is the founding-document hub.

## Completed increments

- Repository already includes a Next.js App Router prototype with public EEO surfaces, corridor pilot routes, evidence/correction/review/release helpers, and doctrine docs.
- Repository already includes route discipline scripts, Vitest tests, lint, typecheck, and CI.
- 2026-07-29: Added a corridor charter template and roadmap/docs links so future corridors require boundary, evidence, source-rights, disclosure, map-safety, right-of-reply, reviewer, release-manifest, and stop-condition review before activation.
- 2026-07-29: Added a Copper-Cobalt claim readiness matrix that keeps `CLAIM-DRC-CO-001` release-scoped, identifies `CLAIM-DRC-CO-002` as the next near-candidate, and keeps method/exposure/ownership-sensitive claims withheld pending review.

## Current safe next step

Review `CLAIM-DRC-CO-002` as the next possible release addition by confirming source/license posture, source date, confidence explanation, accountable reviewer role, and release-manifest approval conditions.

Do not start a second public corridor until the Copper-Cobalt release gate is coherent and the second corridor has a completed charter.

## Open risks

- Prototype persistence boundaries remain: correction submissions, reviewer notes, and activity logs may not be durable unless persistent storage is separately configured.
- Public/private boundary must remain strict. Do not expose reviewer notes, submitter identities, restricted map coordinates, internal triage reasoning, or sensitive harm-review details.
- The public homepage and pilot pages already contain strong posture language, but every new claim card or dossier paragraph still requires language-safety review.
- Future corridor expansion could create global-atlas or public-exposure drift unless the corridor charter gate is enforced.
- Visible prototype claims can be mistaken for release-approved public findings unless release-manifest scope remains explicit.
- CI currently runs route checks, temporal dormancy, lint, typecheck, tests, and build. If `pnpm verify` includes additional checks, keep CI and verify aligned intentionally.

## Deferred items

- Global atlas, rankings, composite scores, certification seals, monitoring dashboards, alerts, scenario/forecast UI, temporal profile UI, blockchain modules, AI judgment surfaces, and public community reporting modules are deferred.
- Additional public corridors are deferred until Copper-Cobalt release discipline is coherent and the proposed corridor has a completed charter.
- Live data ingestion and governed evidence storage are deferred until access controls, private storage, audit logs, release views, review workflows, backups, retention rules, and security review are ready.
- Monitoring and temporal profile runtime features remain deferred until the corridor dossier and release discipline are coherent.

## Last checks run

- Not run in this increment. Changes are documentation-only and were prepared through the GitHub branch workflow.
