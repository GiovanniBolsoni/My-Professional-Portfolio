import { useRef, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './GithubHistory.module.css';
import { GlitchText } from '../GlitchText/GlitchText';
import { i18n } from '../../data/i18n';

// Define the component
export const GithubHistory = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(() => {
    gsap.from('.github-content', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: () => setIsVisible(true)
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section className={styles.githubSection} id="github" ref={containerRef}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>~/</span> <GlitchText as="span" text={t.github} reveal={true} revealTrigger={isVisible} />
        </h2>
        
        <div className={`${styles.calendarWrapper} github-content`}>
          <GitHubCalendar 
            username="GiovanniBolsoni" 
            colorScheme="dark"
            theme={{
              light: ['var(--surface)', 'var(--surface-hover)', 'var(--selection)', 'var(--cyan)', 'var(--accent)'],
              dark: ['var(--surface)', 'var(--surface-hover)', 'var(--selection)', 'var(--cyan)', 'var(--accent)']
            }}
            blockSize={14}
            blockMargin={4}
            fontSize={14}
          />
        </div>
      </div>
    </section>
  );
};
