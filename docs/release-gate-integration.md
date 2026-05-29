# Release Gate Integration Design (v1.1+)

## Purpose

Define an internal release-readiness model that connects dossier, claim, evidence, source limitations, access governance, map safety, right-of-reply, correction/governance status, language safety, release manifest alignment, and press discipline.

## What the release gate is

An internal readiness check over publication conditions for release objects.

## What the release gate is not

- not a public dashboard;
- not a truth engine;
- not legal adjudication;
- not monitoring runtime;
- not forecasting, scenario, or scoring output.

The release gate does not make a claim true. It determines whether the conditions for public release have been satisfied.

## Structural readiness helpers

`lib/releaseManifestReadiness.ts` and related helpers are internal structural readiness checks. They summarize whether prototype records have the expected linkage and posture fields before any future release-manifest review.

They check only structural conditions such as:

- claim/evidence/source linkage presence and reciprocal consistency;
- dossier section completeness and linked claim/evidence references;
- source license or use-basis posture as recorded fields;
- right-of-reply posture as recorded claim fields and helper-inferred applicability;
- map-safety review presence and recorded classification posture for release-bound geospatial objects.

They do not determine factual truth, legal sufficiency, source quality, exposure safety, rights-holder consent, ecological sensitivity, notice adequacy, fairness, or publication approval. They do not sign, assemble, publish, or enforce a release manifest.

Internal readiness output must remain inside review and workspace contexts. If any concern is later described publicly, it must be translated into public-safe limitations and must not expose reviewer notes, internal rationales, actor contact details, right-of-reply packets, restricted evidence, sensitive coordinates, or other non-public material.

## Relationship to the corridor dossier

The corridor dossier remains the core public product object. The release gate protects the dossier from unsupported claims, unsafe exposure, unresolved corrections, and overclaiming.

## Relationship to claims

Claims pass through gate checks for evidence presence, source limitations, access-governance posture, map safety, right-of-reply status where required, correction status, and publication decision.

## Relationship to evidence and source limitations

Claims should be blocked when evidence linkage or source limitations are missing.

## Relationship to access governance

Release checks consume access-governance decisions. A `not_collected` decision cannot be reversed into publication through release-gate review. New authority, consent, necessity, and safety review would be required before any future collection decision.

## Relationship to map safety

Map-safety unresolved states block release when spatial exposure risk is relevant.

## Relationship to right of reply

If right-of-reply is required and unresolved for a materially affected identifiable actor context, release is blocked.

## Relationship to corrections and claim governance

Open corrections and unresolved governance states are release blockers unless explicitly handled with public-safe limitation disclosure.

## Relationship to the release manifest

The release manifest should not include or promote material that has failed the release gate.

## Relationship to press materials

Press materials must not outrun the release manifest.

## Blocker categories

Release blocker categories include:

- missing evidence;
- missing source limitations;
- missing or blocking access decision;
- unresolved map safety;
- unresolved right-of-reply;
- unresolved corrections;
- publication decision blocks release;
- restricted-data exposure;
- not-collected source posture;
- unresolved required review domains (legal, labor/human-rights, community/Indigenous, language safety, press alignment).

## Public/private boundary

Internal blockers, reviewer notes, and internal rationales must not be exposed publicly. If release-gate concerns are surfaced publicly, they must be translated into public-safe limitations.

## Failure conditions

- publication attempted with unresolved blockers;
- press summary exceeds release-manifest evidence boundary;
- restricted or not-collected objects pushed to public release;
- internal blocker detail exposed publicly.

## Next implementation step

v1.2 adds an internal release-readiness preview inside the protected review workspace. It applies release-gate helpers to the pilot sample claim and release package context without public UI, runtime enforcement, monitoring, scoring, forecasting, database persistence, or public access-decision display.

**v1.3** introduces formal **review sign-off** types and protocol (`docs/review-signoff-protocol.md`) so required-review completion can be recorded explicitly before release-manifest derivation or enforcement—still without public sign-off surfaces or persistence in the prototype contract milestone.

Later milestones may derive public-safe readiness signals for release-manifest alignment without leaking internal blocker detail.
