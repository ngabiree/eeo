import type { CorridorProfile, EvidenceClaim, ReleaseReadinessResult } from "../../eeo/types";
import styles from "./Eeo.module.css";

export function EeoBadge({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "safe" | "warning" | "restricted" }) {
  const toneClass = tone === "safe" ? styles.badgeSafe : tone === "warning" ? styles.badgeWarning : tone === "restricted" ? styles.badgeRestricted : "";
  return <span className={`${styles.badge} ${toneClass}`}>{label}</span>;
}

function disclosureTone(tier: EvidenceClaim["disclosureTier"]) {
  if (tier === "open") return "safe";
  if (tier === "contextual public" || tier === "aggregated") return "warning";
  return "restricted";
}

export function CorridorOverview({ profile }: { profile: CorridorProfile }) {
  return (
    <section className={styles.card} aria-labelledby="corridor-overview-title">
      <div className={styles.eyebrow}>Limited corridor dashboard</div>
      <h2 id="corridor-overview-title" className={styles.cardTitle}>{profile.name}</h2>
      <p className={styles.lede}>{profile.summary}</p>
      <div className={styles.badgeRow}>
        <EeoBadge label={`Commodity: ${profile.commodity}`} />
        <EeoBadge label={`Geography: ${profile.geography}`} />
        <EeoBadge label={`Status: ${profile.status}`} tone="warning" />
      </div>
      <div className={styles.flow} aria-label="Corridor steps">
        {profile.steps.map((step) => (
          <article key={step.id} className={styles.step}>
            <div className={styles.stepHeader}>
              <strong>{step.label}</strong>
              <EeoBadge label={step.disclosureTier} tone={disclosureTone(step.disclosureTier)} />
            </div>
            <p className={styles.muted}>{step.description}</p>
            <small>Evidence claims: {step.evidenceClaimIds.join(", ")}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CorridorReasoningSystem({ profile }: { profile: CorridorProfile }) {
  return (
    <section className={styles.card} aria-labelledby="corridor-reasoning-title">
      <div className={styles.eyebrow}>Reasoning system</div>
      <h2 id="corridor-reasoning-title" className={styles.cardTitle}>Endowment-to-economy chain</h2>
      <p className={styles.muted}>
        EEO differentiates through the missing layer: connecting endowments, governance, ownership, labor, trade, ecology, public revenue, and value capture into one evidence-led public-interest reasoning system.
      </p>
      <div className={styles.metaGrid}>
        {profile.reasoningDimensions.map((dimension) => (
          <div key={dimension.id} className={styles.metaItem}>
            <span className={styles.metaLabel}>{dimension.label}</span>
            <p className={styles.muted}>{dimension.question}</p>
            <div className={styles.badgeRow}>
              <EeoBadge label={dimension.disclosureTier} tone={disclosureTone(dimension.disclosureTier)} />
            </div>
            <small>Evidence claims: {dimension.evidenceClaimIds.join(", ")}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EvidenceClaimCard({ claim }: { claim: EvidenceClaim }) {
  return (
    <article className={`${styles.card} ${styles.claim}`} aria-labelledby={`${claim.id}-title`}>
      <div>
        <div className={styles.eyebrow}>{claim.id}</div>
        <h2 id={`${claim.id}-title`} className={styles.cardTitle}>Evidence claim</h2>
        <p className={styles.claimText}>{claim.claimText}</p>
      </div>
      <div className={styles.badgeRow} aria-label="Claim metadata">
        <EeoBadge label={`Confidence: ${claim.confidenceLabel}`} tone="warning" />
        <EeoBadge label={`Disclosure: ${claim.disclosureTier}`} tone={disclosureTone(claim.disclosureTier)} />
        <EeoBadge label={`Legal posture: ${claim.legalPosture}`} />
        <EeoBadge label={`Review: ${claim.reviewStatus}`} />
      </div>
      <div className={styles.metaGrid}>
        <div className={styles.metaItem}><span className={styles.metaLabel}>Source</span>{claim.sourceTitle}</div>
        <div className={styles.metaItem}><span className={styles.metaLabel}>Method</span>{claim.method}</div>
        <div className={styles.metaItem}><span className={styles.metaLabel}>Stale after</span>{claim.staleAfter}</div>
        <div className={styles.metaItem}><span className={styles.metaLabel}>Correction path</span>{claim.correctionPath}</div>
      </div>
      <div className={styles.callout}><strong>Confidence explanation:</strong> {claim.confidenceExplanation}</div>
    </article>
  );
}

export function ReleaseReadinessPanel({ result }: { result: ReleaseReadinessResult }) {
  return (
    <section className={styles.card} aria-labelledby="release-readiness-title">
      <div className={styles.eyebrow}>Release gate</div>
      <h2 id="release-readiness-title" className={styles.cardTitle}>
        {result.ready ? "Ready for controlled review" : "Not ready for public release"}
      </h2>
      {result.blockers.length > 0 && (
        <div className={`${styles.callout} ${styles.danger}`}>
          <strong>Blockers</strong>
          <ul className={styles.list}>{result.blockers.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      )}
      {result.warnings.length > 0 && (
        <div className={styles.callout}>
          <strong>Warnings</strong>
          <ul className={styles.list}>{result.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
      )}
      <div>
        <strong>Passed checks</strong>
        <ul className={styles.list}>{result.passed.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
    </section>
  );
}
