import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Award, Briefcase, Code2, Cloud } from 'lucide-react';
import styles from './About.module.css';
import { profile, skills, certifications, experiences } from '../../data/resume';
import { useScrambleText } from '../../hooks/useScrambleText';

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'journey' | 'stack' | 'certs'>('journey');
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const titleRef = useScrambleText('sobre_mim', isTitleVisible, { speed: 30, delay: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    gsap.from('.about-elem', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section className={styles.about} id="about" ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Coluna Esquerda: Texto e Stats */}
          <div className={styles.leftCol}>
            <h2 className={`${styles.title} about-elem`}>
              <span className={styles.prompt}>~/</span> <span ref={titleRef as any}>sobre_mim</span>
            </h2>
            
            <div className={`${styles.textBlock} about-elem`}>
              {profile.summary.map((paragraph, idx) => (
                <p key={idx} className={styles.paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className={`${styles.stats} about-elem`}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>2+</span>
                <span className={styles.statLabel}>Anos de Exp.</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>{certifications.length}</span>
                <span className={styles.statLabel}>Certificações</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>+200h</span>
                <span className={styles.statLabel}>Estudos Cloud/IA</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Abas (Experiência, Stack, Certificações) */}
          <div className={`${styles.rightCol} about-elem`}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'journey' ? styles.active : ''}`}
                onClick={() => setActiveTab('journey')}
              >
                <Briefcase size={16} /> Experiência
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'stack' ? styles.active : ''}`}
                onClick={() => setActiveTab('stack')}
              >
                <Code2 size={16} /> Stack
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'certs' ? styles.active : ''}`}
                onClick={() => setActiveTab('certs')}
              >
                <Award size={16} /> Certificados
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'journey' && (
                <div className={styles.timeline}>
                  {experiences.map((exp, idx) => (
                    <div key={idx} className={styles.timelineItem}>
                      <div className={styles.timelineDot}></div>
                      <h3 className={styles.role}>{exp.role}</h3>
                      <p className={styles.company}>{exp.company} <span className={styles.period}>({exp.period})</span></p>
                      <ul className={styles.bullets}>
                        {exp.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'stack' && (
                <div className={styles.stackList}>
                  {skills.map((skillGroup, idx) => (
                    <div key={idx} className={styles.stackCategory}>
                      <h4 className={styles.categoryName}>{skillGroup.group}</h4>
                      <div className={styles.tags}>
                        {skillGroup.items.map((item, i) => (
                          <span key={i} className={styles.tag}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'certs' && (
                <div className={styles.certList}>
                  {certifications.map((cert, idx) => (
                    <div key={idx} className={styles.certCard}>
                      {cert.org.includes('AWS') ? (
                        <Cloud className={`${styles.certIcon} ${styles.awsIcon}`} size={20} />
                      ) : (
                        <Award className={styles.certIcon} size={20} />
                      )}
                      <div>
                        <h4 className={styles.certName}>{cert.title}</h4>
                        <p className={styles.certIssuer}>{cert.org} <span className={styles.certYear}>({cert.year})</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
