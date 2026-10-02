import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Briefcase, Code2, GraduationCap } from 'lucide-react';
import styles from './About.module.css';
import { profile, skills, experiences, education, certifications } from '../../data/resume';
import { GlitchText } from '../GlitchText/GlitchText';

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'journey' | 'edu' | 'stack'>('journey');

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
              <span className={styles.prompt}>~/</span> <GlitchText as="span" text="sobre_mim" />
            </h2>
            
            <div className={`${styles.textBlock} about-elem`}>
              {profile.summary.map((paragraph, idx) => (
                <p key={idx} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
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
                className={`${styles.tabBtn} ${activeTab === 'edu' ? styles.active : ''}`}
                onClick={() => setActiveTab('edu')}
              >
                <GraduationCap size={16} /> Formação
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'stack' ? styles.active : ''}`}
                onClick={() => setActiveTab('stack')}
              >
                <Code2 size={16} /> Stack
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

              {activeTab === 'edu' && (
                <div className={styles.eduContainer}>
                  <div className={styles.eduHeader}>
                    <h3 className={styles.role}>{education.course}</h3>
                    <span className={styles.tag}>{education.status}</span>
                  </div>
                  <p className={styles.company}>{education.institution}</p>
                  
                  <p className={styles.eduDescription} dangerouslySetInnerHTML={{ __html: education.description }} />
                  
                  <h4 className={styles.categoryName} style={{ marginTop: '1.5rem' }}>Matérias Desenvolvidas:</h4>
                  <ul className={styles.bullets}>
                    {education.subjects.map((subject, i) => (
                      <li key={i}>{subject}</li>
                    ))}
                  </ul>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
