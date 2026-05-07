# Founding documents — Earth Endowment Observatory

Single index for institutional constitution, governance rules, disclosure and security policies, and reference protocols tracked in this repository. Paths are relative to **repository root** unless noted.

## Doctrine anchor (north star)

Executive summary: **Earth endowments → relational stewardship and human capability** (people are not inventory items) as an evidence institution _(not atlas / dashboard / campaign / registry)_; **dossier-first**: one corridor before meta-systems. See **[README](../../README.md)** (endowment definition, exposure guardrail), plus **[GOVERNANCE](../../GOVERNANCE.md)** and **[ROADMAP](../../ROADMAP.md)**. **`types/temporalProfile.ts`** stays **dormant** until post-pilot (**`v1.5+`**).

## Primary specification (constitutional)

| Document | Purpose |
|----------|---------|
| [Canonical institutional constitution and systems specification](../canonical/eeo_institutional_constitution_and_systems_specification-final.md) | **Operating doctrine**: product scope, evidence discipline, workflow, disclosure tiers, map safety, right-of-reply, corrections posture, MVP boundaries |
| [MVP evidence loop (visibility rule)](../mvp-evidence-loop.md) | Publication-chain reference; **`/pilot/*`** path table vs header shortcuts (**`lib/pilotPublicNav.ts`**); legacy redirect map |

## Policies (root — contributor and maintainer norms)

| Document | Purpose |
|----------|---------|
| [CONTRIBUTING](../../CONTRIBUTING.md) | Contribution flow; points at security/data/disclosure policies |
| [SECURITY](../../SECURITY.md) | Vulnerability reporting, secret handling, prototype vs governed-data posture |
| [DATA_POLICY](../../DATA_POLICY.md) | What may and may not live in Git |
| [DISCLOSURE_POLICY](../../DISCLOSURE_POLICY.md) | Publication and disclosure tiers |
| [AI_USE_POLICY](../../AI_USE_POLICY.md) | Expectations for AI-assisted work in-repo |

## Protocols & standards (`docs/`)

| Document | Purpose |
|----------|---------|
| [Evidence standard](../evidence-standard.md) | Evidence and claim discipline |
| [Map safety protocol](../map-safety-protocol.md) | Geospatial exposure guardrails; **`types/mapSafety.ts`** |
| [Right of reply (publication discipline)](../right-of-reply.md) | When ROR applies, safe framing, exclusions |
| [Right-of-reply protocol](../right-of-reply-protocol.md) | Prototype workflow sketch; see also **right-of-reply.md** |
| [Language safety checklist](../language-safety.md) | Public-language guardrails for non-adjudicatory evidence publication |
| [Live-data definition of done](../live-data-definition-of-done.md) | Checklist before governed live-data merges |
| [Architecture](../architecture.md) | System / app architecture reference |

## Governance, roadmap, changelog

| Document | Purpose |
|----------|---------|
| [GOVERNANCE](../../GOVERNANCE.md) | Version sequencing; **`v0.6`** doctrine + dossier schema + source map; knowledge governance; ROR |
| [ROADMAP](../../ROADMAP.md) | Staged releases; north star and construction arc vs prototype loop |
| [CHANGELOG](../../CHANGELOG.md) | Repository release and posture notes |

## Concept explorations (`docs/concepts/`)

| Document | Purpose |
|----------|---------|
| [Human capability stewardship layer](../concepts/human-capability-stewardship-layer.md) | Rights-aware framing for people × endowment (concept; not standalone product spec) |

## Brand reproducibility (`public/brand/`)

| Document | Purpose |
|----------|---------|
| [Brand identity doctrine](../brand-identity.md) | Public voice, design posture, language boundaries, and symbolic discipline |
| [Brand asset README](../../public/brand/README.md) | Logo masters, rebuild script, usage policy |

## GitHub housekeeping

| Location | Purpose |
|----------|---------|
| [.github/pull_request_template.md](../../.github/pull_request_template.md) | PR expectations |
| [.github/CODEOWNERS](../../.github/CODEOWNERS) | Ownership routing |
| [.github/workflows/ci.yml](../../.github/workflows/ci.yml) | CI (includes `check:pilot-routes`, `check:pilot-hub-routes`, lint, typecheck, test, build) |

## Canonical code references (not prose, but binding for shipped UI)

| Location | Notes |
|----------|--------|
| `components/EarthEndowmentObservatoryOneFileApp.tsx` | **Canonical** corridor workspace UI in this repo |
| `docs/EarthEndowmentObservatoryOneFileApp.tsx` | TypeScript mirror for review; refresh with `pnpm sync:corridor-docs` |
| `types/corridorDossier.ts` | Corridor dossier section + status contracts |
| `data/corridorDossier.ts` | Copper–cobalt pilot dossier skeleton (runtime-rendered at `/dossier`) |
| `data/sourceMap.ts` | Source / non-duplication map (cite, evaluate, defer; not full integration claims) |

## How to cite

- For **product and institutional scope**, cite the **canonical specification** path above.
- For **MVP route and redirect discipline**, cite **mvp-evidence-loop**, `lib/pilotPublicNav.ts` (header shortcuts), and `lib/pilotHubRoutes.ts` (complete **`/pilot`** hub index).
- For **security and data boundaries**, cite **SECURITY** and **DATA_POLICY** first.

---

*This index is maintained so founding material stays discoverable without moving root-level policy files (GitHub and tooling conventions expect many of them at repository root).*
