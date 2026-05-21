# Release Process

## Overview

A release is not a software deployment. It is an institutional act: the decision that specific evidence claims, with specific provenance, are ready for public view under specific disclosure conditions.

The release manifest is the canonical record. The signed manifest is the gate.

---

## Release workflow

```
approved claims selected
  → license check (source license permits public use)
  → review check (no blocking unresolved reviews remain)
  → exposure check (exposure review approved for all public layers)
  → right-of-reply check (status complete for all named high-impact claims)
  → release manifest assembled
  → release owner signs manifest
  → public views updated (filter to released claims only)
  → correction route opens
```

---

## Core workflows

### Source intake

```
researcher creates source
  → license/use basis recorded
  → sensitivity noted
  → integration status set
  → audit event created
```

No source proceeds to release-bound use without a license or use-basis review record.

### Evidence upload

```
source selected
  → evidence object uploaded to private bucket
  → file hash generated
  → metadata attached (mime type, original filename, storage path)
  → disclosure tier assigned
  → sensitivity note added
  → audit event created
```

### Claim drafting

```
evidence inspected
  → claim drafted
  → source and method attached
  → claim type assigned (observed, official, modeled, inferred, alleged, disputed, confidential, withdrawn)
  → evidence layer assigned (factual, analytical, normative, legal)
  → confidence label assigned
  → granularity class assigned
  → legal posture assigned
  → disclosure tier assigned
  → stale-after date set
```

### Review

```
draft claim
  → method review
  → legal review (if claim has reputational or legal consequence)
  → safeguards review (if claim raises harm or rights risk)
  → exposure review (if claim involves sensitive actors, locations, or communities)
  → labor/ecology review (if relevant)
  → editorial review
  → approved / deferred / rejected
```

### Map publication

```
map layer registered
  → sensitivity class assigned
  → exposure review conducted
  → publication mode decided (exact / generalized / aggregated / masked / restricted / metadata-only / do not collect)
  → masking or aggregation applied
  → metadata public
  → geometry public only if approved
```

### Right-of-reply

```
named high-impact claim flagged
  → evidence packet prepared
  → notice sent to named actor
  → response window held
  → response logged and summarized
  → claim revised / withdrawn / deferred / published
  → public status displayed
```

### Correction

```
public challenge submitted
  → triage (safety check first)
  → assigned to reviewer
  → claim revised / confirmed / withdrawn
  → public correction note if accepted
  → audit trail retained
```

---

## Public launch gate

The pilot must not publicly launch until all the following are true.

### Doctrine and governance

- One canonical doctrine is frozen and accepted.
- One corridor is selected and scoped.
- Release owner is named.
- Methods reviewer is named.
- Safeguards reviewer is named.
- Legal reviewer is named.
- No unresolved blocking review remains.

### Evidence and data

- Every public claim has: source, source license, date, method, claim type, evidence layer, confidence label, granularity class, legal posture, stale-after date, disclosure tier, and review status.
- Source licenses are recorded for all displayed claims.
- Evidence ledger is public for released claims.
- Public views filter out all restricted material.
- Correction route is live and tested.

### Safety and due process

- Every public map layer has an exposure review record and an assigned publication mode.
- All named high-impact actor claims have a completed right-of-reply status.
- No community reporting module is public.
- No exact sensitive geospatial downloads are available.
- Suppressed or aggregated data is explained where safe to do so.

### Product limits

- No composite score, ranking, or certification.
- No universal atlas branding.
- No blockchain module.
- No AI-generated public claims without human review.
- Trade-flow views state that customs data does not prove physical traceability.
- Public-revenue views state that disclosed revenue does not prove durable public benefit.

### Public documentation

- Methods and limits note is published.
- Confidence taxonomy is published.
- Disclosure tiers are explained.
- Right-of-reply and correction process is explained.
- Release manifest is accessible.
- Public product states what it does not claim.

---

## Quality bar

A public release is successful only if:

1. It is useful without being reckless.
2. It is legible without being simplistic.
3. It is critical without becoming adjudicatory.
4. It is transparent without exposing vulnerable people or places.
5. It connects domains without claiming to replace authoritative systems.
6. Every important public claim can be inspected.
7. Every important uncertainty is visible.
8. Affected parties can challenge errors or exposure harms.
9. Expansion is earned, not assumed.
