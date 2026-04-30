# Monitoring Signal Registry (v0.8 contract)

## Definition

A monitoring signal is an evidence-linked observation or update that may inform a claim, dossier section, trend assessment, or future Temporal Endowment Profile.

## What a monitoring signal is not

- not a prediction;
- not a legal finding;
- not a claim of causation;
- not a score;
- not a scenario;
- not a conclusion by itself.

Signals must not be used to imply causation, legal responsibility, product-level traceability, future certainty, or company wrongdoing unless supported by appropriate evidence and publication review.

## Required fields

The contract is defined in `types/monitoringSignal.ts` and includes:

- identity and category (`id`, `title`, `category`, `status`, `posture`);
- linkage (`linkedClaimIds`, `linkedEntityIds`, `linkedSourceIds`, optional `linkedDossierId`);
- observation framing (`currentObservation`, `observationPeriod`, `baselinePeriod`, `updateFrequency`, optional `observedDirection`);
- evidence/source linkage (`evidenceLinks`, `sourceLinks`);
- governance and safety (`confidence`, `mapSafetyClass`, `exposureRisk`, `publicationDecision`);
- limitations (`sourceLimitations`, `whatThisSignalDoesNotProve`);
- timestamp (`lastUpdated`).

## Relationship to claims

A monitoring signal may later support, limit, or motivate review of a claim. A signal does not become a claim by itself.

## Relationship to evidence

Signals must be evidence-linked. A signal without evidence linkage is not publication-ready.

## Relationship to sources and source limitations

Signals must include source linkage and explicit source limitations. A signal must answer what it does not prove.

## Relationship to map safety

Signals must carry `mapSafetyClass`, `exposureRisk`, and `publicationDecision` before any public use. Even if a signal is true, public release may be unsafe.

Examples of unsafe signal classes:

- exact location of vulnerable ecological sites;
- artisanal mining activity exposing communities;
- sacred or culturally sensitive sites;
- whistleblower-linked reports;
- security-sensitive infrastructure;
- endangered species occurrence;
- raw community-sensitive reports.

Universal knowledge does not require universal exposure. Monitoring signals must be classified for map safety and exposure risk before any public use.

## Relationship to release manifest

In `v0.8`, monitoring signals do not affect release status.

- They are not public claims.
- They are not included in release manifest summaries.
- They do not change claim governance status.
- They do not trigger correction flows.

Future relationship: reviewed monitoring signals may be referenced by a release manifest if they are used to support, limit, or update a public claim.

## Relationship to corrections and claim governance

Signal-level observations may motivate correction or review, but correction governance remains claim-governed in current milestones.

## Relationship to future Temporal Endowment Profiles

Signals may later inform Temporal Endowment Profiles. TemporalEndowmentProfile remains dormant in `v0.8` and is not runtime-activated here.

## Public/private boundary

Monitoring signals must preserve the same public/private boundary as claims. Internal review notes, sensitive locations, restricted community data, and raw harm-review details must not be exposed publicly.

## Safe examples

- source freshness warning for a published trade table;
- labor-risk signal showing an updated public indicator series;
- ecological signal with generalized geography and explicit limitation notes.

## Unsafe or overclaiming examples

- "This signal proves causation."
- "This signal predicts what will happen."
- "This signal proves company wrongdoing."
- "This signal establishes legal liability."

## Observation, trend, prediction, foresight

- **Observation**: a recorded update or measurement from a source.
- **Trend indicator**: a signal that may suggest direction over time, subject to evidence and baseline limits.
- **Prediction**: a claim about what will happen. Predictions are not part of `v0.8`.
- **Disciplined foresight**: a future milestone that may use reviewed signals, uncertainty, assumptions, and scenario notes to describe plausible futures without claiming certainty.
