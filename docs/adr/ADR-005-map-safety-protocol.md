# ADR-005: Map Safety Protocol

**Status:** Accepted  
**Date:** 2026-04-26

---

## Context

Maps are not neutral instruments. Publishing a map can:

- expose the location of sacred sites to desecration or exploitation;
- reveal the coordinates of vulnerable communities to hostile actors;
- endanger endangered species or fragile habitats by advertising their location;
- expose artisanal mining settlements to targeting by criminal organizations or state actors;
- enable land grabbing, speculation, or retaliation against rights holders;
- identify whistleblower or grievance locations.

A default of "publish all geospatial data we have" is incompatible with EEO's mission. A default of "publish no geospatial data" prevents the project from being useful. The correct default is a structured harm review for each layer.

## Decision

All geospatial publication requires map-safety review. Every map layer must be assigned a publication mode:

| Mode | Meaning |
|---|---|
| exact geometry public | Full precision, public |
| generalized geometry public | Simplified for public use |
| aggregated to administrative unit | District/province level only |
| blurred or masked | Precision deliberately reduced |
| delayed release | Safe for future release with conditions |
| restricted access only | Researchers only, not public |
| metadata-only public | Existence documented, no geometry |
| do not collect | Should not be gathered at all |
| do not publish | Collected but not to be released |

The default for sensitive categories is presume sensitivity. Sensitive categories include:

- sacred sites;
- indigenous or community-held knowledge;
- endangered species locations;
- vulnerable habitats;
- artisanal mining settlements;
- whistleblower or grievance locations;
- community reports;
- critical infrastructure;
- illegal extraction targets;
- locations where publication could trigger retaliation, speculation, poaching, or land grabbing.

## Consequences

- No geospatial data is published in the MVP without a map-safety review record.
- The `core.map_layers` table and `types/mapSafety.ts` enforce this classification.
- The `lib/mapSafety.ts` runtime helper blocks rendering of layers without an approved exposure review.
- No geospatial file downloads are available in the MVP unless the layer is explicitly approved as Tier 0 or Tier 1 and the source license permits redistribution.
- Every public map layer displays: source, date, resolution, confidence, whether geometry was generalized or masked, and why detail may be suppressed.

See `docs/map-safety-protocol.md` for full protocol documentation.
