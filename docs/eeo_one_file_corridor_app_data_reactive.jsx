"use client";

// Curated replacement from /Users/ngabire.emmanuel/Downloads/eeo_one_file_corridor_app_repaired.jsx
// Stored as a separate variant to avoid overwriting the canonical corridor snapshot.
import React, { useMemo, useState } from "react";

/**
 * Earth Endowment Observatory — Public Evidence Prototype: Copper-Cobalt Corridor
 * --------------------------------------------------------------------------------
 * Single-file React prototype.
 *
 * Brand integration is intentionally incremental:
 * - Keeps the atmospheric earth/water/forest/gold visual language.
 * - Uses the existing glass-card system, safe-resolution map, and institutional tone.
 * - Re-centers the product around the evidence core: Source -> Evidence -> Claim
 *   -> Review -> Release Manifest -> Correction Route.
 * - Avoids scores, legal findings, product traceability claims, blockchain framing,
 *   and ownership overclaiming.
 */

// -----------------------------------------------------------------------------
// BRAND / THEME TOKENS
// -----------------------------------------------------------------------------

const PRODUCT_TITLE = "Public Evidence Prototype: Copper-Cobalt Corridor";
const MOTTO = "From Earth to economy, made visible.";
const CONSTITUTIONAL_RULE =
  "Reveal systems. Protect peoples. Trace value. Respect sovereignty. Publish with evidence. Scale only after trust.";

const theme = {
  ink: "#0F2F33",
  text: "#13424A",
  muted: "#4F6F75",
  border: "#CFE3DA",
  borderStrong: "#A9C9C0",

  primary: "#1F6F78",
  primaryDark: "#144E55",
  primarySoft: "#E0F1F3",

  green: "#2E8B57",
  greenDark: "#1F6B45",
  greenSoft: "#DFF3E7",

  sky: "#CDEAF7",
  skyDeep: "#A9D8F0",
  water: "#BFE3E2",
  waterDeep: "#8FD0D0",

  gold: "#B88928",
  goldDark: "#806016",
  goldSoft: "#F3E4B8",

  clay: "#9C5B36",
  claySoft: "#F0D9C9",

  danger: "#8B3A2F",
  dangerSoft: "#F4DAD5",

  violet: "#5C617B",
  violetSoft: "#E4E7F4",

  surface: "rgba(255,255,255,0.82)",
  surfaceSolid: "#FFFFFF",
};

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function round(value, digits = 2) {
  return Number(value.toFixed(digits));
}

function hsl(h, s, l) {
  return `hsl(${round(h)} ${round(s)}% ${round(l)}%)`;
}

function hsla(h, s, l, a) {
  return `hsla(${round(h)} ${round(s)}% ${round(l)}% / ${round(a, 3)})`;
}

function byId(items, id) {
  return items.find((item) => item.id === id);
}

function sentenceCase(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function scrollToId(id) {
  const node = typeof document !== "undefined" ? document.getElementById(id) : null;
  if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
}

function riskTone(value) {
  if (value >= 70) return "high";
  if (value >= 45) return "medium";
  return "low";
}

function confidenceTone(value) {
  if (value >= 75) return "strong";
  if (value >= 45) return "partial";
  return "weak";
}

function statusToken(kind, value) {
  const key = String(value || "").toLowerCase();

  if (kind === "confidence") {
    if (key === "high") return { bg: theme.greenSoft, fg: theme.greenDark, border: "#A9DDBD" };
    if (key === "medium") return { bg: theme.goldSoft, fg: theme.goldDark, border: "#E0C875" };
    if (key === "low" || key === "insufficient") return { bg: theme.claySoft, fg: theme.clay, border: "#DDB39A" };
    return { bg: theme.violetSoft, fg: theme.violet, border: "#C7CCE5" };
  }

  if (kind === "exposure") {
    if (key === "low") return { bg: theme.greenSoft, fg: theme.greenDark, border: "#A9DDBD" };
    if (key === "medium") return { bg: theme.goldSoft, fg: theme.goldDark, border: "#E0C875" };
    return { bg: theme.dangerSoft, fg: theme.danger, border: "#E2AFA6" };
  }

  if (kind === "publication") {
    if (key === "publish") return { bg: theme.primarySoft, fg: theme.primaryDark, border: "#B8DDE1" };
    if (key.includes("redactions") || key.includes("aggregated")) return { bg: theme.goldSoft, fg: theme.goldDark, border: "#E0C875" };
    return { bg: theme.dangerSoft, fg: theme.danger, border: "#E2AFA6" };
  }

  if (kind === "role") {
    if (key === "supports") return { bg: theme.greenSoft, fg: theme.greenDark, border: "#A9DDBD" };
    if (key === "limits" || key === "contextualizes") return { bg: theme.primarySoft, fg: theme.primaryDark, border: "#B8DDE1" };
    if (key === "contradicts") return { bg: theme.dangerSoft, fg: theme.danger, border: "#E2AFA6" };
    return { bg: theme.goldSoft, fg: theme.goldDark, border: "#E0C875" };
  }

  if (kind === "review") {
    if (key === "approved_for_release") return { bg: theme.greenSoft, fg: theme.greenDark, border: "#A9DDBD" };
    if (key === "challenged" || key === "withdrawn") return { bg: theme.dangerSoft, fg: theme.danger, border: "#E2AFA6" };
    return { bg: theme.goldSoft, fg: theme.goldDark, border: "#E0C875" };
  }

  return { bg: "rgba(255,255,255,.78)", fg: theme.text, border: theme.border };
}

// -----------------------------------------------------------------------------
// DATA-REACTIVE BRAND ATMOSPHERE
// -----------------------------------------------------------------------------

const defaultSignals = {
  ecologyStress: 42,
  waterStress: 36,
  uncertainty: 28,
  restorationPotential: 74,
  evidenceConfidence: 81,
};

function computeAtmosphere(signals) {
  const ecologyStress = clamp(signals.ecologyStress);
  const waterStress = clamp(signals.waterStress);
  const uncertainty = clamp(signals.uncertainty);
  const restorationPotential = clamp(signals.restorationPotential);
  const evidenceConfidence = clamp(signals.evidenceConfidence);

  const e = ecologyStress / 100;
  const w = waterStress / 100;
  const u = uncertainty / 100;
  const r = restorationPotential / 100;
  const c = evidenceConfidence / 100;

  const skyHue = 198 - e * 10 + r * 3;
  const skySat = 62 - u * 8 + c * 6;
  const skyLightTop = 89 - w * 6 - e * 4 + r * 2;
  const skyLightBottom = 83 - w * 7 - u * 4 + c * 3;

  const waterHue = 186 - w * 6;
  const waterSat = 42 + c * 6 - u * 5;
  const waterLight = 78 - w * 7 + c * 3;
  const waterOpacity = 0.52 + w * 0.18;

  const vegetationHue = 145 - e * 10 + r * 6;
  const vegetationSat = 38 + r * 18 - e * 8;
  const vegetationLight = 72 - e * 8 + r * 4;
  const vegetationOpacity = 0.18 + r * 0.18 - e * 0.04;

  const hazeOpacity = Math.max(0.02, 0.05 + u * 0.24 - c * 0.06);
  const hazeBlur = 14 + u * 22;
  const clarityOpacity = Math.max(0.04, 0.08 + c * 0.12 - u * 0.05);
  const ecoGlowSize = 44 + r * 22;
  const shimmerOpacity = 0.08 + w * 0.12 + c * 0.05;

  return {
    skyTop: hsl(skyHue, skySat, skyLightTop),
    skyBottom: hsl(skyHue + 5, Math.max(38, skySat - 8), skyLightBottom),
    waterBand: hsla(waterHue, waterSat, waterLight, waterOpacity),
    waterBandDeep: hsla(waterHue - 4, waterSat + 4, Math.max(52, waterLight - 16), 0.42),
    vegetationGlow: hsla(vegetationHue, vegetationSat, vegetationLight, Math.max(0.06, vegetationOpacity)),
    vegetationGlowDeep: hsla(vegetationHue - 5, vegetationSat + 5, Math.max(40, vegetationLight - 22), 0.18),
    hazeColor: hsla(195, 22, 98, hazeOpacity),
    hazeOpacity,
    hazeBlur,
    clarityColor: hsla(200, 60, 99, clarityOpacity),
    clarityOpacity,
    ecoGlowSize,
    shimmerOpacity,
    skyDuration: Math.max(8, 20 - w * 4 - u * 2),
    waterDuration: Math.max(9, 24 - w * 5),
    vegetationDuration: Math.max(12, 28 - r * 3),
  };
}

function describeAtmosphere(signals) {
  const tags = [];
  if (signals.ecologyStress >= 70) tags.push("ecological strain");
  else if (signals.ecologyStress <= 35) tags.push("ecological balance");
  else tags.push("moderate ecological pressure");

  if (signals.waterStress >= 65) tags.push("water pressure");
  else if (signals.waterStress <= 35) tags.push("hydrological stability");
  else tags.push("watch-level water stress");

  if (signals.uncertainty >= 60) tags.push("high uncertainty");
  else if (signals.uncertainty <= 30) tags.push("clearer evidence conditions");
  else tags.push("partial evidence conditions");

  if (signals.restorationPotential >= 65) tags.push("restoration potential");
  if (signals.evidenceConfidence >= 75) tags.push("stronger source confidence");
  return tags.join(" · ");
}

// -----------------------------------------------------------------------------
// CANONICAL EVIDENCE DATA
// -----------------------------------------------------------------------------

const sources = [
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
    publicationDate: "Current public database",
    accessedDate: "2026-04-27",
    licenseStatus: "open",
    notes: "Used for reported trade-flow context. Does not establish mine-to-product traceability.",
  },
  {
    id: "SRC-EEO-METHOD-001",
    title: "EEO Prototype Methods and Limits",
    publisher: "Earth Endowment Observatory",
    sourceType: "other",
    jurisdiction: "Prototype",
    publicationDate: "2026-04-27",
    accessedDate: "2026-04-27",
    licenseStatus: "open",
    notes: "Internal public-methods note for the prototype. Establishes claim, evidence, review, and publication categories.",
  },
];

const entities = [
  {
    id: "ENT-DRC",
    name: "Democratic Republic of the Congo",
    entityType: "jurisdiction",
    jurisdiction: "DRC",
    caveats: [
      "Jurisdiction-level reference only.",
      "Does not imply responsibility by any specific agency, company, official, or community.",
    ],
  },
  {
    id: "ENT-COBALT",
    name: "Cobalt",
    entityType: "resource",
    caveats: [
      "Resource-level reference only.",
      "Does not identify a specific mine, operator, shipment, buyer, or consumer product.",
    ],
  },
  {
    id: "ENT-COPPER",
    name: "Copper",
    entityType: "resource",
    caveats: [
      "Resource-level reference only.",
      "Used to frame the copper-cobalt corridor without claiming product-level traceability.",
    ],
  },
];

const evidenceItems = [
  {
    id: "EVID-USGS-CO-001",
    sourceId: "SRC-USGS-CO-001",
    title: "Cobalt production and reserve context",
    summary:
      "USGS mineral data can provide production and reserve context for cobalt, but it does not identify the custody chain of specific downstream products.",
    evidenceClass: "official",
    confidenceContribution: "high",
    limitations: [
      "Does not provide mine-to-product traceability.",
      "Does not identify specific downstream products.",
      "Does not establish company responsibility for individual shipments.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      {
        claimId: "CLAIM-DRC-CO-001",
        role: "contextualizes",
        note: "Provides production and reserve context.",
      },
    ],
  },
  {
    id: "EVID-UNCOMTRADE-CO-001",
    sourceId: "SRC-UNCOMTRADE-CO-001",
    title: "Reported cobalt-related trade flows",
    summary:
      "UN Comtrade can show reported trade flows between countries, but trade data alone does not establish full chain-of-custody from mine to final product.",
    evidenceClass: "official",
    confidenceContribution: "medium",
    limitations: [
      "Trade data may be aggregated.",
      "Reported flows may not reflect actual origin after processing or re-export.",
      "Does not prove product-level traceability.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      {
        claimId: "CLAIM-DRC-CO-001",
        role: "limits",
        note: "Clarifies what trade data cannot prove.",
      },
    ],
  },
  {
    id: "EVID-EEO-METHOD-001",
    sourceId: "SRC-EEO-METHOD-001",
    title: "Prototype uses claim discipline rather than scoring",
    summary:
      "The prototype publishes method-limited claims, evidence roles, publication decisions, and review status instead of country or company scores.",
    evidenceClass: "reported",
    confidenceContribution: "high",
    limitations: [
      "This is a prototype operating rule, not external verification.",
      "Future production releases require independent method review.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      {
        claimId: "CLAIM-EEO-METHOD-001",
        role: "supports",
        note: "Documents the no-score MVP rule.",
      },
    ],
  },
];

const claims = [
  {
    id: "CLAIM-DRC-CO-001",
    title: "Reported cobalt production is not the same as traceable product origin",
    plainLanguageClaim:
      "Public production and trade data can show cobalt production and export patterns, but they do not by themselves prove that a specific downstream battery, vehicle, or consumer product contains cobalt from a specific mine.",
    claimType: "method_limit",
    legalPosture: "methodological_limit",
    corridorNode: "processing_trade",
    evidenceLinks: [
      {
        evidenceId: "EVID-USGS-CO-001",
        role: "contextualizes",
        note: "Provides production and reserve context, but not mine-to-product traceability.",
      },
      {
        evidenceId: "EVID-UNCOMTRADE-CO-001",
        role: "limits",
        note: "Trade data can show reported flows but not full chain-of-custody.",
      },
    ],
    entityIds: ["ENT-DRC", "ENT-COBALT"],
    confidence: "high",
    exposureRisk: "low",
    publicationDecision: "publish",
    reviewStatus: "approved_for_release",
    rightOfReplyRequired: false,
    rightOfReplyStatus: "not_required",
    whatThisDoesNotProve: [
      "It does not prove that any specific product contains cobalt from a specific mine.",
      "It does not prove absence of DRC-origin cobalt in downstream products.",
      "It does not identify a specific company as responsible for a specific shipment.",
      "It does not replace chain-of-custody verification.",
    ],
    whatWouldReviseThisClaim: [
      "Verified chain-of-custody records.",
      "Audited supplier disclosures.",
      "Regulatory findings.",
      "Company right-of-reply evidence.",
      "Updated official trade or production data.",
    ],
    lastUpdated: "2026-04-27",
  },
  {
    id: "CLAIM-EEO-METHOD-001",
    title: "The MVP should publish claims and limits before scores",
    plainLanguageClaim:
      "This prototype intentionally publishes inspectable claims, evidence roles, limits, review status, and release decisions before introducing scores, rankings, certifications, or traceability assertions.",
    claimType: "method_limit",
    legalPosture: "methodological_limit",
    corridorNode: "evidence_gap",
    evidenceLinks: [
      {
        evidenceId: "EVID-EEO-METHOD-001",
        role: "supports",
        note: "Documents the no-score, evidence-first MVP rule.",
      },
    ],
    entityIds: ["ENT-COBALT", "ENT-COPPER"],
    confidence: "high",
    exposureRisk: "low",
    publicationDecision: "publish",
    reviewStatus: "approved_for_release",
    rightOfReplyRequired: false,
    rightOfReplyStatus: "not_required",
    whatThisDoesNotProve: [
      "It does not prove that future versions should never include indices.",
      "It does not evaluate any company, state, or community.",
      "It does not replace independent legal, labor, ecological, or supply-chain review.",
    ],
    whatWouldReviseThisClaim: [
      "Completion of a reviewed scoring methodology.",
      "External methods audit.",
      "Governance approval for a limited, non-punitive index.",
      "Documented evidence that users need a metric that cannot be satisfied by profiles.",
    ],
    lastUpdated: "2026-04-27",
  },
];

const releaseManifest = {
  id: "REL-CC-001",
  title: PRODUCT_TITLE,
  corridor: "Copper-Cobalt Critical Minerals Corridor",
  releaseDate: "2026-04-27",
  includedClaimIds: ["CLAIM-DRC-CO-001", "CLAIM-EEO-METHOD-001"],
  withheldClaimIds: [],
  unresolvedDisputes: [],
  exposureReviewSummary:
    "The current release includes only low-exposure public methodological claims based on official, multilateral, and prototype-method sources. It does not publish sensitive community data, exact vulnerable-site data, sacred-site data, or allegations against specific firms.",
  methodologyVersion: "0.2",
  approvedBy: ["Method review", "Exposure review"],
  publicLimitations: [
    "This prototype does not provide chain-of-custody verification.",
    "This prototype does not make legal findings.",
    "This prototype does not identify specific products as containing cobalt from specific mines.",
    "This prototype does not publish sensitive community or ecological location data.",
  ],
};

const corridorNodes = [
  {
    id: "endowment",
    title: "Endowment",
    known: "Cobalt and copper are treated here as corridor resources, not as product-level traceability claims.",
    unknown: "This prototype does not establish specific mine-to-product custody.",
    evidence: "USGS mineral context; public geological and production context.",
    risk: "Avoid implying that resource-level evidence identifies a specific operator, shipment, or product.",
  },
  {
    id: "jurisdiction",
    title: "Jurisdiction",
    known: "The DRC is referenced as a jurisdiction-level context for cobalt production and governance inquiry.",
    unknown: "This prototype does not resolve domestic legal authority, disputes, or administrative responsibility.",
    evidence: "Official and public sources only.",
    risk: "Do not transform jurisdiction context into blame or liability.",
  },
  {
    id: "concession_permit",
    title: "Concession / Permit",
    known: "Not yet established in this prototype.",
    unknown: "Specific concession, permit, operator, and contract data require source integration and review.",
    evidence: "Not yet linked.",
    risk: "Avoid inference without verified concession or contract evidence.",
  },
  {
    id: "operator",
    title: "Operator",
    known: "Not yet established in this prototype.",
    unknown: "Operator-specific claims require public records, company filings, contract data, or verified partner evidence.",
    evidence: "Not yet linked.",
    risk: "Do not name operators without evidence and right-of-reply review where required.",
  },
  {
    id: "ownership_control",
    title: "Ownership / Control",
    known: "The system separates legal owner, beneficial owner, operator, offtake buyer, financier, and control inference.",
    unknown: "No specific ownership network is asserted in this prototype.",
    evidence: "Not yet linked.",
    risk: "Do not collapse different relationships into a single ownership claim.",
  },
  {
    id: "extraction_production",
    title: "Extraction / Production",
    known: "Production context can be described at aggregate levels through official mineral data.",
    unknown: "Site-level production and labor conditions require stronger evidence.",
    evidence: "USGS contextual evidence.",
    risk: "Aggregate production context is not proof of conditions at a specific site.",
  },
  {
    id: "processing_trade",
    title: "Processing / Trade",
    known: "Reported trade flows can contextualize movement across borders.",
    unknown: "Trade data alone does not prove custody, origin after re-export, or product-level incorporation.",
    evidence: "UN Comtrade contextual and limiting evidence.",
    risk: "Avoid product-specific traceability claims without custody records.",
  },
  {
    id: "labor_risk",
    title: "Labor Risk",
    known: "Labor risk is in scope for the Observatory’s future value-chain analysis.",
    unknown: "No worker-level, site-level, or employer-level claim is published in this release.",
    evidence: "Not yet linked.",
    risk: "Do not expose workers, communities, or informants without consent and protection.",
  },
  {
    id: "ecological_signal",
    title: "Ecological Signal",
    known: "Ecological signal display is currently illustrative and safe-resolution.",
    unknown: "No site-level ecological harm claim is made in this prototype.",
    evidence: "Prototype signal model only.",
    risk: "Avoid publishing exploitable locations or unreviewed harm assertions.",
  },
  {
    id: "public_revenue",
    title: "Public Revenue",
    known: "Public revenue is in scope for future corridor profiles.",
    unknown: "No royalty, tax, dividend, or budget claim is asserted in this release.",
    evidence: "Not yet linked.",
    risk: "Avoid implying public benefit or leakage without fiscal evidence.",
  },
  {
    id: "public_benefit",
    title: "Public Benefit Question",
    known: "The prototype asks whether endowment use becomes durable public benefit.",
    unknown: "Public benefit outcomes require revenue, budget, community, labor, and welfare evidence.",
    evidence: "Method claim only.",
    risk: "Do not substitute moral concern for measured public-benefit evidence.",
  },
  {
    id: "evidence_gap",
    title: "Evidence Gap",
    known: "The prototype makes gaps visible rather than filling them with inference.",
    unknown: "Several corridor layers require future source integration.",
    evidence: "Release manifest and methods claim.",
    risk: "Missing data is not proof of either harm or innocence.",
  },
];

const corridorMetrics = [
  {
    id: "ecology",
    domain: "Ecology",
    label: "Ecology stress",
    valueKey: "ecologyStress",
    description: "Illustrative public signal for ecological pressure in the corridor view.",
    caution: "Signal only. Not a site-level harm finding.",
  },
  {
    id: "water",
    domain: "Water",
    label: "Water stress",
    valueKey: "waterStress",
    description: "Illustrative signal for hydrological pressure relevant to extraction and processing.",
    caution: "Requires source-specific validation before publication.",
  },
  {
    id: "uncertainty",
    domain: "Evidence",
    label: "Uncertainty",
    valueKey: "uncertainty",
    description: "Signals where evidence is incomplete, modeled, or method-limited.",
    caution: "Uncertainty must remain visible, not hidden by design polish.",
  },
  {
    id: "restoration",
    domain: "Stewardship",
    label: "Restoration potential",
    valueKey: "restorationPotential",
    description: "Illustrative potential for repair, mitigation, or public-value improvement.",
    caution: "Not a restoration claim without reviewed ecological evidence.",
  },
  {
    id: "confidence",
    domain: "Sources",
    label: "Evidence confidence",
    valueKey: "evidenceConfidence",
    description: "Source confidence for the visible prototype claim set.",
    caution: "Confidence applies to the claim scope, not to broader supply-chain certainty.",
  },
];

// -----------------------------------------------------------------------------
// HIDDEN QUALITY TESTS
// -----------------------------------------------------------------------------

function runSelfTests(signals, atmosphere) {
  const publicCopy = [
    PRODUCT_TITLE,
    MOTTO,
    CONSTITUTIONAL_RULE,
    claims.map((claim) => claim.title).join(" "),
  ].join(" ");

  const publicForbiddenPhrases = [
    "canonical web-app " + "systems specification",
    "global ownership " + "of resources",
    "blockchain " + "revolution",
    "objective justice " + "score",
    "world resource " + "control",
    "redistribution " + "engine",
  ];

  return [
    {
      name: "brand title is public prototype title",
      pass: PRODUCT_TITLE === "Public Evidence Prototype: Copper-Cobalt Corridor",
    },
    {
      name: "atmosphere has valid colors",
      pass: String(atmosphere.skyTop).includes("hsl") && String(atmosphere.waterBand).includes("hsla"),
    },
    {
      name: "all claim evidence links resolve",
      pass: claims.every((claim) => claim.evidenceLinks.every((link) => Boolean(byId(evidenceItems, link.evidenceId)))),
    },
    {
      name: "all evidence source links resolve",
      pass: evidenceItems.every((item) => Boolean(byId(sources, item.sourceId))),
    },
    {
      name: "sample claim includes non-proof limits",
      pass: claims.every((claim) => claim.whatThisDoesNotProve.length > 0 && claim.whatWouldReviseThisClaim.length > 0),
    },
    {
      name: "release manifest references public claims",
      pass: releaseManifest.includedClaimIds.every((id) => Boolean(byId(claims, id))),
    },
    {
      name: "public copy avoids forbidden framing",
      pass: publicForbiddenPhrases.every((phrase) => !publicCopy.toLowerCase().includes(phrase.toLowerCase())),
    },
    {
      name: "dashboard metrics match signal keys",
      pass: corridorMetrics.every((metric) => Object.prototype.hasOwnProperty.call(signals, metric.valueKey)),
    },
  ];
}

// -----------------------------------------------------------------------------
// ICONS
// -----------------------------------------------------------------------------

function SvgIcon({ children, size = 18 }) {
  return (
    <svg className="eeo-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

const Icons = {
  arrow: ({ size = 18 }) => (
    <SvgIcon size={size}>
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  ),
  evidence: ({ size = 18 }) => (
    <SvgIcon size={size}>
      <path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 3v5h5M9.5 12h5M9.5 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </SvgIcon>
  ),
  shield: ({ size = 18 }) => (
    <SvgIcon size={size}>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  ),
  map: ({ size = 18 }) => (
    <SvgIcon size={size}>
      <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 3v15M15 6v15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </SvgIcon>
  ),
  warning: ({ size = 18 }) => (
    <SvgIcon size={size}>
      <path d="M12 3l10 18H2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 9v5M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </SvgIcon>
  ),
  link: ({ size = 18 }) => (
    <SvgIcon size={size}>
      <path d="M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 11a5 5 0 00-7 0l-2 2a5 5 0 007 7l1-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </SvgIcon>
  ),
  ledger: ({ size = 18 }) => (
    <SvgIcon size={size}>
      <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 9h16M9 4v16" stroke="currentColor" strokeWidth="2" />
    </SvgIcon>
  ),
  scales: ({ size = 18 }) => (
    <SvgIcon size={size}>
      <path d="M12 3v18M6 6h12M8 6l-4 7h8zM16 6l-4 7h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  ),
  spark: ({ size = 18 }) => (
    <SvgIcon size={size}>
      <path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </SvgIcon>
  ),
};

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------

function AppStyles({ atmosphere }) {
  return (
    <style>{`
      * { box-sizing: border-box; }
      html, body, #root { min-height: 100%; }
      body { margin: 0; }
      button, input { font: inherit; }
      button { cursor: pointer; }
      a { color: inherit; }
      :focus-visible { outline: 3px solid rgba(31,111,120,.45); outline-offset: 3px; }

      @keyframes eeoDriftSky {
        0% { transform: translate3d(0px, 0px, 0); }
        50% { transform: translate3d(0px, -10px, 0); }
        100% { transform: translate3d(0px, 0px, 0); }
      }
      @keyframes eeoDriftWater {
        0% { transform: translate3d(0px, 0px, 0); }
        50% { transform: translate3d(14px, 0px, 0); }
        100% { transform: translate3d(0px, 0px, 0); }
      }
      @keyframes eeoDriftVegetation {
        0% { transform: translate3d(0px, 0px, 0) scale(1); }
        50% { transform: translate3d(-8px, 6px, 0) scale(1.02); }
        100% { transform: translate3d(0px, 0px, 0) scale(1); }
      }
      @keyframes eeoShimmer {
        0% { opacity: 0.08; transform: translateX(-2%); }
        50% { opacity: 0.18; transform: translateX(2%); }
        100% { opacity: 0.08; transform: translateX(-2%); }
      }

      .eeo-app {
        min-height: 100vh;
        color: ${theme.text};
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        position: relative;
        overflow-x: hidden;
      }
      .eeo-bg-sky {
        position: fixed; inset: 0; z-index: -5;
        background: linear-gradient(180deg, ${atmosphere.skyTop} 0%, ${atmosphere.skyBottom} 58%, #EAF5F0 100%);
        animation: eeoDriftSky ${atmosphere.skyDuration}s ease-in-out infinite;
        will-change: transform;
      }
      .eeo-bg-water {
        position: fixed; inset: 0; z-index: -4;
        background: radial-gradient(circle at 50% 82%, ${atmosphere.waterBand} 0%, ${atmosphere.waterBandDeep} 34%, transparent 68%);
        animation: eeoDriftWater ${atmosphere.waterDuration}s ease-in-out infinite;
        will-change: transform;
      }
      .eeo-bg-vegetation {
        position: fixed; inset: 0; z-index: -3;
        background:
          radial-gradient(circle at 18% 86%, ${atmosphere.vegetationGlow} 0%, transparent ${atmosphere.ecoGlowSize}%),
          radial-gradient(circle at 82% 90%, ${atmosphere.vegetationGlowDeep} 0%, transparent ${Math.max(22, atmosphere.ecoGlowSize - 4)}%);
        animation: eeoDriftVegetation ${atmosphere.vegetationDuration}s ease-in-out infinite;
        will-change: transform;
      }
      .eeo-bg-haze {
        position: fixed; inset: 0; z-index: -2;
        background: linear-gradient(180deg, ${atmosphere.hazeColor} 0%, transparent 26%, ${atmosphere.hazeColor} 100%);
        opacity: ${atmosphere.hazeOpacity};
        filter: blur(${atmosphere.hazeBlur}px);
      }
      .eeo-bg-clarity {
        position: fixed; inset: 0; z-index: -2;
        background: radial-gradient(circle at 50% 28%, ${atmosphere.clarityColor} 0%, transparent 58%);
        opacity: ${atmosphere.clarityOpacity};
      }
      .eeo-bg-shimmer {
        position: fixed; inset: 0; z-index: -1;
        background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.15) 18%, transparent 34%);
        opacity: ${atmosphere.shimmerOpacity};
        animation: eeoShimmer 16s ease-in-out infinite;
        pointer-events: none;
        mix-blend-mode: screen;
      }

      .eeo-shell { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
      .eeo-icon { display: inline-flex; color: currentColor; flex-shrink: 0; }
      .eeo-glass {
        background: rgba(255,255,255,0.82);
        border: 1px solid ${theme.border};
        box-shadow: 0 20px 55px rgba(15,47,51,0.08);
        backdrop-filter: blur(16px);
      }
      .eeo-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.06fr) minmax(340px, 0.94fr);
        gap: 24px;
        align-items: stretch;
      }
      .eeo-card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
        gap: 16px;
        align-items: stretch;
      }
      .eeo-dashboard-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(310px, 0.75fr);
        gap: 22px;
        align-items: start;
      }
      .eeo-claim-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 18px;
      }
      .eeo-ledger-table-wrap {
        overflow-x: auto;
        border-radius: 20px;
        border: 1px solid ${theme.border};
        background: rgba(255,255,255,.68);
      }
      .eeo-ledger-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 980px;
        font-size: 13px;
      }
      .eeo-ledger-table th {
        text-align: left;
        color: ${theme.primaryDark};
        font-size: 11px;
        letter-spacing: .08em;
        text-transform: uppercase;
        background: rgba(224,241,243,.78);
        padding: 12px;
        border-bottom: 1px solid ${theme.border};
      }
      .eeo-ledger-table td {
        vertical-align: top;
        padding: 12px;
        border-bottom: 1px solid rgba(207,227,218,.75);
        color: ${theme.text};
        line-height: 1.45;
      }
      .eeo-ledger-table tr:last-child td { border-bottom: 0; }
      .eeo-node-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
        gap: 14px;
      }
      .eeo-map-wrap {
        position: relative;
        min-height: 440px;
        border-radius: 24px;
        overflow: hidden;
        isolation: isolate;
      }
      .eeo-map-svg {
        width: 100%;
        height: 100%;
        min-height: 440px;
        display: block;
      }
      .eeo-map-label {
        font-size: 12px;
        font-weight: 800;
        fill: ${theme.text};
        paint-order: stroke;
        stroke: rgba(255,255,255,.86);
        stroke-width: 5px;
        stroke-linejoin: round;
      }
      .eeo-map-caption {
        position: absolute;
        left: 16px;
        right: 16px;
        bottom: 16px;
        z-index: 4;
        display: flex;
        gap: 10px;
        align-items: flex-start;
        padding: 12px 14px;
        background: rgba(255,255,255,0.88);
        border: 1px solid ${theme.border};
        border-radius: 16px;
        color: ${theme.text};
        line-height: 1.5;
        font-size: 13px;
        backdrop-filter: blur(12px);
      }
      .eeo-pill {
        display: inline-flex; align-items: center; gap: 8px;
        border-radius: 999px; padding: 7px 11px;
        font-size: 12px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase;
      }
      .eeo-list {
        margin: 10px 0 0;
        padding-left: 19px;
        color: ${theme.text};
        line-height: 1.65;
      }
      .eeo-list li { margin: 4px 0; }
      .eeo-anchor { scroll-margin-top: 96px; }

      @media (max-width: 920px) {
        .eeo-hero-grid, .eeo-dashboard-grid { grid-template-columns: 1fr; }
        .eeo-map-wrap { min-height: 360px; }
        .eeo-map-svg { min-height: 360px; }
      }
      @media (max-width: 640px) {
        .eeo-shell { width: min(100% - 28px, 1180px); }
        .eeo-header-inner { flex-direction: column; align-items: flex-start !important; }
        .eeo-nav { gap: 10px !important; }
        .eeo-hero-title { font-size: 38px !important; }
        .eeo-map-caption { position: static; margin: 12px; }
        .eeo-map-wrap { min-height: auto; }
        .eeo-map-svg { min-height: 320px; }
      }
    `}</style>
  );
}

// -----------------------------------------------------------------------------
// BASE COMPONENTS
// -----------------------------------------------------------------------------

function AtmosphericBackground() {
  return (
    <>
      <div className="eeo-bg-sky" />
      <div className="eeo-bg-water" />
      <div className="eeo-bg-vegetation" />
      <div className="eeo-bg-haze" />
      <div className="eeo-bg-clarity" />
      <div className="eeo-bg-shimmer" />
    </>
  );
}

function Card({ children, style, as: Component = "div", ...props }) {
  return (
    <Component className="eeo-glass" style={{ borderRadius: 24, ...style }} {...props}>
      {children}
    </Component>
  );
}

function SectionTitle({ eyebrow, title, body, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 18, flexWrap: "wrap", marginBottom: 18 }}>
      <div>
        {eyebrow ? (
          <div style={{ color: theme.gold, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase", fontSize: 12, marginBottom: 8 }}>{eyebrow}</div>
        ) : null}
        <h2 style={{ fontFamily: "Georgia, serif", color: theme.ink, fontSize: "clamp(28px, 3.2vw, 42px)", margin: "0 0 10px", lineHeight: 1.12 }}>{title}</h2>
        {body ? <p style={{ color: theme.muted, lineHeight: 1.7, margin: 0, maxWidth: 850 }}>{body}</p> : null}
      </div>
      {action || null}
    </div>
  );
}

function StatusBadge({ kind, value }) {
  const token = statusToken(kind, value);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 999,
        padding: "5px 9px",
        border: `1px solid ${token.border}`,
        background: token.bg,
        color: token.fg,
        fontSize: 11,
        fontWeight: 900,
        letterSpacing: ".06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {sentenceCase(value)}
    </span>
  );
}

function EeoLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <svg width="52" height="52" viewBox="0 0 120 120" aria-label="Earth Endowment Observatory logo" role="img">
        <defs>
          <linearGradient id="eeo-earth" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7FB3D5" />
            <stop offset="0.45" stopColor="#2F7A5F" />
            <stop offset="1" stopColor="#B88928" />
          </linearGradient>
          <linearGradient id="eeo-leaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7BBF6A" />
            <stop offset="1" stopColor="#1F5D47" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="#F8FAF4" stroke="#1E5D67" strokeWidth="3" />
        <circle cx="60" cy="50" r="24" fill="url(#eeo-earth)" stroke="#FFFFFF" strokeWidth="3" />
        <path d="M40 48c10-9 24-12 39-5" stroke="#F5E6BE" strokeWidth="2" fill="none" opacity="0.9" />
        <path d="M44 60c14 4 28 4 42-2" stroke="#123F46" strokeWidth="2" fill="none" opacity="0.45" />
        <path d="M26 78c22-4 33-18 38-33 5 18 16 30 36 33-20 5-32 15-36 29-5-14-17-24-38-29z" fill="url(#eeo-leaf)" stroke="#FFFFFF" strokeWidth="4" />
        <path d="M60 42v60" stroke="#FFFFFF" strokeWidth="3" opacity="0.85" />
        <circle cx="60" cy="50" r="5" fill="#B88928" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
      <div>
        <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: theme.ink, fontSize: 18 }}>Earth Endowment Observatory</div>
        <div style={{ fontSize: 12, color: theme.gold, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 800 }}>{MOTTO}</div>
      </div>
    </div>
  );
}

function Header() {
  const nav = [
    ["Dossier", "dossier"],
    ["Evidence Ledger", "evidence"],
    ["Corridor", "corridor"],
    ["Release", "release"],
    ["Methods", "methods"],
    ["Corrections", "corrections"],
  ];

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 12, borderBottom: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.68)", backdropFilter: "blur(16px)" }}>
      <div className="eeo-shell eeo-header-inner" style={{ padding: "14px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
        <EeoLogo />
        <nav className="eeo-nav" aria-label="Primary navigation" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          {nav.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              style={{ color: theme.text, textDecoration: "none", fontSize: 13, fontWeight: 820 }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// -----------------------------------------------------------------------------
// HERO + BRAND INTRODUCTION
// -----------------------------------------------------------------------------

function Hero({ signals }) {
  const sample = claims[0];

  return (
    <section className="eeo-shell" style={{ padding: "62px 0 34px" }}>
      <div className="eeo-hero-grid">
        <Card style={{ padding: 28 }}>
          <div className="eeo-pill" style={{ background: "rgba(255,255,255,0.72)", color: theme.primaryDark, border: `1px solid ${theme.border}` }}>
            <Icons.evidence size={16} /> {PRODUCT_TITLE}
          </div>
          <h1 className="eeo-hero-title" style={{ fontFamily: "Georgia, serif", color: theme.ink, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.03, margin: "20px 0 16px", maxWidth: 880 }}>
            See the source. Follow the value. Know the evidence.
          </h1>
          <p style={{ color: theme.text, fontSize: 18, lineHeight: 1.75, maxWidth: 760, margin: 0 }}>
            The Earth Endowment Observatory is a governed civic intelligence system for tracing how natural endowments enter economic life. It connects claims about resources, governance, ownership, labor, trade, ecological condition, public revenue, and value capture—while distinguishing what is known, unknown, disputed, restricted, and unsafe to publish.
          </p>

          <div style={{ marginTop: 22, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <StatusBadge kind="publication" value="publish" />
            <StatusBadge kind="confidence" value={sample.confidence} />
            <StatusBadge kind="review" value={sample.reviewStatus} />
            <StatusBadge kind="exposure" value={sample.exposureRisk} />
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <button onClick={() => scrollToId("dossier")} style={{ background: theme.primary, color: "white", border: 0, padding: "12px 18px", borderRadius: 12, fontWeight: 850, display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 24px rgba(30,93,103,0.18)" }}>
              View Pilot Dossier <Icons.arrow />
            </button>
            <button onClick={() => scrollToId("evidence")} style={{ background: "white", color: theme.primaryDark, border: `1px solid ${theme.border}`, padding: "12px 18px", borderRadius: 12, fontWeight: 850 }}>
              Inspect Evidence Ledger
            </button>
          </div>

          <div style={{ marginTop: 24, padding: 16, borderRadius: 16, border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.70)" }}>
            <div style={{ color: theme.gold, fontWeight: 900, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Example claim</div>
            <div style={{ color: theme.text, fontWeight: 800, fontSize: 16, lineHeight: 1.55 }}>
              {sample.plainLanguageClaim}
            </div>
          </div>

          <div style={{ marginTop: 16, padding: 16, borderRadius: 16, border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.58)" }}>
            <div style={{ color: theme.primaryDark, fontWeight: 900, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Prototype scope</div>
            <div style={{ color: theme.text, lineHeight: 1.65 }}>
              One copper-cobalt corridor. One evidence standard. One public release gate.
            </div>
          </div>
        </Card>

        <Card style={{ padding: 24 }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: theme.gold, fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" }}>Brand integration</div>
            <h2 style={{ color: theme.ink, fontFamily: "Georgia, serif", fontSize: 28, margin: "6px 0 0" }}>Atmospheric identity, evidence-first discipline</h2>
            <p style={{ color: theme.muted, lineHeight: 1.65, margin: "10px 0 0" }}>
              The earth, water, forest, and gold palette remains intact. The repair is conceptual: every public assertion now has a claim card, evidence role, publication decision, and review status.
            </p>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {[
              [Icons.map, "Safe-resolution geography", "Sensitive coordinates are generalized or withheld."],
              [Icons.evidence, "Claim-level evidence", "Every public claim carries confidence and limits."],
              [Icons.shield, "Rights-aware disclosure", "Publication is governed by risk, consent, and public interest."],
              [Icons.warning, "No overclaiming", "No score, certification, legal finding, or product traceability claim."],
            ].map(([I, title, body]) => (
              <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(255,255,255,0.70)", border: `1px solid ${theme.border}`, borderRadius: 16, padding: 13 }}>
                <span style={{ color: theme.primaryDark, background: "rgba(223,243,231,.75)", borderRadius: 12, padding: 8, display: "inline-flex" }}><I size={18} /></span>
                <span>
                  <strong style={{ color: theme.text, display: "block" }}>{title}</strong>
                  <span style={{ color: theme.muted, fontSize: 13, lineHeight: 1.5 }}>{body}</span>
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 15, borderRadius: 16, background: "rgba(243,228,184,.42)", border: `1px solid #E0C875`, color: theme.text, lineHeight: 1.58 }}>
            <strong style={{ color: theme.goldDark }}>Constitutional rule:</strong> {CONSTITUTIONAL_RULE}
          </div>

          <div style={{ marginTop: 16, padding: 15, borderRadius: 16, border: `1px solid ${theme.border}`, background: "rgba(255,255,255,.64)" }}>
            <div style={{ color: theme.primaryDark, fontWeight: 900, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Atmospheric signal</div>
            <div style={{ color: theme.text, fontWeight: 800, fontSize: 15 }}>{describeAtmosphere(signals)}</div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// CLAIM, EVIDENCE, RELEASE, METHODS COMPONENTS
// -----------------------------------------------------------------------------

function OwnershipControlNotice() {
  return (
    <Card style={{ padding: 18, borderColor: "#E0C875", background: "rgba(243,228,184,.42)" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span style={{ color: theme.goldDark, marginTop: 2 }}><Icons.scales size={20} /></span>
        <div>
          <strong style={{ color: theme.goldDark, display: "block", marginBottom: 5 }}>Ownership / control caution</strong>
          <p style={{ color: theme.text, lineHeight: 1.65, margin: 0 }}>
            EEO distinguishes registered ownership, operational control, beneficial ownership, commercial influence, financial exposure, and inferred relationships. These categories must not be collapsed into a single claim of ownership or control.
          </p>
        </div>
      </div>
    </Card>
  );
}

function ClaimCard({ claim }) {
  const linkedEvidence = claim.evidenceLinks.map((link) => ({
    ...link,
    evidence: byId(evidenceItems, link.evidenceId),
  }));

  const linkedEntities = claim.entityIds.map((id) => byId(entities, id)).filter(Boolean);

  return (
    <Card as="article" style={{ padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 18, flexWrap: "wrap", alignItems: "start" }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: theme.gold, fontWeight: 900, fontSize: 12, letterSpacing: 1.1, textTransform: "uppercase" }}>{claim.id}</div>
          <h3 style={{ fontFamily: "Georgia, serif", color: theme.ink, margin: "7px 0 8px", fontSize: 26, lineHeight: 1.18 }}>{claim.title}</h3>
          <p style={{ color: theme.text, lineHeight: 1.7, fontSize: 16, margin: 0 }}>{claim.plainLanguageClaim}</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <StatusBadge kind="confidence" value={claim.confidence} />
          <StatusBadge kind="exposure" value={claim.exposureRisk} />
          <StatusBadge kind="publication" value={claim.publicationDecision} />
          <StatusBadge kind="review" value={claim.reviewStatus} />
        </div>
      </div>

      <div className="eeo-card-grid" style={{ marginTop: 18 }}>
        <div style={{ padding: 14, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.60)" }}>
          <div style={{ color: theme.primaryDark, fontSize: 12, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Claim posture</div>
          <div style={{ marginTop: 9, display: "grid", gap: 8 }}>
            <StatusBadge kind="role" value={claim.claimType} />
            <StatusBadge kind="publication" value={claim.legalPosture} />
            <span style={{ color: theme.text, fontWeight: 780 }}>Node: {sentenceCase(claim.corridorNode)}</span>
          </div>
        </div>

        <div style={{ padding: 14, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.60)" }}>
          <div style={{ color: theme.primaryDark, fontSize: 12, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Right of reply</div>
          <p style={{ color: theme.text, lineHeight: 1.55, margin: "9px 0 0" }}>
            {claim.rightOfReplyRequired ? `Required: ${claim.rightOfReplyReason || "Identifiable party affected."}` : "Not required for this methodological claim."}
          </p>
          <div style={{ marginTop: 8 }}>
            <StatusBadge kind="review" value={claim.rightOfReplyStatus} />
          </div>
        </div>

        <div style={{ padding: 14, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.60)" }}>
          <div style={{ color: theme.primaryDark, fontSize: 12, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Linked entities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {linkedEntities.map((entity) => (
              <span key={entity.id} style={{ background: "white", border: `1px solid ${theme.border}`, borderRadius: 999, padding: "6px 9px", color: theme.text, fontSize: 12, fontWeight: 820 }}>{entity.name}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h4 style={{ color: theme.ink, margin: "0 0 10px", fontSize: 16 }}>Evidence links</h4>
        <div style={{ display: "grid", gap: 10 }}>
          {linkedEvidence.map(({ evidence, role, note }) => (
            <div key={`${claim.id}-${evidence?.id}-${role}`} style={{ padding: 13, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.62)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <strong style={{ color: theme.text }}>{evidence?.title || "Missing evidence"}</strong>
                <StatusBadge kind="role" value={role} />
              </div>
              <p style={{ color: theme.muted, lineHeight: 1.6, margin: "7px 0 0" }}>{note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="eeo-card-grid" style={{ marginTop: 18 }}>
        <div style={{ padding: 15, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.62)" }}>
          <h4 style={{ color: theme.ink, margin: 0 }}>What this does not prove</h4>
          <ul className="eeo-list">
            {claim.whatThisDoesNotProve.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div style={{ padding: 15, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.62)" }}>
          <h4 style={{ color: theme.ink, margin: 0 }}>What would revise this claim</h4>
          <ul className="eeo-list">
            {claim.whatWouldReviseThisClaim.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center", borderTop: `1px solid ${theme.border}`, paddingTop: 16 }}>
        <span style={{ color: theme.muted, fontSize: 13 }}>Last updated: {claim.lastUpdated}</span>
        <button onClick={() => scrollToId("corrections")} style={{ background: "white", color: theme.primaryDark, border: `1px solid ${theme.borderStrong}`, padding: "10px 14px", borderRadius: 12, fontWeight: 850 }}>
          Challenge or correct this claim
        </button>
      </div>
    </Card>
  );
}

function DossierSection() {
  return (
    <section id="dossier" className="eeo-shell eeo-anchor" style={{ padding: "28px 0 40px" }}>
      <SectionTitle
        eyebrow="Pilot dossier"
        title={PRODUCT_TITLE}
        body="This prototype tests whether public claims about a critical-minerals corridor can be made traceable, qualified, reviewable, and correctable without overclaiming, exposing sensitive data, or collapsing legal distinctions."
      />
      <div className="eeo-claim-grid">
        {claims.map((claim) => <ClaimCard key={claim.id} claim={claim} />)}
      </div>
    </section>
  );
}

function EvidenceLedger() {
  return (
    <section id="evidence" className="eeo-shell eeo-anchor" style={{ padding: "18px 0 42px" }}>
      <SectionTitle
        eyebrow="Evidence ledger"
        title="Source, role, limitation, and publication decision."
        body="Not all evidence proves a claim. Evidence can support, limit, contradict, contextualize, or merely motivate review. The ledger makes those roles visible."
      />
      <Card style={{ padding: 18 }}>
        <div className="eeo-ledger-table-wrap">
          <table className="eeo-ledger-table">
            <thead>
              <tr>
                <th>Evidence ID</th>
                <th>Source</th>
                <th>Class</th>
                <th>Role</th>
                <th>Confidence</th>
                <th>Limitations</th>
                <th>Exposure</th>
                <th>Publication</th>
                <th>Claims</th>
              </tr>
            </thead>
            <tbody>
              {evidenceItems.map((item) => {
                const source = byId(sources, item.sourceId);
                const roles = item.claimLinks.map((link) => link.role);
                return (
                  <tr key={item.id}>
                    <td><strong>{item.id}</strong></td>
                    <td>
                      <strong>{source?.title || "Missing source"}</strong>
                      <div style={{ color: theme.muted, marginTop: 4 }}>{source?.publisher}</div>
                      <div style={{ color: theme.muted, marginTop: 4 }}>Accessed: {source?.accessedDate}</div>
                    </td>
                    <td><StatusBadge kind="publication" value={item.evidenceClass} /></td>
                    <td style={{ display: "grid", gap: 6 }}>{roles.map((role) => <StatusBadge key={role} kind="role" value={role} />)}</td>
                    <td><StatusBadge kind="confidence" value={item.confidenceContribution} /></td>
                    <td>
                      <ul style={{ margin: 0, paddingLeft: 16 }}>
                        {item.limitations.map((limit) => <li key={limit}>{limit}</li>)}
                      </ul>
                    </td>
                    <td><StatusBadge kind="exposure" value={item.exposureRisk} /></td>
                    <td><StatusBadge kind="publication" value={item.publicationDecision} /></td>
                    <td>{item.claimLinks.map((link) => <div key={`${item.id}-${link.claimId}`}>{link.claimId}</div>)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}

function CorridorChain() {
  return (
    <section id="corridor" className="eeo-shell eeo-anchor" style={{ padding: "18px 0 42px" }}>
      <SectionTitle
        eyebrow="Corridor chain"
        title="The reasoning spine of the prototype."
        body="Each node distinguishes what is known, unknown, evidenced, and risky to infer. Empty spaces remain visible rather than filled with false certainty."
      />
      <div className="eeo-node-grid">
        {corridorNodes.map((node, index) => (
          <Card key={node.id} style={{ padding: 17 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
              <div>
                <div style={{ color: theme.gold, fontWeight: 950, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>Step {index + 1}</div>
                <h3 style={{ color: theme.ink, margin: "5px 0 12px", fontSize: 19 }}>{node.title}</h3>
              </div>
              <span style={{ color: theme.primaryDark, background: "rgba(224,241,243,.72)", border: `1px solid #B8DDE1`, borderRadius: 12, padding: 7, display: "inline-flex" }}><Icons.link size={16} /></span>
            </div>
            {[
              ["Known", node.known],
              ["Unknown", node.unknown],
              ["Evidence", node.evidence],
              ["Risk", node.risk],
            ].map(([label, body]) => (
              <div key={label} style={{ marginTop: 10 }}>
                <strong style={{ color: theme.primaryDark, fontSize: 12, letterSpacing: ".05em", textTransform: "uppercase" }}>{label}:</strong>
                <p style={{ color: theme.text, lineHeight: 1.55, margin: "3px 0 0", fontSize: 13 }}>{body}</p>
              </div>
            ))}
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 18 }}>
        <OwnershipControlNotice />
      </div>
    </section>
  );
}

function ReleaseManifestSection() {
  const included = releaseManifest.includedClaimIds.map((id) => byId(claims, id)).filter(Boolean);

  return (
    <section id="release" className="eeo-shell eeo-anchor" style={{ padding: "18px 0 42px" }}>
      <SectionTitle
        eyebrow="Release manifest"
        title="What is included, withheld, reviewed, and limited."
        body="The release manifest is the public gate between internal analysis and publication. It prevents dashboard polish from outrunning evidence, review, and exposure safeguards."
      />
      <Card style={{ padding: 22 }}>
        <div className="eeo-card-grid">
          <div>
            <h3 style={{ color: theme.ink, margin: 0 }}>{releaseManifest.title}</h3>
            <p style={{ color: theme.muted, lineHeight: 1.65, margin: "8px 0 0" }}>{releaseManifest.corridor}</p>
            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <StatusBadge kind="publication" value="publish" />
              <span style={{ color: theme.text, fontWeight: 800 }}>Methodology v{releaseManifest.methodologyVersion}</span>
              <span style={{ color: theme.text, fontWeight: 800 }}>Released: {releaseManifest.releaseDate}</span>
            </div>
          </div>
          <div style={{ padding: 15, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.62)" }}>
            <strong style={{ color: theme.primaryDark }}>Exposure review summary</strong>
            <p style={{ color: theme.text, lineHeight: 1.65, margin: "8px 0 0" }}>{releaseManifest.exposureReviewSummary}</p>
          </div>
        </div>

        <div className="eeo-card-grid" style={{ marginTop: 18 }}>
          <div style={{ padding: 15, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.62)" }}>
            <h4 style={{ color: theme.ink, margin: 0 }}>Claims included</h4>
            <ul className="eeo-list">
              {included.map((claim) => <li key={claim.id}>{claim.id}: {claim.title}</li>)}
            </ul>
          </div>
          <div style={{ padding: 15, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.62)" }}>
            <h4 style={{ color: theme.ink, margin: 0 }}>Claims withheld</h4>
            <p style={{ color: theme.text, lineHeight: 1.65, margin: "10px 0 0" }}>
              {releaseManifest.withheldClaimIds.length ? releaseManifest.withheldClaimIds.join(", ") : "None in this low-exposure prototype release."}
            </p>
          </div>
          <div style={{ padding: 15, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.62)" }}>
            <h4 style={{ color: theme.ink, margin: 0 }}>Known limitations</h4>
            <ul className="eeo-list">
              {releaseManifest.publicLimitations.map((limit) => <li key={limit}>{limit}</li>)}
            </ul>
          </div>
          <div style={{ padding: 15, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.62)" }}>
            <h4 style={{ color: theme.ink, margin: 0 }}>Approvals</h4>
            <ul className="eeo-list">
              {releaseManifest.approvedBy.map((approval) => <li key={approval}>{approval}</li>)}
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}

function MethodsAndSafeguards() {
  const noPublish = [
    "Sensitive community-submitted data without consent.",
    "Sacred-site information.",
    "Exact coordinates of vulnerable ecological sites.",
    "Whistleblower-identifying information.",
    "Unverified allegations against identifiable persons.",
    "Sensitive data that could increase risk to local communities, workers, Indigenous peoples, or endangered species.",
  ];

  return (
    <section id="methods" className="eeo-shell eeo-anchor" style={{ padding: "18px 0 42px" }}>
      <SectionTitle
        eyebrow="Methods and safeguards"
        title="Careful public evidence, not overclaiming."
        body="The prototype distinguishes evidence types and legal postures. It does not treat production data, trade data, ownership data, labor-risk data, ecological data, or media reports as interchangeable forms of proof."
      />
      <div className="eeo-card-grid">
        <Card style={{ padding: 20 }}>
          <h3 style={{ color: theme.ink, margin: 0 }}>Claim posture rule</h3>
          <p style={{ color: theme.text, lineHeight: 1.65 }}>
            Every claim should distinguish whether it is a factual observation, methodological limit, risk indicator, analytical inference, normative concern, or not a legal finding.
          </p>
          <p style={{ color: theme.muted, lineHeight: 1.65, marginBottom: 0 }}>
            The prototype does not make legal findings unless explicitly supported by authoritative legal or regulatory sources.
          </p>
        </Card>
        <Card id="safeguards" className="eeo-anchor" style={{ padding: 20 }}>
          <h3 style={{ color: theme.ink, margin: 0 }}>Exposure ethics</h3>
          <p style={{ color: theme.text, lineHeight: 1.65 }}>
            Universal knowledge does not require universal exposure. The chain must be made visible without making vulnerable people, places, species, or knowledge more vulnerable.
          </p>
          <ul className="eeo-list">
            {noPublish.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Card>
      </div>
    </section>
  );
}

function CorrectionRoute() {
  const categories = [
    "Factual correction",
    "Source update",
    "Right of reply",
    "Harm-risk restriction request",
    "Indigenous or community-sensitive review",
    "Defamation or legal concern",
    "Methodological dispute",
    "Data freshness concern",
    "Withdrawal request",
  ];

  return (
    <section id="corrections" className="eeo-shell eeo-anchor" style={{ padding: "18px 0 48px" }}>
      <SectionTitle
        eyebrow="Correction route"
        title="Challenge, correct, restrict, or reply."
        body="The correction route turns the Observatory from a publication surface into an accountable evidence institution."
      />
      <Card style={{ padding: 22 }}>
        <div className="eeo-card-grid">
          {categories.map((category) => (
            <div key={category} style={{ padding: 14, border: `1px solid ${theme.border}`, borderRadius: 16, background: "rgba(255,255,255,.62)" }}>
              <strong style={{ color: theme.text }}>{category}</strong>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, padding: 16, borderRadius: 16, background: "rgba(224,241,243,.66)", border: `1px solid #B8DDE1`, color: theme.text, lineHeight: 1.65 }}>
          In a production system, this section should route to intake forms with claim ID, evidence ID, contact preference, safety concerns, supporting documents, publication restriction request, and right-of-reply status.
        </div>
      </Card>
    </section>
  );
}

// -----------------------------------------------------------------------------
// SAFE MAP + LIMITED DASHBOARD
// -----------------------------------------------------------------------------

function cardTokens(metric, signals) {
  const value = clamp(signals[metric.valueKey]);
  const isPositive = metric.id === "restoration" || metric.id === "confidence";

  if (isPositive) {
    if (value >= 75) return { label: "strong", accent: theme.green, bg: "rgba(223,243,231,.72)", border: "#A9DDBD", shadow: "rgba(46,139,87,.16)" };
    if (value >= 45) return { label: "partial", accent: theme.gold, bg: "rgba(243,228,184,.62)", border: "#E0C875", shadow: "rgba(184,137,40,.14)" };
    return { label: "weak", accent: theme.clay, bg: "rgba(240,217,201,.58)", border: "#DDB39A", shadow: "rgba(156,91,54,.14)" };
  }

  if (value >= 70) return { label: "high", accent: theme.danger, bg: "rgba(244,218,213,.66)", border: "#E2AFA6", shadow: "rgba(139,58,47,.14)" };
  if (value >= 45) return { label: "watch", accent: theme.gold, bg: "rgba(243,228,184,.62)", border: "#E0C875", shadow: "rgba(184,137,40,.14)" };
  return { label: "lower", accent: theme.green, bg: "rgba(223,243,231,.72)", border: "#A9DDBD", shadow: "rgba(46,139,87,.13)" };
}

function SignalCard({ metric, signals }) {
  const value = clamp(signals[metric.valueKey]);
  const tokens = cardTokens(metric, signals);
  return (
    <article style={{ background: tokens.bg, border: `1px solid ${tokens.border}`, borderRadius: 20, padding: 18, boxShadow: `0 14px 38px ${tokens.shadow}`, minHeight: 205, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
          <div>
            <div style={{ color: theme.muted, fontSize: 12, fontWeight: 850, letterSpacing: 1, textTransform: "uppercase" }}>{metric.domain}</div>
            <h3 style={{ margin: "6px 0 0", color: theme.ink, fontSize: 19 }}>{metric.label}</h3>
          </div>
          <div aria-label={`${metric.label} value ${value}`} style={{ color: "white", background: tokens.accent, minWidth: 50, height: 50, borderRadius: 16, display: "grid", placeItems: "center", fontWeight: 950, boxShadow: `0 10px 24px ${tokens.shadow}` }}>{value}</div>
        </div>
        <p style={{ color: theme.text, lineHeight: 1.62, margin: "14px 0 0", fontSize: 14 }}>{metric.description}</p>
      </div>
      <div>
        <div style={{ marginTop: 16, height: 9, background: "rgba(255,255,255,.7)", borderRadius: 999, overflow: "hidden", border: `1px solid ${tokens.border}` }}>
          <div style={{ width: `${value}%`, height: "100%", background: tokens.accent, borderRadius: 999, transition: "width .25s ease" }} />
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "flex-start", color: tokens.accent, fontSize: 12, lineHeight: 1.45, fontWeight: 760 }}>
          <Icons.warning size={15} />
          <span>{metric.caution}</span>
        </div>
      </div>
    </article>
  );
}

function CorridorMap({ signals }) {
  const ecology = clamp(signals.ecologyStress);
  const water = clamp(signals.waterStress);
  const uncertainty = clamp(signals.uncertainty);
  const restoration = clamp(signals.restorationPotential);
  const confidence = clamp(signals.evidenceConfidence);

  const ecologyTone = cardTokens(corridorMetrics[0], signals);
  const waterTone = cardTokens(corridorMetrics[1], signals);
  const uncertaintyTone = cardTokens(corridorMetrics[2], signals);
  const restorationTone = cardTokens(corridorMetrics[3], signals);
  const confidenceToneValue = cardTokens(corridorMetrics[4], signals);

  const hazeOpacity = 0.08 + uncertainty / 100 * 0.28;
  const routeOpacity = 0.42 + confidence / 100 * 0.42;
  const waterStroke = 5 + water / 100 * 5;
  const ecoRadius = 34 + ecology / 100 * 28;
  const restorationRadius = 28 + restoration / 100 * 34;

  return (
    <Card style={{ overflow: "hidden" }}>
      <div style={{ padding: "18px 20px", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div>
          <div style={{ color: theme.gold, fontWeight: 900, letterSpacing: 1.1, textTransform: "uppercase", fontSize: 12 }}>Safe corridor map</div>
          <h3 style={{ margin: "5px 0 0", color: theme.ink, fontSize: 22 }}>Safe-resolution corridor overview</h3>
        </div>
        <div className="eeo-pill" style={{ background: "rgba(255,255,255,.8)", color: theme.primaryDark, border: `1px solid ${theme.border}` }}>
          <Icons.map size={16} /> generalized geometry
        </div>
      </div>
      <div className="eeo-map-wrap" aria-label="Data-reactive safe-resolution corridor map">
        <svg className="eeo-map-svg" viewBox="0 0 920 520" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Generalized safe-resolution corridor map with illustrative ecological, water, uncertainty, restoration, and evidence markers">
          <defs>
            <linearGradient id="map-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E7F6FA" />
              <stop offset="0.48" stopColor="#EAF6EF" />
              <stop offset="1" stopColor="#DDEFD9" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0F2F33" floodOpacity="0.12" />
            </filter>
          </defs>
          <rect x="0" y="0" width="920" height="520" fill="url(#map-bg)" />
          <path d="M80 380 C180 300 235 350 320 250 C390 170 480 190 560 135 C650 72 760 98 850 48" fill="none" stroke={waterTone.accent} strokeWidth={waterStroke} strokeLinecap="round" opacity="0.5" />
          <path d="M60 320 C160 280 230 245 300 260 C380 278 440 235 520 220 C620 198 710 230 860 176" fill="none" stroke={theme.primary} strokeWidth="3" strokeDasharray="9 12" opacity={routeOpacity} />
          <path d="M76 410 C190 410 285 360 365 390 C470 428 545 352 650 378 C735 397 810 340 900 360" fill="none" stroke={theme.greenDark} strokeWidth="3" opacity="0.22" />

          <circle cx="245" cy="278" r={ecoRadius} fill={ecologyTone.accent} opacity="0.16" />
          <circle cx="245" cy="278" r="9" fill={ecologyTone.accent} filter="url(#softShadow)" />
          <text x="245" y="242" textAnchor="middle" className="eeo-map-label">Ecology signal</text>

          <circle cx="430" cy="235" r={24 + water / 100 * 22} fill={waterTone.accent} opacity="0.17" />
          <circle cx="430" cy="235" r="9" fill={waterTone.accent} filter="url(#softShadow)" />
          <text x="430" y="205" textAnchor="middle" className="eeo-map-label">Water pressure</text>

          <circle cx="600" cy="205" r={28 + uncertainty / 100 * 24} fill={uncertaintyTone.accent} opacity="0.13" />
          <circle cx="600" cy="205" r="9" fill={uncertaintyTone.accent} filter="url(#softShadow)" />
          <text x="600" y="174" textAnchor="middle" className="eeo-map-label">Uncertainty</text>

          <circle cx="720" cy="276" r={restorationRadius} fill={restorationTone.accent} opacity="0.14" />
          <circle cx="720" cy="276" r="9" fill={restorationTone.accent} filter="url(#softShadow)" />
          <text x="720" y="240" textAnchor="middle" className="eeo-map-label">Restoration</text>

          <circle cx="350" cy="335" r={22 + confidence / 100 * 18} fill={confidenceToneValue.accent} opacity="0.14" />
          <circle cx="350" cy="335" r="9" fill={confidenceToneValue.accent} filter="url(#softShadow)" />
          <text x="350" y="374" textAnchor="middle" className="eeo-map-label">Evidence</text>

          <rect x="0" y="0" width="920" height="520" fill="#FFFFFF" opacity={hazeOpacity} />
          <g opacity="0.22">
            {Array.from({ length: 11 }).map((_, i) => (
              <path key={i} d={`M${-40 + i * 92} 520 C${60 + i * 92} 410 ${20 + i * 92} 270 ${130 + i * 92} 0`} fill="none" stroke="#1F6F78" strokeWidth="1" />
            ))}
          </g>
        </svg>
        <div className="eeo-map-caption">
          <Icons.shield size={18} />
          <span><strong>Map safety:</strong> this safe-resolution corridor overview generalizes or withholds exact sensitive coordinates, community reports, sacred sites, vulnerable ecological locations, and exploitable deposits.</span>
        </div>
      </div>
    </Card>
  );
}

function LimitedDashboard({ signals }) {
  return (
    <section className="eeo-shell" style={{ padding: "18px 0 44px" }}>
      <SectionTitle
        eyebrow="Limited dashboard"
        title="Atmospheric signals remain secondary to evidence."
        body="The existing brand’s atmospheric, data-reactive layer is retained, but it is now explicitly framed as illustrative signal context rather than proof, score, or legal conclusion."
      />
      <div className="eeo-dashboard-grid">
        <CorridorMap signals={signals} />
        <div className="eeo-card-grid" style={{ gridTemplateColumns: "1fr", gap: 14 }}>
          {corridorMetrics.map((metric) => <SignalCard key={metric.id} metric={metric} signals={signals} />)}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// FOOTER + DEV QUALITY
// -----------------------------------------------------------------------------

function PublicGuidanceSection() {
  const items = [
    { title: "Use for public inquiry", body: "Use these signals and claims to ask better questions about governance, stewardship, labor, revenue, and disclosure gaps." },
    { title: "Do not use as a verdict", body: "This profile does not determine legal responsibility, certify supply chains, trace consumer products, or rank countries, firms, or communities." },
    { title: "Inspect the evidence", body: "Claims should be read with confidence labels, source notes, evidence roles, disclosure tiers, and limitations." },
    { title: "Challenge the record", body: "Affected parties should be able to submit factual corrections, right-of-reply material, or exposure concerns." },
  ];

  return (
    <section className="eeo-shell" style={{ padding: "8px 0 40px" }}>
      <SectionTitle eyebrow="How to read this prototype" title="Evidence for inquiry, not a verdict." body="The Observatory makes public evidence easier to inspect while preserving uncertainty, disagreement, and disclosure limits." />
      <div className="eeo-card-grid">
        {items.map((item) => (
          <Card key={item.title} style={{ padding: 18 }}>
            <h3 style={{ color: theme.text, margin: "0 0 8px", fontSize: 18 }}>{item.title}</h3>
            <p style={{ color: theme.muted, lineHeight: 1.65, margin: 0 }}>{item.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ marginTop: 30, background: "rgba(255,255,255,0.60)", borderTop: `1px solid ${theme.border}` }}>
      <div className="eeo-shell" style={{ padding: "22px 0", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", color: theme.muted, fontSize: 13 }}>
        <span>© 2026 Earth Endowment Observatory</span>
        <span>{PRODUCT_TITLE} · Public evidence is source-labeled, uncertainty-aware, and disclosure-limited.</span>
      </div>
    </footer>
  );
}

function DevQualityPanel({ tests }) {
  const show = false;
  if (!show) return null;
  return (
    <div className="eeo-shell" style={{ padding: 20, background: "white", border: `1px solid ${theme.border}`, borderRadius: 16 }}>
      <h3 style={{ marginTop: 0 }}>Self-tests</h3>
      {tests.map((test) => <div key={test.name}>{test.pass ? "✅" : "❌"} {test.name}</div>)}
    </div>
  );
}

// -----------------------------------------------------------------------------
// APP
// -----------------------------------------------------------------------------

export default function App() {
  const [ecologyStress] = useState(defaultSignals.ecologyStress);
  const [waterStress] = useState(defaultSignals.waterStress);
  const [uncertainty] = useState(defaultSignals.uncertainty);
  const [restorationPotential] = useState(defaultSignals.restorationPotential);
  const [evidenceConfidence] = useState(defaultSignals.evidenceConfidence);

  const signalValues = { ecologyStress, waterStress, uncertainty, restorationPotential, evidenceConfidence };
  const atmosphere = useMemo(
    () => computeAtmosphere(signalValues),
    [ecologyStress, waterStress, uncertainty, restorationPotential, evidenceConfidence]
  );
  const tests = runSelfTests(signalValues, atmosphere);

  return (
    <div className="eeo-app">
      <AppStyles atmosphere={atmosphere} />
      <AtmosphericBackground />
      <Header />
      <main>
        <Hero signals={signalValues} />
        <DossierSection />
        <EvidenceLedger />
        <CorridorChain />
        <ReleaseManifestSection />
        <LimitedDashboard signals={signalValues} />
        <MethodsAndSafeguards />
        <CorrectionRoute />
        <PublicGuidanceSection />
      </main>
      <DevQualityPanel tests={tests} />
      <Footer />
    </div>
  );
}

export { App as DataReactiveAtmosphericApp };
