import styles from "../../../components/eeo/Eeo.module.css";
import { DISCLOSURE_TIER_HELP } from "../../../eeo/canonical";

const PILOT_SELECTION_GATES = [
  "one commodity, one geography, one complete endowment-to-economy chain",
  "public or consent-cleared sources before evidence drafting",
  "indigenous data governance and rights-holder review where applicable",
  "sovereignty and jurisdiction-specific legal-posture review",
  "exposure ethics review for labor, community, ecological, ownership, and geospatial risks",
  "right-of-reply status before high-impact actor-specific claims",
  "release manifest and correction path before public beta",
] as const;

export default function MethodologyPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>EEO methodology</div>
        <h1 className={styles.title}>Evidence before exposure.</h1>
        <p className={styles.lede}>
          EEO separates factual description, analytical inference, normative questions, and legal posture. Public pages
          must show uncertainty, source basis, and correction routes.
        </p>
      </section>
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Pilot selection gates</h2>
        <p className={styles.muted}>
          A real pilot corridor must pass governance and disclosure gates before EEO drafts public claims.
        </p>
        <ul className={styles.list}>
          {PILOT_SELECTION_GATES.map((gate) => <li key={gate}>{gate}</li>)}
        </ul>
      </section>
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Disclosure tiers</h2>
        <div className={styles.metaGrid}>
          {Object.entries(DISCLOSURE_TIER_HELP).map(([tier, help]) => (
            <div key={tier} className={styles.metaItem}><span className={styles.metaLabel}>{tier}</span>{help}</div>
          ))}
        </div>
      </section>
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Interpretive limits</h2>
        <ul className={styles.list}>
          <li>Trade data provides context; it does not prove physical chain-of-custody.</li>
          <li>Public revenue raises a public-benefit question; it does not prove durable public benefit.</li>
          <li>Spatial proximity is a risk signal; it is not causation evidence.</li>
          <li>EEO makes no legal finding unless quoting a competent authority and clearly labeling that source.</li>
        </ul>
      </section>
    </main>
  );
}
