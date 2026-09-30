// No React import
import styles from './Stack.module.css';
import { skills } from '../../data/resume';
import { i18n } from '../../data/i18n';

export const Stack = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;

  return (
    <section className={styles.stack} id="stack">
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> {t.stack}
        </h2>
        
        <div className={styles.grid}>
          {skills.map((skillGroup, idx) => (
            <div key={idx} className={styles.group}>
              <h3 className={styles.groupTitle}>{skillGroup.group}</h3>
              <div className={styles.items}>
                {skillGroup.items.map((item, i) => (
                  <span key={i} className={styles.item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
