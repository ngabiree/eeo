# EEO Implementation Roadmap

This roadmap keeps EEO on a corridor-first evidence dossier path. It should be read with `GOVERNANCE.md`, `DISCLOSURE_POLICY.md`, `docs/mvp-evidence-loop.md`, `docs/language-safety.md`, `docs/map-safety-protocol.md`, `docs/release-process.md`, and `docs/corridor-charter-template.md`.

EEO publishes evidence for inquiry, not a verdict. Every increment should strengthen the loop from source to public-safe dossier, correction, right of reply, and release discipline.

## Product boundary

The first product unit is one public corridor dossier with linked evidence, source limits, safeguards, correction route, right-of-reply pathway, and release manifest.

The MVP loop is:

```text
source
-> license or use basis
-> evidence item
-> claim
-> entity/geography resolution
-> evidence review
-> exposure and safeguards review
-> right of reply when needed
-> release manifest
-> public evidence dossier
-> correction route
```

Do not expand into a global atlas, ESG score, ranking product, certification system, legal-adjudication surface, blockchain trust system, monitoring dashboard, forecasting UI, public exposure engine, or AI decision authority.

## Corridor authorization gate

The current MVP corridor is the Copper-Cobalt Critical Minerals Corridor. Additional corridors must not move beyond roadmap or candidate status until a corridor charter records the boundary, source and license posture, evidence gaps, disclosure and map-safety plan, rights and legal posture, right-of-reply triggers, correction path, named reviewers, release manifest conditions, and stop conditions.

Use `docs/corridor-charter-template.md` before creating public pages, public claims, public map layers, or dashboard surfaces for any future corridor.

Candidate corridors may be researched internally only when they remain clearly marked as roadmap, candidate, or provisional work. They must not imply EEO has made findings, authorized publication, verified custody, adjudicated responsibility, or approved disclosure.

## Sprint 0: Repo and safety baseline

Goal: keep the operating baseline explicit so future builder runs do not restart from guesswork.

Scope:

- Maintain `docs/agent-state.md`.
- Maintain this roadmap.
- Maintain `docs/eeo-language-guardrails.md`.
- Maintain `docs/release-checklist.md`.
- Keep documentation grounded in observed repo state.

Definition of done:

- Repo structure is documented.
- Build/test commands are identified or marked unknown.
- EEO doctrine and red lines are captured.
- One safe next implementation step is named.
- No new public claim, data surface, or architecture change is introduced.

## Sprint 1: Canonical public framing

Goal: ensure the public landing and corridor overview explain EEO plainly and safely.

Likely files:

- `app/page.tsx`
- `app/corridors/copper-cobalt/page.tsx`
- `lib/pilotPublicNav.ts`
- `components/eeo/*`
- relevant docs under `docs/`

Definition of done:

- Public copy clearly says EEO is evidence for inquiry, not a verdict.
- Public copy explains what EEO does not do.
- Links point to corridor dossier, evidence ledger, methods/limits, safeguards, corrections, and right-of-reply surfaces.
- Copy avoids legal findings, guilt, ownership adjudication, certification, traceability proof, rankings, and score language.
- No unsupported claims are added.

## Sprint 2: Corridor dossier shell

Goal: make the first corridor dossier navigable as the central public product object.

Likely files:

- `app/corridors/copper-cobalt/system/*`
- `app/corridors/copper-cobalt/dossier/*`
- `app/evidence-ledger/*`
- `data/corridorDossier.ts`
- `types/corridorDossier.ts`
- `components/eeo/*`

Required public sections:

- corridor overview;
- natural endowment layer;
- human dependency and capability layer;
- value movement layer;
- governance, evidence, and safeguards layer;
- claim cards;
- evidence ledger;
- source registry;
- methods and limits;
- map-safety note;
- correction and right-of-reply route.

Definition of done:

- Dossier reads as a limited corridor evidence dossier, not a global dashboard.
