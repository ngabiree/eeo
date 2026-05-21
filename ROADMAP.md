# EEO Version Roadmap

## Public evidence pilot title

**Public Evidence Prototype: Copper-Cobalt Corridor**

## Milestone Register

> **Status key:** "Shipped" = development milestone code is merged and running in the prototype. "Current" = actively being developed. No formal public release tag has been cut yet — see `CHANGELOG.md`.

| Milestone | Actual content | Status |
|---|---|---|
| v0.4 | Corrections intake, protected review, triage notes, review activity log | Shipped |
| v0.5 | Claim governance and release-manifest integration | Partial |
| v0.6 | Endowment doctrine, corridor dossier foundation, source map, map-safety protocol, right-of-reply documentation | Shipped |
| v0.6.1 | Dossier governance repair pass | Current |
| v0.7 | Evidence population + dossier release gate | Current |
| v0.8 | Monitoring signal registry contract (type + docs only) | Current |
| v0.9 | Access governance + research-to-publication protocol (type + docs only) | Shipped |
| v1.0 | Internal access decision review preview (inert examples + docs only) | Shipped |
| v1.1 | Release gate integration design (internal type/helper/docs only) | Shipped |
| v1.2 | Internal release readiness preview (protected `/review` workspace only) | Shipped |
| v1.3 | Formal review sign-off contract (types + inert examples + docs only) | Current |

## Core sequence

1. **v0.6** — doctrine + dossier schema + source map  
2. **v0.6.1** — governance and safety coherence repair  
3. **v0.7** — evidence population + dossier release gate  
4. **v0.8** — monitoring signal registry contract (type + docs only; no dashboard/feed/alerts/forecast/scenario UI)  
5. **v0.9** — access governance + research-to-publication protocol (type + docs only)  
6. **v1.0** — internal access decision review preview (inert examples + docs only; no public UI, monitoring runtime, forecasting, scoring, or persistence changes)  
7. **v1.1** — release gate integration design (internal type/helper/docs only; no public release-gate dashboard)  
8. **v1.2** — internal release readiness preview (protected `/review` workspace only; no public release-gate UI)  
9. **v1.3** — formal review sign-off contract (types + inert examples + docs; no public UI, no persistence, no manifest enforcement)  
10. **v1.4** — funding dossier  
11. **v1.5+** — temporal/monitoring/scenario activation under governance gates

## Gate rule before v0.7 starts

`v0.7` must not begin until claim governance, corridor dossier runtime, map-safety enforcement, source limitations, right-of-reply handling, and release-manifest consequences are connected.

## Dossier-first rule

The corridor dossier is the core product unit. Dashboard views, map outputs, correction queues, and review workspace routes are supporting systems.

## v0.8 boundary

`v0.8` defines the Monitoring Signal Registry contract. It does not introduce monitoring dashboards, live feeds, alerts, forecasts, scenario notes, scores, or public signal displays.

A signal cannot become a public claim unless it passes ordinary EEO evidence discipline: source linkage, evidence role, source limitations, confidence, exposure risk, publication decision, map-safety review where relevant, and correction/review pathway.

Monitoring signals preserve the same public/private boundary as claims. Internal review notes, sensitive locations, restricted community data, and raw harm-review details must not be exposed publicly.

No monitoring runtime, signal review preview, or foresight work should proceed until access governance, research workflow, and press protocol are documented.

## v1.0 boundary

v1.0 rehearses access-governance decisions using inert examples and documentation before runtime enforcement, public dashboards, or monitoring expansion.

Boundary: no public UI, no monitoring runtime, no forecasting, no scoring, no database persistence, and no public signal display.

## v1.1 boundary

v1.1 connects access governance, evidence completeness, map safety, right-of-reply, corrections, language safety, press discipline, and release-manifest alignment into an internal release-readiness model.

Boundary: no public UI, no monitoring runtime, no forecasting, no scoring, no database persistence, and no public release-gate dashboard.

## v1.2 boundary

v1.2 adds an internal release-readiness preview inside the protected review workspace. It does not create public release-gate UI, runtime enforcement, monitoring, scoring, forecasting, public access-decision display, or database persistence.

Boundary: previews support reviewer judgment only; publication status for public audiences remains represented through the release manifest and other public-safe limitations.

## v1.3 boundary

v1.3 introduces explicit **review sign-off** types and protocol documentation so “completed reviews” can be recorded as first-class objects before release-manifest derivation becomes authoritative.

Boundary: no public sign-off UI, no reviewer-name publicity, no database persistence, no monitoring runtime, no forecasting, no scoring, no global atlas, and **no release-manifest enforcement** in this milestone.

## Temporal dormancy

`TemporalEndowmentProfile` types remain dormant until the designated milestone. They must not be imported into runtime routes, dashboards, monitoring tools, scenario UI, or forecasting features beforehand.

**Temporal profiles are intended for disciplined foresight, not prediction.**

## Nine-month pilot success metrics

- one complete corridor dossier published;
- 100% of public claims linked to evidence;
- 100% of public claims include limitations;
- one public evidence ledger;
- one source and non-duplication map;
- one safeguards and map-safety note;
- one correction pathway tested;
- one release manifest published;
- three to five external expert reviews completed;
- at least five institutional datasets, standards, or platforms integrated, cited, evaluated, or explicitly deferred;
- at least three stakeholder classes able to use the output;
- zero unresolved high-risk exposure incidents.
