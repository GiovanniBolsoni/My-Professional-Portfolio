import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Hero.module.css';
import { profile } from '../../data/resume';
import { i18n } from '../../data/i18n';

export const Hero = () => {
  const lang = 'pt';
  const t = i18n[lang].hero;
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    tl.from('.hero-elem', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section className={styles.hero} id="hero" ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={`${styles.greeting} hero-elem`}>$ whoami</p>
          <h1 className={`${styles.name} hero-elem`}>{profile.name}</h1>
          <h2 className={`${styles.role} hero-elem`}>{profile.roles[0]}</h2>
          
          <div className={`${styles.actions} hero-elem`}>
            <a href={profile.resumePdf} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
              {t.downloadCV}
            </a>
            <a href="#contact" className={styles.btnSecondary}>
              {t.contactMe}
            </a>
          </div>
        </div>
        <div className={`${styles.imageWrapper} hero-elem`}>
          <img src={profile.photo} alt={profile.name} className={styles.photo} />
          <div className={styles.glitchBox}></div>
        </div>
      </div>
    </section>
  );
};
