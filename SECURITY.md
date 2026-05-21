# Security Policy

Please do not report security vulnerabilities or sensitive data exposure concerns through public GitHub issues.

Do not post secrets, credentials, personal data, restricted source files, community reports, whistleblower information, right-of-reply packets, legal materials, or precise sensitive geospatial coordinates in this repository.

For security issues and sensitive data exposure concerns, contact: Admin@clubout.club

If you accidentally submitted sensitive information, notify us immediately and do not discuss the details publicly.

## Hardening expectations (summary)

- **GitHub:** protect `main`, require pull requests, status checks, and CODEOWNERS where configured; use forks and PRs for outside contributors; do not grant write access casually. Enable Dependabot, secret scanning, push protection (supported on public repositories), and CodeQL when code exists. Review the Security tab regularly.
- **Accounts:** use unique passwords, a password manager, and MFA (passkey or hardware key) on GitHub, email, Vercel, and Supabase where available. Keep machine OS updates, full-disk encryption, firewall, and malware protection current; limit browser extensions.
- **Supabase:** the **anon** key may be used from the client when Row Level Security (RLS) is in place. The **service role** key bypasses RLS and must be **server-side only**—never the browser, never committed to Git, never in public CI logs.
- **Vercel:** store secrets in Vercel environment variables, not in source. Scope envs by environment (production vs preview vs local). Tighten project membership—people with project access may see or manage env vars depending on role. Do not point public previews at real restricted data.
- **Changes:** treat untrusted or external code with care, especially PRs that alter GitHub Actions, dependencies, `package` scripts, auth/RLS, uploads, APIs, obfuscated or minified code, outbound network calls, logging, or security headers. Avoid running such branches on a primary workstation when dependencies or install scripts change; prefer an isolated or cloud environment.
- **This repository:** public code, methods, policies, and synthetic or non-sensitive examples only. Governed evidence lives in Supabase; deployment on Vercel; development on hardened devices. No secrets, raw evidence bundles, or sensitive geospatial data in Git.

## Weekly review ritual

- Review the GitHub **Security** tab and Dependabot alerts.
- Review open PRs that touch sensitive paths (auth, RLS, Actions, dependencies, security-sensitive routes).
- Review Vercel deployments and environment-variable changes.
- Review Supabase auth, RLS, and storage policies.
- Update OS and browser; remove unused browser extensions.
- Verify no secrets or restricted data were committed to the repository.

## Safest posture

Public repo for code, methods, policies, and synthetic examples. Supabase for governed evidence. Vercel for deployment. Hardened devices for development. No secrets, raw evidence, or sensitive geospatial data in GitHub. Enable push protection and scanning, and still maintain strict local and CI hygiene.
