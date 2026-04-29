"use client";

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
  ChevronRight,
  ClipboardCheck,
  Database,
  Eye,
  FileSearch,
  Filter,
  Fingerprint,
  Globe2,
  GitBranch,
  Landmark,
  Layers3,
  Lock,
  Map,
  MessageSquareWarning,
  Network,
  ScrollText,
  Search,
  ShieldCheck,
  Workflow,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import EeoLogo from "@/components/eeo/EeoLogo";

/**
 * Earth Endowment Observatory — One-File Corridor Prototype
 * Canonical posture: controlled evidence product first, limited dashboard second.
 * This file is intentionally self-contained for design review, product critique,
 * founder demos, and implementation handoff.
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
/* eslint-disable @typescript-eslint/no-unused-vars -- canonical enums are currently consumed by type unions */
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
  { id: "home", label: "Home", icon: Globe2 },
  { id: "dossier", label: "Evidence Dossier", icon: ScrollText },
  { id: "ownership", label: "Ownership + Control", icon: Building2 },
  { id: "dashboard", label: "Limited Dashboard", icon: Layers3 },
  { id: "ledger", label: "Evidence Ledger", icon: Database },
  { id: "methods", label: "Methods + Limits", icon: BookOpen },
  { id: "safeguards", label: "Safeguards", icon: ShieldCheck },
  { id: "corrections", label: "Corrections", icon: MessageSquareWarning },
  { id: "workspace", label: "Review Workspace", icon: Workflow },
];

/** Tab order for keyboard navigation (WAI-ARIA tablist) — must match `tabs` order. */
const SECTION_TAB_ORDER: TabId[] = tabs.map((t) => t.id);

/** Design tokens (CSS custom properties) — used for future theming; layout still uses Tailwind. */
const EEO_ROOT_TOKENS: CSSProperties = {
  ["--eeo-ink" as string]: "#11110F",
  ["--eeo-parchment" as string]: "#EFE8D8",
  ["--eeo-paper" as string]: "#F8F3E8",
  ["--eeo-blue" as string]: "#25465F",
  ["--eeo-copper" as string]: "#B66A3C",
  ["--eeo-gold" as string]: "#C9A24D",
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
    status: "Canonical core",
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
  ["No composite score present", true],
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

const BRAND_DOCTRINE: { title: string; body: string; icon: LucideIcon; tone: BadgeTone }[] = [
  {
    title: "Reveal the chain",
    body: "Make value pathways visible from endowment to public-benefit question.",
    icon: Eye,
    tone: "blue",
  },
  {
    title: "Inspect the claim",
    body: "Treat every assertion as reviewable and tied to explicit evidence.",
    icon: FileSearch,
    tone: "neutral",
  },
  {
    title: "Understand the source",
    body: "Show provenance, method, and conditions before interpretation.",
    icon: Archive,
    tone: "copper",
  },
  {
    title: "Respect the limit",
    body: "Publish with caveats and safeguards, never beyond what evidence supports.",
    icon: AlertTriangle,
    tone: "gold",
  },
  {
    title: "Challenge the record",
    body: "Keep correction and right-of-reply pathways open at all times.",
    icon: MessageSquareWarning,
    tone: "red",
  },
  {
    title: "Protect the vulnerable",
    body: "Tier, aggregate, suppress, or refuse exposure where harm is plausible.",
    icon: ShieldCheck,
    tone: "green",
  },
];

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

interface IndicatorCardData {
  name: string;
  family: string;
  value: string;
  unit: string;
  spatialScope: string;
  temporalScope: string;
  source: string;
  confidence: string;
  granularity: string;
  interpretationType: string;
  limitation: string;
  misuse: string;
  disclosureTier: string;
}

const indicatorCards: IndicatorCardData[] = [
  {
    name: "Reported occupational injury rate",
    family: "Labor",
    value: "Sector-level proxy — not site-verified",
    unit: "qualitative",
    spatialScope: "National",
    temporalScope: "Latest available year",
    source: "ILOSTAT; ILO sectoral reports",
    confidence: "Estimated",
    granularity: "national-level",
    interpretationType: "diagnostic",
    limitation: "National or sectoral data may not reflect site-level conditions. Informal and subcontracted work is likely undercounted.",
    misuse: "Do not use as a site-level safety finding or worker-level diagnosis.",
    disclosureTier: "tier_1_contextual_public",
  },
  {
    name: "Land disturbance signal near corridor",
    family: "Ecology",
    value: "Elevated — proximity signal only",
    unit: "qualitative",
    spatialScope: "Corridor-level buffer",
    temporalScope: "2020–present",
    source: "Global Forest Watch; public remote-sensing releases",
    confidence: "Modeled",
    granularity: "corridor-level",
    interpretationType: "contextual",
    limitation: "Spatial proximity does not prove causation. Sensitive ecological coordinates are generalized or withheld.",
    misuse: "Do not use as proof that a specific operator caused a specific ecological event.",
    disclosureTier: "tier_2_aggregated",
  },
  {
    name: "Disclosed public revenue (royalties + taxes)",
    family: "Public revenue",
    value: "Partial EITI disclosure",
    unit: "qualitative",
    spatialScope: "National / subnational where public",
    temporalScope: "Latest EITI reporting year",
    source: "EITI country disclosure; budget documents where available",
    confidence: "Official",
    granularity: "national-level",
    interpretationType: "normative question",
    limitation: "Disclosed revenue does not prove durable public benefit. Budget-use evidence is separate.",
    misuse: "Do not use as proof that revenue produced welfare or community development outcomes.",
    disclosureTier: "tier_1_contextual_public",
  },
];

function IndicatorCard({ card }: { card: IndicatorCardData }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">{card.family}</div>
          <div className="mt-0.5 font-semibold text-stone-950">{card.name}</div>
        </div>
        <Badge tone="neutral">{card.interpretationType}</Badge>
      </div>
      <div className="text-lg font-semibold text-stone-800">
        {card.value}
        {card.unit !== "qualitative" && <span className="ml-1 text-sm font-normal text-stone-500">{card.unit}</span>}
      </div>
      <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
        <Meta label="Source" value={card.source} />
        <Meta label="Confidence" value={card.confidence} />
        <Meta label="Spatial scope" value={card.spatialScope} />
        <Meta label="Temporal scope" value={card.temporalScope} />
        <Meta label="Granularity" value={card.granularity.replace(/-/g, " ")} />
        <Meta label="Disclosure tier" value={TIER_LABELS[card.disclosureTier] ?? card.disclosureTier} />
      </div>
      <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
        <strong>Limit: </strong>
        {card.limitation}
      </div>
      <div className="mt-2 rounded-2xl border border-red-100 bg-red-50 p-3 text-sm text-red-900">
        <strong>Do not use to: </strong>
        {card.misuse}
      </div>
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

function GlobalBodiesStrip() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAllOpen, setIsAllOpen] = useState(false);
  const bodies = [
    "UN",
    "World Bank",
    "UNEP",
    "ILO",
    "UNESCO",
    "FAO",
    "OECD",
    "EITI",
    "IPBES",
    "UN Global Compact",
  ];

  return (
    <div className="w-full border-b border-[#C9A24D]/30 bg-[#0F2A32]/95 text-[#EFE8D8] backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs md:px-6 lg:px-8">
        <span className="font-mono tracking-[0.18em] text-[#C9A24D]">CANONICAL GLOBAL BODIES &amp; STANDARDS</span>

        <div className="hidden flex-wrap items-center gap-2 text-[#E6E1D6]/85 md:flex">
          {bodies.map((body, idx) => (
            <React.Fragment key={body}>
              <span className="opacity-85 transition hover:opacity-100">{body}</span>
              {idx < bodies.length - 1 ? <span className="text-[#C9A24D]/70">·</span> : null}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-[#E6E1D6]/90 transition hover:text-[#EFE8D8] md:hidden"
            aria-expanded={isMobileOpen}
            aria-controls="global-bodies-mobile"
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            Global bodies
          </button>
          <button
            type="button"
            className="text-[#C9A24D] transition hover:underline"
            aria-expanded={isAllOpen}
            aria-controls="global-bodies-expanded"
            onClick={() => setIsAllOpen((v) => !v)}
          >
            See all
          </button>
        </div>
      </div>

      {isMobileOpen ? (
        <div id="global-bodies-mobile" className="border-t border-[#C9A24D]/20 px-4 py-2 md:hidden">
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap text-[#E6E1D6]/85">
            {bodies.map((body) => (
              <span key={`mobile-${body}`} className="rounded-full border border-[#C9A24D]/25 px-2.5 py-1 text-[11px]">
                {body}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {isAllOpen ? (
        <div id="global-bodies-expanded" className="border-t border-[#C9A24D]/20 px-4 py-3 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C9A24D]">Canonical institutions (expanded)</div>
            <div className="flex flex-wrap gap-2 text-xs text-[#E6E1D6]/90">
              {[
                "United Nations",
                "World Bank Group",
                "UNEP",
                "ILO",
                "UNESCO",
                "FAO",
                "OECD",
                "EITI",
                "IPBES",
                "UN Global Compact",
              ].map((body) => (
                <span key={`expanded-${body}`} className="rounded-full border border-[#C9A24D]/30 bg-[#0f2a32]/80 px-2.5 py-1">
                  {body}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ShellHeader({ active, onSelectSection }: { active: TabId; onSelectSection: (id: TabId) => void }) {
  return (
    <header className="border-b border-stone-200 bg-[#F8F3E8]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={() => onSelectSection("home")}
            className="group flex items-center gap-3 text-left"
            aria-label="Earth Endowment Observatory, go to Home"
          >
            <EeoLogo decorative priority size="md" />
            <div>
              <div className="font-serif text-xl font-semibold tracking-tight text-stone-950">Earth Endowment Observatory</div>
              <div className="text-xs text-stone-600">From Earth to economy, made visible.</div>
            </div>
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="dark" icon={ShieldCheck}>Governed visibility</Badge>
            <Badge tone="blue" icon={FileSearch}>Evidence product first</Badge>
            <Badge tone="copper" icon={AlertTriangle}>No scores in MVP</Badge>
          </div>
        </div>
        <nav
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Corridor sections"
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
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
                active === id
                  ? "border-stone-950 bg-stone-950 text-white"
                  : "border-stone-300 bg-white/60 text-stone-700 hover:border-stone-500 hover:bg-white"
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

function ReleaseSystemSurface() {
  return (
    <section className="mb-5 overflow-hidden rounded-2xl border border-[#C9A24D]/30 bg-[#0F2A32]/95 text-[#EFE8D8] shadow-sm backdrop-blur-sm">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A24D]/70 to-transparent" />
      <div className="px-4 py-3 md:px-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#C9A24D]/40 bg-[#C9A24D]/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A24D]">
              Release system
            </span>
            <span className="rounded-full border border-[#E6E1D6]/30 px-2.5 py-1 text-xs text-[#E6E1D6]">Corridor pilot · Draft</span>
            <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-1 text-xs text-amber-100">Unsigned manifest</span>
          </div>
          <div className="text-xs text-[#E6E1D6]/80">Status: internal review active · public correction route required at launch</div>
        </div>

        <div className="mt-3 grid gap-2 text-xs text-[#E6E1D6]/80 md:grid-cols-4">
          <div className="rounded-xl border border-[#C9A24D]/20 bg-[#0f2a32]/75 px-3 py-2">Standards: EITI, OECD due diligence, ILO framing</div>
          <div className="rounded-xl border border-[#C9A24D]/20 bg-[#0f2a32]/75 px-3 py-2">Governance: methods, legal, safeguards, exposure review</div>
          <div className="rounded-xl border border-[#C9A24D]/20 bg-[#0f2a32]/75 px-3 py-2">Publication: evidence-first, no composite score</div>
          <div className="rounded-xl border border-[#C9A24D]/20 bg-[#0f2a32]/75 px-3 py-2">Accountability: right-of-reply + corrections always open</div>
        </div>
      </div>
    </section>
  );
}

function Home({ onSelectSection }: { onSelectSection: (id: TabId) => void }) {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C9A24D]/30 bg-[#0F2A32] text-white shadow-xl">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full border border-[#C9A24D]/60" />
          <div className="absolute right-[-5%] top-[10%] h-[32rem] w-[32rem] rounded-full border border-[#25465F]" />
          <div className="absolute bottom-[-20%] left-[28%] h-[28rem] w-[28rem] rounded-full border border-[#B66A3C]" />
        </div>
        <div className="relative grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12 lg:p-16">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.22em] text-stone-200">
              Canonical web-app systems specification v2.0
            </div>
            <h1 className="max-w-4xl font-serif text-5xl font-semibold tracking-tight md:text-7xl">
              See the source. Follow the value. Know the evidence.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-200">
              A governed civic intelligence system for Earth’s endowment-to-economy chain — connecting evidence about natural endowments, governance, ownership, labor, trade, ecological condition, public revenue, and value capture without claiming authority over the chain.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onSelectSection("dossier")}
                className="rounded-full bg-[#C9A24D] px-5 py-3 text-sm font-semibold text-stone-950 shadow-sm hover:brightness-105"
              >
                Open evidence dossier
              </button>
              <button
                type="button"
                onClick={() => onSelectSection("ledger")}
                className="rounded-full border border-[#C9A24D]/45 bg-[#0f2a32]/40 px-5 py-3 text-sm font-semibold text-[#EFE8D8] transition hover:bg-[#C9A24D]/12"
              >
                Inspect evidence ledger
              </button>
              <button
                type="button"
                onClick={() => onSelectSection("workspace")}
                className="rounded-full border border-[#C9A24D]/35 bg-[#0f2a32]/30 px-5 py-3 text-sm font-semibold text-[#EFE8D8] transition hover:bg-[#C9A24D]/10"
              >
                View review workspace
              </button>
            </div>
          </div>
          <Card className="bg-white/10 p-5 text-white ring-1 ring-white/10">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-full bg-[#B66A3C]/20 p-2"><GitBranch className="h-5 w-5 text-[#E8B08B]" /></div>
              <div>
                <div className="font-semibold">True MVP loop</div>
                <div className="text-xs text-stone-300">Controlled evidence product first</div>
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
        <SectionTitle eyebrow="User test" title="Can a user answer who benefits, who bears cost, and why?">
          The current release should make these three answers explicit in every high-impact domain. This lens is now part of the evidence reading flow, not a separate interpretation layer.
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(EQUITY_LENS).map(([domain]) => (
            <BenefitCostWhyPanel key={domain} domain={domain} title={domain} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Strategic scope freeze" title="One corridor. One evidence standard. One launch gate.">
          The repaired build narrows ambition into an inspectable public release: one flagship evidence dossier, one limited corridor dashboard, one evidence ledger, one internal review workspace, one correction workflow, one signed release manifest.
        </SectionTitle>
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-stone-500">Brand design doctrine</div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {BRAND_DOCTRINE.map((item) => (
            <Principle key={item.title} icon={item.icon} title={item.title} body={item.body} tone={item.tone} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Corridor hypothesis" title="Copper-cobalt critical-minerals corridor">
          The first pilot follows a narrowed endowment-to-economy path and proves that EEO can make strong claims inspectable while making unsafe exposure impossible.
        </SectionTitle>
        <Card className="p-6">
          <Chain />
        </Card>
      </section>
    </div>
  );
}

function Principle({ icon: Icon, title, body, tone = "neutral" }: { icon: LucideIcon; title: string; body: string; tone?: BadgeTone }) {
  const iconBgByTone: Record<BadgeTone, string> = {
    neutral: "bg-stone-900",
    blue: "bg-blue-900",
    green: "bg-emerald-900",
    copper: "bg-orange-900",
    red: "bg-red-900",
    gold: "bg-yellow-700",
    dark: "bg-stone-950",
  };
  return (
    <Card className="p-6">
      <div className={cls("mb-4 inline-flex rounded-2xl p-3 text-white", iconBgByTone[tone])}><Icon className="h-5 w-5" /></div>
      <h3 className="text-lg font-semibold text-stone-950">{title}</h3>
      <p className="mt-2 leading-7 text-stone-600">{body}</p>
    </Card>
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
      <SectionTitle eyebrow="Public product 01" title="Flagship corridor evidence dossier">
        Narrative-first, evidence-visible, uncertainty-labeled, map-supported. This is the first public product; the dashboard is secondary.
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
              Limited Dashboard
            </button>{" "}
            map panel.
          </p>
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Section 4" title="What this release does not claim" />
        <Card className="border-red-200 bg-red-50 p-6 text-sm leading-6 text-red-950">
          <strong>What it does not claim:</strong> no certification, no legal finding, no global score, no traceability proof, no public community-reporting system, no universal atlas.
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
            Limited Dashboard
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
        <div className="grid gap-4">
          {indicatorCards.map((card) => (
            <IndicatorCard key={card.name} card={card} />
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
        <Card className="border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">Stub — version identifier, change log, and sign-off will attach at publication; this dossier is a draft prototype.</Card>
      </section>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Signal preview — not evidence" title="Map-supported, not map-dominated">
        The interface makes users ask: what is known, how is it known, what is uncertain, what is withheld, who can challenge it, and who benefits versus who bears cost.
      </SectionTitle>
      <Card className="p-5">
        <h3 className="text-lg font-semibold text-stone-950">Benefit-Cost-Why quick read</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Before reading map modules, users can start with a direct accountability frame for each domain.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {Object.entries(EQUITY_LENS).map(([domain]) => (
            <BenefitCostWhyPanel key={domain} domain={domain} title={domain} compact />
          ))}
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-stone-50 px-5 py-4">
            <div>
              <div className="font-semibold text-stone-950">Safe-resolution corridor map</div>
              <div className="text-xs text-stone-500">Public geometry is generalized until map-safety review approves detail.</div>
            </div>
            <Badge tone="copper" icon={Map}>Placeholder · pending map-safety review</Badge>
          </div>
          <div className="relative h-[460px] overflow-hidden bg-[#DED4BF]">
            <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(17,17,15,.25) 1px, transparent 0)", backgroundSize: "28px 28px" }} />
            <div className="absolute left-[10%] top-[18%] z-0 h-64 w-80 rotate-[-14deg] rounded-[45%] border-2 border-[#4B3728]/50 bg-[#4B3728]/5" />
            <div className="absolute right-[18%] top-[22%] z-0 h-72 w-56 rotate-[18deg] rounded-[45%] border-2 border-[#3F5A45]/50 bg-[#3F5A45]/5" />
            <div className="absolute bottom-[22%] left-[22%] z-0 h-2 w-[52%] rotate-[-5deg] rounded-full bg-[#B66A3C]/70" />
            <div className="absolute bottom-[29%] left-[31%] z-0 h-2 w-[40%] rotate-[10deg] rounded-full bg-[#25465F]/70" />
            {["Resource context", "Public authority", "Processing node", "Export flow", "Ecological signal"].map((label, i) => (
              <div key={label} className="absolute z-0 rounded-full border border-stone-900 bg-white px-3 py-2 text-xs font-semibold shadow" style={{ left: `${16 + i * 14}%`, top: `${22 + (i % 2) * 34}%` }}>
                {label}
              </div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="rounded-2xl border border-stone-300 bg-white/80 px-5 py-3 text-sm font-semibold text-stone-600 backdrop-blur shadow-sm">
                Map geometry pending safety review
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-stone-300 bg-white/90 p-4 text-sm text-stone-700 shadow">
              <strong>Map safety notice:</strong> exact sensitive coordinates, artisanal mining locations, community reports, sacred sites, and vulnerable ecological locations are not displayed.
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          <ModuleCard title="Governance profile" icon={Landmark} items={["Jurisdiction and public authority", "License / concession records", "Contract availability", "Rights and sovereignty notes", "Disclosure gaps"]} />
          <ModuleCard title="Value-chain view" icon={Network} items={["Extraction context", "Processing pathway", "Reported trade flows", "Downstream hypothesis", "No traceability overclaim"]} />
          <div className="grid gap-4">
            {indicatorCards.map((card) => (
              <IndicatorCard key={card.name} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ title, icon: Icon, items }: { title: string; icon: LucideIcon; items: string[] }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-stone-950 p-2 text-white"><Icon className="h-4 w-4" /></div>
        <h3 className="font-semibold text-stone-950">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-stone-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <ChevronRight className="mt-0.5 h-4 w-4 text-stone-400" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
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
      <SectionTitle eyebrow="Public credibility engine" title="Evidence Ledger">
        Inspectable claims, sources, methods, dates, confidence labels, legal posture, disclosure tiers, limitations, review status, and stale-after dates.
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
    <div
      className="min-h-screen bg-[#EFE8D8] text-stone-950"
      style={EEO_ROOT_TOKENS}
    >
      <div className="sticky top-0 z-50 shadow-[0_1px_0_rgba(201,162,77,0.2)]">
        <GlobalBodiesStrip />
        <ShellHeader active={active} onSelectSection={onSelectSection} />
      </div>
      <main
        id="eeo-section-panel"
        className="mx-auto max-w-7xl px-4 pb-8 pt-6 md:px-6 lg:px-8"
        role="tabpanel"
        aria-labelledby={`eeo-tab-${active}`}
      >
        <ReleaseSystemSurface />
        <AppContent active={active} onSelectSection={onSelectSection} />
      </main>
      <footer className="mt-20 border-t border-[#C9A24D]/30 bg-[#0F2A32] px-4 py-10 text-[#EFE8D8] md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="font-serif text-2xl font-semibold">Earth Endowment Observatory</div>
              <p className="mt-3 max-w-3xl leading-7 text-[#E6E1D6]/85">
                A governance-first public-interest evidence system aligned with global norms for transparency, safeguards, accountability, and correction.
              </p>
            </div>
            <div className="rounded-3xl border border-[#C9A24D]/30 bg-[#0f2a32]/80 p-5 backdrop-blur-sm">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#C9A24D]">Architecture law</div>
              <p className="mt-2 leading-7 text-[#EFE8D8]">
                The chain must be made visible without making vulnerable people, places, species, or knowledge more vulnerable.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#C9A24D]">Canonical partners</div>
              <div className="flex flex-wrap gap-2">
                {["UN", "World Bank", "UNEP", "ILO", "UNESCO", "FAO", "OECD", "EITI", "IPBES", "UN Global Compact"].map((item) => (
                  <span key={item} className="rounded-full border border-[#C9A24D]/25 px-2.5 py-1 text-xs text-[#E6E1D6]/85">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#C9A24D]">Contributors</div>
              <ul className="space-y-1.5 text-sm text-[#E6E1D6]/85">
                {["Methods reviewers", "Legal reviewers", "Safeguards reviewers", "Exposure and labor reviewers", "Editorial and release owners"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#C9A24D]">Standards references</div>
              <ul className="space-y-1.5 text-sm text-[#E6E1D6]/85">
                {["EITI disclosure practices", "UN Guiding Principles context", "ILO labor standards framing", "UNEP environmental evidence cautions", "OECD due diligence principles"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-[#C9A24D]/25 pt-4 text-xs text-[#E6E1D6]/70 md:flex-row md:items-center md:justify-between">
            <span>Institutional prototype layer · Canonical corridor release frame</span>
            <span>Evidence first · Dashboard second · Corrections always open</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
