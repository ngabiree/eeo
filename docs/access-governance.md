# Access Governance (v0.9 contract)

## Purpose

Define how EEO decides whether data, claims, sources, map layers, monitoring signals, review notes, community submissions, and press materials should be public, aggregated, internal, restricted, or not collected.

Universal analytical concern does not require universal exposure.

## Access tiers

- `public`: safe and lawful to publish openly with provenance, limitations, and correction route.
- `aggregated`: publish only at reduced resolution, generalized geography, grouped category, or non-identifying form.
- `internal`: available only to authorized EEO reviewers/researchers in protected workflows.
- `restricted`: requires additional governance conditions (legal review, community or Indigenous authority, partner agreement, or explicit permission).
- `not_collected`: EEO should not collect/store/process the data because collection creates avoidable harm, violates rights, exceeds necessity, or lacks clear public-interest purpose.

“Not collected” is an affirmative governance outcome. EEO should not collect data when collection itself creates avoidable harm, violates rights, exceeds necessity, or serves no clear public-interest purpose.

For `not_collected` decisions, EEO should avoid creating a detailed shadow record of the sensitive data it refused to collect.

## Internal vs restricted

Internal access is not the same as restricted access. Internal data may be available to authorized EEO reviewers. Restricted data requires additional governance conditions, such as community authority, legal review, partner agreement, or special permission.

## Collection minimization

EEO should collect the minimum data necessary to answer the public-interest question.

## Layer-by-layer access matrix

| Layer | Default access posture | Main risk | Required review | Publication rule | Retention posture |
|---|---|---|---|---|---|
| Endowment condition | Public or aggregated | Overclaiming from weak baselines | evidence_review, language_safety_review | Publish with source limitations and non-causation language | retain_public_record |
| Geospatial/location data | Aggregated or restricted | Harm through location exposure | map_safety_review, ecological_review | Spatial precision must not exceed context safety | retain_restricted_with_access_log |
| Governance/legal framework | Public | Misstating legal posture | legal_review, language_safety_review | Describe framework, avoid adjudicatory claims | retain_public_record |
| Concessions/contracts | Aggregated or restricted | Contractual/legal sensitivity | legal_review, evidence_review | Cite authoritative hosts, avoid overreach | retain_internal_until_review_complete |
| Ownership/control | Aggregated or restricted | Reputational harm from weak linkage | evidence_review, right_of_reply_review | Publish only evidence-linked relationships with limitations | retain_internal_until_review_complete |
| Trade/value chain | Public or aggregated | False traceability inference | evidence_review, language_safety_review | Reported flows do not establish mine-to-product custody | retain_public_record |
| Labor/human-rights data | Aggregated or restricted | Worker retaliation/exposure | labor_or_human_rights_review, legal_review, language_safety_review | Publish non-identifying indicators unless consent and safety conditions are met | delete_after_review or aggregated retention |
| Ecological signals | Aggregated or restricted | Habitat/species/sacred site exposure | ecological_review, map_safety_review | Generalize location and disclose uncertainty | community_governed_retention or restricted retention |
| Public revenue | Public or aggregated | Misleading value-to-benefit inference | evidence_review, legal_review | Publish fiscal context with timing/classification limits | retain_public_record |
| Community/Indigenous knowledge | Restricted or not_collected | Data colonialism, consent violation, sacred exposure | community_or_indigenous_review, legal_review, map_safety_review | Publish only with authority, consent, context, benefit; otherwise aggregate/restrict/not collect | community_governed_retention or do_not_store |
| Corrections and reviewer notes | Internal or restricted | Exposure of private review reasoning | data_protection_review, legal_review | Public sees status outcomes, not internal notes | retain_internal_until_review_complete |
| Monitoring signals | Internal, aggregated, or restricted | Observation misread as claim/prediction | evidence_review, map_safety_review, language_safety_review | Signals require access-governance decision before any public use | retain_internal_until_review_complete |
| Press materials | Public | Overclaim amplification | press_review, language_safety_review, legal_review | Press must not say more than evidence supports | retain_public_record |
| Release manifest | Public | False sense of completeness | evidence_review, legal_review | Publish scope, limitations, governance posture, correction route | retain_public_record |

## Authority, consent, and community governance

Authority and consent requirements are mandatory where Indigenous, community, worker, or culturally sensitive information is involved.

Human-subject, worker, community, and Indigenous data should be governed as rights-bearing data, not as resource inventory.

## Storage and retention rules

Retention is governance, not default permanence. Apply explicit retention/deletion outcomes:

- retain public record where disclosure is safe and required;
- retain internal data only until review is complete when possible;
- retain restricted data with access logs;
- delete sensitive inputs after review when no longer necessary;
- do not store where `not_collected` posture applies.

## Review requirements

Access decisions can require evidence, legal, map-safety, right-of-reply, community/Indigenous, labor/human-rights, ecological, language-safety, press, security, and data-protection review.

## Incident response and takedown

If published content is found to exceed approved access tier or safety posture, EEO should initiate incident response: restrict access, update release record, issue correction, and run retention/deletion reassessment.

## Relationship to map safety

Map safety is a specialized access-governance decision for spatial information.

## Relationship to right of reply

Right-of-reply is part of publication governance when public claims may materially affect identifiable actors.

## Relationship to monitoring signals

Monitoring signals are governed objects. A signal may be public, aggregated, internal, restricted, or not collected.

## Relationship to corrections and review notes

Corrections can be public-facing at status level; review notes remain internal/restricted unless separately approved.

## Relationship to press/public communications

Public communication must align with access-tier decisions, release-gate status, and evidence limitations.

## Human capability distinction

EEO studies human labor, knowledge, stewardship, rights, harm, and capability. It does not classify people as natural resources, assets, or inventory.
