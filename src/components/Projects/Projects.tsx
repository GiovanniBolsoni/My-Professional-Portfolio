import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Projects.module.css';
import { projects } from '../../data/resume';
import { i18n } from '../../data/i18n';
import Icon from '../../Icon';

export const Projects = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.proj-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)'
    });
  }, { scope: containerRef });

  return (
    <section className={styles.projects} id="projects" ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> {t.projects}
        </h2>
        
        <div className={styles.grid}>
          {projects.map((proj, idx) => (
            <a href={proj.url} target="_blank" rel="noreferrer" key={idx} className={`${styles.card} proj-card`}>
              <div className={styles.cardHeader}>
                <Icon name="github" size={24} />
                <Icon name="arrow" size={20} />
              </div>
              <h3 className={styles.projectName}>{proj.title}</h3>
              <p className={styles.description}>{proj.description}</p>
              <div className={styles.tech}>
                <span className={styles.techTag}>{proj.tech}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
