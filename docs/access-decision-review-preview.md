# Internal Access Decision Review Preview (v1.0)

## 1) Purpose

Rehearse how EEO applies access-governance tiers to corridor-dossier objects before collection, analysis, publication, press use, correction handling, and retention/deletion.

## 2) What this preview is

This preview is not a public dashboard. It is a governance rehearsal showing how EEO applies access tiers before public use.

## 3) What this preview is not

- not a runtime access-control UI;
- not a public access decision surface;
- not a compliance toy detached from the dossier;
- not monitoring runtime, forecasting, scenario notes, or scoring.

An access decision does not make a claim true. It determines how an object may be collected, held, reviewed, published, aggregated, restricted, or refused.

## 4) Review questions

- What is the object?
- Which dossier, claim, source, map layer, correction, monitoring signal, or press material does it relate to?
- What public-interest question does it serve?
- Is collection necessary?
- Who could be harmed by collection or publication?
- Who has authority over the data?
- Is consent required?
- Is public release lawful and ethical?
- Is aggregation required?
- Is restriction required?
- Should this not be collected?
- What reviews are required?
- What retention rule applies?
- What can be said publicly?
- What must remain internal?
- Would publication require right-of-reply review?
- Would publication require map-safety review?
- Does the release manifest allow this public communication?
- What would trigger correction, takedown, restriction, or withdrawal?

## 5) Example decision table

| Object | Access tier | Publication posture | Key risk | Required reviews |
|---|---|---|---|---|
| Public methodological claim | Public | Publish with limitations | Overclaiming | Evidence, language safety |
| Aggregated labor-risk data | Aggregated | Publish only non-identifying summary | Worker retaliation | Labor/human rights, legal, language safety |
| Restricted map layer | Restricted | Do not publish precise location | Exposure harm | Map safety, ecological, legal |
| Community-sensitive knowledge | Not collected | Do not collect or store underlying detail | Consent and cultural harm | Community/Indigenous, legal |
| Internal reviewer note | Internal | Do not publish | Private reasoning exposure | Data protection, legal |
| Press material | Public after release gate | Publish only after review | Evidence exaggeration | Press, language, legal |
| Monitoring signal | Internal draft | Not public | Premature claim or prediction | Evidence, map safety, language safety |

## 6) Object-by-object notes

The inert examples live in `data/accessDecisionExamples.ts` and remain tied to real EEO objects (claim, map layer, monitoring signal, review note, press material, and release-related governance).

## 7) Failure conditions

- Decision tier missing for object under review.
- Publication attempted without required review stack.
- Press summary exceeds release-manifest evidence boundary.
- `not_collected` decision stores sensitive details anyway.
- Restricted or internal objects exposed on public pages.

## 8) Public/private boundary

Public pages may present claim governance outcomes and public-safe limitations. Public pages must not disclose reviewer notes, internal activity logs, reviewer identity, submitter email, private triage reasoning, restricted map precision, or sensitive community details.

## 9) Relationship to the corridor dossier

The corridor dossier remains the core product object. Access decisions exist to protect and govern the dossier, its claims, sources, map layers, corrections, monitoring signals, and public communications.

## 10) Relationship to the release manifest

Release-manifest posture remains authoritative for what is publishable in the current release. Access decisions must be consistent with release-manifest scope and limitations.

## 11) Relationship to monitoring signals

Monitoring signals remain non-public draft/internal objects in this preview. They are not claims, findings, legal conclusions, or predictions.

## 12) Relationship to press management

Press materials must not outrun the release manifest.

## 13) Relationship to incident response and takedown

If content exceeds approved access posture, incident response should restrict/remove exposure, update governance records, and issue correction/update as needed.

## 14) Next implementation step

After this rehearsal, next safe work is an internal-only review prototype that tests decision flow without creating public dashboards or runtime monitoring surfaces.

Not_collected decisions must not create detailed shadow records of sensitive information.
