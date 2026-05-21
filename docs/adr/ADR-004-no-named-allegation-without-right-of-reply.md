# ADR-004: No Named Allegation Without Right-of-Reply

**Status:** Accepted  
**Date:** 2026-04-26

---

## Context

Publishing a named allegation against a company, public agency, operator, or individual without giving them an opportunity to respond is a recognized harm in investigative journalism ethics and in legal contexts involving defamation, reputation, and due process.

EEO works in domains where evidence is frequently incomplete, contested, or derived from sources with their own limitations. Publishing a named risk profile without a right-of-reply process would:

- expose EEO to legal liability;
- harm named entities that may have legitimate responses;
- undermine the institutional credibility EEO depends on;
- set a precedent that the project can publish high-impact claims without process discipline.

## Decision

No named high-impact claim may be published until the right-of-reply workflow is functioning and has been executed for that claim.

Right-of-reply is required before public release where EEO names a specific actor in relation to:

- a company risk profile;
- a public agency risk profile;
- a beneficial owner risk profile;
- an operator linked to an unresolved allegation;
- an actor connected to severe labor, ecological, corruption, or public-benefit risk;
- a contested ownership or control claim with reputational consequence.

The workflow is:

```
draft claim → identify named actor risk → prepare evidence packet → send notice → wait for response window → summarize response → revise / withdraw / defer / publish → display right-of-reply status
```

Public pages display the right-of-reply status for any affected claim.

## Consequences

- Named allegation publication is gated on right-of-reply completion — this is not optional and not waivable for speed.
- The right-of-reply module must be built and tested before any high-impact named claims are released.
- Claims where right-of-reply is pending or unresolved are not eligible for the release manifest.
- This requirement applies to all release stages, not just the pilot.

See `docs/right-of-reply-protocol.md` and `docs/right-of-reply.md` for full workflow documentation.
