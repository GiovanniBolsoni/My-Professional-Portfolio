// No React import
import styles from './Journey.module.css';
import { experiences } from '../../data/resume';
import { i18n } from '../../data/i18n';

export const Journey = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;

  return (
    <section className={styles.journey} id="experience">
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> {t.experience}
        </h2>
        
        <div className={styles.timeline}>
          {experiences.map((exp, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.header}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.period}>{exp.period}</span>
              </div>
              <p className={styles.company}>{exp.company}</p>
              
              <div className={styles.tags}>
                {exp.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
              
              <ul className={styles.bullets}>
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
