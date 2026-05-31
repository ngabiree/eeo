import { EvidenceClaimCard } from "../../../components/eeo/EeoCards";
import styles from "../../../components/eeo/Eeo.module.css";
import { sampleCorridorProfile } from "../../../eeo/sample-data";

export default function EvidenceLedgerPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>EEO evidence ledger</div>
        <h1 className={styles.title}>Claims must be traceable.</h1>
        <p className={styles.lede}>
          The ledger shows source, method, confidence, disclosure tier, legal posture, review status, stale-after date,
          and correction path for each public claim.
        </p>
      </section>
      {sampleCorridorProfile.claims.map((claim) => <EvidenceClaimCard key={claim.id} claim={claim} />)}
    </main>
  );
}
