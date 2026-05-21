# ADR-003: Trade Data Is Not Traceability

**Status:** Accepted  
**Date:** 2026-04-26

---

## Context

Trade statistics (UN Comtrade, national customs data, shipping manifests) are valuable for understanding commodity flows. They are not chain-of-custody records. A customs record that lists cobalt exports from the DRC to China does not prove that a specific mine, operated by a specific company, produced the cobalt in a specific shipment.

Presenting trade flow data as "traceability" would mislead users, overstate EEO's analytical claims, and potentially cause legal and reputational harm to entities incorrectly implicated in supply chain connections.

## Decision

EEO must not call trade statistics "traceability" unless chain-of-custody evidence supports that term.

All trade-flow views must display the following (or equivalent) language:

> "Reported trade data shows declared flows between jurisdictions. It does not prove the physical origin, chain of custody, or supply chain path of specific material."

Trade data is an analytical input to value-chain hypothesis, not evidence of specific provenance.

## Consequences

- The value-chain view in the corridor dossier frames trade flows as contextual and hypothetical, not as established supply chain maps.
- Indicator cards derived from trade data must include a misuse warning flagging the traceability limitation.
- Confidence labels for claims derived from trade data reflect their inferential nature (modeled, estimated, inferred — not verified or official).
- Users who need physical traceability are directed toward appropriate chain-of-custody sources.
