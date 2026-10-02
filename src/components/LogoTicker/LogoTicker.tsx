import styles from './LogoTicker.module.css';

type Skill = {
  id: string;
  name: string;
  customIcon?: string;
};

const SKILLS: Skill[] = [
  { id: "html", name: "HTML5" },
  { id: "css", name: "CSS3" },
  { id: "js", name: "JavaScript" },
  { id: "ts", name: "TypeScript" },
  { id: "react", name: "React" },
  { id: "python", name: "Python" },
  { id: "flask", name: "Flask" },
  { id: "bootstrap", name: "Bootstrap" },
  { id: "vite", name: "Vite" },
  { id: "vercel", name: "Vercel" },
  { id: "git", name: "Git" },
  { id: "github", name: "GitHub" },
  { id: "aws", name: "AWS" },
  { id: "salesforce", name: "Salesforce", customIcon: "/logos/salesforce.svg" },
  { id: "vscode", name: "VS Code" },
  { id: "notion", name: "Notion" },
  { id: "office", name: "Microsoft Office", customIcon: "/logos/office.svg" },
  { id: "claude-code", name: "Claude Code", customIcon: "/logos/claude-code.svg" }
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
    {skill.customIcon ? (
      <div className={styles.customIconWrapper}>
        <img 
          src={skill.customIcon} 
          alt={skill.name} 
          className={styles.logoImage} 
          loading="lazy"
        />
      </div>
    ) : (
      <img 
        src={`https://skillicons.dev/icons?i=${skill.id}`} 
        alt={skill.name} 
        className={styles.logoImage} 
        loading="lazy"
      />
    )}
  </div>
);

export const LogoTicker = () => {
  return (
    <section className={styles.techSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.prompt}>&gt;</span> tech_stack.init()
          </h2>
          <p className={styles.subtitle}>Languages and Technologies</p>
        </div>
        
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            <div className={styles.marqueeGroup}>
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
