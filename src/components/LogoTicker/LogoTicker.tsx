import { useEffect, useRef, useState } from 'react';
import styles from './LogoTicker.module.css';
import { GlitchText } from '../GlitchText/GlitchText';

type Skill = {
  id: string;
  name: string;
  src: string;
  monochrome?: boolean;
  scale?: number;
};

const SKILLS: Skill[] = [
  { id: "html", name: "HTML5", src: "/logos/html5.svg" },
  { id: "css", name: "CSS3", src: "/logos/css3.svg" },
  { id: "js", name: "JavaScript", src: "/logos/javascript.svg" },
  { id: "ts", name: "TypeScript", src: "/logos/typescript.svg" },
  { id: "react", name: "React", src: "/logos/react.svg" },
  { id: "python", name: "Python", src: "/logos/python.svg" },
  { id: "flask", name: "Flask", src: "/logos/flask.svg", monochrome: true },
  { id: "bootstrap", name: "Bootstrap", src: "/logos/bootstrap.svg" },
  { id: "vite", name: "Vite", src: "/logos/vitejs.svg" },
  { id: "vercel", name: "Vercel", src: "/logos/vercel.svg", monochrome: true },
  { id: "git", name: "Git", src: "/logos/git.svg" },
  { id: "github", name: "GitHub", src: "/logos/github.svg", monochrome: true },
  { id: "aws", name: "AWS", src: "/logos/aws.svg" },
  { id: "salesforce", name: "Salesforce", src: "/logos/salesforce.svg" },
  { id: "vscode", name: "VS Code", src: "/logos/vscode.svg" },
  { id: "notion", name: "Notion", src: "/logos/notion.svg", monochrome: true },
  { id: "office", name: "Microsoft Office", src: "/logos/office.svg" },
  { id: "claude-code", name: "Claude Code", src: "/logos/claude-code.svg" },
  { id: "govbr", name: "Gov.br", src: "/logos/govbr.png", scale: 1.2 },
  { id: "credly", name: "Credly", src: "/logos/credly.png", scale: 1.2 }
];

if (import.meta.env.DEV) {
  const ids = SKILLS.map(s => s.id);
  const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);
  if (duplicates.length > 0) {
    console.warn("LogoTicker: Duplicate SKILLS ids found:", duplicates);
  }
}

const LogoItem = ({ skill }: { skill: Skill }) => (
  <div className={styles.logoItem}>
    <img 
      src={skill.src}
      alt={skill.name}
      title={skill.name}
      className={`${styles.logoImage} ${skill.monochrome ? styles.logoMono : ''}`}
      style={skill.scale ? { transform: `scale(${skill.scale})` } : undefined}
      loading="lazy"
    />
  </div>
);

export const LogoTicker = () => {
  const SPEED_PX_PER_SECOND = 35;
  const marqueeGroupRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!marqueeGroupRef.current || !trackRef.current) return;
    
    const updateDuration = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.target === marqueeGroupRef.current) {
          const width = entry.contentRect.width;
          const duration = width / SPEED_PX_PER_SECOND;
          trackRef.current?.style.setProperty('--marquee-duration', `${duration}s`);
        }
      }
    };

    const observer = new ResizeObserver(updateDuration);
    observer.observe(marqueeGroupRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.techSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.prompt}>&gt;</span> <GlitchText as="span" text="tech_stack.init()" reveal={true} revealTrigger={isVisible} />
          </h2>
          <GlitchText as="p" text="Languages and Technologies" className={styles.subtitle} reveal={true} revealTrigger={isVisible} revealDelay={200} />
        </div>
        
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack} ref={trackRef}>
            <div className={styles.marqueeGroup} ref={marqueeGroupRef}>
              {SKILLS.map((skill) => (
                <LogoItem key={skill.id} skill={skill} />
              ))}
            </div>
            
            <div className={styles.marqueeGroup} aria-hidden="true">
              {SKILLS.map((skill) => (
                <LogoItem key={`${skill.id}-copy`} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};