# Live-Data Feature Definition of Done

Use this checklist before merging any feature that introduces or expands governed live data.

## Governance and exposure boundary

- [ ] The feature states which data stays private, which data is release-gated, and what is public by default.
- [ ] Public output excludes raw evidence, restricted files, sensitive geospatial detail, and sensitive human/community data.
- [ ] The feature upholds: live data is allowed in governed systems; uncontrolled public exposure is not.

## Data model and database controls

- [ ] New tables are in Supabase/Postgres with clear ownership, purpose, and retention posture.
- [ ] Row Level Security (RLS) is enabled and tested for all new live-data tables.
- [ ] Policies enforce least privilege for service roles, reviewers, and public readers.
- [ ] Migrations are checked in and reversible where practical.

## Storage and file safety

- [ ] Private/restricted buckets are used for non-public files; no restricted files are committed to Git.
- [ ] Bucket access policies align with RLS and review workflow roles.
- [ ] Any geospatial artifacts are generalized, masked, delayed, or withheld based on exposure review.

## Audit, review, and release workflow

- [ ] Write operations produce audit logs with actor, action, timestamp, and object identifiers.
- [ ] Review workflow states are explicit (for example: draft, method review, legal/exposure review, right-of-reply, approved).
- [ ] Release views expose only reviewed and approved records.
- [ ] Right-of-reply and correction pathways are documented for affected claims.

## Application and API safeguards

- [ ] API routes enforce authn/authz and do not leak restricted fields.
- [ ] Client components do not import server-only modules.
- [ ] Data returned to public pages is minimized to release-safe fields.
- [ ] Error responses do not expose secrets, private IDs, or internal review notes.

## Verification and delivery

- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm check:pilot-routes` pass.
- [ ] `git diff origin/main -- package.json pnpm-lock.yaml` is reviewed for unexpected dependency changes.
- [ ] README and concept docs are updated when governance posture changes.
- [ ] PR description includes scope, exposure boundary, and rollback plan.

## Out of scope guardrails

- [ ] No raw evidence, legal private notes, right-of-reply packets, or partner-confidential files are introduced into this repo.
- [ ] No proxy-based ranking/scoring of people or communities is introduced.
