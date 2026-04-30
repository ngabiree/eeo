# Changelog

## Unreleased

### Documentation

- Added **`docs/founding/README.md`** as the single hub for constitution, policies, protocols, roadmap, changelog, governance, GitHub housekeeping, canonical code pointers, and a **north-star / doctrine anchor** cross-link to **`README`**; **`docs/README.md`** links there first; **`CONTRIBUTING`** and **`docs/mvp-evidence-loop`** point newcomers at the hub.
- **Doctrine anchor:** north star (**Earth endowments → shared human capability**); prototype publication loop vs full corridor‑intelligence arc; **`v0.6`** Temporal Endowment Profile schema/model only (**`GOVERNANCE.md`** / **`ROADMAP.md`**).
- **Pilot navigation docs:** **`README`** “Run locally” matches **`lib/pilotPublicNav.ts`** header shortcuts vs full **`/pilot`** hub; **`docs/mvp-evidence-loop`** lists all **`app/pilot/`** URLs, legacy redirects, and CI check; **`PilotRouteNav`** links **`/pilot`** for the full list; **`docs/founding`** blurb updated for **`mvp-evidence-loop`** scope.
- **`EeoSiteFooter`:** Safeguards / Methods / Corrections links use **`/pilot/*`** canonical paths (**`pnpm check:pilot-routes`**).
- **`lib/pilotHubRoutes.ts`** + **`PilotHubRouteList`:** single source for every shipped **`/pilot`** child page; **`/pilot`** hub renders the full exploration list (**`docs/mvp-evidence-loop`** cross-reference).
- **`pnpm check:pilot-hub-routes`:** CI + **`pnpm verify`** guard so **`pilotHubRoutes`** cannot drift from **`app/pilot/<segment>/page.tsx`** layouts and **`pilotPublicNav`** **`/pilot`** shortcuts stay valid.

### Governance

- Locked the release sequence to:
  - `v0.5` claim governance and release consequences
  - `v0.6` Temporal Endowment Profile design + data model only
  - `v0.7` monitoring signal registry
  - `v0.8` scenario notes / disciplined foresight
- Added explicit `v0.6` scope restriction to prevent monitoring dashboard work before `v0.7`.
