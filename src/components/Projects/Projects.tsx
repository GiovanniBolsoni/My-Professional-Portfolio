import { useRef, MouseEvent, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Code, ExternalLink, Network } from 'lucide-react';
import styles from './Projects.module.css';
import { projects } from '../../data/resume';
import { i18n } from '../../data/i18n';
import { GlitchText } from '../GlitchText/GlitchText';

const ProjectCard = ({ proj }: { proj: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      setBounds(cardRef.current.getBoundingClientRect());
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !bounds || window.matchMedia('(pointer: coarse)').matches) return;
    const { clientX, clientY } = e;
    
    // Calculate rotation (-15 to 15 degrees)
    const x = (clientX - bounds.left) / bounds.width - 0.5;
    const y = (clientY - bounds.top) / bounds.height - 0.5;
    
    gsap.to(cardRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    // Update CSS variables for the holographic reflection
    cardRef.current.style.setProperty('--mouse-x', `${clientX - bounds.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${clientY - bounds.top}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out'
    });
    setBounds(null);
  };

  return (
    <div 
      ref={cardRef}
      className={`${styles.card} proj-card magnetic`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.reflection} />
      {proj.image ? (
        <div className={styles.imageContainer} style={{ backgroundImage: `url(${proj.image})` }} />
      ) : (
        <div className={styles.imagePlaceholder}>
          <Code size={48} className={styles.placeholderIcon} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.projectName}>{proj.title}</h3>
          {proj.title === 'Career-OS' && <span className={styles.highlightBadge}>Destaque</span>}
        </div>
        <p className={styles.description}>{proj.description}</p>
        <div className={styles.tags}>
          <span className={styles.tag}>{proj.tech}</span>
        </div>
        <div className={styles.actions}>
          {proj.title === 'Career-OS' && (
            <>
              <a href="https://github.com/GiovanniBolsoni/Career-Os/blob/main/README.md" target="_blank" rel="noreferrer" className={styles.btnLink}>
                <ExternalLink size={16} /> Ler Case Study
              </a>
              {proj.architectureUrl && (
                <a href={proj.architectureUrl} target="_blank" rel="noreferrer" className={styles.btnLink}>
                  <Network size={16} /> Ver Arquitetura
                </a>
              )}
            </>
          )}
          <a href={proj.url} target="_blank" rel="noreferrer" className={styles.btnLink}>
            <Code size={16} /> Ver Código
          </a>
          <a href={proj.url} target="_blank" rel="noreferrer" className={styles.btnLink}>
            <ExternalLink size={16} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(() => {
    gsap.from('.proj-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: () => setIsVisible(true)
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
          <span className={styles.prompt}>~/</span> <GlitchText as="span" text={t.projects} reveal={true} revealTrigger={isVisible} />
        </h2>
        
        <div className={styles.grid}>
          {projects.map((proj, idx) => (
            <ProjectCard key={idx} proj={proj} />
          ))}
        </div>
      </div>
    </section>
  );
};
