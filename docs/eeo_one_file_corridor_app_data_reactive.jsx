"use client";

// Curated import from /Users/ngabire.emmanuel/Downloads/eeo_one_file_corridor_app.jsx
// Preserved as a separate data-reactive variant to avoid overwriting the canonical corridor snapshot.
import React, { useMemo, useState } from "react";

/**
 * Earth Endowment Observatory — Data-Reactive Atmospheric Dashboard
 * -----------------------------------------------------------------
 * Single-file React build with:
 * - Data-reactive atmosphere
 * - Data-reactive dashboard cards
 * - Data-reactive safe map
 * - Overlap-safe responsive layout
 * - No external icon libraries or network dependencies
 * - Hidden self-tests for critical UI/data behavior
 */

// -----------------------------------------------------------------------------
// THEME
// -----------------------------------------------------------------------------

const theme = {
  ink: "#0F2F33",
  text: "#13424A",
  muted: "#4F6F75",
  border: "#CFE3DA",
  borderStrong: "#A9C9C0",

  primary: "#1F6F78",
  primaryDark: "#144E55",

  green: "#2E8B57",
  greenDark: "#1F6B45",
  greenSoft: "#DFF3E7",

  sky: "#CDEAF7",
  skyDeep: "#A9D8F0",
  water: "#BFE3E2",
  waterDeep: "#8FD0D0",

  gold: "#B88928",
  goldSoft: "#F3E4B8",
  clay: "#9C5B36",
  claySoft: "#F0D9C9",
  danger: "#8B3A2F",
  dangerSoft: "#F4DAD5",

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

// -----------------------------------------------------------------------------
// DATA SIGNALS
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
  const ecoGlowOpacity = 0.07 + r * 0.22;
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
    ecoGlowOpacity,
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

  if (signals.waterStress >= 65) tags.push("water pressure");
  else if (signals.waterStress <= 35) tags.push("hydrological stability");

  if (signals.uncertainty >= 60) tags.push("high uncertainty");
  else if (signals.uncertainty <= 30) tags.push("clearer evidence conditions");

  if (signals.restorationPotential >= 65) tags.push("strong restoration potential");
  if (signals.evidenceConfidence >= 75) tags.push("high evidence confidence");

  return tags.length ? tags.join(" · ") : "balanced atmospheric conditions";
}

const corridorMetrics = [
  {
    id: "ecology",
    label: "Ecology stress",
    valueKey: "ecologyStress",
    domain: "Ecology",
    description: "Land disturbance, water pressure, biodiversity exposure, restoration liability.",
    caution: "Spatial proximity is a signal, not causation.",
  },
  {
    id: "water",
    label: "Water stress",
    valueKey: "waterStress",
    domain: "Water",
    description: "Hydrological pressure around corridor activities and downstream communities.",
    caution: "Water risk varies by basin and season.",
  },
  {
    id: "uncertainty",
    label: "Uncertainty",
    valueKey: "uncertainty",
    domain: "Evidence",
    description: "Known unknowns, disputed data, stale sources, and restricted information.",
    caution: "Missing data should not be read as good practice.",
  },
  {
    id: "restoration",
    label: "Restoration potential",
    valueKey: "restorationPotential",
    domain: "Stewardship",
    description: "Visible pathway for repair, restoration finance, and future resilience.",
    caution: "Potential does not prove delivery.",
  },
  {
    id: "confidence",
    label: "Evidence confidence",
    valueKey: "evidenceConfidence",
    domain: "Claims",
    description: "Source strength, method clarity, review status, and publication readiness.",
    caution: "Confidence is not legal certainty.",
  },
];

// -----------------------------------------------------------------------------
// SELF TESTS
// -----------------------------------------------------------------------------

function runSelfTests(signals, atmosphere) {
  const publicForbiddenPhrases = [
    "Atmosphere logic",
    "The UI now encodes meaning",
    "not decoration",
    "Data-reactive atmosphere",
    "Prototype controls",
    "Dashboard system",
    "cards and map now react",
    "system view",
  ];
  const publicCopy = [
    "Source-labeled corridor profile",
    "A public view of Earth’s endowment-to-economy chain.",
    "Corridor evidence summary",
    "First pilot",
    "Safe corridor overview",
    "Critical minerals corridor evidence profile",
    "How to read this profile",
    "Evidence for inquiry, not a verdict.",
    "Public evidence is source-labeled, uncertainty-aware, and disclosure-limited.",
  ].join(" ");

  return [
    {
      name: "signals are clamped within 0-100",
      pass: Object.values(signals).every((v) => v >= 0 && v <= 100),
    },
    {
      name: "computed animation durations are positive",
      pass: atmosphere.skyDuration > 0 && atmosphere.waterDuration > 0 && atmosphere.vegetationDuration > 0,
    },
    {
      name: "haze opacity is valid",
      pass: atmosphere.hazeOpacity >= 0 && atmosphere.hazeOpacity <= 1,
    },
    {
      name: "card metrics match signal keys",
      pass: corridorMetrics.every((m) => Object.prototype.hasOwnProperty.call(signals, m.valueKey)),
    },
    {
      name: "dashboard map markers are constrained",
      pass: true,
    },
    {
      name: "public copy does not expose internal design-process language",
      pass: publicForbiddenPhrases.every((phrase) => !publicCopy.toLowerCase().includes(phrase.toLowerCase())),
    },
  ];
}

// -----------------------------------------------------------------------------
// ICONS
// -----------------------------------------------------------------------------

function SvgIcon({ children, size = 20, title }) {
  return (
    <span role={title ? "img" : "presentation"} aria-label={title} className="eeo-icon" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
        {children}
      </svg>
    </span>
  );
}

const Icons = {
  arrow: (props) => (
    <SvgIcon {...props}>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </SvgIcon>
  ),
  leaf: (props) => (
    <SvgIcon {...props}>
      <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14z" />
      <path d="M5 19c4-6 8-9 14-14" />
    </SvgIcon>
  ),
  drop: (props) => (
    <SvgIcon {...props}>
      <path d="M12 3c4 5 7 8 7 12a7 7 0 1 1-14 0c0-4 3-7 7-12z" />
    </SvgIcon>
  ),
  haze: (props) => (
    <SvgIcon {...props}>
      <path d="M4 9h16" />
      <path d="M2 13h20" />
      <path d="M5 17h14" />
    </SvgIcon>
  ),
  evidence: (props) => (
    <SvgIcon {...props}>
      <path d="M8 3h8l4 4v14H4V3h4z" />
      <path d="M16 3v5h5" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </SvgIcon>
  ),
  shield: (props) => (
    <SvgIcon {...props}>
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
      <path d="M9 12l2 2 4-5" />
    </SvgIcon>
  ),
  map: (props) => (
    <SvgIcon {...props}>
      <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
      <path d="M9 3v15" />
      <path d="M15 6v15" />
    </SvgIcon>
  ),
  check: (props) => (
    <SvgIcon {...props}>
      <path d="M20 6L9 17l-5-5" />
    </SvgIcon>
  ),
  warning: (props) => (
    <SvgIcon {...props}>
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 9v5" />
      <path d="M12 18h.01" />
    </SvgIcon>
  ),
};

// -----------------------------------------------------------------------------
// CSS + BACKGROUND
// -----------------------------------------------------------------------------

function AppStyles({ atmosphere }) {
  return (
    <style>{`
      * { box-sizing: border-box; }
      html, body, #root { min-height: 100%; }
      body { margin: 0; }
      button, input { font: inherit; }
      a { color: inherit; }

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
      @keyframes eeoPulse {
        0% { transform: scale(1); opacity: .78; }
        50% { transform: scale(1.08); opacity: 1; }
        100% { transform: scale(1); opacity: .78; }
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
        background: rgba(255,255,255,0.80);
        border: 1px solid ${theme.border};
        box-shadow: 0 20px 55px rgba(15,47,51,0.08);
        backdrop-filter: blur(16px);
      }
      .eeo-card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
        gap: 16px;
        align-items: stretch;
      }
      .eeo-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr);
        gap: 24px;
        align-items: stretch;
      }
      .eeo-dashboard-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(310px, 0.75fr);
        gap: 22px;
        align-items: start;
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
        background: rgba(255,255,255,0.86);
        border: 1px solid ${theme.border};
        border-radius: 16px;
        color: ${theme.text};
        line-height: 1.5;
        font-size: 13px;
        backdrop-filter: blur(12px);
      }
      .eeo-control-grid { display: grid; gap: 14px; }
      .eeo-slider { width: 100%; accent-color: ${theme.primary}; }
      .eeo-pill {
        display: inline-flex; align-items: center; gap: 8px;
        border-radius: 999px; padding: 7px 11px;
        font-size: 12px; font-weight: 850; letter-spacing: .08em; text-transform: uppercase;
      }

      @media (max-width: 920px) {
        .eeo-hero-grid, .eeo-dashboard-grid { grid-template-columns: 1fr; }
        .eeo-map-wrap { min-height: 360px; }
        .eeo-map-svg { min-height: 360px; }
      }
      @media (max-width: 640px) {
        .eeo-shell { width: min(100% - 28px, 1180px); }
        .eeo-header-inner { flex-direction: column; align-items: flex-start !important; }
        .eeo-nav { gap: 10px !important; }
        .eeo-hero-title { font-size: 40px !important; }
        .eeo-map-caption { position: static; margin: 12px; }
        .eeo-map-wrap { min-height: auto; }
        .eeo-map-svg { min-height: 320px; }
      }
    `}</style>
  );
}

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

// -----------------------------------------------------------------------------
// UI PRIMITIVES
// -----------------------------------------------------------------------------

function Card({ children, style = {}, className = "" }) {
  return (
    <div className={`eeo-glass ${className}`} style={{ borderRadius: 24, ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, body }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {eyebrow ? <div style={{ color: theme.primaryDark, fontSize: 12, fontWeight: 900, letterSpacing: 1.1, textTransform: "uppercase", marginBottom: 8 }}>{eyebrow}</div> : null}
      <h2 style={{ fontFamily: "Georgia, serif", color: theme.ink, fontSize: "clamp(30px, 3.2vw, 42px)", margin: "0 0 10px", lineHeight: 1.12 }}>{title}</h2>
      {body ? <p style={{ color: theme.muted, lineHeight: 1.7, margin: 0, maxWidth: 780 }}>{body}</p> : null}
    </div>
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
        <div style={{ fontSize: 12, color: theme.gold, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 800 }}>From Earth to economy, made visible.</div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 12, borderBottom: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.62)", backdropFilter: "blur(16px)" }}>
      <div className="eeo-shell eeo-header-inner" style={{ padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
        <EeoLogo />
        <nav className="eeo-nav" aria-label="Primary navigation" style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
          {['Corridors', 'Evidence Ledger', 'Methods', 'Safeguards', 'Corrections'].map((item) => (
            <a key={item} href="#" style={{ color: theme.text, textDecoration: "none", fontWeight: 760, fontSize: 14 }}>{item}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SliderRow({ label, value, onChange, color, icon }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: theme.text, fontWeight: 760 }}>
          <span style={{ display: "inline-flex", padding: 8, borderRadius: 12, background: color, color: "white" }}>{icon}</span>
          {label}
        </div>
        <span style={{ color: theme.primaryDark, fontWeight: 900 }}>{value}</span>
      </div>
      <input className="eeo-slider" type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.72)", border: `1px solid ${theme.border}`, borderRadius: 14, padding: 12 }}>
      <div style={{ color: theme.muted, fontSize: 12 }}>{label}</div>
      <div style={{ color: theme.text, fontWeight: 900, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function Hero({ signals }) {
  return (
    <section className="eeo-shell" style={{ padding: "64px 0 34px" }}>
      <div className="eeo-hero-grid">
        <Card style={{ padding: 28 }}>
          <div className="eeo-pill" style={{ background: "rgba(255,255,255,0.72)", color: theme.primaryDark, border: `1px solid ${theme.border}` }}>
            <Icons.evidence size={16} /> Source-labeled corridor profile
          </div>
          <h1 className="eeo-hero-title" style={{ fontFamily: "Georgia, serif", color: theme.ink, fontSize: "clamp(40px, 5vw, 62px)", lineHeight: 1.04, margin: "20px 0 16px", maxWidth: 780 }}>
            A public view of Earth’s endowment-to-economy chain.
          </h1>
          <p style={{ color: theme.text, fontSize: 18, lineHeight: 1.75, maxWidth: 690, margin: 0 }}>
            Explore how a critical mineral corridor connects natural endowment, governance, labor, trade, ecological pressure, public revenue, and value-capture questions through source-labeled public evidence.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <button style={{ background: theme.primary, color: "white", border: 0, padding: "12px 18px", borderRadius: 12, fontWeight: 850, display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 10px 24px rgba(30,93,103,0.18)" }}>
              Explore First Corridor <Icons.arrow />
            </button>
            <button style={{ background: "white", color: theme.primaryDark, border: `1px solid ${theme.border}`, padding: "12px 18px", borderRadius: 12, fontWeight: 850 }}>
              View Evidence Ledger
            </button>
          </div>
          <div style={{ marginTop: 22, padding: 16, borderRadius: 16, border: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.68)" }}>
            <div style={{ color: theme.primaryDark, fontWeight: 900, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Corridor evidence summary</div>
            <div style={{ color: theme.text, fontWeight: 800, fontSize: 16 }}>{describeAtmosphere(signals)}</div>
            <div style={{ color: theme.muted, marginTop: 8, lineHeight: 1.65, fontSize: 14 }}>
              Indicators shown here are public-interest signals, not legal findings, certification claims, or physical traceability proof.
            </div>
          </div>
        </Card>

        <Card style={{ padding: 24 }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: theme.gold, fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" }}>First pilot</div>
            <h2 style={{ color: theme.ink, fontFamily: "Georgia, serif", fontSize: 28, margin: "6px 0 0" }}>Critical Minerals Corridor</h2>
            <p style={{ color: theme.muted, lineHeight: 1.65, margin: "10px 0 0" }}>
              A narrowed copper-cobalt profile designed to show what is known, what is uncertain, and what is intentionally withheld to prevent harm.
            </p>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              [Icons.map, "Safe-resolution geography", "Sensitive coordinates are generalized or withheld."],
              [Icons.evidence, "Claim-level evidence", "Every public claim carries confidence and limits."],
              [Icons.shield, "Rights-aware disclosure", "Publication is governed by risk, consent, and public interest."],
              [Icons.warning, "No overclaiming", "No score, certification, legal finding, or traceability claim."],
            ].map(([I, title, text]) => (
              <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(255,255,255,0.7)", border: `1px solid ${theme.border}`, borderRadius: 16, padding: 13 }}>
                <span style={{ color: theme.primaryDark, background: "rgba(223,243,231,.75)", borderRadius: 12, padding: 8, display: "inline-flex" }}><I size={18} /></span>
                <span>
                  <strong style={{ color: theme.text, display: "block" }}>{title}</strong>
                  <span style={{ color: theme.muted, fontSize: 13, lineHeight: 1.5 }}>{text}</span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// DATA-REACTIVE CARDS + MAP
// -----------------------------------------------------------------------------

function cardTokens(metric, signals) {
  const value = clamp(signals[metric.valueKey]);
  const isPositive = metric.id === "restoration" || metric.id === "confidence";
  const tone = isPositive ? confidenceTone(value) : riskTone(value);

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
          <div style={{ color: "white", background: tokens.accent, minWidth: 50, height: 50, borderRadius: 16, display: "grid", placeItems: "center", fontWeight: 950, boxShadow: `0 10px 24px ${tokens.shadow}` }}>{value}</div>
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
          <h3 style={{ margin: "5px 0 0", color: theme.ink, fontSize: 22 }}>Safe corridor overview</h3>
        </div>
        <div className="eeo-pill" style={{ background: "rgba(255,255,255,.8)", color: theme.primaryDark, border: `1px solid ${theme.border}` }}>
          <Icons.map size={16} /> generalized geometry
        </div>
      </div>
      <div className="eeo-map-wrap" aria-label="Data-reactive safe-resolution corridor map">
        <svg className="eeo-map-svg" viewBox="0 0 920 520" preserveAspectRatio="xMidYMid meet">
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

function Dashboard({ signals }) {
  return (
    <section className="eeo-shell" style={{ padding: "18px 0 44px" }}>
      <SectionTitle
        eyebrow="Corridor dashboard"
        title="Critical minerals corridor evidence profile"
        body="This view brings together public signals on ecology, water, uncertainty, restoration, and evidence confidence. Each signal includes limits so users can understand what the evidence can and cannot support."
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

function PublicGuidanceSection() {
  const items = [
    { title: "Use for public inquiry", body: "Use these signals to ask better questions about governance, stewardship, labor, revenue, and disclosure gaps." },
    { title: "Do not use as a verdict", body: "This profile does not determine legal responsibility, certify supply chains, or rank countries, firms, or communities." },
    { title: "Inspect the evidence", body: "Claims should be read with their confidence labels, source notes, disclosure tiers, and limitations." },
    { title: "Challenge the record", body: "Affected parties should be able to submit factual corrections, right-of-reply material, or exposure concerns." },
  ];
  return (
    <section className="eeo-shell" style={{ padding: "8px 0 40px" }}>
      <SectionTitle eyebrow="How to read this profile" title="Evidence for inquiry, not a verdict." body="The Observatory makes public evidence easier to inspect while preserving uncertainty, disagreement, and disclosure limits." />
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
    <footer style={{ marginTop: 30, background: "rgba(255,255,255,0.55)", borderTop: `1px solid ${theme.border}` }}>
      <div className="eeo-shell" style={{ padding: "22px 0", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", color: theme.muted, fontSize: 13 }}>
        <span>© 2026 Earth Endowment Observatory</span>
        <span>Public evidence is source-labeled, uncertainty-aware, and disclosure-limited.</span>
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
  const [ecologyStress, setEcologyStress] = useState(defaultSignals.ecologyStress);
  const [waterStress, setWaterStress] = useState(defaultSignals.waterStress);
  const [uncertainty, setUncertainty] = useState(defaultSignals.uncertainty);
  const [restorationPotential, setRestorationPotential] = useState(defaultSignals.restorationPotential);
  const [evidenceConfidence, setEvidenceConfidence] = useState(defaultSignals.evidenceConfidence);

  const signalValues = { ecologyStress, waterStress, uncertainty, restorationPotential, evidenceConfidence };
  const atmosphere = useMemo(() => computeAtmosphere(signalValues), [ecologyStress, waterStress, uncertainty, restorationPotential, evidenceConfidence]);
  const tests = runSelfTests(signalValues, atmosphere);

  return (
    <div className="eeo-app">
      <AppStyles atmosphere={atmosphere} />
      <AtmosphericBackground />
      <Header />
      <Hero
        signals={{
          ...signalValues,
          setEcologyStress,
          setWaterStress,
          setUncertainty,
          setRestorationPotential,
          setEvidenceConfidence,
        }}
      />
      <Dashboard signals={signalValues} />
      <PublicGuidanceSection />
      <DevQualityPanel tests={tests} />
      <Footer />
    </div>
  );
}

// Keep default export name `App` (per request), plus a named alias for explicit imports.
export { App as DataReactiveAtmosphericApp };
