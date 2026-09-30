import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Code, ExternalLink } from 'lucide-react';
import styles from './Projects.module.css';
import { projects } from '../../data/resume';
import { i18n } from '../../data/i18n';

export const Projects = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.proj-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section className={styles.projects} id="projects" ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>~/</span> {t.projects}
        </h2>
        
        <div className={styles.grid}>
          {projects.map((proj, idx) => (
            <div key={idx} className={`${styles.card} proj-card`}>
              <div className={styles.imagePlaceholder}>
                <span>Screenshot / Preview</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.projectName}>{proj.title}</h3>
                <p className={styles.description}>{proj.description}</p>
                <div className={styles.tags}>
                  <span className={styles.tag}>{proj.tech}</span>
                  {/* Since proj.tech is a string, we just display it. If it was an array, we would map it. */}
                </div>
                <div className={styles.actions}>
                  <a href={proj.url} target="_blank" rel="noreferrer" className={styles.btnLink}>
                    <Code size={16} /> Ver Código
                  </a>
                  <a href={proj.url} target="_blank" rel="noreferrer" className={styles.btnLink}>
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
