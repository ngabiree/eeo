# Version Governance Rules

## Doctrine anchor

EEO is **public-interest evidence infrastructure** for **endowment-to-economy chains** — not a dashboard product, startup SKU, ESG score surface, campaign NGO layer, consulting portal, blockchain system, or generic open-data dumping ground.

**Temporal profile types** in `types/temporalProfile.ts` remain a **dormant boundary marker** until after a trustworthy **corridor dossier** and **release discipline** posture are complete; they are **not** part of active `v0.6`/`v0.6.1` shipping goals and must not drive UI, monitoring feeds, or forecasting behavior (see **`ROADMAP.md`** for deferral to **`v1.3+`**).

Temporal profiles are intended for disciplined foresight, not prediction.

EEO studies human labor, knowledge, stewardship, rights, harm, and capability. It does **not** classify people as natural resources, assets, or inventory.

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
- **`v0.5`** — Claim governance + release consequences (partial; being consolidated in `v0.6.1`)  

## Safety-first sequencing

- **`v0.6`** — Endowment doctrine articulation + corridor dossier **schema** + **source / non-duplication map** (typing + documentation; no full dossier assertions, no temporal/monitoring/scenario UI).  
- **`v0.6.1`** — Dossier governance repair pass (claim-correction linking, public/private boundary checks, safety utilities, operational staging).  
- **`v0.7`** — Evidence population + dossier release gate (claim → evidence → source → limitation chain visible in public dossier and release manifest).  
- **`v0.8`** — Monitoring Signal Registry contract (type + docs only; no monitoring dashboard/feed/alerts/forecast/scenario UI).  
- **`v0.9`** — Scenario notes / disciplined foresight (only after prior governance gates).  
- **`v1.0`** — Public evidence pilot **release candidate**.  
- **`v1.1`** — Partner review package.  
- **`v1.2`** — Funding dossier.  
- **`v1.3+`** — Temporal profiles, monitoring signals, scenario notes (**only after** pilot trust is earned).

`v0.8` must not begin until `v0.7` evidence population and dossier release-gate coherence are complete.

`v0.9` must not begin until the Monitoring Signal Registry contract is reviewed for map-safety, evidence discipline, right-of-reply implications, public/private boundary, and non-prediction language.

Monitoring signals may eventually support Temporal Endowment Profiles, but `TemporalEndowmentProfile` remains dormant until the designated milestone.

A signal cannot become a public claim unless it passes ordinary EEO evidence discipline: source linkage, evidence role, source limitations, confidence, exposure risk, publication decision, map-safety review where relevant, and correction/review pathway.

Monitoring signals preserve the same public/private boundary as claims. Internal review notes, sensitive locations, restricted community data, and raw harm-review details must not be exposed publicly.

## Access governance requirements (`v0.9`)

Every major object should receive an access-governance decision before publication or public use (claim, evidence, source, map layer, monitoring signal, correction output, release artifact, and press material).

`not_collected` is a valid and sometimes required governance outcome. It is not a failure condition.

Public communication is part of governance, not an afterthought.

Access governance includes retention/deletion and emergency takedown pathways.

## Internal rehearsal before enforcement (`v1.0`)

Access-governance decisions should be rehearsed internally before runtime enforcement or public dashboards are introduced. The review preview demonstrates how EEO classifies claims, sources, map layers, monitoring signals, reviewer notes, community-sensitive information, and press material as public, aggregated, internal, restricted, or not_collected.

The corridor dossier remains the core public product object. Access decisions govern whether dossier-related objects may be collected, held, analyzed, published, aggregated, restricted, or refused.

## Release-gate integration requirements (`v1.1`)

A release gate should be satisfied before public publication or press amplification. Release readiness depends on evidence linkage, source limitations, access-governance decision, map-safety review, right-of-reply review where required, correction status, language safety, and release-manifest alignment.

The release gate does not adjudicate truth, wrongdoing, or liability. It assesses whether publication conditions have been satisfied.

Internal release-gate blockers must not be exposed publicly unless translated into public-safe limitations.

## Prototype persistence boundary

Correction submissions, triage state, reviewer notes, and activity logs currently use prototype storage and may not be durable across process restarts unless persistent storage is configured. Production deployment requires persistent storage, migration design, backup policy, retention rules, access controls, and security review.

## Public/private boundary

Public surfaces may disclose governance status labels (stable/challenged/under_review/corrected/restricted/withdrawn), public-safe correction counts, source limitations, and publication limitations.

Public surfaces must not disclose reviewer notes, internal activity logs, reviewer identity, submitter email, private triage reasoning, sensitive harm-review details, restricted map coordinates, or whistleblower-identifying information.

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
