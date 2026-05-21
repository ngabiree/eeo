# Security Model

## Doctrine

Zero trust. Least privilege. Full auditability.

Security is not a layer added at the end. It is the reason EEO can be trusted with evidence that touches labor rights, ecological harm, beneficial ownership, and community safety.

---

## Access roles

| Role | Can do |
|---|---|
| Anonymous public user | Read public released views only |
| Correction submitter | Submit corrections via public intake form |
| Researcher | Read workspace data assigned to their role |
| Data steward | Manage sources, licenses, and evidence metadata |
| Methods reviewer | Review and approve methods review tasks |
| Legal reviewer | Review and approve legal review tasks |
| Safeguards reviewer | Review exposure, map safety, and sensitive data decisions |
| Exposure reviewer | Conduct formal exposure reviews |
| Labor reviewer | Review labor and ecological data publication decisions |
| Editor | Draft and edit claims and dossier sections |
| Release owner | Assemble releases and sign release manifests |
| Administrator | Manage configuration; all sensitive actions are audited |

Access is enforced by Supabase Row Level Security (RLS) policies, not by UI-level route guards alone.

---

## Supabase security requirements

- RLS enabled on all exposed tables — non-negotiable.
- Public pages query `public.*` released views, not canonical tables directly.
- Private storage buckets (`evidence-vault`, `restricted-review`, `right-of-reply-packets`) are inaccessible to anonymous and public users.
- The **service role key** bypasses RLS entirely. It must be **server-side only** — never in the browser, never in client-side code, never committed to git, never in public CI logs.
- The **anon key** may be used from the client only when RLS is in place and tested.

---

## GitHub security requirements

- `main` branch is protected: require pull requests, status checks, and at least one CODEOWNERS review before merge.
- Secret scanning and push protection enabled (both supported on public repositories).
- Dependabot alerts and security updates enabled.
- CodeQL analysis enabled once application code stabilizes.
- Outside contributors work via forks and pull requests only; direct write access is not granted casually.

---

## Vercel security requirements

- All secrets in Vercel environment variables, never in source.
- Environment variables scoped by environment: production, preview, development.
- Preview deployments that may show restricted or pre-publication content must be protected.
- Production and preview environments must not share Supabase credentials.
- No restricted data in preview deployments unless explicitly protected and intentional.

---

## Secrets policy

The following must never be committed to the repository:

- `.env.local` or any `.env` variant other than `.env.example`
- Supabase service role keys
- Vercel tokens or deployment credentials
- Source API tokens or API keys
- Private key files (`*.pem`, `*.key`, `*.p12`)
- Raw evidence files or partner data
- Restricted review materials or right-of-reply packets
- Whistleblower submissions or community reports
- Sensitive geospatial files (`*.geojson`, `*.gpkg`, `*.shp`, `*.tif`, `*.mbtiles`)
- Production database dumps or unredacted logs
- Personally identifying data

If a secret is accidentally committed, treat it as compromised: rotate it immediately, notify the team, and do not discuss specifics in public issues.

---

## Audit requirements

All sensitive actions must be logged in `review.audit_events`:

- claim publication decisions
- disclosure tier assignments
- release manifest signing
- right-of-reply workflow state changes
- exposure review decisions
- admin configuration changes
- restricted data access

Audit logs must record: actor, action, object type, object id, before/after state, timestamp.

---

## Separation of environments

Use separate Supabase projects for production and staging as soon as resources permit. No real restricted data should be present in any environment until environment separation exists.

---

## Incident response

If a security incident occurs (accidental data exposure, unauthorized access, committed secret):

1. Identify and contain: revoke the exposed credential, restrict the exposed data path.
2. Assess: what was exposed, to whom, for how long.
3. Notify: inform affected parties as required; check applicable disclosure obligations.
4. Remediate: patch the root cause, not just the symptom.
5. Document: record the incident, timeline, response, and any process changes.

Contact: security@[domain-to-be-set]

---

## Weekly review ritual

- Review GitHub Security tab and Dependabot alerts.
- Review PRs that touch auth, RLS, Actions, dependencies, or security-sensitive routes.
- Review Vercel deployments and environment variable changes.
- Review Supabase auth, RLS, and storage policies.
- Verify no secrets or restricted data were committed.
