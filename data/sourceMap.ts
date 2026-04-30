/**
 * Copper–cobalt pilot: source-domain map — planned use, humility, non-duplication.
 * EEO does not replace these systems; it cites, evaluates, defers, and connects corridor analysis.
 */

import type { Source } from "@/types/eeo";

export type SourceDomain =
  | "mineral_context"
  | "extractive_transparency"
  | "contracts_concessions"
  | "beneficial_ownership"
  | "trade_flows"
  | "labor"
  | "ecology_environment"
  | "public_revenue"
  | "human_rights"
  | "safeguards"
  | "geospatial"
  | "methods";

export type SourceMapUse =
  | "integrate"
  | "cite"
  | "compare"
  | "evaluate"
  | "defer"
  | "do_not_duplicate";

export interface SourceMapEntry {
  id: string;
  domain: SourceDomain;
  name: string;
  institution?: string;
  url?: string;
  intendedUse: SourceMapUse;
  whatItHelpsAnswer: string;
  limitations: string[];
  licenseOrAccessNote: string;
  confidenceUse:
    | "high_for_context"
    | "medium_for_context"
    | "limited"
    | "unknown";
  exposureRisk:
    | "low"
    | "medium"
    | "high"
    | "restricted";
  linkedSourceIds?: Source["id"][];
  notes?: string;
}

export const copperCobaltPilotSourceMap: SourceMapEntry[] = [
  {
    id: "SM-USGS-MM",
    domain: "mineral_context",
    name: "USGS Mineral Commodity Summaries and related mineral context",
    institution: "U.S. Geological Survey",
    url: "https://www.usgs.gov/centers/national-minerals-information-center",
    intendedUse: "cite",
    linkedSourceIds: ["SRC-USGS-CO-001"],
    whatItHelpsAnswer: "Reserve, production, and mineral-system context — not custody or origin proof.",
    limitations: ["National/regional aggregates; no product-level linkage."],
    licenseOrAccessNote: "Public federal materials; citation required.",
    confidenceUse: "high_for_context",
    exposureRisk: "low",
  },
  {
    id: "SM-EITI",
    domain: "extractive_transparency",
    name: "EITI country or thematic disclosures where published",
    institution: "Extractive Industries Transparency Initiative",
    url: "https://eiti.org/",
    intendedUse: "evaluate",
    whatItHelpsAnswer:
      "Transparency posture for revenues, concessions, occasionally production — jurisdictional completeness varies.",
    limitations: ["Publication timing and scope differ by implementing country.", "Implementations omit non-EITI states."],
    licenseOrAccessNote: "Depends on disclosed country materials; cite specific disclosure package.",
    confidenceUse: "medium_for_context",
    exposureRisk: "low",
  },
  {
    id: "SM-RESOURCE-CONTRACTS",
    domain: "contracts_concessions",
    name: "Public contract/concession repositories (e.g., Resource Contracts or national gazettes)",
    institution: "Varies",
    url: "https://www.resourcecontracts.org/",
    intendedUse: "defer",
    whatItHelpsAnswer: "Concession/permit wording and fiscal terms — only where released and authoritative.",
    limitations: ["Not all contracts publicly indexed.", "Interpretation demands legal/context review."],
    licenseOrAccessNote: "Governed per host repository licensing; some documents restricted.",
    confidenceUse: "limited",
    exposureRisk: "medium",
    notes: "Corridor dossier intends to cite, not scrape or reconstruct partner systems.",
  },
  {
    id: "SM-OPEN-OWNERSHIP",
    domain: "beneficial_ownership",
    name: "Open Ownership Register / Beneficial Ownership Data Standard (BODS) ecosystem",
    institution: "Open Ownership",
    url: "https://www.openownership.org/",
    intendedUse: "evaluate",
    whatItHelpsAnswer: "Ownership/control visibility where registers exist and disclosures are authoritative.",
    limitations: ["Registers incomplete globally.", "Disclosure quality variable."],
    licenseOrAccessNote: "Depends on jurisdictional datasets; attribution per registry terms.",
    confidenceUse: "medium_for_context",
    exposureRisk: "low",
  },
  {
    id: "SM-UNCOMTRADE",
    domain: "trade_flows",
    name: "UN Comtrade reported trade flows",
    institution: "United Nations",
    url: "https://comtradeplus.un.org/",
    intendedUse: "cite",
    linkedSourceIds: ["SRC-UNCOMTRADE-CO-001"],
    whatItHelpsAnswer:
      "Reported trade direction and aggregates — informs processing/trade hypotheses; not physical chain-of-custody.",
    limitations: ["Mirror statistics diverge.", "HS codes imperfect for mineral specificity."],
    licenseOrAccessNote: "Public query terms; uphold UN redistribution rules.",
    confidenceUse: "high_for_context",
    exposureRisk: "low",
  },
  {
    id: "SM-ILOSTAT",
    domain: "labor",
    name: "ILOSTAT indicators and companion ILO normative framing",
    institution: "International Labour Organization",
    url: "https://ilo.org/",
    intendedUse: "cite",
    whatItHelpsAnswer: "National/sector labour context indicators — seldom site-verified incidents.",
    limitations: ["Formal economy bias; informal work underrepresented.", "Not mine-level diagnosis."],
    licenseOrAccessNote: "Public materials; citation per publisher guidance.",
    confidenceUse: "medium_for_context",
    exposureRisk: "low",
  },
  {
    id: "SM-ECOLOGY-GLOBAL",
    domain: "ecology_environment",
    name: "Global biodiversity/ecology syntheses for contextual stressors (literature-linked, aggregated only)",
    institution: "IPBES, national inventories, curated literature",
    intendedUse: "defer",
    whatItHelpsAnswer: "Contextual biodiversity or ecosystem-pressure framing — aggregated, jurisdiction-specific follow-up deferred.",
    limitations: ["Fine-scale locality requires separate consent/exposure posture.", "Not substitute for ground-truth monitoring."],
    licenseOrAccessNote: "Cite primary studies; aggregates only for pilot.",
    confidenceUse: "limited",
    exposureRisk: "medium",
  },
  {
    id: "SM-GFW",
    domain: "geospatial",
    name: "Global Forest Watch–class ecological overlays (conceptual linkage only)",
    institution: "World Resources Institute ecosystem",
    url: "https://www.globalforestwatch.org/",
    intendedUse: "defer",
    whatItHelpsAnswer: "High-level contextual forest/land-cover signals planned for guarded use only.",
    limitations: ["Any geospatial disclosure requires exposure review.", "Temporal lag and omission risk."],
    licenseOrAccessNote: "Derivative works subject to licence; no sensitive coordinates reproduced in-repo.",
    confidenceUse: "limited",
    exposureRisk: "high",
    notes: "Treat as classify-before-publish; no corridor map layers ship in-repo for this milestone.",
  },
  {
    id: "SM-OECD-MINERALS",
    domain: "methods",
    name: "OECD due-diligence and responsible mineral supply-chain guidance",
    institution: "OECD",
    url: "https://www.oecd.org/",
    intendedUse: "evaluate",
    whatItHelpsAnswer:
      "Method framing for stewardship due diligence — complements but does not replace primary evidence bundles.",
    limitations: ["Guidance ≠ legal verdict.", "Jurisdictional law still governs concessions and disclosures."],
    licenseOrAccessNote: "Publish OECD excerpts per publisher reproduction policy.",
    confidenceUse: "high_for_context",
    exposureRisk: "low",
  },
  {
    id: "SM-PUBLIC-REVENUE-EITI-IMF",
    domain: "public_revenue",
    name: "Public revenue & fiscal disclosures (EITI / IMF GOV materials where applicable)",
    institution: "EITI / IMF / MOF disclosures",
    intendedUse: "defer",
    whatItHelpsAnswer: "Fiscal linkage questions — contingent on published treasury or EITI revenue tables.",
    limitations: ["Classifications diverge.", "Lag between extraction value and disbursement realities."],
    licenseOrAccessNote: "Treat each statistic as attribution-bound; no wholesale republication assumptions.",
    confidenceUse: "limited",
    exposureRisk: "medium",
  },
  {
    id: "SM-UNDRIP-HR",
    domain: "human_rights",
    name: "UN Declaration on the Rights of Indigenous Peoples and related human-rights frameworks",
    institution: "United Nations",
    intendedUse: "cite",
    whatItHelpsAnswer: "Normative guardrails informing consent/governance layering — descriptive, non-adjudicatory.",
    limitations: ["Does not determine domestic legal outcomes.", "Does not authorize exposure of IK without consent regimes."],
    licenseOrAccessNote: "Treat as normative citation; uphold UNDRIP text reproduction limits.",
    confidenceUse: "high_for_context",
    exposureRisk: "low",
  },
  {
    id: "SM-CARE-GIS",
    domain: "safeguards",
    name: "CARE Principles for Indigenous Data Governance and FAIR-aligned metadata discipline",
    institution: "CARE / research data governance community",
    intendedUse: "evaluate",
    whatItHelpsAnswer: "Data sovereignty expectations when Indigenous or customary knowledge intersects dossier workflows.",
    limitations: ["Institutional uptake varies.", "Must pair with contextual consent regimes."],
    licenseOrAccessNote: "Interpret under academic/CARE reuse guidance; cite version and publisher.",
    confidenceUse: "medium_for_context",
    exposureRisk: "restricted",
    notes: "Works alongside knowledge-governance doctrine in GOVERNANCE.md — not blanket open-data approval.",
  },
  {
    id: "SM-EVIDENCE-LEDGER-WIRING",
    domain: "methods",
    name: "In-repository evidence ledger → authoritative source ID pointers",
    institution: "EEO pilot prototype",
    intendedUse: "integrate",
    whatItHelpsAnswer:
      "Keeps synthetic sample evidence linked to citation-grade source rows without re-hosting agency datasets wholesale.",
    limitations: ["Prototype-only linkage pattern; governed systems will use vaulted stores."],
    licenseOrAccessNote: "Derivative metadata only in-repo; upstream terms govern primary data reuse.",
    confidenceUse: "high_for_context",
    exposureRisk: "low",
    notes: "Integrate ≠ scrape: wire references and roles, respect host authority.",
    linkedSourceIds: ["SRC-USGS-CO-001", "SRC-UNCOMTRADE-CO-001"],
  },
  {
    id: "SM-TRADE-PARTNER-MIRRORS",
    domain: "trade_flows",
    name: "Mirror trade statistics reconciliation (partner vs reporter)",
    institution: "UN Comtrade (conceptual reconciliation pattern)",
    url: "https://comtradeplus.un.org/",
    intendedUse: "compare",
    whatItHelpsAnswer:
      "Highlights divergence between importer- and exporter-reported flows — flags data quality gaps, not custody.",
    limitations: ["Reconciliation workload; timing and valuation differences distort pairs.", "Still not proof of origin."],
    licenseOrAccessNote: "Same redistribution discipline as underlying Comtrade queries.",
    confidenceUse: "medium_for_context",
    exposureRisk: "low",
  },
  {
    id: "SM-HOST-FIRST-REGISTRIES",
    domain: "contracts_concessions",
    name: "Authoritative concession/contract repositories as single publishers",
    institution: "Varies (government gazettes, ResourceContracts hosts, cadastre portals)",
    intendedUse: "do_not_duplicate",
    whatItHelpsAnswer:
      "Treats authoritative hosts as canon; EEO summarizes with citation rather than cloning full corpuses.",
    limitations: ["Access and licensing vary; silent gaps ≠ absence of instruments."],
    licenseOrAccessNote: "Prefer deep links / citations over bulk republication absent explicit permission.",
    confidenceUse: "limited",
    exposureRisk: "medium",
    linkedSourceIds: [],
    notes: "Non-duplication discipline — complements defer/cite posture on SM-RESOURCE-CONTRACTS.",
  },
];
