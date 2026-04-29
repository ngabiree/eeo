# Architecture (MVP)

## Product layers

1. Public Evidence Prototype (read-oriented pages)
2. Internal Review Workspace (triage, review, release gate)
3. In-memory prototype store (to be replaced by durable backend later)

## Current boundaries

- Public pages must not expose reviewer-only notes.
- Review workspace is password-gated.
- Correction route is public intake, with internal triage handling.

## Deferred layers

- Durable database persistence
- Full RBAC and row-level security
- Formal release signing workflow
