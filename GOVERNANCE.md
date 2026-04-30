# Version Governance Rules

## Doctrine anchor

EEO is **public-interest evidence infrastructure** for **endowment-to-economy chains** — not a dashboard product, startup SKU, ESG score surface, campaign NGO layer, consulting portal, blockchain system, or generic open-data dumping ground.

**Temporal profile types** in `types/temporalProfile.ts` remain a **dormant boundary marker** until after a trustworthy **corridor dossier** and **release discipline** posture are complete; they are **not** part of active `v0.6` shipping goals and must not drive UI, monitoring feeds, or forecasting behavior (see **`ROADMAP.md`** for deferral to **`v1.3+`**).

## Knowledge-governance caution

Knowledge held by Indigenous peoples, local communities, workers, or customary institutions is **not** automatically part of the public evidence commons. It may be described only under **authority**, **consent**, **context**, and **benefit** rules.

Open data is not always just data. Some knowledge should be open, some aggregated, some restricted, some consent-governed, and **some not collected at all**.

This applies especially to:

- sacred sites;
- Indigenous ecological knowledge;
- vulnerable species or habitats;
- artisanal mining sites;
- worker or whistleblower evidence;
- community grievance records;
- contested land or resource claims;
- sensitive security or infrastructure information.

## Right-of-reply as publication discipline

Right-of-reply review should be considered when a **public claim identifies or materially affects** a company, government agency, concession holder, operator, public institution, organization, or other identifiable actor.

It is **especially** important when a claim:

- implies misconduct, missing disclosure, public harm, unresolved risk, or benefit failure;
- relies on contested or incomplete evidence;
- could materially affect reputational standing;
- concerns ownership/control, labor risk, ecological harm, public revenue, or concession governance.

Right-of-reply may **not** be required for:

- general method-limit claims;
- neutral source limitations;
- broad educational claims;
- claims that do not identify or materially affect an actor.

**Safe framing:** Right-of-reply is **not** a concession that a claim is false. It is a **publication discipline** that gives materially affected actors an opportunity to provide evidence, correction, context, or objection before or after publication.

Full guidance: **`docs/right-of-reply.md`** (and legacy design notes in **`docs/right-of-reply-protocol.md`**).

## Shipped baseline (reference)

- **`v0.3`** — Evidence core  
- **`v0.4`** — Review activity logging  
- **`v0.5`** — Claim governance + release consequences  

## Safety-first sequencing

- **`v0.6`** — Endowment doctrine articulation + corridor dossier **schema** + **source / non-duplication map** (typing + documentation; no full dossier assertions, no temporal/monitoring/scenario UI).  
- **`v0.7`** — Corridor **evidence content** population for the dossier sections.  
- **`v0.8`** — Release hardening (persistence where appropriate, map-safety gates, right-of-reply workflow depth, partner review).  
- **`v1.0`** — Public evidence pilot **release candidate**.  
- **`v1.1`** — Partner review package.  
- **`v1.2`** — Funding dossier.  
- **`v1.3+`** — Temporal profiles, monitoring signals, scenario notes (**only after** pilot trust is earned).

## `v0.6` scope guard (do not regress)

For **`v0.6`**, ship **only**:

- documented endowment / human-capability doctrines;
- corridor dossier **TypeScript contracts** (`types/corridorDossier.ts`);
- map-safety **types** (`types/mapSafety.ts`);
- **source map** planning data (`data/sourceMap.ts`);
- **skeleton** dossier placeholder (`data/corridorDossier.ts`);
- public **methods / safeguards** language on what the pilot will / will not prove;
- governance + roadmap alignment.

For **`v0.6`**, **do not ship**:

- global atlas or map layers in production UI;
- temporal profile **UI** or automation;
- monitoring dashboards, live feeds, alerting, or signal registries;
- scenario / forecasting UI;
- blockchain, AI-judgment surfaces, or composite scores;
- new legal findings or product-level traceability claims.
