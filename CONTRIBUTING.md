# Contributing

Institutional constitution, policies (security, data, disclosure), protocols, and governance are indexed for discoverability in **[docs/founding/README.md](./docs/founding/README.md)**.

## Development

- Use Node.js 20+.
- Preferred package manager: `pnpm`.
- Run checks before opening PRs:
  - `pnpm exec tsc --noEmit`
  - `pnpm lint`
  - `pnpm build`

## Scope discipline

- Keep MVP focused on the corridor prototype.
- Do not expand into global ranking, scoring, certification, blockchain, or AI authority features.
- Preserve evidence-first doctrine and disclosure safeguards.

## Security and data

- Never commit secrets or private evidence.
- Follow `SECURITY.md`, `DATA_POLICY.md`, and `DISCLOSURE_POLICY.md`.
