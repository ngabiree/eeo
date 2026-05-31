import styles from "../../../components/eeo/Eeo.module.css";

export default function CorrectionsPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>EEO corrections</div>
        <h1 className={styles.title}>Every claim needs recourse.</h1>
        <p className={styles.lede}>
          This placeholder defines the public correction route. In production, connect it to a governed intake form,
          triage queue, reviewer assignment, and correction log.
        </p>
      </section>
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Correction intake fields</h2>
        <ul className={styles.list}>
          <li>Claim ID or page URL</li>
          <li>Issue type and explanation</li>
          <li>Supporting evidence</li>
          <li>Urgency or safety concern</li>
          <li>Consent to publish correction summary</li>
          <li>Preferred response channel</li>
        </ul>
      </section>
    </main>
  );
}
