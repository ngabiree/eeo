"use client";

import React, { useCallback, useMemo, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Database,
  Eye,
  FileSearch,
  Filter,
  Fingerprint,
  Globe2,
  Gavel,
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

/**
 * Earth Endowment Observatory — One-File Corridor Prototype
 * Canonical posture: controlled evidence product first, limited dashboard second.
 * This file is intentionally self-contained for design review, product critique,
 * founder demos, and implementation handoff.
 */

type TabId =
  | "home"
  | "dossier"
  | "dashboard"
  | "ledger"
  | "methods"
  | "safeguards"
  | "corrections"
  | "workspace";

type BadgeTone = "neutral" | "blue" | "green" | "copper" | "red" | "gold" | "dark";

type Claim = {
  id: string;
  layer: string;
  type: string;
  confidence: string;
  tier: string;
  domain: string;
  claim: string;
  source: string;
  method: string;
  granularity: string;
  posture: string;
  limitation: string;
  status: string;
  stale: string;
};

type EcosystemModule = {
  title: string;
  status: string;
  icon: LucideIcon;
  body: string;
};

const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: Globe2 },
  { id: "dossier", label: "Evidence Dossier", icon: ScrollText },
  { id: "dashboard", label: "Limited Dashboard", icon: Layers3 },
  { id: "ledger", label: "Evidence Ledger", icon: Database },
  { id: "methods", label: "Methods + Limits", icon: BookOpen },
  { id: "safeguards", label: "Safeguards", icon: ShieldCheck },
  { id: "corrections", label: "Corrections", icon: MessageSquareWarning },
  { id: "workspace", label: "Review Workspace", icon: Workflow },
];

/** Tab order for keyboard navigation (WAI-ARIA tablist) — must match `tabs` order. */
const SECTION_TAB_ORDER: TabId[] = tabs.map((t) => t.id);

const claims: Claim[] = [
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

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cls("rounded-3xl border border-stone-200 bg-white/80 shadow-sm backdrop-blur", className)}>{children}</div>;
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

function ClaimCard({ claim, compact = false }: { claim: Claim; compact?: boolean }) {
  const tone: BadgeTone =
    claim.confidence === "Official" ? "blue" : claim.confidence === "Modeled" ? "copper" : claim.confidence === "Estimated" ? "gold" : "neutral";
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

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">{label}</div>
      <div className="mt-1 leading-6 text-stone-700">{value}</div>
    </div>
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
  let nextId: TabId | undefined;
  switch (e.key) {
    case "ArrowRight":
      e.preventDefault();
      nextId = SECTION_TAB_ORDER[(idx + 1) % SECTION_TAB_ORDER.length]!;
      break;
    case "ArrowLeft":
      e.preventDefault();
      nextId = SECTION_TAB_ORDER[(idx - 1 + SECTION_TAB_ORDER.length) % SECTION_TAB_ORDER.length]!;
      break;
    case "Home":
      e.preventDefault();
      nextId = SECTION_TAB_ORDER[0]!;
      break;
    case "End":
      e.preventDefault();
      nextId = SECTION_TAB_ORDER[SECTION_TAB_ORDER.length - 1]!;
      break;
    default:
      return;
  }
  onSelectSection(nextId);
}

function ShellHeader({ active, onSelectSection }: { active: TabId; onSelectSection: (id: TabId) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#F8F3E8]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={() => onSelectSection("home")}
            className="group flex items-center gap-3 text-left"
            aria-label="Earth Endowment Observatory, go to Home"
          >
            <div className="relative grid h-12 w-12 place-items-center rounded-full border border-stone-900 bg-stone-950 text-[#EFE8D8] shadow-sm">
              <div className="absolute inset-2 rounded-full border border-[#C9A24D]/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#C9A24D] shadow-[0_0_0_5px_rgba(201,162,77,0.16)]" />
            </div>
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

function Home({ onSelectSection }: { onSelectSection: (id: TabId) => void }) {
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
                className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Inspect evidence ledger
              </button>
              <button
                type="button"
                onClick={() => onSelectSection("workspace")}
                className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
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
        <SectionTitle eyebrow="Strategic scope freeze" title="One corridor. One evidence standard. One launch gate.">
          The repaired build narrows ambition into an inspectable public release: one flagship evidence dossier, one limited corridor dashboard, one evidence ledger, one internal review workspace, one correction workflow, one signed release manifest.
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          <Principle icon={Eye} title="Reveal the chain" body="Make endowment transformation visible from source to public-benefit question without claiming control." />
          <Principle icon={ShieldCheck} title="Protect the vulnerable" body="Tier, aggregate, suppress, or refuse data when publication could create harm." />
          <Principle icon={Gavel} title="Do not adjudicate" body="Describe evidence, disputes, risks, and gaps. Do not determine title, liability, legality, consent, or fault." />
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

function Principle({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <Card className="p-6">
      <div className="mb-4 inline-flex rounded-2xl bg-stone-950 p-3 text-white"><Icon className="h-5 w-5" /></div>
      <h3 className="text-lg font-semibold text-stone-950">{title}</h3>
      <p className="mt-2 leading-7 text-stone-600">{body}</p>
    </Card>
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
        <div className="space-y-4">
          {claims.slice(0, 3).map((claim) => <ClaimCard key={claim.id} claim={claim} compact />)}
        </div>
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Filter (not available in this prototype)"
            title="Not implemented in prototype"
            disabled
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
  return (
    <div className="space-y-8">
      <SectionTitle eyebrow="Challenge route" title="Correction, right-of-reply, and exposure concern intake">
        A public release is not complete unless affected parties can challenge factual accuracy, stale information, disclosure harm, confidence labels, identity conflation, legal misdescription, and community-rights violations.
      </SectionTitle>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="p-6">
          <h3 className="font-serif text-2xl font-semibold text-stone-950">Submit a challenge</h3>
          <div className="mt-5 space-y-4">
            <p className="text-sm text-stone-600">
              This form is a UI shell only. Do not send sensitive information; backend intake is not connected.
            </p>
            <input
              placeholder="Name or institution"
              autoComplete="organization"
              aria-label="Name or institution (optional)"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <input
              type="email"
              placeholder="Contact email"
              autoComplete="email"
              aria-label="Contact email (optional)"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <select
              aria-label="Challenge type"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900"
              defaultValue="Factual correction"
            >
              <option value="Factual correction">Factual correction</option>
              <option value="Exposure concern">Exposure concern</option>
              <option value="Right-of-reply">Right-of-reply</option>
              <option value="Outdated source">Outdated source</option>
              <option value="Identity conflation">Identity conflation</option>
              <option value="Legal misdescription">Legal misdescription</option>
            </select>
            <textarea
              placeholder="Describe the issue, claim ID, source, or safety concern…"
              rows={6}
              aria-label="Description of the challenge, claim ID, or safety concern"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-900"
            />
            <button
              type="button"
              className="w-full rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-800"
              title="Not connected in this prototype"
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

function Workspace() {
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
        <h3 className="font-serif text-2xl font-semibold text-stone-950">Launch readiness gate</h3>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {releaseChecks.map(([label, done]) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3">
              {done ? <CheckCircle2 className="h-5 w-5 text-emerald-700" /> : <XCircle className="h-5 w-5 text-red-700" />}
              <span className="text-sm text-stone-700">{label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AppContent({ active, onSelectSection }: { active: TabId; onSelectSection: (id: TabId) => void }) {
  if (active === "home") return <Home onSelectSection={onSelectSection} />;
  if (active === "dossier") return <Dossier />;
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
    <div className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <ShellHeader active={active} onSelectSection={onSelectSection} />
      <main
        id="eeo-section-panel"
        className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8"
        role="tabpanel"
        aria-labelledby={`eeo-tab-${active}`}
      >
        <AppContent active={active} onSelectSection={onSelectSection} />
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
