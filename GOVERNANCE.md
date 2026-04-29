# Version Governance Rules

## Safety-first sequencing

- `v0.5` closes claim governance and release-consequence controls.
- `v0.6` is design/data-model scope only for Temporal Endowment Profiles.
- `v0.7` is the first release allowed to introduce monitoring signal registry behavior.
- `v0.8` introduces scenario notes and disciplined foresight artifacts.

## Scope lock for `v0.6`

v0.6 may define Temporal Endowment Profile contracts, but must not introduce monitoring dashboards, live data feeds, predictive scoring, or scenario-generation UI. Temporal Profiles are evidence-based foresight records, not predictions.

For `v0.6`, do not ship:

- monitoring dashboards;
- live signal surfaces;
- ranking/scoring abstractions;
- alerting posture presented as operational monitoring.

For `v0.6`, ship only:

- Temporal Endowment Profile type definitions;
- evidence-bound profile schema contracts;
- validation, constraints, and data-model documentation.
