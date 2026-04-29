"use client";

/**
 * Design-review mirror of `components/EarthEndowmentObservatoryOneFileApp.tsx` — kept line-for-line with that file aside from this block.
 * Regenerate with `pnpm sync:corridor-docs` (see `scripts/sync-corridor-docs-mirror.mjs`).
 */
import React, {
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Filter,
  Fingerprint,
  Globe2,
  Layers3,
  Lock,
  MessageSquareWarning,
  ScrollText,
  Search,
  ShieldCheck,
  Workflow,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import EeoLogo from "@/components/eeo/EeoLogo";

/**
 * Earth Endowment Observatory — corridor interface (SPA sections).
 */

type TabId =
  | "home"
  | "dossier"
  | "ownership"
  | "dashboard"
  | "ledger"
  | "methods"
  | "safeguards"
  | "corrections"
  | "workspace";

type BadgeTone = "neutral" | "blue" | "green" | "copper" | "red" | "gold" | "dark";

type EcosystemModule = {
  title: string;
  status: string;
  icon: LucideIcon;
  body: string;
};

/** Single source of truth for all claim field values. */
/* eslint-disable @typescript-eslint/no-unused-vars -- shared enums are currently consumed by type unions */
const CLAIM_TYPES = [
  "Observed",
  "Official",
  "Modeled",
  "Inferred",
  "Alleged",
  "Disputed",
  "Confidential",
  "Withdrawn",
] as const;

const CONFIDENCE_LABELS = [
  "Verified",
  "Official",
  "Modeled",
  "Estimated",
  "Self-reported",
  "Third-party reported",
  "Community-reported",
  "Disputed",
  "Restricted",
  "Outdated",
  "Unknown",
] as const;

const GRANULARITY_CLASSES = [
  "site-level",
  "facility-level",
  "corridor-level",
  "district-level",
  "province-level",
  "national-level",
  "regional-level",
  "global-level",
  "unknown",
] as const;

const LEGAL_POSTURES = [
  "no legal claim",
  "public-record description",
  "allegation by source",
  "finding by authority",
  "disputed legal status",
  "requires legal review",
] as const;

const DISCLOSURE_TIERS = [
  "tier_0_open",
  "tier_1_contextual_public",
  "tier_2_aggregated",
  "tier_3_verified_access",
  "tier_4_community_governed",
  "tier_5_suppressed",
] as const;

const RIGHT_OF_REPLY_STATUSES = [
  "not_required",
  "pending",
  "response_received",
  "no_response_by_deadline",
  "claim_revised",
  "claim_withdrawn",
  "deferred",
] as const;

const RIGHT_OF_REPLY_LABELS: Record<string, string> = {
  not_required: "Not required for this claim.",
  pending: "Notice sent — response window open.",
  response_received: "Response received and summarized.",
  no_response_by_deadline: "No response received by deadline.",
  claim_revised: "Claim revised after response.",
  claim_withdrawn: "Claim withdrawn after response.",
  deferred: "Publication deferred pending further review.",
};
/* eslint-enable @typescript-eslint/no-unused-vars */

function isStale(staleAfterDate: string): boolean {
  return new Date(staleAfterDate) < new Date();
}

function daysUntilStale(staleAfterDate: string): number {
  return Math.ceil((new Date(staleAfterDate).getTime() - Date.now()) / 86_400_000);
}

type Claim = {
  id: string;
  layer: string;
  claim_type: (typeof CLAIM_TYPES)[number];
  confidence: (typeof CONFIDENCE_LABELS)[number];
  tier: (typeof DISCLOSURE_TIERS)[number];
  domain: string;
  claim: string;
  source: string;
  method: string;
  granularity: (typeof GRANULARITY_CLASSES)[number];
  posture: (typeof LEGAL_POSTURES)[number];
  limitation: string;
  status: string;
  stale: string;
  right_of_reply_status: (typeof RIGHT_OF_REPLY_STATUSES)[number];
};

const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Corridor", icon: Globe2 },
  { id: "dossier", label: "Evidence dossier", icon: ScrollText },
  { id: "ownership", label: "Ownership + control", icon: Building2 },
  { id: "dashboard", label: "Corridor profile", icon: Layers3 },
  { id: "ledger", label: "Evidence ledger", icon: Database },
  { id: "methods", label: "Methods", icon: BookOpen },
  { id: "safeguards", label: "Safeguards", icon: ShieldCheck },
  { id: "corrections", label: "Corrections", icon: MessageSquareWarning },
  { id: "workspace", label: "Review & release", icon: Workflow },
];

/** Tab order for keyboard navigation (WAI-ARIA tablist) — must match `tabs` order. */
const SECTION_TAB_ORDER: TabId[] = tabs.map((t) => t.id);

/** Local token bridge — align one-file shell with globals.css institutional palette */
const EEO_ROOT_TOKENS: CSSProperties = {
  ["--eeo-local-ink" as string]: "#0f2f33",
  ["--eeo-local-text" as string]: "#13424a",
};

const claims: Claim[] = [
  {
    id: "EEO-CM-0001",
    layer: "Factual",
    claim_type: "Official",
    confidence: "Official",
    tier: "tier_1_contextual_public",
    domain: "Endowment",
    claim:
      "Public mineral statistics identify copper and cobalt as economically significant critical minerals in the selected producing region.",
    source: "USGS Mineral Commodity Summary; national statistical releases",
    method: "Manual source extraction + source-date normalization",
    granularity: "national-level",
    posture: "public-record description",
    limitation:
      "Does not identify unpublished deposits, artisanal workings, or sensitive security coordinates.",
    status: "Approved for public release",
    stale: "2027-04-26",
    right_of_reply_status: "not_required",
  },
  {
    id: "EEO-CM-0002",
    layer: "Factual",
    claim_type: "Official",
    confidence: "Official",
    tier: "tier_1_contextual_public",
    domain: "Governance",
    claim:
      "Public disclosures describe mining licenses, public authorities, and revenue-reporting obligations relevant to the selected corridor.",
    source: "EITI country disclosure; public legal and contract repositories",
    method: "Document indexing + concession/legal entity mapping",
    granularity: "corridor-level",
    posture: "no legal claim",
    limitation:
      "Formal legal authority is not presented as proof of full legitimacy, consent, or public benefit.",
    status: "Legal reviewed",
    stale: "2026-12-31",
    right_of_reply_status: "not_required",
  },
  {
    id: "EEO-CM-0003",
    layer: "Analytical",
    claim_type: "Modeled",
    confidence: "Modeled",
    tier: "tier_1_contextual_public",
    domain: "Trade",
    claim:
      "Reported trade data suggest commodity movement from producing jurisdictions toward downstream processing markets, but do not prove mine-level physical traceability.",
    source: "UN Comtrade; company disclosures where available",
    method: "HS-code comparison + mirror-data discrepancy review",
    granularity: "national-level",
    posture: "no legal claim",
    limitation:
      "Customs data does not establish that material from a specific site became a specific downstream product.",
    status: "Technical reviewed",
    stale: "2026-10-01",
    right_of_reply_status: "not_required",
  },
  {
    id: "EEO-CM-0004",
    layer: "Analytical",
    claim_type: "Inferred",
    confidence: "Estimated",
    tier: "tier_1_contextual_public",
    domain: "Labor",
    claim:
      "Available labor statistics and due-diligence sources raise questions about wage context, occupational safety, informality, and coercion risk across the broader mineral chain.",
    source: "ILOSTAT; ILO standards; reputable labor-rights reports",
    method: "Sector-level indicator synthesis + PPP context note",
    granularity: "national-level",
    posture: "no legal claim",
    limitation:
      "Labor data may be national, sectoral, or modeled; worker-level identities are not collected or published.",
    status: "Labor review required before launch",
    stale: "2026-09-01",
    right_of_reply_status: "not_required",
  },
  {
    id: "EEO-CM-0005",
    layer: "Analytical",
    claim_type: "Modeled",
    confidence: "Modeled",
    tier: "tier_2_aggregated",
    domain: "Ecology",
    claim:
      "Remote-sensing and water-risk layers indicate ecological pressure signals near the corridor, including land disturbance and watershed stress indicators.",
    source: "Global Forest Watch; Aqueduct-style water risk; public environmental reports",
    method: "Spatial overlay + buffer analysis + method caveat",
    granularity: "corridor-level",
    posture: "no legal claim",
    limitation:
      "Spatial proximity does not prove causation; sensitive ecological locations are generalized or withheld.",
    status: "Exposure reviewed",
    stale: "2026-08-01",
    right_of_reply_status: "not_required",
  },
  {
    id: "EEO-CM-0006",
    layer: "Normative",
    claim_type: "Inferred",
    confidence: "Estimated",
    tier: "tier_1_contextual_public",
    domain: "Public revenue",
    claim:
      "Disclosed royalties, taxes, or public payments raise a public-benefit question: whether endowment transformation becomes durable capability for producing communities and citizens.",
    source: "EITI disclosure; budget documents where available; company reports",
    method: "Revenue pathway synthesis + gap labeling",
    granularity: "national-level",
    posture: "no legal claim",
    limitation:
      "Disclosed revenue does not prove durable public benefit; budget-use evidence is separate.",
    status: "Editorial reviewed",
    stale: "2026-12-31",
    right_of_reply_status: "not_required",
  },
];

const modules: EcosystemModule[] = [
  {
    title: "Source Registry",
    status: "Build first",
    icon: Archive,
    body: "Record source identity, publisher, license, use basis, update cadence, limitations, and sensitivity before any claim is drafted.",
  },
  {
    title: "Evidence Vault",
    status: "Private by default",
    icon: Lock,
    body: "Preserve raw source snapshots, evidence files, hashes, and review materials in private storage with logged access.",
  },
  {
    title: "Claims Engine",
    status: "Core ledger",
    icon: Fingerprint,
    body: "The claim is the smallest public assertion. Every claim carries source, method, confidence, legal posture, disclosure tier, and review status.",
  },
  {
    title: "Review Control Plane",
    status: "Blocking authority",
    icon: ClipboardCheck,
    body: "Method, legal, safeguards, exposure, labor, ecology, licensing, and editorial reviews can approve, defer, reject, or block release.",
  },
  {
    title: "Release Manifest",
    status: "Public trust mark",
    icon: BadgeCheck,
    body: "A signed record of what was released, by whom, under which methods, with what correction route and disclosure rationale.",
  },
  {
    title: "Correction Route",
    status: "Always live",
    icon: MessageSquareWarning,
    body: "Accept factual corrections, exposure concerns, right-of-reply updates, outdated-data notices, and source challenges.",
  },
];

const releaseChecks: [string, boolean][] = [
  ["Source license recorded", true],
  ["Every public claim has source + method + confidence", true],
  ["Map safety review complete", false],
  ["Named high-impact actor right-of-reply complete", false],
  ["No marketed composite headline index", true],
  ["Correction route live", true],
  ["Methods and limits note published", true],
  ["Restricted data excluded from public views", true],
];

function cls(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function Badge({
  children,
  tone = "neutral",
  icon: Icon,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: LucideIcon;
}) {
  const tones: Record<BadgeTone, string> = {
    neutral: "border-stone-300 bg-stone-100 text-stone-700",
    blue: "border-blue-200 bg-blue-50 text-blue-900",
    green: "border-emerald-200 bg-emerald-50 text-emerald-900",
    copper: "border-orange-200 bg-orange-50 text-orange-900",
    red: "border-red-200 bg-red-50 text-red-900",
    gold: "border-yellow-200 bg-yellow-50 text-yellow-900",
    dark: "border-stone-700 bg-stone-950 text-stone-50",
  };
  return (
    <span className={cls("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium", tones[tone])}>
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  );
}

function Card({
  children,
  className = "",
  ...props
}: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cls("rounded-3xl border border-stone-200 bg-white/80 shadow-sm backdrop-blur", className)} {...props}>
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-6">
      {eyebrow ? <div className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-stone-500">{eyebrow}</div> : null}
      <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">{title}</h2>
      {children ? <p className="mt-3 max-w-3xl text-base leading-7 text-stone-600">{children}</p> : null}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">{label}</div>
      <div className="mt-1 leading-6 text-stone-700">{value}</div>
    </div>
  );
}

const TIER_LABELS: Record<string, string> = {
  tier_0_open: "Tier 0 · Open",
  tier_1_contextual_public: "Tier 1 · Contextual public",
  tier_2_aggregated: "Tier 2 · Aggregated",
  tier_3_verified_access: "Tier 3 · Verified access",
  tier_4_community_governed: "Tier 4 · Community-governed",
  tier_5_suppressed: "Tier 5 · Suppressed",
};

function tierTone(tier: string): BadgeTone {
  if (tier.includes("tier_0")) return "green";
  if (tier.includes("tier_1")) return "blue";
  if (tier.includes("tier_2")) return "copper";
  if (tier.includes("tier_3")) return "neutral";
  if (tier.includes("tier_4")) return "gold";
  if (tier.includes("tier_5")) return "red";
  return "neutral";
}

const LEVERAGE_PATHWAYS: Record<string, { use: string; limit: string }> = {
  Endowment: {
    use: "Resource policy context, academic research, public education.",
    limit: "Does not determine ownership, jurisdiction, or rights over the endowment.",
  },
  Governance: {
    use: "Due diligence, policy reform, parliamentary oversight, procurement screening.",
    limit: "Formal legal authority is not proof of full legitimacy, consent, or public benefit.",
  },
  Trade: {
    use: "Public-interest inquiry, trade-context research, due-diligence questions.",
    limit: "Reported trade flows do not prove physical chain-of-custody or verified origin.",
  },
  Labor: {
    use: "Labor-risk inquiry, union organizing, procurement screening, research.",
    limit: "Not site-level worker diagnosis unless data explicitly supports it. Informal work may be undercounted.",
  },
  Ecology: {
    use: "Environmental due diligence, policy reform context, conservation research.",
    limit: "Spatial proximity does not establish causation without additional evidence.",
  },
  "Public revenue": {
    use: "Budget oversight, parliamentary monitoring, public-finance research.",
    limit: "Disclosed revenue does not prove durable public benefit. Budget-use evidence is separate.",
  },
};

interface EquityLensEntry {
  beneficiaries: string;
  costBearers: string;
  whyItMatters: string;
}

const EQUITY_LENS: Record<string, EquityLensEntry> = {
  Endowment: {
    beneficiaries: "State revenue systems, extractive operators, and downstream industrial buyers if extraction is converted into saleable output.",
    costBearers: "Place-based communities and ecosystems where extraction pressure, land-use change, and governance failures are concentrated.",
    whyItMatters: "The core question is whether raw endowment conversion becomes durable public capability instead of short-lived private capture.",
  },
  Governance: {
    beneficiaries: "License holders and actors with legal access, procurement position, or regulatory influence.",
    costBearers: "Communities exposed to weak oversight, opaque agreements, and institutions that inherit enforcement risk without capacity.",
    whyItMatters: "Formal authority can allocate value quickly, but weak transparency can externalize social and ecological risk.",
  },
  Trade: {
    beneficiaries: "Traders, logistics nodes, refiners, and downstream manufacturers connected to corridor output.",
    costBearers: "Producing regions with low bargaining power, weak price transmission, or high compliance burdens.",
    whyItMatters: "Trade pathways show where value is captured and where accountability can disappear between origin and downstream markets.",
  },
  Labor: {
    beneficiaries: "Operators and intermediaries that gain productivity from low-cost, flexible, or informal labor arrangements.",
    costBearers: "Workers and households facing wage suppression, safety exposure, precarious contracts, or coercion risk.",
    whyItMatters: "Labor conditions test whether extraction-linked growth improves livelihoods or transfers risk onto workers.",
  },
  Ecology: {
    beneficiaries: "Near-term extraction and processing activity that captures commodity rents before restoration obligations mature.",
    costBearers: "Watersheds, biodiversity, and frontline communities absorbing cumulative land, air, and water impacts.",
    whyItMatters: "Ecological burden reveals whether the chain is financing long-run damage that is excluded from current prices.",
  },
  "Public revenue": {
    beneficiaries: "Public institutions and political actors when royalties and taxes are converted into credible public services.",
    costBearers: "Citizens and producing communities when disclosed revenue does not translate into capability, infrastructure, or welfare outcomes.",
    whyItMatters: "Revenue is not impact; this lens checks if monetary inflows actually become public benefit.",
  },
};

function LeveragePathwayPanel({ domain }: { domain: string }) {
  const entry = LEVERAGE_PATHWAYS[domain];
  if (!entry) return null;
  return (
    <div className="rounded-2xl border border-stone-100 bg-stone-50 p-3 text-sm space-y-1.5">
      <div>
        <span className="font-semibold text-stone-700">Use for: </span>
        <span className="text-stone-600">{entry.use}</span>
      </div>
      <div>
        <span className="font-semibold text-red-700">Do not use to: </span>
        <span className="text-stone-600">{entry.limit}</span>
      </div>
    </div>
  );
}

function BenefitCostWhyPanel({
  domain,
  title = "Benefit-Cost-Why lens",
  compact = false,
}: {
  domain: string;
  title?: string;
  compact?: boolean;
}) {
  const entry = EQUITY_LENS[domain];
  if (!entry) return null;
  return (
    <div className={cls("rounded-2xl border border-blue-200 bg-blue-50", compact ? "p-3 text-sm" : "p-4 text-sm")}>
      <div className="font-semibold text-blue-950">{title}</div>
      <div className={cls("grid gap-2", compact ? "mt-2" : "mt-3")}>
        <p className="text-blue-900">
          <strong>Who benefits:</strong> {entry.beneficiaries}
        </p>
        <p className="text-blue-900">
          <strong>Who bears cost:</strong> {entry.costBearers}
        </p>
        <p className="text-blue-900">
          <strong>Why:</strong> {entry.whyItMatters}
        </p>
      </div>
    </div>
  );
}

function Chain() {
  const items = [
    "Endowment",
    "Jurisdiction",
    "Concession / Permit",
    "Operator",
    "Ownership / Control",
    "Extraction / Production",
    "Processing / Trade",
    "Labor Risk",
    "Ecological Signal",
    "Public Revenue",
    "Public Benefit Question",
    "Evidence Gap",
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, idx) => (
        <React.Fragment key={item}>
          <span
            className={
              item === "Evidence Gap"
                ? "rounded-full border border-stone-400 bg-stone-900 px-3 py-1.5 text-xs font-semibold text-stone-100"
                : "rounded-full border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-800"
            }
          >
            {item}
          </span>
          {idx < items.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-stone-400" /> : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function ClaimCard({ claim, compact = false }: { claim: Claim; compact?: boolean }) {
  const tone: BadgeTone =
    claim.confidence === "Official" ? "blue" : claim.confidence === "Modeled" ? "copper" : claim.confidence === "Estimated" ? "gold" : "neutral";
  const tierLabel = TIER_LABELS[claim.tier] ?? claim.tier;
  const granDisplay = claim.granularity.replace(/-/g, " ");
  const postureDisplay = claim.posture ? claim.posture.charAt(0).toUpperCase() + claim.posture.slice(1) : "";
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
            <Badge tone={tierTone(claim.tier)}>{tierLabel}</Badge>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p className={cls("leading-7 text-stone-800", compact ? "text-sm" : "text-base")}>{claim.claim}</p>
        <div className="grid gap-3 text-sm md:grid-cols-2">
          <Meta label="Source" value={claim.source} />
          <Meta label="Method" value={claim.method} />
          <Meta label="Legal posture" value={postureDisplay} />
          <Meta label="Granularity" value={granDisplay} />
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
          <strong>Limit:</strong> {claim.limitation}
        </div>
        {claim.right_of_reply_status !== "not_required" && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-950">
            <strong>Right-of-reply: </strong>
            {RIGHT_OF_REPLY_LABELS[claim.right_of_reply_status]}
          </div>
        )}
        <BenefitCostWhyPanel domain={claim.domain} compact={compact} />
        <LeveragePathwayPanel domain={claim.domain} />
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3 text-xs text-stone-500">
          <span>Status: {claim.status}</span>
          {isStale(claim.stale) ? (
            <span className="flex items-center gap-1 font-semibold text-red-700">
              <AlertTriangle className="h-3.5 w-3.5" />
              Stale since {claim.stale} — review required
            </span>
          ) : (
            <span className="text-stone-400">
              Stale after: {claim.stale} ({daysUntilStale(claim.stale)}d remaining)
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

type DashboardMetricSpec = {
  publicLabel: string;
  qualitativeState: string;
  explanation: string;
  caution: string;
  evidenceBasisNote: string;
};

const corridorDashboardMetrics: DashboardMetricSpec[] = [
  {
    publicLabel: "Ecology pressure",
    qualitativeState: "watch",
    explanation: "Landscape and vegetation signals summarized at corridor-safe resolution.",
    caution: "Spatial proximity does not establish causation.",
    evidenceBasisNote: "Evidence basis appears in the Evidence Ledger and methods note.",
  },
  {
    publicLabel: "Water pressure",
    qualitativeState: "high",
    explanation: "Water stress cues are summarized from public hydrology-style indicators.",
    caution: "Water risk varies by basin and season.",
    evidenceBasisNote: "Evidence basis appears in the Evidence Ledger and methods note.",
  },
  {
    publicLabel: "Evidence gaps",
    qualitativeState: "partial",
    explanation: "Fields where disclosures, telemetry, or field confirmation are uneven.",
    caution: "Missing data should not be read as good practice.",
    evidenceBasisNote: "Evidence basis appears in the Evidence Ledger and methods note.",
  },
  {
    publicLabel: "Restoration pathway",
    qualitativeState: "weak",
    explanation: "Planned recovery and stewardship signals where available publicly.",
    caution: "Potential does not prove delivery.",
    evidenceBasisNote: "Evidence basis appears in the Evidence Ledger and methods note.",
  },
  {
    publicLabel: "Record confidence",
    qualitativeState: "strong",
    explanation: "How much of the corridor record rests on repeatable, inspectable citations.",
    caution: "Confidence is not legal certainty.",
    evidenceBasisNote: "Evidence basis appears in the Evidence Ledger and methods note.",
  },
];

function qualitativePill(status: string) {
  const s = status.toLowerCase();
  let tone: BadgeTone = "neutral";
  if (s === "high" || s === "strong") tone = "green";
  if (s === "watch") tone = "copper";
  if (s === "weak") tone = "red";
  if (s === "partial") tone = "gold";
  return <Badge tone={tone}>{status}</Badge>;
}

function DashboardMetricCard({ metric, compact = false }: { metric: DashboardMetricSpec; compact?: boolean }) {
  return (
    <Card className={cls("border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.9)]", compact ? "p-4" : "p-5")}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--eeo-muted)]">Qualitative status</div>
          <h3 className="mt-1 font-semibold text-[color:var(--eeo-ink)]">{metric.publicLabel}</h3>
        </div>
        {qualitativePill(metric.qualitativeState)}
      </div>
      <p className={cls("mt-3 leading-relaxed text-[color:var(--eeo-text)]", compact ? "text-sm" : "text-[15px]")}>{metric.explanation}</p>
      <div className="mt-3 rounded-2xl border border-amber-200/70 bg-amber-50/90 p-3 text-sm leading-relaxed text-amber-950">
        <span className="font-semibold">Caution:</span> {metric.caution}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[color:var(--eeo-muted)]">{metric.evidenceBasisNote}</p>
    </Card>
  );
}

/**
 * WAI-ARIA horizontal tab list: ArrowLeft/ArrowRight, Home, End (automatic selection).
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
function handleTabKeyDown(
  e: KeyboardEvent<HTMLButtonElement>,
  fromId: TabId,
  onSelectSection: (id: TabId) => void
) {
  const idx = SECTION_TAB_ORDER.indexOf(fromId);
  if (idx === -1) return;
  let nextId: TabId;
  switch (e.key) {
    case "ArrowRight":
      e.preventDefault();
      nextId = SECTION_TAB_ORDER[(idx + 1) % SECTION_TAB_ORDER.length] ?? fromId;
      break;
    case "ArrowLeft":
      e.preventDefault();
      nextId = SECTION_TAB_ORDER[(idx - 1 + SECTION_TAB_ORDER.length) % SECTION_TAB_ORDER.length] ?? fromId;
      break;
    case "Home":
      e.preventDefault();
      nextId = SECTION_TAB_ORDER[0] ?? fromId;
      break;
    case "End":
      e.preventDefault();
      nextId = SECTION_TAB_ORDER[SECTION_TAB_ORDER.length - 1] ?? fromId;
      break;
    default:
      return;
  }
  onSelectSection(nextId);
}

function ReferenceStandardsStrip() {
  return (
    <div className="w-full border-b border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.78)] text-[color:var(--eeo-muted)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-2.5 text-xs md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <span className="font-mono uppercase tracking-[0.16em]">Reference Standards &amp; Data Systems</span>
        <span className="max-w-3xl text-[13px] leading-relaxed md:text-right">
          Used for citation, interoperability, or methodological alignment — not endorsement.
        </span>
      </div>
    </div>
  );
}

function CorridorTabStrip({
  active,
  onSelectSection,
}: {
  active: TabId;
  onSelectSection: (id: TabId) => void;
}) {
  return (
    <header className="border-b border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.86)] backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-6 lg:px-8">
        <nav
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 pt-1"
          role="tablist"
          aria-label="Corridor workspace sections"
          aria-orientation="horizontal"
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`eeo-tab-${id}`}
              tabIndex={active === id ? 0 : -1}
              aria-selected={active === id}
              aria-controls="eeo-section-panel"
              onClick={() => onSelectSection(id)}
              onKeyDown={(e) => handleTabKeyDown(e, id, onSelectSection)}
              className={cls(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2",
                active === id
                  ? "border-[color:var(--eeo-primary)] bg-[color:var(--eeo-primary)] text-white shadow-sm"
                  : "border-[color:var(--eeo-border)] bg-white/80 text-[color:var(--eeo-text)] hover:border-[color:var(--eeo-primary)]"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function PublicMissionStrip() {
  return (
    <section className="eeo-glass-card mb-6 px-5 py-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-medium text-[color:var(--eeo-text)]">
          Make the chain visible · Keep the record accountable · Protect what exposure could harm
        </p>
        <p className="max-w-xl text-xs leading-relaxed text-[color:var(--eeo-muted)]">
          Stewardship-aware publication; safeguards for sensitive places and rights-bearing knowledge.
        </p>
      </div>
    </section>
  );
}

function CorridorMapSection({ className }: { className?: string }) {
  return (
    <section className={cls("scroll-mt-8 space-y-4", className)} aria-labelledby="eeo-corridor-map-heading">
      <div className="mb-6">
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--eeo-muted)]">Corridor map</div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="eeo-corridor-map-heading" className="text-3xl font-semibold tracking-tight text-[color:var(--eeo-ink)] md:text-4xl">
            Corridor overview
          </h2>
          <span className="inline-flex rounded-full border border-[color:var(--eeo-primary)] bg-white/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--eeo-primary)]">
            Safe-resolution view
          </span>
        </div>
      </div>

      <div className="eeo-glass-card overflow-hidden">
        <div className="border-b border-[color:var(--eeo-border)] bg-white/85 px-4 py-4 md:flex md:items-center md:justify-between md:gap-4">
          <h3 className="text-[15px] font-semibold text-[color:var(--eeo-ink)]">Illustrative corridor map (not authoritative geometry)</h3>
        </div>
        <div className="relative min-h-[340px] overflow-hidden md:min-h-[420px]" style={{ background: "linear-gradient(135deg, rgba(223,243,231,0.9), rgba(191,227,226,0.85))" }}>
          <div className="absolute inset-0 opacity-55" aria-hidden style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(19,66,74,0.11) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
          {/* abstract arcs — non-geographic */}
          <div className="absolute left-[12%] top-[16%] h-52 w-[46%] rotate-[-8deg] rounded-[48%] border-2 border-[color:rgba(184,137,40,0.35)] bg-[rgba(255,255,255,0.15)] md:left-[14%]" />
          <div className="absolute right-[12%] top-[22%] h-56 w-[38%] rotate-[14deg] rounded-[52%] border-2 border-[color:rgba(31,111,120,0.35)] bg-[rgba(255,255,255,0.12)] md:right-[15%]" />
          <div className="relative z-[1] flex h-full flex-col justify-between px-4 py-6 md:px-8">
            <p className="max-w-xl text-sm leading-relaxed text-[color:var(--eeo-text)]">
              Labels show inquiry themes—not verified locations, footprints, rights, or custody.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
              {["Ecology", "Water pressure", "Evidence gaps", "Restoration", "Record"].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.9)] px-2.5 py-2 text-center text-[11px] font-semibold leading-snug text-[color:var(--eeo-text)] md:text-xs"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Card className="border-[color:var(--eeo-border)] bg-white/92 p-4 text-sm leading-relaxed text-[color:var(--eeo-text)] shadow-none backdrop-blur">
        <p>
          <span className="font-semibold text-[color:var(--eeo-ink)]">Map safety:</span> this public map withholds or generalizes exact sensitive coordinates, community reports, sacred sites, vulnerable
          ecological locations, and exploitable deposits.
        </p>
      </Card>
    </section>
  );
}

function CorridorDashboardSection({
  eyebrowOverrides,
  dense,
}: {
  eyebrowOverrides?: { eyebrow: string; title: string; body?: string };
  dense?: boolean;
}) {
  const eyebrow = eyebrowOverrides?.eyebrow ?? "Corridor dashboard";
  const title = eyebrowOverrides?.title ?? "Critical Minerals Corridor: Copper–Cobalt";
  const body =
    eyebrowOverrides?.body ??
    "This profile brings together ecological pressure, water pressure, evidence gaps, restoration pathways, and record confidence so users can see what is known, what remains uncertain, and what must be handled carefully.";

  return (
    <section id="corridor-dashboard" className="scroll-mt-8 space-y-6">
      <SectionTitle eyebrow={eyebrow} title={title}>
        {body}
      </SectionTitle>
      <div className={cls("grid gap-4", dense ? "md:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-5")}>{corridorDashboardMetrics.map((m) => <DashboardMetricCard key={m.publicLabel} metric={m} compact={dense} />)}</div>
    </section>
  );
}

function GuidanceSection() {
  const items = [
    {
      title: "Use for public inquiry",
      body: "Use this profile to ask better questions about governance, stewardship, labor, revenue, and disclosure gaps.",
    },
    {
      title: "Do not use as a verdict",
      body: "This profile does not determine legal responsibility, certify supply chains, or rank countries, firms, or communities.",
    },
    {
      title: "Inspect the evidence",
      body: "Records should be read with their confidence labels, source notes, disclosure tiers, and limitations.",
    },
    {
      title: "Challenge the record",
      body: "Affected parties should be able to submit factual corrections, right-of-reply material, or exposure concerns.",
    },
  ];

  return (
    <section className="scroll-mt-10 space-y-6">
      <SectionTitle eyebrow="How to read this profile" title="Evidence for inquiry, not a verdict.">
        The Observatory makes public evidence easier to inspect while preserving uncertainty, disagreement, and disclosure limits.
      </SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.title} className="border-[color:var(--eeo-border)] bg-white/90 p-5">
            <h3 className="font-semibold text-[color:var(--eeo-ink)]">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--eeo-muted)]">{item.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Home({ onSelectSection }: { onSelectSection: (id: TabId) => void }) {
  const pilotNotes = [
    "Safe-resolution geography — Sensitive coordinates are withheld or generalized.",
    "Traceable record — Records include confidence, context, and limits.",
    "Rights-aware disclosure — Publication is governed by risk, consent, and public interest.",
    "No overclaiming — no certification, adjudicated liability, asserted chain-of-custody proof, marketed rankings, or implied legal rulings.",
  ];

  return (
    <div className="space-y-20 pb-12">
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.9)] px-6 py-10 shadow-sm md:px-10 md:py-12">
        <div className="pointer-events-none absolute -right-[8%] top-[-26%] h-64 w-64 opacity-[0.07]" aria-hidden>
          <div className="scale-150">
            <EeoLogo decorative size="lg" />
          </div>
        </div>
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--eeo-muted)]">Public Observatory</span>
            </div>
            <h1 className="max-w-xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[color:var(--eeo-ink)] md:text-[2.75rem]">
              A public view of Earth&apos;s endowment-to-economy chain.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--eeo-text)]">
              Explore how a critical mineral corridor connects natural endowment, governance, labor, trade, ecological pressure, public revenue, and value-capture questions through a transparent public
              record.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("corridor-dashboard")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full bg-[color:var(--eeo-primary)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--eeo-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-green)] focus-visible:ring-offset-2"
              >
                Explore First Corridor
              </button>
              <button
                type="button"
                onClick={() => onSelectSection("ledger")}
                className="rounded-full border border-[color:var(--eeo-primary)] px-6 py-3 text-sm font-semibold text-[color:var(--eeo-primary)] transition hover:bg-[color:var(--eeo-green-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] focus-visible:ring-offset-2"
              >
                View Evidence Ledger
              </button>
            </div>
          </div>

          <aside className="eeo-glass-card space-y-4 border-[color:var(--eeo-border)] p-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--eeo-muted)]">First pilot</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-[color:var(--eeo-ink)]">Critical Minerals Corridor</h2>
              <p className="mt-1 text-sm font-medium text-[color:var(--eeo-muted)]">Copper–Cobalt</p>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--eeo-text)]">
                A narrowed copper–cobalt profile designed to show what is known, what is uncertain, and what is intentionally withheld to prevent harm.
              </p>
            </div>
            <Chain />
            <div className="space-y-2 text-sm leading-relaxed text-[color:var(--eeo-text)]">
              {pilotNotes.map((row) => (
                <p key={row} className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--eeo-primary)]" aria-hidden />
                  <span>{row}</span>
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <CorridorDashboardSection />

      <CorridorMapSection />

      <GuidanceSection />
    </div>
  );
}

function Dossier({ onSelectSection }: { onSelectSection: (id: TabId) => void }) {
  const claim0006 = claims.find((c) => c.id === "EEO-CM-0006");
  const limitationsByDomain = claims.reduce<Record<string, string[]>>((acc, c) => {
    if (!acc[c.domain]) acc[c.domain] = [];
    acc[c.domain]!.push(c.limitation);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      <SectionTitle eyebrow="Corridor evidence dossier" title="Flagship corridor record">
        Narrative framing with visible evidence, labeled uncertainty, and map context where safe to publish.
      </SectionTitle>

      <section>
        <SectionTitle eyebrow="Section 1" title="What this pilot covers" />
        <Card className="p-6">
          <ul className="space-y-3 text-sm leading-6 text-stone-700">
            <li>• One narrowed copper-cobalt producing corridor.</li>
            <li>• Public and partner-permitted evidence only.</li>
            <li>• Safe-resolution mapping and evidence cards.</li>
            <li>• Governance, ownership, trade, labor, ecology, revenue, and public-benefit questions.</li>
            <li>• Claims with source, method, confidence, legal posture, disclosure tier, and correction path.</li>
          </ul>
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 2" title="Sample claim cards (preview)" />
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {claims.slice(0, 3).map((claim) => (
            <ClaimCard key={claim.id} claim={claim} compact />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Section 3" title="Corridor boundary" />
        <Card className="border-amber-200 bg-amber-50 p-6">
          <p className="text-sm leading-7 text-amber-950">
            Corridor geometry is <strong>pending map-safety review</strong> before any precise or interactive boundary can publish. For the generalized map placeholder and safety framing, open the{" "}
            <button
              type="button"
              onClick={() => onSelectSection("dashboard")}
              className="font-semibold underline decoration-amber-800 hover:text-amber-900"
            >
              Corridor profile
            </button>{" "}
            map panel.
          </p>
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 4" title="What this release does not claim" />
        <Card className="border-red-200 bg-red-50 p-6 text-sm leading-6 text-red-950">
          <strong>Publication limits:</strong> This dossier does not certify supply chains, adjudicate responsibility, assert physical traceability without evidence, rank countries or firms, provide a community reporting system, or serve as a universal atlas.
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 5" title="Known uncertainties (from claim limitations, by domain)" />
        <Card className="p-6">
          <div className="space-y-5 text-sm text-stone-700">
            {Object.entries(limitationsByDomain).map(([domain, lims]) => (
              <div key={domain}>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500">{domain}</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 leading-6">
                  {lims.map((l, i) => (
                    <li key={`${domain}-${i}`}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 6" title="Governance and authority profile" />
        <Card className="border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
          Stub — pending structured narrative. The <strong>governance profile</strong> module in the{" "}
          <button type="button" onClick={() => onSelectSection("dashboard")} className="font-semibold underline">
            Corridor profile
          </button>{" "}
          previews the same theme at module level; full text will follow review.
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 7" title="Ownership and control profile" />
        <Card className="border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
          Stub — requires entity resolution and named-actor right-of-reply before publish. A dedicated{" "}
          <button type="button" onClick={() => onSelectSection("ownership")} className="font-semibold underline">
            Ownership + Control
          </button>{" "}
          tab describes the release gate; no ownership table ships in this draft.
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 8" title="Value-chain hypothesis" />
        <p className="mb-4 max-w-3xl text-sm leading-7 text-stone-600">
          The path below is a <strong>hypothesis for inquiry</strong>, not a claim that every link is populated with verified, public-tier evidence. The terminal node marks epistemic limits, not a missing
          &quot;data product.&quot;
        </p>
        <Card className="p-6">
          <Chain />
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 9" title="Labor, ecology, and public-revenue evidence" />
        <div className="grid gap-4 md:grid-cols-2">
          {corridorDashboardMetrics.slice(0, 4).map((metric) => (
            <DashboardMetricCard key={metric.publicLabel} metric={metric} compact />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Section 10" title="Public-benefit questions" />
        {claim0006 ? <ClaimCard claim={claim0006} /> : null}
      </section>

      <section>
        <SectionTitle eyebrow="Section 11" title="Source registry snapshot" />
        <Card className="border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">Stub — per-source license, update cadence, and sensitivity notes (pending import from registry build).</Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 12" title="Review and release posture" />
        <Card className="border-[#C9A24D]/40 bg-[#0F2A32] p-6 text-sm text-[#EFE8D8]">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#C9A24D]/40 bg-[#C9A24D]/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#C9A24D]">
              Release manifest checkpoint
            </span>
            <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-1 text-xs text-amber-100">Unsigned</span>
          </div>
          <p className="leading-7 text-[#E6E1D6]/90">
            Publication cannot proceed until launch-gate blockers clear and the corridor release manifest is signed by the release owner.
          </p>
          <button
            type="button"
            onClick={() => onSelectSection("workspace")}
            className="mt-4 rounded-full border border-[#C9A24D]/40 px-4 py-2 font-semibold text-[#C9A24D] transition hover:bg-[#C9A24D]/10"
          >
            Open launch gate workspace
          </button>
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 13" title="Correction and challenge path" />
        <Card className="border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
          Stub — live correction route and intake form: open the{" "}
          <button type="button" onClick={() => onSelectSection("corrections")} className="font-semibold underline">
            Corrections
          </button>{" "}
          tab.
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 14" title="Right-of-reply status" />
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-stone-200 bg-stone-50 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">
                <tr>
                  <th className="px-4 py-3">Claim ID</th>
                  <th className="px-4 py-3">Status (machine)</th>
                  <th className="px-4 py-3">Label</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((c) => (
                  <tr key={c.id} className="border-b border-stone-100 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs">{c.id}</td>
                    <td className="px-4 py-3">{c.right_of_reply_status.replace(/_/g, " ")}</td>
                    <td className="px-4 py-3 text-stone-700">{RIGHT_OF_REPLY_LABELS[c.right_of_reply_status] ?? c.right_of_reply_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 15" title="Document control" />
        <Card className="border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
          Publication metadata — versioning, accountability log, and sign-off accompany public release packaging.
        </Card>
      </section>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-12">
      <SectionTitle eyebrow="Accountability lens" title="Who benefits, who bears cost, why it matters">
        A reading aid for stewarding public inquiry — not an outcome table.
      </SectionTitle>
      <Card className="border-[color:var(--eeo-border)] p-5">
        <div className="grid gap-3 md:grid-cols-2">
          {Object.entries(EQUITY_LENS).map(([domain]) => (
            <BenefitCostWhyPanel key={domain} domain={domain} title={domain} compact />
          ))}
        </div>
      </Card>
      <CorridorDashboardSection />
      <CorridorMapSection />
    </div>
  );
}

const SEARCH_FIELDS = [
  "id",
  "domain",
  "claim",
  "source",
  "method",
  "posture",
  "granularity",
  "status",
  "confidence",
  "layer",
  "claim_type",
] as const;

function Ledger() {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase().trim();
  const filtered = useMemo(
    () =>
      q.length === 0
        ? claims
        : claims.filter((c) =>
            SEARCH_FIELDS.some((k) => String(c[k as keyof typeof c]).toLowerCase().includes(q))
          ),
    [q]
  );
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Transparent public record" title="Evidence Ledger">
        Inspectable claims with sources, methods, dates, confidence labels, legal posture, disclosure tiers, limitations, review status, and stale-after dates.
      </SectionTitle>
      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search claims, sources, domains, methods..."
              aria-label="Search evidence ledger"
              className="w-full rounded-full border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-stone-900"
            />
          </div>
          <button
            type="button"
            disabled
            title="Filtering by domain, confidence, and tier — not yet implemented"
            aria-label="Filter (not yet implemented — use search)"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-stone-400 cursor-not-allowed opacity-50"
          >
            <Filter className="h-4 w-4" aria-hidden />
            Filter
          </button>
        </div>
      </Card>
      <div className="grid gap-4">
        {filtered.map((claim) => <ClaimCard key={claim.id} claim={claim} compact />)}
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
        <h3 className="font-serif text-2xl font-semibold text-stone-950">Claim package</h3>
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
        {(
          [
            ["Tier 0", "Open", "Public display, API, citation, possible download.", "green"],
            ["Tier 1", "Contextual public", "Public with warnings, provenance, method notes, and caveats.", "blue"],
            ["Tier 2", "Aggregated", "Aggregate by geography, time, actor, or category.", "copper"],
            ["Tier 3", "Verified access", "Controlled access, purpose limits, logging, expiration.", "neutral"],
            ["Tier 4", "Community-governed", "Governed by consent protocol and authority-specific rules.", "gold"],
            ["Tier 5", "Suppressed", "Do not publish. Store only if necessary and protected, or do not retain.", "red"],
          ] as [string, string, string, BadgeTone][]
        ).map(([tier, title, body, tone]) => (
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
  const [form, setForm] = useState({
    name: "",
    email: "",
    correction_type: "Factual correction",
    affected_object_id: "",
    body: "",
    evidence_link: "",
    safety_concern: false,
    right_of_reply: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const valid = form.name.trim() && form.email.trim() && form.body.trim();

  function handleSubmit() {
    if (!valid) return;
    if (process.env.NODE_ENV === "development") {
      console.log("Challenge submitted:", form);
    }
    setSubmitted(true);
  }

  if (submitted)
    return (
      <div className="space-y-8">
        <SectionTitle eyebrow="Submitted" title="Challenge received" />
        <Card className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-700" />
          <p className="mt-4 font-semibold text-stone-950">Your challenge has been logged.</p>
          <p className="mt-2 text-stone-600 text-sm">Triage within 5 business days. You will be contacted at the address provided if a response is required.</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 hover:border-stone-900"
          >
            Submit another
          </button>
        </Card>
      </div>
    );

  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Challenge route" title="Correction, right-of-reply, and exposure concern intake">
        A public release is not complete unless affected parties can challenge factual accuracy, stale information, disclosure harm, confidence labels, identity conflation, legal misdescription, and community-rights violations.
      </SectionTitle>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-6">
          <h3 className="font-serif text-2xl font-semibold text-stone-950">Submit a challenge</h3>
          <div className="mt-5 space-y-4">
            <input
              placeholder="Name or institution *"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <input
              placeholder="Contact email *"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <select
              value={form.correction_type}
              onChange={(e) => setForm((f) => ({ ...f, correction_type: e.target.value }))}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900"
            >
              <option>Factual correction</option>
              <option>Exposure concern</option>
              <option>Right-of-reply</option>
              <option>Outdated source</option>
              <option>Identity conflation</option>
              <option>Legal misdescription</option>
            </select>
            <input
              placeholder="Claim ID (e.g. EEO-CM-0003) — if applicable"
              value={form.affected_object_id}
              onChange={(e) => setForm((f) => ({ ...f, affected_object_id: e.target.value }))}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <textarea
              placeholder="Describe the issue, source, or safety concern... *"
              rows={5}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <input
              placeholder="Supporting evidence link (optional)"
              value={form.evidence_link}
              onChange={(e) => setForm((f) => ({ ...f, evidence_link: e.target.value }))}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.safety_concern}
                  onChange={(e) => setForm((f) => ({ ...f, safety_concern: e.target.checked }))}
                  className="h-4 w-4 rounded"
                />
                This is a safety or exposure concern requiring urgent triage
              </label>
              <label className="flex items-center gap-3 text-sm text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.right_of_reply}
                  onChange={(e) => setForm((f) => ({ ...f, right_of_reply: e.target.checked }))}
                  className="h-4 w-4 rounded"
                />
                I am requesting right-of-reply as a named party
              </label>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!valid}
              className="w-full rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Submit for triage
            </button>
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

const RELEASE_MANIFEST = {
  release_slug: "eeo-pilot-corridor-v0.1-draft",
  corridor: "Copper-cobalt critical-minerals corridor",
  release_title: "Pilot Corridor Evidence Dossier — Draft Release",
  release_status: "draft",
  signed_by: null,
  signed_at: null,
  method_note_path: "/docs/evidence-standard.md",
  correction_route_path: "/pilot/corrections",
  manifest_hash: null,
};

function ReleaseManifestPanel() {
  const {
    release_slug,
    corridor,
    release_title,
    release_status,
    signed_by,
    signed_at,
    method_note_path,
    correction_route_path,
    manifest_hash,
  } = RELEASE_MANIFEST;
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3 mb-5">
        <h3 className="font-serif text-2xl font-semibold text-stone-950">Release manifest</h3>
        <Badge tone={release_status === "published" ? "green" : "copper"}>{release_status}</Badge>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Meta label="Release slug" value={release_slug} />
        <Meta label="Corridor" value={corridor} />
        <Meta label="Release title" value={release_title} />
        <Meta label="Signed by" value={signed_by ?? "— not yet signed"} />
        <Meta label="Signed at" value={signed_at ?? "— not yet signed"} />
        <Meta label="Method note path" value={method_note_path} />
        <Meta label="Correction route" value={correction_route_path} />
        <Meta label="Manifest hash" value={manifest_hash ?? "— generated at signing"} />
      </div>
      <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600 leading-6">
        This manifest is unsigned. It will be signed by the release owner only after all blocking reviews are complete, map-safety review passes, right-of-reply status is confirmed for all named
        actors, and the launch readiness gate is passed.
      </div>
    </Card>
  );
}

function OwnershipControl() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Pending review" title="Ownership and control profile">
        This section covers corporate structure, beneficial ownership, concession holders, and control relationships. It requires entity resolution, beneficial ownership data review, and named
        actor right-of-reply workflow before any public claims can be published here.
      </SectionTitle>
      <Card className="border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-700 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-950">Publication gate not yet passed</h3>
            <p className="mt-2 leading-7 text-amber-900 text-sm">
              Ownership and control data involves named actors with reputational consequence. Per the institutional release gate, this section will not publish until entity resolution, exposure
              review, and right-of-reply workflows are complete for all named actors.
            </p>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Corporate structure", "Parent company, subsidiary, and operational entity relationships."],
          ["Beneficial ownership", "Ultimate beneficial owner identification and confidence level."],
          ["Concession holders", "Named license holders and public authority linkages."],
        ].map(([title, body]) => (
          <Card key={title} className="p-5 opacity-50">
            <h3 className="font-semibold text-stone-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
            <div className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-stone-400">Pending review</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Workspace() {
  const passedChecks = releaseChecks.filter(([, done]) => done).length;
  const totalChecks = releaseChecks.length;
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Review & release coordination" title="Operational workspace for stewardship checks">
        This restricted surface supports reviewers coordinating publication readiness safeguards and release discipline.
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
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-2xl font-semibold text-stone-950">Launch readiness gate</h3>
          <span className="rounded-full border border-[#C9A24D]/35 bg-[#C9A24D]/10 px-3 py-1 text-xs font-semibold text-[#7A5C18]">
            {passedChecks}/{totalChecks} checks passed
          </span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {releaseChecks.map(([label, done]) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3">
              {done ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <XCircle className="h-5 w-5 text-red-700" />}
              <span className="text-sm text-stone-700">{label}</span>
            </div>
          ))}
        </div>
      </Card>
      <ReleaseManifestPanel />
    </div>
  );
}

function AppContent({ active, onSelectSection }: { active: TabId; onSelectSection: (id: TabId) => void }) {
  if (active === "home") return <Home onSelectSection={onSelectSection} />;
  if (active === "dossier") return <Dossier onSelectSection={onSelectSection} />;
  if (active === "ownership") return <OwnershipControl />;
  if (active === "dashboard") return <Dashboard />;
  if (active === "ledger") return <Ledger />;
  if (active === "methods") return <Methods />;
  if (active === "safeguards") return <Safeguards />;
  if (active === "corrections") return <Corrections />;
  if (active === "workspace") return <Workspace />;
  return <Home onSelectSection={onSelectSection} />;
}

export default function EarthEndowmentObservatoryOneFileApp() {
  const [active, setActive] = useState<TabId>("home");

  const onSelectSection = useCallback((id: TabId) => {
    setActive(id);
    requestAnimationFrame(() => {
      document.getElementById(`eeo-tab-${id}`)?.focus();
    });
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]" style={EEO_ROOT_TOKENS}>
      <div className="border-b border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.55)] shadow-sm backdrop-blur-sm">
        <ReferenceStandardsStrip />
        <CorridorTabStrip active={active} onSelectSection={onSelectSection} />
      </div>
      <main
        id="eeo-section-panel"
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-12 pt-6 md:px-6 lg:px-8"
        role="tabpanel"
        aria-labelledby={`eeo-tab-${active}`}
      >
        <PublicMissionStrip />
        <AppContent active={active} onSelectSection={onSelectSection} />
      </main>
    </div>
  );
}
