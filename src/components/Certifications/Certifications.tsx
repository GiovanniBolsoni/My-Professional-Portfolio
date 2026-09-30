import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Certifications.module.css';
import { certifications } from '../../data/resume';
import { i18n } from '../../data/i18n';

export const Certifications = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.cert-card', {
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
    <section className={styles.certs} id="certifications" ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> {t.certifications}
        </h2>
        
        <div className={styles.grid}>
          {certifications.map((cert, idx) => (
            <div key={idx} className={`${styles.card} cert-card`}>
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
