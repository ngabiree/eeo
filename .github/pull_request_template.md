## What changed

<!-- Describe the change in one or two sentences. What does this PR do? -->

## Routes / components / tables affected

<!-- List the files, routes, or DB tables this touches. -->

## Checklist

### Core questions

- [ ] Does this change affect disclosure logic, evidence handling, security posture, or legal language?
- [ ] Does this expose any new public data or modify what anonymous users can see?
- [ ] Does this modify RLS policies, storage rules, or database migrations?
- [ ] Does this touch auth, review workflows, release manifests, or right-of-reply logic?

### Evidence and safety

- [ ] No composite score, ranking, country index, or certification label introduced.
- [ ] No AI-generated content published without human review gate.
- [ ] No exact sensitive geospatial coordinates added to public surfaces.
- [ ] No named allegation published without a right-of-reply status check.
- [ ] Trade data (if present) is framed as reported trade, not physical traceability.
- [ ] Public revenue data (if present) is framed as disclosed revenue, not proof of public benefit.

### Engineering quality

- [ ] `pnpm typecheck` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] Affected tests pass (or new tests added where appropriate).
- [ ] Screenshots included for any UI changes.

### Documentation and ADRs

- [ ] Does this decision require an Architecture Decision Record? If yes, one is included in `docs/adr/`.
- [ ] Relevant documentation in `docs/` is updated if behavior changed.

## Notes for reviewers

<!-- Anything the reviewer needs to know: assumptions, alternatives considered, known limitations. -->
