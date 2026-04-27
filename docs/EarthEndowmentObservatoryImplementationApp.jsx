/**
 * Earth Endowment Observatory — implementation-comprehensive one-file app (no lucide dep; self-contained icons).
 * For the smaller corridor handoff snapshot see ./eeo_one_file_corridor_app.jsx; for the shipping UI see ../components/EarthEndowmentObservatoryOneFileApp.tsx.
 */
import React, { useMemo, useState } from "react";

// Self-contained icon system. Avoids external icon packages/CDN fetches in sandboxed builds.
function makeIcon(paths, fallbackLabel = "custom-icon") {
  const validPaths = Array.isArray(paths)
    ? paths.filter((path) => typeof path === "string" && path.trim().length > 0)
    : [];

  const safePaths = validPaths.length > 0 ? validPaths : ["M12 2v20", "M2 12h20"];

  return function Icon({ className = "h-4 w-4", title, ...props }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden={title ? undefined : "true"}
        role={title ? "img" : undefined}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {safePaths.map((d, i) => (
          <path key={`${fallbackLabel}-${i}`} d={d} />
        ))}
      </svg>
    );
  };
}

const AlertTriangle = makeIcon(["M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z", "M12 9v4", "M12 17h.01"]);
const Archive = makeIcon(["M3 4h18v4H3z", "M5 8v12h14V8", "M9 12h6"]);
const ArrowRight = makeIcon(["M5 12h14", "M13 6l6 6-6 6"]);
const BadgeCheck = makeIcon(["M12 2l2.4 2.1 3.2-.2.8 3.1 2.7 1.7-1.4 2.9 1.4 2.9-2.7 1.7-.8 3.1-3.2-.2L12 22l-2.4-2.1-3.2.2-.8-3.1-2.7-1.7 1.4-2.9-1.4-2.9 2.7-1.7.8-3.1 3.2.2L12 2Z", "M8.5 12.5l2.2 2.2 4.8-5"]);
const BookOpen = makeIcon(["M2 5.5A3.5 3.5 0 0 1 5.5 2H12v18H5.5A3.5 3.5 0 0 0 2 23V5.5Z", "M22 5.5A3.5 3.5 0 0 0 18.5 2H12v18h6.5A3.5 3.5 0 0 1 22 23V5.5Z"]);
const CheckCircle2 = makeIcon(["M21 12a9 9 0 1 1-9-9", "M9 12l2 2 5-6"]);
const ChevronRight = makeIcon(["M9 18l6-6-6-6"]);
const ClipboardCheck = makeIcon(["M9 5h6", "M9 3h6v4H9z", "M5 5h3", "M16 5h3", "M6 5v16h12V5", "M8.5 13l2 2 4-5"]);
const Code2 = makeIcon(["M16 18l6-6-6-6", "M8 6l-6 6 6 6"]);
const Database = makeIcon(["M4 6c0-2 16-2 16 0s-16 2-16 0", "M4 6v6c0 2 16 2 16 0V6", "M4 12v6c0 2 16 2 16 0v-6"]);
const Eye = makeIcon(["M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z", "M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"]);
const FileSearch = makeIcon(["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z", "M14 2v6h6", "M10.5 15.5 9 14", "M11 10a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"]);
const Filter = makeIcon(["M3 5h18", "M6 12h12", "M10 19h4"]);
const Fingerprint = makeIcon(["M12 11c0 4-2 6-2 9", "M8 11a4 4 0 0 1 8 0c0 5-2 7-2 10", "M6 15c.5-2 1-4 1-4a5 5 0 0 1 10 0", "M4 12a8 8 0 0 1 16 0"]);
const GitBranch = makeIcon(["M6 3v12", "M18 3v4a4 4 0 0 1-4 4H6", "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"]);
const Globe2 = makeIcon(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M2 12h20", "M12 2c3 3 3 17 0 20", "M12 2c-3 3-3 17 0 20"]);
const Gavel = makeIcon(["M14 13 7 6", "M9 4l7 7", "M5 8l7 7", "M2 21h9", "M19 14l-5 5"]);
const KeyRound = makeIcon(["M21 2l-2 2", "M15 8l4-4", "M7.5 14.5A5 5 0 1 1 10 17l-2 2H5v3H2v-3l5.5-4.5Z"]);
const Landmark = makeIcon(["M3 21h18", "M5 10h14", "M6 10v8", "M10 10v8", "M14 10v8", "M18 10v8", "M12 3 4 8h16l-8-5Z"]);
const Layers3 = makeIcon(["M12 2 2 7l10 5 10-5-10-5Z", "M2 12l10 5 10-5", "M2 17l10 5 10-5"]);
const Lock = makeIcon(["M6 10V8a6 6 0 0 1 12 0v2", "M5 10h14v12H5z"]);
const Map = makeIcon(["M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z", "M9 3v15", "M15 6v15"]);
const MessageSquareWarning = makeIcon(["M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z", "M12 7v4", "M12 15h.01"]);
const Network = makeIcon(["M6 6h.01", "M18 6h.01", "M12 18h.01", "M7 7l4 9", "M17 7l-4 9", "M8 6h8"]);
const PackageCheck = makeIcon(["M21 8l-9-5-9 5 9 5 9-5Z", "M3 8v8l9 5 9-5V8", "M9 16l2 2 4-5"]);
const Route = makeIcon(["M4 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z", "M20 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z", "M6 7h7a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8h12"]);
const ScrollText = makeIcon(["M8 21h8", "M12 17v4", "M6 3h12v14H6z", "M9 7h6", "M9 11h6"]);
const Search = makeIcon(["M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z", "M21 21l-4.3-4.3"]);
const ShieldCheck = makeIcon(["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", "M9 12l2 2 4-5"]);
const Table2 = makeIcon(["M3 5h18v14H3z", "M3 10h18", "M9 5v14", "M15 5v14"]);
const TerminalSquare = makeIcon(["M3 4h18v16H3z", "M7 9l3 3-3 3", "M13 15h4"]);
const TestTube2 = makeIcon(["M9 2h6", "M10 2v6l-5 9a3 3 0 0 0 3 5h8a3 3 0 0 0 3-5l-5-9V2", "M8 16h8"]);
const UsersRound = makeIcon(["M16 21v-2a4 4 0 0 0-8 0v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M22 21v-2a4 4 0 0 0-3-3.9", "M16 3.1a4 4 0 0 1 0 7.8"]);
const Workflow = makeIcon(["M3 6h6v6H3z", "M15 12h6v6h-6z", "M9 9h3a3 3 0 0 1 3 3", "M12 15H9a3 3 0 0 1-3-3"]);
const XCircle = makeIcon(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M15 9l-6 6", "M9 9l6 6"]);

/**
 * Earth Endowment Observatory — Implementation-Comprehensive One-File App
 * ---------------------------------------------------------------------
 * Purpose:
 * A single React file that acts as: product prototype, implementation blueprint,
 * schema contract, release workflow reference, security checklist, and build handoff.
 *
 * Canonical posture:
 * - Controlled evidence product first.
 * - Limited corridor dashboard second.
 * - Broader knowledge commons only after trust is earned.
 *
 * This file is intentionally self-contained for founder demos, design critique,
 * engineering planning, AI-assisted code generation, and implementation review.
 */

// -----------------------------------------------------------------------------
// 1. CANONICAL ENUMS AND DATA CONTRACTS
// -----------------------------------------------------------------------------

const DisclosureTiers = [
  "tier_0_open",
  "tier_1_contextual_public",
  "tier_2_aggregated",
  "tier_3_verified_access",
  "tier_4_community_governed",
  "tier_5_suppressed",
];

const ConfidenceLabels = [
  "verified",
  "official",
  "modeled",
  "estimated",
  "self_reported",
  "third_party_reported",
  "community_reported",
  "disputed",
  "restricted",
  "outdated",
  "unknown",
];

const ClaimTypes = ["observed", "official", "modeled", "inferred", "alleged", "disputed", "confidential", "withdrawn"];
const EvidenceLayers = ["factual", "analytical", "normative", "legal"];
const ReviewStatuses = ["draft", "in_review", "approved_restricted", "approved_public", "deferred", "rejected", "superseded", "withdrawn"];
const LegalPostures = ["no_legal_claim", "public_record_description", "allegation_by_source", "finding_by_authority", "disputed_legal_status", "requires_legal_review"];
const GranularityClasses = ["site", "facility", "corridor", "district", "province", "national", "regional", "global", "unknown"];
const PublicationModes = ["exact_geometry_public", "generalized_geometry_public", "aggregated", "blurred_or_masked", "delayed_release", "restricted_only", "metadata_only", "do_not_collect", "do_not_publish"];

const roles = [
  "anonymous_public_user",
  "correction_submitter",
  "researcher",
  "data_steward",
  "methods_reviewer",
  "legal_reviewer",
  "safeguards_reviewer",
  "exposure_reviewer",
  "labor_reviewer",
  "ecological_reviewer",
  "editor",
  "release_owner",
  "administrator",
];

const appRoutes = [
  { path: "/", surface: "public", purpose: "Institutional identity, doctrine, pilot status" },
  { path: "/pilot", surface: "public", purpose: "Pilot overview and non-claims" },
  { path: "/pilot/evidence-dossier", surface: "public", purpose: "Narrative evidence dossier" },
  { path: "/pilot/evidence-ledger", surface: "public", purpose: "Inspectable public claims" },
  { path: "/pilot/governance-profile", surface: "public", purpose: "Jurisdiction, laws, concessions, public authority" },
  { path: "/pilot/value-chain", surface: "public", purpose: "Extraction, processing, trade-flow context" },
  { path: "/pilot/labor-ecology-revenue", surface: "public", purpose: "Indicator cards, no score" },
  { path: "/pilot/methods-and-limits", surface: "public", purpose: "Sources, confidence taxonomy, limitations" },
  { path: "/pilot/safeguards", surface: "public", purpose: "Suppressed, aggregated, restricted, not-collected data" },
  { path: "/pilot/corrections", surface: "public", purpose: "Correction, right-of-reply, exposure concern intake" },
  { path: "/workspace/sources", surface: "restricted", purpose: "Source registry CRUD" },
  { path: "/workspace/licenses", surface: "restricted", purpose: "License and use-basis review" },
  { path: "/workspace/evidence", surface: "restricted", purpose: "Private evidence vault metadata" },
  { path: "/workspace/entities", surface: "restricted", purpose: "Entity registry" },
  { path: "/workspace/entity-resolution", surface: "restricted", purpose: "Alias, identifier, match review" },
  { path: "/workspace/claims", surface: "restricted", purpose: "Claim drafting and validation" },
  { path: "/workspace/review", surface: "restricted", purpose: "Method, legal, safeguards, exposure review queues" },
  { path: "/workspace/right-of-reply", surface: "restricted", purpose: "Named actor notice and response" },
  { path: "/workspace/releases", surface: "restricted", purpose: "Release assembly and manifest signing" },
  { path: "/workspace/audit", surface: "restricted", purpose: "Sensitive action trail" },
];

const apiContracts = [
  { method: "GET", path: "/api/public/released-claims", access: "public", returns: "Released claims only; no raw restricted tables" },
  { method: "GET", path: "/api/public/released-sources", access: "public", returns: "Released source registry entries" },
  { method: "GET", path: "/api/public/release-manifest/:slug", access: "public", returns: "Signed manifest and release metadata" },
  { method: "POST", path: "/api/corrections", access: "public intake", returns: "Correction receipt; no internal records disclosed" },
  { method: "POST", path: "/api/workspace/upload-evidence", access: "data steward", returns: "Private evidence object metadata" },
  { method: "POST", path: "/api/workspace/claims", access: "researcher/data steward", returns: "Draft claim" },
  { method: "POST", path: "/api/workspace/review-task", access: "reviewer roles", returns: "Review decision" },
  { method: "POST", path: "/api/workspace/release", access: "release owner", returns: "Release readiness result and manifest" },
];

const supabaseTables = [
  { schema: "core", table: "sources", purpose: "Canonical source registry" },
  { schema: "core", table: "source_licenses", purpose: "License, use basis, redistribution rules" },
  { schema: "core", table: "evidence_objects", purpose: "Private storage metadata, hashes, bucket paths" },
  { schema: "core", table: "entities", purpose: "Endowment, place, jurisdiction, operator, facility, source institution" },
  { schema: "core", table: "entity_aliases", purpose: "Alternative names and historical names" },
  { schema: "core", table: "entity_identifiers", purpose: "Registry IDs, concession IDs, LEIs, company numbers" },
  { schema: "core", table: "places", purpose: "PostGIS spatial units and masking rules" },
  { schema: "core", table: "map_layers", purpose: "Map safety, publication mode, masking, downloads" },
  { schema: "core", table: "claims", purpose: "Core epistemic object" },
  { schema: "core", table: "leverage_pathways", purpose: "Responsible-use explanation" },
  { schema: "core", table: "corrections", purpose: "Public correction and challenge intake" },
  { schema: "review", table: "review_tasks", purpose: "Formal blocking/nonblocking review tasks" },
  { schema: "review", table: "exposure_reviews", purpose: "Harm review for claims, maps, releases" },
  { schema: "review", table: "right_of_reply_requests", purpose: "Named actor due-process workflow" },
  { schema: "review", table: "release_manifests", purpose: "Signed public release record" },
  { schema: "review", table: "audit_events", purpose: "Sensitive action trail" },
  { schema: "analytics", table: "indicator_cards", purpose: "Evidence signals, not composite scores" },
  { schema: "public", table: "released_claims", purpose: "View only; filtered public release claims" },
  { schema: "public", table: "released_evidence_ledger", purpose: "View only; inspectable released ledger" },
];

const sampleSource = {
  id: "src_usgs_mcs_2026",
  name: "Mineral Commodity Summaries 2026",
  publisher: "U.S. Geological Survey",
  source_type: "official_statistics",
  jurisdiction: "United States / global reference",
  acquisition_path: "manual_public_download",
  update_cadence: "annual",
  method_summary: "Used for macro mineral production, reserve, and market context only.",
  known_limitations: "Macro-level source; not concession-level and not chain-of-custody evidence.",
  sensitivity_note: "Low sensitivity at macro level; avoid using to expose precise local deposits.",
  integration_status: "analytical_reference",
  last_ingestion_date: "2026-04-26",
  deprecation_status: "active",
};

const sampleClaim = {
  id: "EEO-CM-0003",
  subject_id: "entity_corridor_copper_cobalt_v1",
  predicate: "reported_trade_flow_suggests_pathway",
  object_id: "entity_downstream_processing_markets",
  scalar_value: null,
  value_type: "relationship",
  unit: null,
  place_id: "place_corridor_generalized_v1",
  jurisdiction_id: "jurisdiction_public_context_v1",
  temporal_start: "2023-01-01",
  temporal_end: "2025-12-31",
  corridor_id: "corridor_copper_cobalt_v1",
  source_id: "src_un_comtrade_public_api",
  source_license_id: "lic_un_comtrade_public_terms",
  source_locator: "HS-code query parameters retained in method note",
  source_date: "2026-04-26",
  collection_date: "2026-04-26",
  publication_date: null,
  derivation_type: "modeled",
  extraction_method: "HS-code comparison + mirror-data discrepancy review",
  method_version_id: "method_trade_flow_v0_1",
  claim_type: "modeled",
  evidence_layer: "analytical",
  confidence_label: "modeled",
  confidence_explanation: "Trade data can show reported flows but not mine-level physical traceability.",
  granularity_class: "national",
  legal_posture: "no_legal_claim",
  review_status: "in_review",
  disclosure_tier: "tier_1_contextual_public",
  harm_risk_flag: false,
  consent_required_flag: false,
  named_actor_risk_flag: false,
  map_exposure_risk_flag: false,
  right_of_reply_status: "not_required",
  publication_eligibility: false,
  release_id: null,
  stale_after_date: "2026-10-01",
};

const sampleReleaseManifest = {
  id: "rel_cm_corridor_v0_1",
  release_slug: "critical-minerals-corridor-v0-1",
  corridor_id: "corridor_copper_cobalt_v1",
  release_title: "Critical Minerals Corridor Evidence Dossier v0.1",
  release_status: "draft",
  signed_by: null,
  signed_at: null,
  method_note_path: "/pilot/methods-and-limits",
  correction_route_path: "/pilot/corrections",
  manifest_hash: null,
  required_checks: [
    "license_review_complete",
    "method_review_complete",
    "exposure_review_complete",
    "legal_review_complete_where_needed",
    "right_of_reply_complete_where_needed",
    "public_views_filter_restricted_material",
    "correction_route_live",
    "no_composite_score_present",
  ],
};

const claims = [
  {
    id: "EEO-CM-0001",
    layer: "Factual",
    type: "Official",
    confidence: "Official",
    tier: "Tier 1 · Contextual public",
    domain: "Endowment",
    claim:
      "Public mineral statistics identify copper and cobalt as economically significant critical minerals in the selected producing region.",
    source: "USGS Mineral Commodity Summary; national statistical releases",
    method: "Manual source extraction + source-date normalization",
    granularity: "National / corridor-level context",
    posture: "Public-record description",
    limitation:
      "Does not identify unpublished deposits, artisanal workings, or sensitive security coordinates.",
    status: "Approved for public release",
    stale: "2027-04-26",
  },
  {
    id: "EEO-CM-0002",
    layer: "Factual",
    type: "Official",
    confidence: "Official",
    tier: "Tier 1 · Contextual public",
    domain: "Governance",
    claim:
      "Public disclosures describe mining licenses, public authorities, and revenue-reporting obligations relevant to the selected corridor.",
    source: "EITI country disclosure; public legal and contract repositories",
    method: "Document indexing + concession/legal entity mapping",
    granularity: "Jurisdiction / concession-level where public",
    posture: "No legal finding",
    limitation:
      "Formal legal authority is not presented as proof of full legitimacy, consent, or public benefit.",
    status: "Legal reviewed",
    stale: "2026-12-31",
  },
  {
    id: "EEO-CM-0003",
    layer: "Analytical",
    type: "Modeled",
    confidence: "Modeled",
    tier: "Tier 1 · Contextual public",
    domain: "Trade",
    claim:
      "Reported trade data suggest commodity movement from producing jurisdictions toward downstream processing markets, but do not prove mine-level physical traceability.",
    source: "UN Comtrade; company disclosures where available",
    method: "HS-code comparison + mirror-data discrepancy review",
    granularity: "National / partner-country trade flow",
    posture: "Risk signal, not chain-of-custody proof",
    limitation:
      "Customs data does not establish that material from a specific site became a specific downstream product.",
    status: "Technical reviewed",
    stale: "2026-10-01",
  },
  {
    id: "EEO-CM-0004",
    layer: "Analytical",
    type: "Estimated",
    confidence: "Estimated",
    tier: "Tier 1 · Contextual public",
    domain: "Labor",
    claim:
      "Available labor statistics and due-diligence sources raise questions about wage context, occupational safety, informality, and coercion risk across the broader mineral chain.",
    source: "ILOSTAT; ILO standards; reputable labor-rights reports",
    method: "Sector-level indicator synthesis + PPP context note",
    granularity: "Sector / national-level proxy",
    posture: "Risk signal, not site-level labor finding",
    limitation:
      "Labor data may be national, sectoral, or modeled; worker-level identities are not collected or published.",
    status: "Labor review required before launch",
    stale: "2026-09-01",
  },
  {
    id: "EEO-CM-0005",
    layer: "Analytical",
    type: "Modeled",
    confidence: "Modeled",
    tier: "Tier 2 · Aggregated",
    domain: "Ecology",
    claim:
      "Remote-sensing and water-risk layers indicate ecological pressure signals near the corridor, including land disturbance and watershed stress indicators.",
    source: "Global Forest Watch; Aqueduct-style water risk; public environmental reports",
    method: "Spatial overlay + buffer analysis + method caveat",
    granularity: "Aggregated corridor-level",
    posture: "Proximity signal, not causation finding",
    limitation:
      "Spatial proximity does not prove causation; sensitive ecological locations are generalized or withheld.",
    status: "Exposure reviewed",
    stale: "2026-08-01",
  },
  {
    id: "EEO-CM-0006",
    layer: "Normative",
    type: "Inferred",
    confidence: "Estimated",
    tier: "Tier 1 · Contextual public",
    domain: "Public revenue",
    claim:
      "Disclosed royalties, taxes, or public payments raise a public-benefit question: whether endowment transformation becomes durable capability for producing communities and citizens.",
    source: "EITI disclosure; budget documents where available; company reports",
    method: "Revenue pathway synthesis + gap labeling",
    granularity: "National / subnational where public",
    posture: "Public-benefit question, not proof of fairness",
    limitation:
      "Disclosed revenue does not prove durable public benefit; budget-use evidence is separate.",
    status: "Editorial reviewed",
    stale: "2026-12-31",
  },
];

const buildSprints = [
  ["Sprint 0", "Canonical freeze", "Corridor selected, reviewers named, launch red lines approved."],
  ["Sprint 1", "Repo + deployment", "Next.js, Vercel, Supabase, CODEOWNERS, CI, ADRs."],
  ["Sprint 2", "Source/license/evidence", "Source registry, license review, evidence vault metadata, private buckets."],
  ["Sprint 3", "Claims + entities", "Entity registry, identifiers, aliases, claim drafting, confidence and legal posture fields."],
  ["Sprint 4", "Review control plane", "Review tasks, exposure reviews, map safety, right-of-reply, audit events."],
  ["Sprint 5", "Release machinery", "Release manifests, public released views, readiness checks, correction intake."],
  ["Sprint 6", "Evidence dossier", "Dossier, ledger, methods, safeguards, corrections."],
  ["Sprint 7", "Limited dashboard", "Safe map, governance, value-chain, indicator cards, no score."],
  ["Sprint 8", "Launch gate", "Full review run, license check, map safety, right-of-reply, signed manifest."],
];

const launchChecks = [
  ["Canonical doctrine frozen", true],
  ["One corridor selected and scoped", true],
  ["Release owner named", false],
  ["Methods reviewer named", false],
  ["Safeguards reviewer named", false],
  ["Legal reviewer named", false],
  ["Every public claim has source/license/date/method/confidence", true],
  ["Public views filter restricted material", true],
  ["Correction route live", true],
  ["Every public map layer has exposure review", false],
  ["Named high-impact actor right-of-reply complete", false],
  ["No score/ranking/certification present", true],
  ["Methods and limits note published", true],
  ["Release manifest signed", false],
];

function runSelfTests() {
  const tests = [
    {
      name: "sample claim uses known confidence label",
      pass: ConfidenceLabels.includes(sampleClaim.confidence_label),
    },
    {
      name: "sample claim uses known disclosure tier",
      pass: DisclosureTiers.includes(sampleClaim.disclosure_tier),
    },
    {
      name: "sample claim uses known claim type",
      pass: ClaimTypes.includes(sampleClaim.claim_type),
    },
    {
      name: "sample claim uses known evidence layer",
      pass: EvidenceLayers.includes(sampleClaim.evidence_layer),
    },
    {
      name: "sample claim uses known legal posture",
      pass: LegalPostures.includes(sampleClaim.legal_posture),
    },
    {
      name: "sample claim uses known review status",
      pass: ReviewStatuses.includes(sampleClaim.review_status),
    },
    {
      name: "public routes never include deferred atlas, scores, rankings, or certification",
      pass: !appRoutes.some((route) => ["/atlas", "/scores", "/rankings", "/certification"].includes(route.path)),
    },
    {
      name: "correction endpoint exists",
      pass: apiContracts.some((api) => api.method === "POST" && api.path === "/api/corrections"),
    },
    {
      name: "release manifest requires no composite score check",
      pass: sampleReleaseManifest.required_checks.includes("no_composite_score_present"),
    },
    {
      name: "all rendered claims have limitation notes",
      pass: claims.every((claim) => Boolean(claim.limitation && claim.limitation.length > 20)),
    },
  ];

  return tests.map((test) => ({ ...test, status: test.pass ? "pass" : "fail" }));
}

const selfTests = runSelfTests();

// Additional runtime sanity tests
function extraTests() {
  return [
    {
      name: "all claims have ids",
      pass: Array.isArray(claims) && claims.every((c) => typeof c.id === "string" && c.id.length > 0),
    },
    {
      name: "all API routes have method and path",
      pass: Array.isArray(apiContracts) && apiContracts.every((a) => a.method && a.path),
    },
    {
      name: "all tabs have ids",
      pass: Array.isArray(tabs) && tabs.every((t) => typeof t.id === "string"),
    },
    {
      name: "custom icon factory tolerates invalid input",
      pass: typeof makeIcon(undefined) === "function" && typeof makeIcon([undefined, "M1 1h2"]) === "function",
    },
    {
      name: "all launch checks are boolean tuples",
      pass: Array.isArray(launchChecks) && launchChecks.every((item) => Array.isArray(item) && typeof item[0] === "string" && typeof item[1] === "boolean"),
    },
  ].map((t) => ({ ...t, status: t.pass ? "pass" : "fail" }));
}

function getAllTests() {
  return [...selfTests, ...extraTests()];
}

const repositoryTree = `eeo-web/
  app/
    (public)/
      page.tsx
      pilot/evidence-dossier/page.tsx
      pilot/evidence-ledger/page.tsx
      pilot/governance-profile/page.tsx
      pilot/value-chain/page.tsx
      pilot/labor-ecology-revenue/page.tsx
      pilot/methods-and-limits/page.tsx
      pilot/safeguards/page.tsx
      pilot/corrections/page.tsx
    (workspace)/
      workspace/sources/page.tsx
      workspace/licenses/page.tsx
      workspace/evidence/page.tsx
      workspace/entities/page.tsx
      workspace/entity-resolution/page.tsx
      workspace/claims/page.tsx
      workspace/review/page.tsx
      workspace/exposure/page.tsx
      workspace/right-of-reply/page.tsx
      workspace/releases/page.tsx
      workspace/audit/page.tsx
    api/
      corrections/route.ts
      release/route.ts
      upload/route.ts
  components/
    evidence/ claims/ corridor/ maps/ review/ releases/ ui/ workspace/
  lib/
    supabase/ auth/ claims/ disclosure/ provenance/ review/ releases/ indicators/ entities/
  supabase/
    migrations/ seed.sql functions/
  docs/
    adr/ data-dictionary.md disclosure-policy.md evidence-standard.md
    map-safety-protocol.md right-of-reply-protocol.md review-workflow.md
    security-model.md ai-protocol.md runbook.md
  .github/
    workflows/ CODEOWNERS pull_request_template.md dependabot.yml`;

const migrationSketch = `create schema if not exists core;
create schema if not exists review;
create schema if not exists private;
create schema if not exists analytics;

create extension if not exists postgis;
create extension if not exists pgcrypto;

create type core.disclosure_tier as enum (
  'tier_0_open',
  'tier_1_contextual_public',
  'tier_2_aggregated',
  'tier_3_verified_access',
  'tier_4_community_governed',
  'tier_5_suppressed'
);

create type core.confidence_label as enum (
  'verified', 'official', 'modeled', 'estimated', 'self_reported',
  'third_party_reported', 'community_reported', 'disputed',
  'restricted', 'outdated', 'unknown'
);

create type core.review_status as enum (
  'draft', 'in_review', 'approved_restricted', 'approved_public',
  'deferred', 'rejected', 'superseded', 'withdrawn'
);

-- Next: sources, source_licenses, evidence_objects, entities,
-- entity_aliases, entity_identifiers, places, map_layers, claims,
-- review_tasks, exposure_reviews, right_of_reply_requests,
-- indicator_cards, leverage_pathways, release_manifests,
-- corrections, audit_events, and public released views.`;

const rlsPolicySketch = `-- Doctrine: public users read only released views.
-- UI guards are not sufficient; Supabase RLS is the boundary.

alter table core.claims enable row level security;
alter table core.sources enable row level security;
alter table review.release_manifests enable row level security;

-- Public reads should target public.released_claims, not core.claims.
-- Researchers can access assigned workspace objects.
-- Reviewers can access objects assigned to their role.
-- Release owners can assemble releases but cannot bypass blocking reviews.
-- Admins can manage configuration; sensitive actions are audited.
-- Service role keys never reach the browser.`;

const tabs = [
  { id: "home", label: "Home", icon: Globe2 },
  { id: "dossier", label: "Evidence Dossier", icon: ScrollText },
  { id: "dashboard", label: "Limited Dashboard", icon: Layers3 },
  { id: "ledger", label: "Evidence Ledger", icon: Database },
  { id: "implementation", label: "Implementation", icon: Code2 },
  { id: "schema", label: "Data Model", icon: Table2 },
  { id: "api", label: "API + Routes", icon: Route },
  { id: "security", label: "Security + RLS", icon: KeyRound },
  { id: "methods", label: "Methods + Limits", icon: BookOpen },
  { id: "safeguards", label: "Safeguards", icon: ShieldCheck },
  { id: "corrections", label: "Corrections", icon: MessageSquareWarning },
  { id: "workspace", label: "Review Workspace", icon: Workflow },
  { id: "launch", label: "Launch Gate", icon: PackageCheck },
];

function cls(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children, tone = "neutral", icon: Icon }) {
  const tones = {
    neutral: "border-stone-300 bg-stone-100 text-stone-700",
    blue: "border-blue-200 bg-blue-50 text-blue-900",
    green: "border-emerald-200 bg-emerald-50 text-emerald-900",
    copper: "border-orange-200 bg-orange-50 text-orange-900",
    red: "border-red-200 bg-red-50 text-red-900",
    gold: "border-yellow-200 bg-yellow-50 text-yellow-900",
    purple: "border-violet-200 bg-violet-50 text-violet-900",
    dark: "border-stone-700 bg-stone-950 text-stone-50",
  };
  return (
    <span className={cls("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium", tones[tone])}>
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return <div className={cls("rounded-3xl border border-stone-200 bg-white/80 shadow-sm backdrop-blur", className)}>{children}</div>;
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="mb-6">
      {eyebrow ? <div className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-stone-500">{eyebrow}</div> : null}
      <h2 className="max-w-5xl text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">{title}</h2>
      {children ? <p className="mt-3 max-w-4xl text-base leading-7 text-stone-600">{children}</p> : null}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">{label}</div>
      <div className="mt-1 leading-6 text-stone-700">{value}</div>
    </div>
  );
}

function CodeBlock({ code, title }) {
  return (
    <Card className="overflow-hidden bg-stone-950 text-stone-100">
      {title ? <div className="border-b border-white/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-stone-400">{title}</div> : null}
      <pre className="max-h-[520px] overflow-auto p-5 text-xs leading-6"><code>{code}</code></pre>
    </Card>
  );
}

function DataJson({ object, title }) {
  return <CodeBlock title={title} code={JSON.stringify(object, null, 2)} />;
}

function Chain() {
  const items = ["Endowment", "Jurisdiction", "Concession", "Operator", "Ownership", "Trade", "Labor", "Ecology", "Revenue", "Public benefit question"];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, idx) => (
        <React.Fragment key={item}>
          <span className="rounded-full border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-800">{item}</span>
          {idx < items.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-stone-400" /> : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function ShellHeader({ active, setActive }) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#F8F3E8]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <button onClick={() => setActive("home")} className="group flex items-center gap-3 text-left">
            <div className="relative grid h-12 w-12 place-items-center rounded-full border border-stone-900 bg-stone-950 text-[#EFE8D8] shadow-sm">
              <div className="absolute inset-2 rounded-full border border-[#C9A24D]/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#C9A24D] shadow-[0_0_0_5px_rgba(201,162,77,0.16)]" />
            </div>
            <div>
              <div className="font-serif text-xl font-semibold tracking-tight text-stone-950">Earth Endowment Observatory</div>
              <div className="text-xs text-stone-600">Implementation-comprehensive one-file app</div>
            </div>
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="dark" icon={ShieldCheck}>Governed visibility</Badge>
            <Badge tone="blue" icon={FileSearch}>Evidence product first</Badge>
            <Badge tone="copper" icon={AlertTriangle}>No scores in MVP</Badge>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cls(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
                active === id
                  ? "border-stone-950 bg-stone-950 text-white"
                  : "border-stone-300 bg-white/60 text-stone-700 hover:border-stone-500 hover:bg-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function ClaimCard({ claim, compact = false }) {
  const tone = claim.confidence === "Official" ? "blue" : claim.confidence === "Modeled" ? "copper" : claim.confidence === "Estimated" ? "gold" : "neutral";
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-stone-200 bg-stone-50/70 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono text-xs text-stone-500">{claim.id}</div>
            <div className="mt-1 font-semibold text-stone-950">{claim.domain}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={tone}>{claim.confidence}</Badge>
            <Badge tone="neutral">{claim.layer}</Badge>
            <Badge tone={claim.tier.includes("Tier 2") ? "copper" : "blue"}>{claim.tier}</Badge>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p className={cls("leading-7 text-stone-800", compact ? "text-sm" : "text-base")}>{claim.claim}</p>
        <div className="grid gap-3 text-sm md:grid-cols-2">
          <Meta label="Source" value={claim.source} />
          <Meta label="Method" value={claim.method} />
          <Meta label="Legal posture" value={claim.posture} />
          <Meta label="Granularity" value={claim.granularity} />
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
          <strong>Limit:</strong> {claim.limitation}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3 text-xs text-stone-500">
          <span>Status: {claim.status}</span>
          <span>Stale after: {claim.stale}</span>
        </div>
      </div>
    </Card>
  );
}

function Principle({ icon: Icon, title, body }) {
  return (
    <Card className="p-6">
      <div className="mb-4 inline-flex rounded-2xl bg-stone-950 p-3 text-white"><Icon className="h-5 w-5" /></div>
      <h3 className="text-lg font-semibold text-stone-950">{title}</h3>
      <p className="mt-2 leading-7 text-stone-600">{body}</p>
    </Card>
  );
}

function Home({ setActive }) {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-950 text-white shadow-xl">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full border border-[#C9A24D]/60" />
          <div className="absolute right-[-5%] top-[10%] h-[32rem] w-[32rem] rounded-full border border-[#25465F]" />
          <div className="absolute bottom-[-20%] left-[28%] h-[28rem] w-[28rem] rounded-full border border-[#B66A3C]" />
        </div>
        <div className="relative grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12 lg:p-16">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.22em] text-stone-200">
              Canonical institutional, product, and web-app system
            </div>
            <h1 className="max-w-4xl font-serif text-5xl font-semibold tracking-tight md:text-7xl">
              See the source. Follow the value. Ship the evidence system.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-200">
              A one-file implementation blueprint for a governed civic intelligence product: public dossier, limited dashboard, evidence ledger, restricted review workspace, typed contracts, Supabase schema, API routes, RLS doctrine, release manifest, QA, and launch gate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setActive("implementation")} className="rounded-full bg-[#C9A24D] px-5 py-3 text-sm font-semibold text-stone-950 shadow-sm hover:brightness-105">
                Open implementation plan
              </button>
              <button onClick={() => setActive("schema")} className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                View data model
              </button>
              <button onClick={() => setActive("launch")} className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                Check launch gate
              </button>
            </div>
          </div>
          <Card className="bg-white/10 p-5 text-white ring-1 ring-white/10">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-full bg-[#B66A3C]/20 p-2"><GitBranch className="h-5 w-5 text-[#E8B08B]" /></div>
              <div>
                <div className="font-semibold">True MVP loop</div>
                <div className="text-xs text-stone-300">This is what must work first.</div>
              </div>
            </div>
            <div className="space-y-2">
              {["source", "license", "evidence", "claim", "entity resolution", "review", "exposure review", "right-of-reply", "release manifest", "public dossier", "correction route"].map((step, idx) => (
                <div key={step} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 font-mono text-xs">{idx + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Implementation posture" title="Comprehensive enough to build, narrow enough to govern.">
          This version keeps the product prototype visible while adding implementation-critical detail: contracts, tables, RLS doctrine, repository structure, API routes, review workflows, release readiness, and test strategy.
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          <Principle icon={Eye} title="Reveal the chain" body="Make endowment transformation visible from source to public-benefit question without claiming control." />
          <Principle icon={ShieldCheck} title="Protect the vulnerable" body="Tier, aggregate, suppress, or refuse data when publication could create harm." />
          <Principle icon={TerminalSquare} title="Build the loop" body="The MVP is the governed source-to-claim-to-release-to-correction loop, not a beautiful map." />
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Corridor hypothesis" title="Copper-cobalt critical-minerals corridor">
          The first pilot follows a narrowed endowment-to-economy path and proves that EEO can make strong claims inspectable while making unsafe exposure impossible.
        </SectionTitle>
        <Card className="p-6"><Chain /></Card>
      </section>
    </div>
  );
}

function Dossier() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Public product 01" title="Flagship corridor evidence dossier">
        Narrative-first, evidence-visible, uncertainty-labeled, map-supported. This is the first public product; the dashboard is secondary.
      </SectionTitle>
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <Card className="p-6">
          <div className="font-serif text-2xl font-semibold text-stone-950">What this pilot covers</div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
            <li>• One narrowed copper-cobalt producing corridor.</li>
            <li>• Public and partner-permitted evidence only.</li>
            <li>• Safe-resolution mapping and evidence cards.</li>
            <li>• Governance, ownership, trade, labor, ecology, revenue, and public-benefit questions.</li>
            <li>• Claims with source, method, confidence, legal posture, disclosure tier, and correction path.</li>
          </ul>
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-950">
            <strong>What it does not claim:</strong> no certification, no legal finding, no global score, no traceability proof, no public community-reporting system, no universal atlas.
          </div>
        </Card>
        <div className="space-y-4">{claims.slice(0, 3).map((claim) => <ClaimCard key={claim.id} claim={claim} compact />)}</div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Limited dashboard" title="Map-supported, not map-dominated">
        The interface makes users ask: what is known, how is it known, what is uncertain, what is withheld, and who can challenge it?
      </SectionTitle>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-stone-50 px-5 py-4">
            <div>
              <div className="font-semibold text-stone-950">Safe-resolution corridor map</div>
              <div className="text-xs text-stone-500">Public geometry is generalized until map-safety review approves detail.</div>
            </div>
            <Badge tone="copper" icon={Map}>Generalized geometry</Badge>
          </div>
          <div className="relative h-[460px] overflow-hidden bg-[#DED4BF]">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(17,17,15,.25) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
            <div className="absolute left-[10%] top-[18%] h-64 w-80 rotate-[-14deg] rounded-[45%] border-2 border-[#4B3728]/50 bg-[#4B3728]/5" />
            <div className="absolute right-[18%] top-[22%] h-72 w-56 rotate-[18deg] rounded-[45%] border-2 border-[#3F5A45]/50 bg-[#3F5A45]/5" />
            <div className="absolute bottom-[22%] left-[22%] h-2 w-[52%] rotate-[-5deg] rounded-full bg-[#B66A3C]/70" />
            <div className="absolute bottom-[29%] left-[31%] h-2 w-[40%] rotate-[10deg] rounded-full bg-[#25465F]/70" />
            {["Resource context", "Public authority", "Processing node", "Export flow", "Ecological signal"].map((label, i) => (
              <div key={label} className="absolute rounded-full border border-stone-900 bg-white px-3 py-2 text-xs font-semibold shadow" style={{ left: `${16 + i * 14}%`, top: `${22 + (i % 2) * 34}%` }}>
                {label}
              </div>
            ))}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-stone-300 bg-white/90 p-4 text-sm text-stone-700 shadow">
              <strong>Map safety notice:</strong> exact sensitive coordinates, artisanal mining locations, community reports, sacred sites, and vulnerable ecological locations are not displayed.
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          <ModuleCard title="Governance profile" icon={Landmark} items={["Jurisdiction and public authority", "License / concession records", "Contract availability", "Rights and sovereignty notes", "Disclosure gaps"]} />
          <ModuleCard title="Value-chain view" icon={Network} items={["Extraction context", "Processing pathway", "Reported trade flows", "Downstream hypothesis", "No traceability overclaim"]} />
          <ModuleCard title="Labor / ecology / revenue" icon={Layers3} items={["Indicator cards", "Misuse warnings", "No composite score", "Public-benefit questions", "Known unknowns"]} />
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ title, icon: Icon, items }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-stone-950 p-2 text-white"><Icon className="h-4 w-4" /></div>
        <h3 className="font-semibold text-stone-950">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-stone-600">
        {items.map((item) => <li key={item} className="flex gap-2"><ChevronRight className="mt-0.5 h-4 w-4 text-stone-400" />{item}</li>)}
      </ul>
    </Card>
  );
}

function Ledger() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => claims.filter((c) => JSON.stringify(c).toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Public credibility engine" title="Evidence Ledger">
        Inspectable claims, sources, methods, dates, confidence labels, legal posture, disclosure tiers, limitations, review status, and stale-after dates.
      </SectionTitle>
      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search claims, sources, domains, methods..." className="w-full rounded-full border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-stone-900" />
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-stone-700 hover:border-stone-900">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
      </Card>
      <div className="grid gap-4">{filtered.map((claim) => <ClaimCard key={claim.id} claim={claim} compact />)}</div>
    </div>
  );
}

function Implementation() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Build plan" title="Implementation-comprehensive structure">
        The prototype now includes the actual engineering surfaces the team needs: repository shape, sprint sequence, route plan, public/restricted separation, CI expectations, and deployment posture.
      </SectionTitle>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <h3 className="font-serif text-2xl font-semibold text-stone-950">Sprint sequence</h3>
          <div className="mt-5 space-y-3">
            {buildSprints.map(([sprint, title, done]) => (
              <div key={sprint} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="dark">{sprint}</Badge>
                  <span className="font-semibold text-stone-950">{title}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-600">{done}</p>
              </div>
            ))}
          </div>
        </Card>
        <CodeBlock title="Repository tree" code={repositoryTree} />
      </div>
    </div>
  );
}

function Schema() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Supabase data plane" title="Canonical tables, contracts, and sample records">
        Supabase owns the institutional data plane: Auth, Postgres, PostGIS, RLS, Storage, source registry, evidence vault metadata, claims, reviews, releases, corrections, and public released views.
      </SectionTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {supabaseTables.map((t) => (
          <Card key={`${t.schema}.${t.table}`} className="p-5">
            <Badge tone={t.schema === "public" ? "green" : t.schema === "review" ? "copper" : t.schema === "analytics" ? "purple" : "blue"}>{t.schema}</Badge>
            <h3 className="mt-3 font-mono text-sm font-semibold text-stone-950">{t.table}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">{t.purpose}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DataJson title="Sample source contract" object={sampleSource} />
        <DataJson title="Sample claim contract" object={sampleClaim} />
      </div>
      <DataJson title="Sample release manifest" object={sampleReleaseManifest} />
      <CodeBlock title="Initial migration sketch" code={migrationSketch} />
    </div>
  );
}

function ApiRoutes() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Interface contract" title="Routes, API endpoints, and app boundaries">
        Public pages query released views only. Restricted workspace routes handle drafting, review, evidence upload, entity resolution, right-of-reply, and release assembly.
      </SectionTitle>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="border-b border-stone-200 bg-stone-50 px-5 py-4 font-semibold">Route map</div>
          <div className="divide-y divide-stone-100">
            {appRoutes.map((r) => (
              <div key={r.path} className="grid gap-2 p-4 md:grid-cols-[0.55fr_0.45fr]">
                <div className="font-mono text-sm text-stone-950">{r.path}</div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-stone-600">
                  <Badge tone={r.surface === "public" ? "green" : "copper"}>{r.surface}</Badge>
                  <span>{r.purpose}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="border-b border-stone-200 bg-stone-50 px-5 py-4 font-semibold">API contracts</div>
          <div className="divide-y divide-stone-100">
            {apiContracts.map((api) => (
              <div key={`${api.method}-${api.path}`} className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={api.method === "GET" ? "green" : "blue"}>{api.method}</Badge>
                  <span className="font-mono text-sm text-stone-950">{api.path}</span>
                </div>
                <div className="mt-2 text-sm leading-6 text-stone-600"><strong>Access:</strong> {api.access}. <strong>Returns:</strong> {api.returns}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Security() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Security + trust architecture" title="RLS is the boundary. UI guards are not enough.">
        Anonymous users read only public released views. Restricted data stays behind role-aware policies, private buckets, review workflows, audit events, and environment separation.
      </SectionTitle>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <h3 className="font-serif text-2xl font-semibold text-stone-950">Role model</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {roles.map((role) => <Badge key={role} tone={role.includes("reviewer") ? "copper" : role.includes("administrator") || role.includes("release") ? "dark" : "blue"}>{role}</Badge>)}
          </div>
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-950">
            <strong>Secret rule:</strong> service role keys, source API tokens, private exports, raw evidence, partner data, and community submissions never enter GitHub or the browser.
          </div>
        </Card>
        <CodeBlock title="RLS doctrine sketch" code={rlsPolicySketch} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Principle icon={Lock} title="Private buckets" body="evidence-vault, restricted-review, right-of-reply-packets are private by default and logged." />
        <Principle icon={Eye} title="Public views" body="Public pages query released views, never raw canonical or restricted tables." />
        <Principle icon={GitBranch} title="GitHub governance" body="Branch protection, CODEOWNERS, CI, dependency review, secret scanning, and ADRs govern changes." />
      </div>
    </div>
  );
}

function Methods() {
  const guardrails = [
    ["Trade", "Reported trade flows do not prove physical chain-of-custody or verified origin."],
    ["Labor", "Labor data may be national, sectoral, or modeled rather than site-specific; informal work may be undercounted."],
    ["Public revenue", "Disclosed public revenue does not prove durable public benefit."],
    ["Ecology", "Spatial proximity does not prove causation without additional evidence."],
    ["Legal", "EEO makes no legal finding unless citing a competent authority’s finding."],
    ["AI", "AI may assist with code, drafts, and summarization; it may not make final publication, confidence, legal, or disclosure decisions."],
  ];
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Evidence standard" title="Strict in evidence, humble in claims">
        The public product separates factual, analytical, normative, and legal layers so users can inspect the difference between documentation, inference, public questions, and legal findings.
      </SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        {guardrails.map(([title, body]) => (
          <Card key={title} className="p-5">
            <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-stone-400">{title}</div>
            <p className="leading-7 text-stone-700">{body}</p>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <h3 className="font-serif text-2xl font-semibold text-stone-950">Required claim package</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {["source", "license", "date", "method", "claim type", "evidence layer", "confidence", "granularity", "legal posture", "disclosure tier", "stale-after date", "review status", "correction path"].map((item) => (
            <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-stone-600">{item}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Safeguards() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Tiered disclosure" title="Universal knowledge does not require universal exposure">
        Some evidence should be public. Some should be aggregated. Some should be restricted. Some should be community-governed. Some should be suppressed. Some should not be collected at all.
      </SectionTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          ["Tier 0", "Open", "Public display, API, citation, possible download.", "green"],
          ["Tier 1", "Contextual public", "Public with warnings, provenance, method notes, and caveats.", "blue"],
          ["Tier 2", "Aggregated", "Aggregate by geography, time, actor, or category.", "copper"],
          ["Tier 3", "Verified access", "Controlled access, purpose limits, logging, expiration.", "neutral"],
          ["Tier 4", "Community-governed", "Governed by consent protocol and authority-specific rules.", "gold"],
          ["Tier 5", "Suppressed", "Do not publish. Store only if necessary and protected, or do not retain.", "red"],
        ].map(([tier, title, body, tone]) => (
          <Card key={tier} className="p-5">
            <Badge tone={tone}>{tier}</Badge>
            <h3 className="mt-4 text-lg font-semibold text-stone-950">{title}</h3>
            <p className="mt-2 leading-7 text-stone-600">{body}</p>
          </Card>
        ))}
      </div>
      <Card className="border-red-200 bg-red-50 p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-red-950"><AlertTriangle className="h-5 w-5" /> Sensitive map defaults</h3>
        <p className="mt-3 leading-7 text-red-950">Presume sensitivity for sacred sites, indigenous or community-held knowledge, endangered species locations, vulnerable habitats, artisanal mining settlements, whistleblower or grievance locations, community reports, critical infrastructure, illegal extraction targets, and locations where publication could trigger retaliation, speculation, poaching, or land grabbing.</p>
      </Card>
    </div>
  );
}

function Corrections() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Challenge route" title="Correction, right-of-reply, and exposure concern intake">
        A public release is not complete unless affected parties can challenge factual accuracy, stale information, disclosure harm, confidence labels, identity conflation, legal misdescription, and community-rights violations.
      </SectionTitle>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-6">
          <h3 className="font-serif text-2xl font-semibold text-stone-950">Submit a challenge</h3>
          <div className="mt-5 space-y-4">
            <input aria-label="Name or institution" placeholder="Name or institution" className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900" />
            <input aria-label="Contact email" placeholder="Contact email" className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900" />
            <select aria-label="Correction type" className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900">
              <option>Factual correction</option>
              <option>Exposure concern</option>
              <option>Right-of-reply</option>
              <option>Outdated source</option>
              <option>Identity conflation</option>
              <option>Legal misdescription</option>
            </select>
            <textarea aria-label="Correction description" placeholder="Describe the issue, claim ID, source, or safety concern..." rows={6} className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900" />
            <button className="w-full rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-800">Submit for triage</button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-stone-950">Correction workflow</h3>
          <div className="mt-5 space-y-3">
            {["public challenge submitted", "triage", "safety check", "assigned reviewer", "claim revised / confirmed / withdrawn", "public correction note if accepted", "audit trail retained"].map((step, i) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-stone-950 font-mono text-xs text-white">{i + 1}</span>
                <span className="text-sm text-stone-700">{step}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Workspace() {
  const modules = [
    { title: "Source Registry", status: "Build first", icon: Archive, body: "Record source identity, publisher, license, use basis, update cadence, limitations, and sensitivity before any claim is drafted." },
    { title: "Evidence Vault", status: "Private by default", icon: Lock, body: "Preserve raw source snapshots, evidence files, hashes, and review materials in private storage with logged access." },
    { title: "Claims Engine", status: "Canonical core", icon: Fingerprint, body: "The claim is the smallest public assertion. Every claim carries source, method, confidence, legal posture, disclosure tier, and review status." },
    { title: "Review Control Plane", status: "Blocking authority", icon: ClipboardCheck, body: "Method, legal, safeguards, exposure, labor, ecology, licensing, and editorial reviews can approve, defer, reject, or block release." },
    { title: "Release Manifest", status: "Public trust mark", icon: BadgeCheck, body: "A signed record of what was released, by whom, under which methods, with what correction route and disclosure rationale." },
    { title: "Correction Route", status: "Always live", icon: MessageSquareWarning, body: "Accept factual corrections, exposure concerns, right-of-reply updates, outdated-data notices, and source challenges." },
  ];
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Restricted workspace prototype" title="The internal control plane behind public trust">
        This surface is not public launch material. It shows the build order and review machinery required before the dossier can publish.
      </SectionTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map(({ title, status, icon: Icon, body }) => (
          <Card key={title} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="rounded-2xl bg-stone-950 p-3 text-white"><Icon className="h-5 w-5" /></div>
              <Badge tone="blue">{status}</Badge>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-stone-950">{title}</h3>
            <p className="mt-2 leading-7 text-stone-600">{body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LaunchGate() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Release readiness" title="The MVP cannot launch until the launch gate passes">
        This page makes the remaining implementation gaps explicit. A public release requires named reviewers, map-safety approvals, right-of-reply completion where needed, public documentation, and a signed release manifest.
      </SectionTitle>
      <Card className="p-6">
        <div className="grid gap-3 md:grid-cols-2">
          {launchChecks.map(([label, done]) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3">
              {done ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <XCircle className="h-5 w-5 text-red-700" />}
              <span className="text-sm text-stone-700">{label}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Principle icon={TestTube2} title="QA" body="Lint, typecheck, unit tests, migration validation, dependency audit, secret scanning, accessibility checks." />
        <Principle icon={UsersRound} title="Review" body="Methods, legal, safeguards, exposure, labor, ecology, licensing, editorial, release readiness." />
        <Principle icon={PackageCheck} title="Release" body="Manifest signed, public views updated, correction route opened, post-release monitoring begins." />
      </div>
      <Card className="p-6">
        <h3 className="font-serif text-2xl font-semibold text-stone-950">In-file implementation tests</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">These sanity checks validate the static contracts used by this single-file prototype. In production, promote them into unit tests and CI checks.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {getAllTests().map((test) => (
            <div key={test.name} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3">
              {test.pass ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <XCircle className="h-5 w-5 text-red-700" />}
              <span className="text-sm text-stone-700">{test.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AppContent({ active, setActive }) {
  if (active === "home") return <Home setActive={setActive} />;
  if (active === "dossier") return <Dossier />;
  if (active === "dashboard") return <Dashboard />;
  if (active === "ledger") return <Ledger />;
  if (active === "implementation") return <Implementation />;
  if (active === "schema") return <Schema />;
  if (active === "api") return <ApiRoutes />;
  if (active === "security") return <Security />;
  if (active === "methods") return <Methods />;
  if (active === "safeguards") return <Safeguards />;
  if (active === "corrections") return <Corrections />;
  if (active === "workspace") return <Workspace />;
  if (active === "launch") return <LaunchGate />;
  return <Home setActive={setActive} />;
}

export default function EarthEndowmentObservatoryImplementationApp() {
  const [active, setActive] = useState("home");
  return (
    <div className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <ShellHeader active={active} setActive={setActive} />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <AppContent active={active} setActive={setActive} />
      </main>
      <footer className="mt-20 border-t border-stone-300 bg-[#11110F] px-4 py-10 text-stone-200 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="font-serif text-2xl font-semibold">Earth Endowment Observatory</div>
            <p className="mt-3 max-w-3xl leading-7 text-stone-400">
              Built as a governance-first claims platform: not a data dump, not a dashboard factory, not a global score, not a universal ownership map, not a blockchain project, not an AI authority.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400">Architecture law</div>
            <p className="mt-2 leading-7 text-stone-200">The chain must be made visible without making vulnerable people, places, species, or knowledge more vulnerable.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
