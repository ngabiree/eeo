# Map Safety Protocol (Prototype)

## Publication principle

A map layer should **not** be published merely because it **can** be mapped. Each layer must be reviewed for **exposure risk**, including risks to communities, workers, Indigenous peoples, sacred sites, endangered species, fragile habitats, and security-sensitive infrastructure.

Classification types for reviews live in `types/mapSafety.ts` (`MapSafetyClassification`, `MapSafetyReview`). This milestone adds **types only** — no operational map server or additional geospatial UI.
Runtime gate helpers now live in `lib/mapSafety.ts` (`canRenderPublicMapLayer`, `assertPublicMapLayerAllowed`) so unsafe layers are blocked by default.

## Core rule

Map utility must not increase harm to people, places, species, or sensitive knowledge.

## MVP defaults

- Use generalized geometry by default.
- Do not publish precise sensitive coordinates.
- Do not expose sacred sites or vulnerable ecological locations.
- Do not publish map layers that enable retaliation or targeting.

## Release gate

Map surfaces require exposure review sign-off before higher-resolution publication.
