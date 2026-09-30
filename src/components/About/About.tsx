// No React import
import styles from './About.module.css';
import { profile } from '../../data/resume';
import { i18n } from '../../data/i18n';

export const About = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> {t.about}
        </h2>
        
        <div className={styles.content}>
          <div className={styles.textBlock}>
            {profile.summary.map((paragraph, idx) => (
              <p key={idx} className={styles.paragraph}>{paragraph}</p>
            ))}
          </div>
          
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>2+</span>
              <span className={styles.statLabel}>Anos de TI</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>13</span>
              <span className={styles.statLabel}>Certificações</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>+200h</span>
              <span className={styles.statLabel}>Estudos Cloud/IA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
