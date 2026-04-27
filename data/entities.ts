import type { Entity } from "@/types/eeo";

export const entities: Entity[] = [
  {
    id: "ENT-DRC",
    name: "Democratic Republic of the Congo",
    entityType: "jurisdiction",
    jurisdiction: "DRC",
    caveats: [
      "Jurisdiction-level reference only.",
      "Does not imply responsibility by any specific agency, company, or community.",
    ],
  },
  {
    id: "ENT-COBALT",
    name: "Cobalt",
    entityType: "resource",
    caveats: [
      "Resource-level reference only.",
      "Does not identify a specific mine, operator, shipment, or buyer.",
    ],
  },
];
