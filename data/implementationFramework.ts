import type {
  ImplementationPhase,
  MaintenanceCadence,
  ReadinessGate,
  ReadinessStatus,
  RiskControl,
} from "@/types/implementationFramework";

export const implementationPhases: readonly ImplementationPhase[] = [
  {
    id: "phase-0-canonical-freeze",
    title: "Canonical freeze and scope lock",
    status: "in_progress",
    purpose:
      "Consolidate EEO around one doctrine, one pilot corridor, and one dossier-first publication chain before expanding product surface.",
    deliverables: [
      "Accepted canonical doctrine and MVP evidence loop",
      "Copper-cobalt pilot scope statement",
      "Red-line and do-not-build boundary visible in product copy",
      "Named release owner placeholder before public launch",
    ],
    exitGate:
      "Every shipped route must describe EEO as a public-interest evidence observatory, not as a global atlas, score, certification, tribunal, or ownership registry.",
    doctrineBoundary:
      "No new outer product categories until the evidence dossier, ledger, review, release, and correction loop works.",
  },
  {
    id: "phase-1-evidence-spine",
    title: "Source, license, evidence, and claim spine",
    status: "in_progress",
    purpose:
      "Move from static prototype language toward a typed operating model for source provenance, claim metadata, publication eligibility, and correction routing.",
    deliverables: [
      "Source registry posture",
      "License/use-basis field requirements",
      "Claim metadata completeness checks",
      "Evidence ledger UX that exposes confidence, method, limitations, and stale-after posture",
    ],
    exitGate:
      "No public claim can appear without source, source date, method, confidence, evidence layer, granularity, legal posture, disclosure tier, review status, stale-after date, and correction path.",
    doctrineBoundary:
      "Synthetic/sample records may illustrate workflow; live evidence requires governed storage, review, and release controls.",
  },
  {
    id: "phase-2-review-control-plane",
    title: "Review, exposure, and right-of-reply control plane",
    status: "blocked",
    purpose:
      "Create the minimum human review path for legal, methods, safeguards, exposure, map safety, and named-actor risk before any high-impact publication.",
    deliverables: [
      "Blocking review task model",
      "Exposure review checklist",
      "Map-safety publication modes",
      "Named-actor right-of-reply status model",
    ],
    exitGate:
      "High-impact named actor claims, sensitive maps, and contested ownership/control claims remain unpublished until review and right-of-reply status are complete.",
    doctrineBoundary:
      "Do not publish named allegations, precise sensitive geospatial layers, or community-sensitive data while this phase is blocked.",
  },
  {
    id: "phase-3-public-beta-package",
    title: "Public beta dossier and limited dashboard",
    status: "in_progress",
    purpose:
      "Package the corridor into a legible public beta: evidence dossier, evidence ledger, methods, safeguards, corrections, and limited dashboard modules.",
    deliverables: [
      "Narrative evidence dossier",
      "Public evidence ledger",
      "Methods and limits page",
      "Safeguards page",
      "Correction intake route",
      "No-score labor, ecology, and revenue indicator cards",
    ],
    exitGate:
      "A public user can inspect what is known, what is uncertain, what is restricted, how claims were made, and how to challenge errors.",
    doctrineBoundary:
      "The beta may support inquiry and accountability questions; it must not certify stewardship, rank actors, or adjudicate legality.",
  },
  {
    id: "phase-4-maintenance-hardening",
    title: "Maintenance, correction, and release discipline",
    status: "in_progress",
    purpose:
      "Turn the implementation framework into recurring operating routines for evidence refresh, correction triage, methods versioning, security, and expansion gates.",
    deliverables: [
      "Maintenance calendar",
      "Correction severity model",
      "Release readiness checklist",
      "Methodology version log requirement",
      "Expansion decision memo requirement",
    ],
    exitGate:
      "Every public release has a manifest, correction route, stale-data review rule, and documented maintenance owner.",
    doctrineBoundary:
      "Expansion is earned through maintenance performance, not assumed from initial launch interest.",
  },
];

export const readinessGates: readonly ReadinessGate[] = [
  {
    id: "gate-doctrine-red-lines",
    domain: "doctrine",
    title: "Doctrine and red-line alignment",
    status: "in_progress",
    ownerRole: "Release owner",
    evidenceRequired: [
      "Canonical doctrine link",
      "MVP evidence-loop statement",
      "Do-not-build list confirmation",
      "Public copy review note",
    ],
    blockerRule:
      "Block release if any route implies global ownership, adjudication, certification, ranking, blockchain trust, AI authority, or universal exposure.",
    publicUxImplication:
      "Each public module must state what EEO does and does not claim in plain language.",
    maintenanceHook: "Review public wording at every major release and after any product-scope change.",
  },
  {
    id: "gate-claim-metadata",
    domain: "evidence",
    title: "Claim metadata completeness",
    status: "in_progress",
    ownerRole: "Research lead",
    evidenceRequired: [
      "Source record",
      "Source license/use basis",
      "Source date and collection date",
      "Method or derivation note",
      "Confidence label and explanation",
      "Evidence layer and granularity class",
      "Legal posture",
      "Disclosure tier",
      "Stale-after date",
      "Correction path",
    ],
    blockerRule: "Block public display for any claim missing required provenance, review, disclosure, or correction metadata.",
    publicUxImplication:
      "Claim cards and ledger rows must make uncertainty inspectable without requiring users to read the full methodology first.",
    maintenanceHook: "Run stale-date review before release and during scheduled evidence refresh cycles.",
  },
  {
    id: "gate-license-use-basis",
    domain: "evidence",
    title: "Source license and use-basis review",
    status: "blocked",
    ownerRole: "Legal/research reviewer",
    evidenceRequired: [
      "License name or use basis",
      "Attribution requirement",
      "Redistribution permission",
      "API or source terms",
      "Review status",
    ],
    blockerRule:
      "Block release-bound ingestion when public reuse, attribution, or redistribution basis is unknown.",
    publicUxImplication:
      "Source cards should distinguish cited context from redistributed data and should not imply EEO owns source material.",
    maintenanceHook: "Recheck partner and API terms quarterly or before adding downloadable/public API output.",
  },
  {
    id: "gate-exposure-map-safety",
    domain: "disclosure",
    title: "Exposure and map-safety review",
    status: "blocked",
    ownerRole: "Safeguards reviewer",
    evidenceRequired: [
      "Disclosure tier",
      "Map publication mode",
      "Granularity justification",
      "Harm scenario",
      "Mitigation decision",
      "Reviewer decision note",
    ],
    blockerRule:
      "Block exact geometry, sensitive locations, community reports, sacred sites, grievance locations, or vulnerable ecological data unless explicit review approves the publication mode.",
    publicUxImplication:
      "Maps must explain when geometry is generalized, masked, aggregated, delayed, restricted, or withheld.",
    maintenanceHook: "Re-run exposure review when precision increases, context changes, or a correction alleges exposure harm.",
  },
  {
    id: "gate-right-of-reply",
    domain: "governance",
    title: "Named-actor right-of-reply",
    status: "blocked",
    ownerRole: "Legal reviewer",
    evidenceRequired: [
      "Named actor risk flag",
      "Evidence packet path or summary",
      "Notice date",
      "Response deadline",
      "Response summary or no-response status",
      "Publication decision",
    ],
    blockerRule:
      "Block named high-impact actor risk profiles until right-of-reply workflow is complete or publication is explicitly deferred.",
    publicUxImplication:
      "Actor-affecting public pages must show right-of-reply status where relevant, without converting response status into a legal finding.",
    maintenanceHook: "Review right-of-reply statuses before each manifest and after material claim revisions.",
  },
  {
    id: "gate-release-manifest",
    domain: "governance",
    title: "Signed release manifest",
    status: "blocked",
    ownerRole: "Release owner",
    evidenceRequired: [
      "Release slug",
      "Included claim IDs",
      "Review completion summary",
      "License check summary",
      "Exposure check summary",
      "Right-of-reply status summary",
      "Correction route path",
      "Manifest hash or version identifier",
    ],
    blockerRule:
      "Block public launch if release contents cannot be traced to approved claims, public-safe views, and a correction route.",
    publicUxImplication:
      "Public pages should expose release status and make clear when content is prototype/sample rather than a public release.",
    maintenanceHook: "Generate a manifest for every public release and update it after accepted corrections or withdrawals.",
  },
  {
    id: "gate-indicator-no-score",
    domain: "product",
    title: "Indicator cards without composite scores",
    status: "complete",
    ownerRole: "Product lead",
    evidenceRequired: [
      "Indicator family",
      "Method note",
      "Misuse warning",
      "Limitation note",
      "Disclosure tier",
      "No-score review",
    ],
    blockerRule:
      "Block any composite stewardship score, actor ranking, certification seal, or justice index during the pilot.",
    publicUxImplication:
      "Cards should ask evidence questions and show limitations rather than performing a verdict.",
    maintenanceHook: "Review new indicators for score-like behavior before each dashboard update.",
  },
  {
    id: "gate-corrections",
    domain: "maintenance",
    title: "Correction route and severity handling",
    status: "in_progress",
    ownerRole: "Correction steward",
    evidenceRequired: [
      "Public correction route",
      "Triage status model",
      "Safety concern flag",
      "Resolution note field",
      "Claim update or withdrawal path",
    ],
    blockerRule:
      "Block public beta if users cannot challenge factual errors, exposure harms, right-of-reply needs, or stale claims.",
    publicUxImplication:
      "Every claim card and dossier page should make the correction path easy to find.",
    maintenanceHook: "Triage critical exposure or named-actor correction requests immediately; summarize non-sensitive correction outcomes publicly.",
  },
];

export const maintenanceCadences: readonly MaintenanceCadence[] = [
  {
    id: "cadence-weekly-build-review",
    cadence: "weekly",
    ownerRole: "Product/engineering lead",
    checks: [
      "Route drift and navigation integrity",
      "Correction queue review",
      "Open blocking review tasks",
      "UI clarity and accessibility regressions",
    ],
    output: "Weekly implementation note with blockers, shipped changes, and next safe slice.",
  },
  {
    id: "cadence-monthly-evidence-refresh",
    cadence: "monthly",
    ownerRole: "Research lead",
    checks: [
      "Claims approaching stale-after dates",
      "Source availability and link integrity",
      "License/use-basis changes",
      "New contradictions or disputed-source notes",
    ],
    output: "Evidence refresh log and public-safe correction notes where needed.",
  },
  {
    id: "cadence-quarterly-safeguards",
    cadence: "quarterly",
    ownerRole: "Safeguards/legal reviewers",
    checks: [
      "Exposure tier decisions",
      "Map publication modes",
      "Named-actor right-of-reply thresholds",
      "Suppressed/aggregated data explanations",
    ],
    output: "Safeguards review memo and updated release blockers.",
  },
  {
    id: "cadence-release-gate",
    cadence: "release",
    ownerRole: "Release owner",
    checks: [
      "All included claims approved for publication",
      "License and source checks complete",
      "Exposure and right-of-reply gates complete where required",
      "Release manifest generated",
      "Correction route live",
    ],
    output: "Signed release manifest or documented no-go decision.",
  },
  {
    id: "cadence-emergency-suppression",
    cadence: "emergency",
    ownerRole: "Safeguards reviewer and release owner",
    checks: [
      "Exposure harm allegation",
      "Wrong named actor or legal posture error",
      "Sensitive location risk",
      "Security or access-control concern",
    ],
    output: "Immediate suppression, correction notice where safe, and post-incident review.",
  },
];

export const riskControls: readonly RiskControl[] = [
  {
    id: "risk-scope-drift",
    risk: "Scope drift toward global atlas, scores, rankings, or certification before the corridor evidence loop works.",
    trigger: "New route, data model, or UI language expands beyond the copper-cobalt pilot or implies EEO verdict authority.",
    mitigation: "Route through doctrine review; defer global atlas, scores, rankings, certification, AI chat, and public reporting modules.",
    releaseGate: "Doctrine and red-line alignment gate must pass.",
  },
  {
    id: "risk-false-precision",
    risk: "Users mistake proxy, modeled, national, or contextual data for site-level certainty.",
    trigger: "Indicator or map card omits confidence, granularity, method, limitation, or misuse warning.",
    mitigation: "Require metadata-rich claim cards, indicator warnings, and explicit public-use limitations.",
    releaseGate: "Claim metadata completeness gate must pass.",
  },
  {
    id: "risk-exposure-harm",
    risk: "Publication increases risk to communities, workers, sacred sites, vulnerable habitats, or sensitive locations.",
    trigger: "Exact geometry, community report, grievance location, artisanal mining detail, or sensitive ecology layer enters a public route.",
    mitigation: "Apply aggregation, masking, delayed release, metadata-only display, restricted access, suppression, or do-not-collect decision.",
    releaseGate: "Exposure and map-safety review gate must pass.",
  },
  {
    id: "risk-named-actor-fairness",
    risk: "Named actor profiles create reputational consequence without a due-process path.",
    trigger: "Company, agency, operator, beneficial owner, or named public actor appears in high-impact risk context.",
    mitigation: "Require right-of-reply packet, response window, response summary, revision/withdrawal/defer/publish decision.",
    releaseGate: "Named-actor right-of-reply gate must pass.",
  },
  {
    id: "risk-maintenance-decay",
    risk: "A credible launch decays as claims age, source links break, corrections accumulate, or review owners remain unnamed.",
    trigger: "Stale-after dates pass, correction backlog grows, release manifests are not updated, or owners are absent.",
    mitigation: "Run weekly, monthly, quarterly, release, and emergency cadences with visible outputs.",
    releaseGate: "Correction route and maintenance cadence gates must pass before public beta.",
  },
];

export function summarizeReadiness(items: readonly { status: ReadinessStatus }[]) {
  return items.reduce(
    (summary, item) => ({
      ...summary,
      [item.status]: summary[item.status] + 1,
    }),
    {
      complete: 0,
      in_progress: 0,
      blocked: 0,
      deferred: 0,
    } satisfies Record<ReadinessStatus, number>
  );
}

export const implementationReadinessSummary = summarizeReadiness(readinessGates);
