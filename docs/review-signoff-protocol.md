# Formal Review Sign-Off Protocol (v1.3)

## Purpose

Define a first-class **review sign-off** record so that **completed reviews are explicit**, auditable, and separable from inferred checklist states.

This milestone answers the release gate’s question—“Are required reviews complete?”—with a durable conceptual model before **release-manifest derivation** or **runtime enforcement**.

## What a formal review sign-off is

A structured statement that a defined review lane (`FormalReviewSignoffType`) was performed on a defined object (`objectType` + `objectId`), yielding a **status** (`approved`, `blocked`, `conditioned`, etc.), optional **conditions**, a **public-safe summary**, optional **internal notes**, **time attribution**, optional **expiry**, and optional **supersession** linkage.

A sign-off does **not** prove that a claim is true; it records that **publication-condition review** occurred under stated constraints.

## What a formal review sign-off is not

- Not a public reviewer leaderboard or attribution surface by default.
- Not database persistence (prototype stays type + inert examples).
- Not automatic enforcement of publication or the release manifest.
- Not monitoring, forecasting, scoring, scenario commentary, or global atlas scope.

## Relationship to the release gate

The release gate aggregates publication readiness. Required reviews listed on access-governance or gate checks should eventually resolve against **concrete sign-offs** (or explicit absence / blockage), not inferred completion.

Until sign-offs are wired into helpers, internal previews may still use **prototype inference**; that inference should shrink as sign-off adoption grows.

## Relationship to access governance

`RequiredReview` (access governance) names review lanes. **`FormalReviewSignoffType`** aligns with those lanes and adds **`access_governance_review`** as its own sign-off lane when governance classification itself needs recorded approval.

## Supported review types (v1.3)

The following formal lanes are modeled:

1. Evidence review  
2. Language-safety review  
3. Map-safety review  
4. Right-of-reply review  
5. Access-governance review  
6. Legal review  
7. Labor / human-rights review  
8. Ecological review  
9. Press review  

See `FormalReviewSignoffType` in `types/reviewSignoff.ts`.

## Field semantics

| Field | Role |
| --- | --- |
| `id` | Stable identifier for this sign-off row. |
| `objectType` / `objectId` | What was reviewed (claim, map layer, dossier section, press material, etc.). |
| `reviewType` | Which review discipline executed. |
| `status` | Outcome: approve path, block path, conditioned approval, lineage (`superseded`, `withdrawn`, `expired`). |
| `conditions` | Publication conditions attached to approval (strings safe for internal routing; public surfacing requires vetting). |
| `publicSafeSummary` | Safe summary usable if sign-offs ever surface publicly or in manifest-adjacent summaries. |
| `internalNotes` | Internal-only rationale — never public without review. |
| `reviewedAt` | ISO timestamp of decision. |
| `reviewedBy` | Attribution lane (`system_rule`, `reviewer`, `governance_protocol`) — not a mandatory personal name field. |
| `expiresAt` | Optional re-review trigger time. |
| `supersedesSignoffId` | Prior sign-off replaced by this record when policies or inputs change. |

## Status meanings (short)

- **approved** — lane clearance under stated constraints (if any).  
- **blocked** — lane does not clear publication posture until addressed.  
- **conditioned** — clearance with explicit conditions (often mirrored in `conditions`).  
- **superseded** — retained for lineage when a newer sign-off replaces scope.  
- **withdrawn** — intentionally retracted without necessarily replacing.  
- **expired** — time-bound clearance lapsed (distinct from `expiresAt` future scheduling).  

## Public / private boundary

`publicSafeSummary` must stay free of reviewer names, private rationale, restricted coordinates, whistleblower detail, and raw community-sensitive content unless separately governed.

`internalNotes` must not appear on public routes without review.

## Expiry and supersession

**Expiry** prompts re-review before relying on stale clearance when sources, exposure context, or disputes shift.

**Supersession** preserves audit trail when a newer sign-off narrows, widens, or replaces an older decision for the same lane and object scope.

## Inert examples

`data/reviewSignoffExamples.ts` holds non-sensitive rehearsal rows for protocol illustration only.

## Next implementation steps (not v1.3)

- Wire protected workspaces to record sign-offs against live sessions (still no public UI).  
- Replace inferred “completed reviews” in internal previews with sign-off lookups when ready.  
- Later: derive **public-safe** manifest readiness signals **without** leaking internal notes or raw blocker payloads.

Do **not** skip sign-off discipline and jump straight to manifest enforcement—explicit completion records come first.
