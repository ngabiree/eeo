# Data Dictionary

## Database schemas

| Schema | Purpose |
|---|---|
| `core` | Canonical records: sources, licenses, entities, claims, map layers |
| `review` | Review tasks, exposure reviews, right-of-reply, releases, audit events |
| `private` | Restricted notes and sensitive objects (if needed) |
| `analytics` | Indicator cards and derived snapshots |
| `public` | Released public views only — what anonymous users can read |

---

## core.sources

Source registry.

| Field | Purpose |
|---|---|
| id | UUID primary key |
| name | Source name |
| publisher | Publishing institution or authority |
| source_type | Category (official_statistics, registry, satellite, trade_data, etc.) |
| jurisdiction | Geographic or legal jurisdiction |
| acquisition_path | How EEO obtained or accesses this source |
| update_cadence | How often the source is updated |
| method_summary | How data is collected or produced |
| known_limitations | Documented gaps, caveats, or reliability issues |
| sensitivity_note | Any sensitivity flags |
| integration_status | active / paused / deprecated / evaluating |
| last_ingestion_date | When EEO last ingested from this source |
| deprecation_status | Whether the source has been deprecated |
| created_at / updated_at | Timestamps |

**Rule:** No source proceeds to release-bound use without a source_license record.

---

## core.source_licenses

Licensing and redistribution rights.

| Field | Purpose |
|---|---|
| id | UUID primary key |
| source_id | FK to core.sources |
| license_name | Name of the license or use basis |
| license_url | URL to license text |
| license_type | open / restricted / partner / api_terms / other |
| redistribution_allowed | Boolean |
| derivative_works_allowed | Boolean |
| commercial_use_allowed | Boolean |
| attribution_required | Boolean |
| attribution_text | Required attribution text |
| partner_restrictions | Any partner-specific restrictions |
| expiration_date | When the license expires |
| legal_review_status | pending / approved / flagged |
| reviewed_by / reviewed_at | Who reviewed and when |

---

## core.entities

General entity registry.

Entity types: `corridor`, `endowment`, `place`, `jurisdiction`, `concession_or_permit`, `operator`, `parent_company`, `beneficial_owner`, `facility`, `trade_flow`, `worker_population`, `ecological_indicator`, `public_revenue_flow`, `public_authority`, `source_institution`.

Key fields: `canonical_name`, `entity_type`, `jurisdiction_id`, `confidence_label`, `disclosure_tier`.

---

## core.claims

The core epistemic object. Every public fact EEO asserts traces to a claim record.

### Required classification fields

**Claim type:** `observed` / `official` / `modeled` / `inferred` / `alleged` / `disputed` / `confidential` / `withdrawn`

**Confidence label:** `verified` / `official` / `modeled` / `estimated` / `self_reported` / `third_party_reported` / `community_reported` / `disputed` / `restricted` / `outdated` / `unknown`

**Evidence layer:** `factual` / `analytical` / `normative` / `legal`

**Granularity class:** `site_level` / `facility_level` / `corridor_level` / `district_level` / `province_level` / `national_level` / `regional_level` / `global_level` / `unknown`

**Legal posture:** `no_legal_claim` / `public_record_description` / `allegation_by_source` / `finding_by_authority` / `disputed_legal_status` / `requires_legal_review`

**Review status:** `draft` / `in_review` / `approved_restricted` / `approved_public` / `deferred` / `rejected` / `superseded` / `withdrawn`

**Disclosure tier:** `tier_0_open` / `tier_1_contextual_public` / `tier_2_aggregated` / `tier_3_verified_access` / `tier_4_community_governed` / `tier_5_suppressed`

### Key provenance fields

`source_id`, `source_license_id`, `source_locator`, `source_date`, `collection_date`, `derivation_type`, `extraction_method`, `method_version_id`.

### Key safety flags

`harm_risk_flag`, `consent_required_flag`, `named_actor_risk_flag`, `map_exposure_risk_flag`, `right_of_reply_status`, `publication_eligibility`.

### Lifecycle fields

`stale_after_date`, `last_verified_date`, `supersedes_claim_id`, `contradicted_by_claim_id`, `contradiction_note`, `withdrawal_reason`, `correction_history_id`.

---

## review.review_tasks

Formal workflow review.

**Review types:** `method` / `legal` / `safeguards` / `exposure` / `labor` / `ecological` / `licensing` / `editorial` / `release_readiness`

A blocking review (`blocking_flag = true`) prevents the claim from being included in a release until the review is resolved.

---

## review.exposure_reviews

Harm review for publication. Documents: exposure type, potentially exposed actor, harm scenario, likelihood, severity, mitigation, and final decision.

---

## review.right_of_reply_requests

Due-process workflow for named high-impact claims. Tracks: evidence packet path, notice sent date, response deadline, response received date, response summary, and publication decision.

---

## analytics.indicator_cards

Evidence signals for public display. Each card must include: `indicator_name`, `indicator_family`, `confidence_label`, `limitation_note`, `misuse_warning`, `interpretation_type`, `publication_tier`.

**Interpretation types:** `descriptive` / `diagnostic` / `contextual` / `normative_question` / `legal_finding_by_source` / `gap_indicator`

No composite scores or rankings are derived from indicator cards.

---

## review.release_manifests

Signed release records. Fields: `release_slug`, `corridor_id`, `release_title`, `release_status`, `signed_by`, `signed_at`, `manifest_hash`.

The manifest hash provides integrity verification for the released claim set.

---

## core.corrections

Public correction, challenge, exposure-concern, and right-of-reply intake.

**Correction types:** factual error / method challenge / exposure concern / right-of-reply request / other

Safety concerns are triaged first. All corrections retain an audit trail regardless of outcome.

---

## review.audit_events

Sensitive action trail. Every significant action on sensitive objects is recorded with: `actor_id`, `action`, `object_type`, `object_id`, `before_state`, `after_state`, `ip_context`, `created_at`.

---

## public.* — Released views

Public pages query these views, never canonical tables directly.

- `public.released_corridors`
- `public.released_claims`
- `public.released_sources`
- `public.released_entities`
- `public.released_evidence_ledger`
- `public.released_indicator_cards`
- `public.released_map_layers_metadata`
- `public.released_release_manifests`

All public views filter by: release status is published · disclosure tier is Tier 0 or Tier 1 (or approved Tier 2 aggregation) · publication eligibility is true · no unresolved blocking review · source license allows public use · right-of-reply status complete where required.
