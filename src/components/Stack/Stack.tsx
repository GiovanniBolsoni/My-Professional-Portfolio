import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Stack.module.css';
import { skills } from '../../data/resume';
import { i18n } from '../../data/i18n';

export const Stack = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.stack-group', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  return (
    <section className={styles.stack} id="stack" ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> {t.stack}
        </h2>
        
        <div className={styles.grid}>
          {skills.map((skillGroup, idx) => (
            <div key={idx} className={`${styles.group} stack-group`}>
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
