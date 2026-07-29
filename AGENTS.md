# Repository change-control rules

Codex may inspect the repository, create working branches, modify files,
run tests, commit changes, push working branches, and open or update pull
requests.

Codex must not:

- push directly to the default branch;
- merge, auto-merge, approve, or close a pull request;
- bypass branch rules or required checks;
- modify repository rules, collaborators, app permissions, or secrets;
- deploy directly to production;
- commit credentials, tokens, private keys, or environment secrets;
- rewrite published Git history;
- disable tests, security checks, or safeguards merely to make checks pass.

For every implementation:

1. Create or use a dedicated branch prefixed with `codex/`.
2. Make the smallest coherent change.
3. Run the relevant lint, type-check, test, and build commands.
4. Report failures honestly.
5. Open a pull request describing:
   - what changed;
   - why it changed;
   - tests performed;
   - security, privacy, migration, dependency, and deployment implications;
   - any unresolved risks.
6. Stop after updating the pull request and wait for owner authorization.

Changes involving authentication, authorization, permissions, database
migrations, payment processing, deployment configuration, GitHub Actions,
secrets, public governance claims, or destructive operations must be clearly
flagged as high-risk in the pull request.
