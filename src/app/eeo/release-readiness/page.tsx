import { ReleaseReadinessPanel } from "../../../components/eeo/EeoCards";
import styles from "../../../components/eeo/Eeo.module.css";
import { sampleCorridorProfile } from "../../../eeo/sample-data";
import { assessReleaseReadiness } from "../../../eeo/validation";

export default function ReleaseReadinessPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>EEO release readiness</div>
        <h1 className={styles.title}>No release without a manifest.</h1>
        <p className={styles.lede}>
          This gate checks claim metadata, disclosure status, correction paths, stale-after dates, and unresolved
          right-of-reply blockers before publication.
        </p>
      </section>
      <ReleaseReadinessPanel result={assessReleaseReadiness(sampleCorridorProfile)} />
    </main>
  );
}
