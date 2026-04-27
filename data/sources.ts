import type { Source } from "@/types/eeo";

export const sources: Source[] = [
  {
    id: "SRC-USGS-CO-001",
    title: "Mineral Commodity Summaries: Cobalt",
    publisher: "U.S. Geological Survey",
    url: "https://www.usgs.gov/centers/national-minerals-information-center",
    sourceType: "government",
    jurisdiction: "United States / Global",
    publicationDate: "2026",
    accessedDate: "2026-04-27",
    licenseStatus: "open",
    notes: "Used for production, reserve, and mineral context. Not a chain-of-custody source.",
  },
  {
    id: "SRC-UNCOMTRADE-CO-001",
    title: "UN Comtrade reported trade flows",
    publisher: "United Nations",
    url: "https://comtradeplus.un.org/",
    sourceType: "multilateral",
    jurisdiction: "Global",
    accessedDate: "2026-04-27",
    licenseStatus: "open",
    notes: "Used for reported trade-flow context. Does not establish mine-to-product traceability.",
  },
];
