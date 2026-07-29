import type { Entity } from "@/types/eeo";

export const entities: Entity[] = [
  {
    id: "ENT-DRC",
    recordMode: "illustrative",
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
    recordMode: "illustrative",
    name: "Cobalt",
    entityType: "resource",
    caveats: [
      "Resource-level reference only.",
      "Does not identify a specific mine, operator, shipment, or buyer.",
    ],
  },
];
