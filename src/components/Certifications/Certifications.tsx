// No React import
import styles from './Certifications.module.css';
import { certifications } from '../../data/resume';
import { i18n } from '../../data/i18n';

export const Certifications = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;

  return (
    <section className={styles.certs} id="certifications">
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> {t.certifications}
        </h2>
        
        <div className={styles.grid}>
          {certifications.map((cert, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.header}>
                <span className={styles.year}>{cert.year}</span>
                <span className={styles.hours}>{cert.hours}</span>
              </div>
              <h3 className={styles.certTitle}>{cert.title}</h3>
              <p className={styles.org}>{cert.org}</p>
              <p className={styles.description}>{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
