# Contributing

Institutional constitution, policies (security, data, disclosure), protocols, and governance are indexed for discoverability in **[docs/founding/README.md](./docs/founding/README.md)**.

## Development

- Use Node.js 20+.
- Preferred package manager: `pnpm`.
- Run checks before opening PRs:
  ```
  pnpm verify
  ```
  This runs pilot-route checks, lint, typecheck, tests, and build in one step (same sequence as CI).

  Individual commands if needed: `pnpm typecheck` · `pnpm lint` · `pnpm test` · `pnpm build`

## Scope discipline

- Keep MVP focused on the corridor prototype.
- Do not expand into global ranking, scoring, certification, blockchain, or AI authority features.
- Preserve evidence-first doctrine and disclosure safeguards.

## Security and data

- Never commit secrets or private evidence.
- Follow `SECURITY.md`, `DATA_POLICY.md`, and `DISCLOSURE_POLICY.md`.
