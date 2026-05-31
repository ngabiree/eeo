import { CorridorOverview, EvidenceClaimCard, ReleaseReadinessPanel } from "../../components/eeo/EeoCards";
import styles from "../../components/eeo/Eeo.module.css";
import { EEO_MVP_SCOPE, EEO_PUBLIC_IDENTITY, EEO_RED_LINES } from "../../eeo/canonical";
import { sampleCorridorProfile } from "../../eeo/sample-data";
import { assessReleaseReadiness } from "../../eeo/validation";

export default function EeoPage() {
  const readiness = assessReleaseReadiness(sampleCorridorProfile);

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Earth Endowment Observatory</div>
        <h1 className={styles.title}>A careful public-interest observatory.</h1>
        <p className={styles.lede}>{EEO_PUBLIC_IDENTITY}</p>
        <nav className={styles.nav} aria-label="EEO pages">
          <a href="/eeo/evidence-ledger">Evidence ledger</a>
          <a href="/eeo/methodology">Methodology</a>
          <a href="/eeo/corrections">Corrections</a>
          <a href="/eeo/release-readiness">Release readiness</a>
        </nav>
      </section>

      <div className={styles.grid}>
        <section className={`${styles.card} ${styles.cardHalf}`}>
          <h2 className={styles.cardTitle}>MVP scope</h2>
          <ul className={styles.list}>{EEO_MVP_SCOPE.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className={`${styles.card} ${styles.cardHalf}`}>
          <h2 className={styles.cardTitle}>Red lines</h2>
          <ul className={styles.list}>{EEO_RED_LINES.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>

      <CorridorOverview profile={sampleCorridorProfile} />
      <ReleaseReadinessPanel result={readiness} />
      {sampleCorridorProfile.claims.slice(0, 2).map((claim) => <EvidenceClaimCard key={claim.id} claim={claim} />)}
    </main>
  );
}
