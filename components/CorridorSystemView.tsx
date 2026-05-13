"use client";

import React from "react";
import "./corridor-system-view.css";

type CardId =
  | "historical-record"
  | "evidence-gaps"
  | "shared-inquiry-field"
  | "ecology-system"
  | "water-system"
  | "human-governance-system"
  | "restoration-pathway";

type Card = {
  id: CardId;
  title: string;
  body: string;
  kind: "record" | "gap" | "inquiry" | "ecology" | "water" | "governance" | "restoration";
  icon: React.ReactNode;
};

const cards: Card[] = [
  {
    id: "historical-record",
    title: "Historical Record",
    body: "Public documents, chronology, claims, prior extraction, governance record.",
    kind: "record",
    icon: <DocumentIcon />,
  },
  {
    id: "evidence-gaps",
    title: "Evidence Gaps",
    body: "Unknown, stale, disputed, restricted, unsafe, or not-yet-verified evidence.",
    kind: "gap",
    icon: <SearchIcon />,
  },
  {
    id: "shared-inquiry-field",
    title: "Shared Inquiry Field",
    body: "Where evidence, ecology, water, labor, governance, and public-benefit questions meet.",
    kind: "inquiry",
    icon: <PeopleIcon />,
  },
  {
    id: "ecology-system",
    title: "Ecology System",
    body: "Land, biodiversity, habitat, soil, carbon, ecosystem condition.",
    kind: "ecology",
    icon: <LeafIcon />,
  },
  {
    id: "water-system",
    title: "Water System",
    body: "Watershed, stress, seasonality, access, pollution pathways.",
    kind: "water",
    icon: <DropIcon />,
  },
  {
    id: "human-governance-system",
    title: "Human / Governance System",
    body: "Labor, rights, authority, stewardship, consent, public benefit.",
    kind: "governance",
    icon: <ShieldIcon />,
  },
  {
    id: "restoration-pathway",
    title: "Restoration Pathway",
    body: "Repair, monitoring, stewardship, public benefit, future capability.",
    kind: "restoration",
    icon: <SproutIcon />,
  },
];

export const corridorSystemLinks = {
  "historical-record": {
    asset: "/pilot/corridor/assets/historical-record",
    page: "/pilot/corridor/historical-record",
    expansion: "/pilot/corridor?expand=historical-record",
  },
  "evidence-gaps": {
    asset: "/pilot/corridor/assets/evidence-gaps",
    page: "/pilot/corridor/evidence-gaps",
    expansion: "/pilot/corridor?expand=evidence-gaps",
  },
  "shared-inquiry-field": {
    asset: "/pilot/corridor/assets/shared-inquiry-field",
    page: "/pilot/corridor/shared-inquiry-field",
    expansion: "/pilot/corridor?expand=shared-inquiry-field",
  },
  "ecology-system": {
    asset: "/pilot/corridor/assets/ecology-system",
    page: "/pilot/corridor/ecology-system",
    expansion: "/pilot/corridor?expand=ecology-system",
  },
  "water-system": {
    asset: "/pilot/corridor/assets/water-system",
    page: "/pilot/corridor/water-system",
    expansion: "/pilot/corridor?expand=water-system",
  },
  "human-governance-system": {
    asset: "/pilot/corridor/assets/human-governance-system",
    page: "/pilot/corridor/human-governance-system",
    expansion: "/pilot/corridor?expand=human-governance-system",
  },
  "restoration-pathway": {
    asset: "/pilot/corridor/assets/restoration-pathway",
    page: "/pilot/corridor/restoration-pathway",
    expansion: "/pilot/corridor?expand=restoration-pathway",
  },
} as const;

export default function CorridorSystemView() {
  const cardById = Object.fromEntries(cards.map((card) => [card.id, card])) as Record<CardId, Card>;

  return (
    <section className="csv-shell" aria-labelledby="corridor-system-title">
      <div className="csv-header">
        <div>
          <p className="csv-eyebrow">Corridor system view</p>
          <div className="csv-title-row">
            <h1 id="corridor-system-title">Corridor system view</h1>
            <span className="csv-pill">Safe-resolution view</span>
          </div>
          <p className="csv-subtitle">
            How public evidence, ecological systems, water systems, human governance, and restoration
            questions relate inside a safe-resolution corridor view.
          </p>
        </div>
      </div>

      <div className="csv-diagram" role="img" aria-label="Relationship diagram for corridor system view">
        <LayerLabel className="layer-evidence" icon={<DocumentIcon />} label="Evidence layer" />
        <LayerLabel className="layer-inquiry" icon={<PeopleIcon />} label="Shared inquiry layer" />
        <LayerLabel className="layer-system" icon={<StackIcon />} label="System layer" />
        <LayerLabel className="layer-response" icon={<LeafIcon />} label="Future response" />

        <ConnectorSvg />

        <DiagramCard card={cardById["historical-record"]} className="card-record" />
        <DiagramCard card={cardById["evidence-gaps"]} className="card-gap" />
        <DiagramCard card={cardById["shared-inquiry-field"]} className="card-inquiry" />
        <DiagramCard card={cardById["ecology-system"]} className="card-ecology" />
        <DiagramCard card={cardById["water-system"]} className="card-water" />
        <DiagramCard card={cardById["human-governance-system"]} className="card-governance" />
        <DiagramCard card={cardById["restoration-pathway"]} className="card-restoration" />
      </div>

      <div className="csv-safety-note">
        <span className="csv-note-icon">
          <ShieldIcon />
        </span>
        <p>
          <strong>Inquiry view only.</strong> Not a legal map, title map, concession map, site map,
          custody map, or causation finding. Sensitive locations are withheld, masked, or generalized.
        </p>
      </div>

      <div className="csv-explain-grid">
        <InfoPanel icon={<BookIcon />} title="How to read this view">
          This diagram is a relationship architecture, not a geographic map. It shows how documented
          evidence and evidence gaps feed a shared inquiry field, where ecological, water, labor,
          governance, and public-benefit questions are considered together. The ecology, water, and
          human / governance systems interact with one another, and together they shape the restoration
          pathway.
        </InfoPanel>

        <InfoPanel icon={<HorizonIcon />} title="Why this matters">
          The view helps frame inquiry safely and transparently. It does not verify exact locations,
          ownership, rights, concession boundaries, causation, or material custody. Instead, it clarifies
          how themes relate and where further investigation, stewardship, and public-benefit decisions
          must connect.
        </InfoPanel>
      </div>
    </section>
  );
}

function DiagramCard({ card, className }: { card: Card; className: string }) {
  return (
    <article className={`csv-card csv-card-${card.kind} ${className}`}>
      <a className="csv-card-asset" href={corridorSystemLinks[card.id].asset} aria-label={`Open assets for ${card.title}`}>
        {card.icon}
      </a>

      <div className="csv-card-content">
        <a className="csv-card-title-link" href={corridorSystemLinks[card.id].page}>
          <h2>{card.title}</h2>
        </a>

        <a className="csv-card-body-link" href={corridorSystemLinks[card.id].expansion}>
          <p>{card.body}</p>
          <span className="csv-card-action">Open inquiry →</span>
        </a>
      </div>
    </article>
  );
}

function LayerLabel({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className: string;
}) {
  return (
    <div className={`csv-layer-label ${className}`}>
      <span>{icon}</span>
      <strong>{label}</strong>
    </div>
  );
}

function InfoPanel({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="csv-info-panel">
      <span className="csv-info-icon">{icon}</span>
      <div>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
    </article>
  );
}

function ConnectorSvg() {
  return (
    <svg className="csv-connectors" viewBox="0 0 1400 720" aria-hidden="true">
      <defs>
        <marker
          id="csv-arrow"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M1,1 L11,6 L1,11 Z" />
        </marker>

        <marker
          id="csv-arrow-start"
          markerWidth="12"
          markerHeight="12"
          refX="2"
          refY="6"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M11,1 L1,6 L11,11 Z" />
        </marker>
      </defs>

      <path className="csv-arrow" d="M 520 92 L 660 92" markerEnd="url(#csv-arrow)" />

      <path
        className="csv-arrow"
        d="M 350 162 C 350 205 385 216 455 216 L 455 248"
        markerEnd="url(#csv-arrow)"
      />
      <path
        className="csv-arrow"
        d="M 1010 162 C 1010 205 970 216 840 216 L 840 248"
        markerEnd="url(#csv-arrow)"
      />

      <path
        className="csv-arrow"
        d="M 700 372 L 700 422 M 700 422 L 300 422 C 250 422 235 438 235 475"
        markerEnd="url(#csv-arrow)"
      />
      <path className="csv-arrow" d="M 700 372 L 700 475" markerEnd="url(#csv-arrow)" />
      <path
        className="csv-arrow"
        d="M 700 422 L 1110 422 C 1160 422 1175 438 1175 475"
        markerEnd="url(#csv-arrow)"
      />

      <line
        className="csv-arrow"
        x1="445"
        y1="545"
        x2="565"
        y2="545"
        markerStart="url(#csv-arrow-start)"
        markerEnd="url(#csv-arrow)"
      />
      <line
        className="csv-arrow"
        x1="835"
        y1="545"
        x2="955"
        y2="545"
        markerStart="url(#csv-arrow-start)"
        markerEnd="url(#csv-arrow)"
      />

      <path
        className="csv-arrow"
        d="M 295 600 C 295 645 370 650 510 650 L 545 650"
        markerEnd="url(#csv-arrow)"
      />
      <path className="csv-arrow" d="M 700 600 L 700 650" markerEnd="url(#csv-arrow)" />
      <path
        className="csv-arrow"
        d="M 1115 600 C 1115 645 1030 650 850 650 L 815 650"
        markerEnd="url(#csv-arrow)"
      />
    </svg>
  );
}

/* Icons */

function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" focusable="false" aria-hidden="true">
      {children}
    </svg>
  );
}

function DocumentIcon() {
  return (
    <IconBase>
      <path d="M15 8h13l7 7v25H15z" />
      <path d="M28 8v8h7" />
      <path d="M20 23h10M20 29h10M20 35h7" />
    </IconBase>
  );
}

function SearchIcon() {
  return (
    <IconBase>
      <circle cx="21" cy="21" r="10" />
      <path d="M29 29l10 10" />
    </IconBase>
  );
}

function PeopleIcon() {
  return (
    <IconBase>
      <circle cx="18" cy="18" r="5" />
      <circle cx="31" cy="18" r="5" />
      <path d="M9 38c1.5-8 6-12 12-12s10.5 4 12 12" />
      <path d="M23 38c1-6.5 4.5-10 9.5-10s8.5 3.5 10 10" />
    </IconBase>
  );
}

function LeafIcon() {
  return (
    <IconBase>
      <path d="M10 34C12 17 25 9 39 11c-1 16-12 27-29 23z" />
      <path d="M10 34c8-10 17-15 27-20" />
    </IconBase>
  );
}

function DropIcon() {
  return (
    <IconBase>
      <path d="M24 6c10 13 15 21 15 29a15 15 0 0 1-30 0c0-8 5-16 15-29z" />
      <path d="M17 33c1 5 4 8 9 9" />
    </IconBase>
  );
}

function ShieldIcon() {
  return (
    <IconBase>
      <path d="M24 6l15 6v12c0 10-6 17-15 22-9-5-15-12-15-22V12z" />
      <circle cx="24" cy="20" r="4" />
      <path d="M16 34c2-6 5-9 8-9s6 3 8 9" />
    </IconBase>
  );
}

function SproutIcon() {
  return (
    <IconBase>
      <path d="M24 42V18" />
      <path d="M22 25C11 25 8 17 10 10c9 0 14 6 12 15z" />
      <path d="M26 22c11 0 14-8 12-15-9 0-14 6-12 15z" />
      <path d="M24 34c-9 0-13-5-14-12 8 0 13 4 14 12z" />
      <path d="M24 34c9 0 13-5 14-12-8 0-13 4-14 12z" />
    </IconBase>
  );
}

function StackIcon() {
  return (
    <IconBase>
      <path d="M24 7l18 10-18 10L6 17z" />
      <path d="M6 25l18 10 18-10" />
      <path d="M6 33l18 10 18-10" />
    </IconBase>
  );
}

function BookIcon() {
  return (
    <IconBase>
      <path d="M8 11c8 0 13 2 16 6v25c-3-4-8-6-16-6z" />
      <path d="M40 11c-8 0-13 2-16 6v25c3-4 8-6 16-6z" />
    </IconBase>
  );
}

function HorizonIcon() {
  return (
    <IconBase>
      <path d="M7 35h34" />
      <path d="M14 35a10 10 0 0 1 20 0" />
      <path d="M24 7v7M10 17l5 5M38 17l-5 5M6 28h7M35 28h7" />
    </IconBase>
  );
}
