# Corridor Dossier Readiness Pass

## Scope

This pass reviews the copper-cobalt pilot's claim, evidence, source, dossier, and release-manifest records as a structural readiness check. It does not approve publication, make legal findings, expand the public corridor, or change claim status.

Observed files:

- `data/claims.ts`
- `data/evidence.ts`
- `data/sources.ts`
- `data/corridorDossier.ts`
- `data/releaseManifest.ts`
- `types/eeo.ts`

## Current readiness summary

The pilot has seven claim records. Each observed claim has linked evidence, source-backed evidence records, confidence, exposure risk, review status, right-of-reply posture, correction-oriented revision criteria, and explicit statements of what the claim does not prove.

The release manifest currently includes only `CLAIM-DRC-CO-001`, a low-exposure methodological claim about production/trade data not proving product-level origin. That is consistent with the manifest summary, which says the release includes one fully inspectable methodological claim.

The dossier is therefore structurally useful but not release-complete. It should remain described as a prototype or provisional dossier until manifest coverage, review status, and authorization records are complete.

## Claim readiness matrix

| Claim | Corridor node | Evidence links observed | Review status | Release-manifest status | Readiness note |
|---|---|---:|---|---|---|
| `CLAIM-DRC-CO-001` | processing/trade | 2 | approved for release | included | Release-ready within current low-exposure methodological boundary. |
| `CLAIM-DRC-CO-002` | endowment | 1 | approved for release | not listed | Candidate for future release, but currently outside the manifest. |
| `CLAIM-DRC-CO-003` | jurisdiction/governance | 1 | approved for release | not listed | Candidate for future release; keep legal-posture limits visible. |
| `CLAIM-DRC-CO-004` | extraction/production | 2 | method review | not listed | Do not release until method review and source-limit handling are complete. |
| `CLAIM-DRC-CO-005` | labor risk | 3 | exposure review | not listed | Do not release beyond public-safe redacted posture until exposure review is complete. |
| `CLAIM-DRC-CO-006` | public revenue | 1 | method review | not listed | Do not release until method review and public-benefit limitations are complete. |
| `CLAIM-DRC-CO-007` | evidence gap | 1 | approved for release | not listed | Candidate for future release, but ownership/control language must remain non-adjudicatory. |

## Must fix before broader public release

- Manifest coverage gap: claims outside `releaseManifest.includedClaimIds` are also absent from `releaseManifest.withheldClaimIds`, `restrictedClaimIds`, `challengedClaimIds`, `correctedClaimIds`, and `withdrawnClaimIds`. Before a broader release, every claim should have an explicit manifest disposition.
- Review-status gate: `CLAIM-DRC-CO-004`, `CLAIM-DRC-CO-005`, and `CLAIM-DRC-CO-006` are not ready for release because method or exposure review remains unresolved.
- Authorization gate: `data/corridorDossier.ts` states `releaseReadiness: "not_ready"` and the release-manifest section is `not_started`. Public copy should not describe the corridor as authorized, active, public, or release-ready.

## Should fix before public demo expansion

- Add a public-safe explanation, wherever release status is displayed, that only `CLAIM-DRC-CO-001` is in the current manifest and other claims are structural prototype records unless a later release manifest includes them.
- Add explicit manifest disposition reasons before adding more claims to the public release, especially for method-review, exposure-review, or actor-affecting claims.
- Keep right-of-reply language structural unless a future claim materially affects an identifiable actor; do not expose contact details, evidence packets, or reviewer notes.

## Safe next implementation increment

Create a typed or documented release-disposition layer that records whether each claim is included, withheld, restricted, challenged, corrected, withdrawn, or deferred, with a public-safe reason. Start with documentation or inert sample data before changing public UI behavior.

## Checks run

No local checks were run for this pass. Repository cloning from the workspace was blocked by network restrictions, and this is a documentation-only readiness increment.
