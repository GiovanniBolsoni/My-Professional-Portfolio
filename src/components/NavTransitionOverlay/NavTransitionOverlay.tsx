import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import styles from './NavTransitionOverlay.module.css';
import { scrollToSection } from '../../utils/scroll';

export const NavTransitionOverlay = () => {
  const [isActive, setIsActive] = useState(false);
  const [command, setCommand] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNav = async (e: Event) => {
      const customEvent = e as CustomEvent;
      const targetId = customEvent.detail.targetId; // e.g. '#about'
      const targetName = targetId.replace('#', '');
      
      setIsActive(true);
      
      const fullCmd = `> cd ${targetName}`;
      
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.2,
      });

      let currentIdx = 0;
      const typeInterval = setInterval(() => {
        if (currentIdx <= fullCmd.length) {
          setCommand(fullCmd.substring(0, currentIdx));
          currentIdx++;
        } else {
          clearInterval(typeInterval);
        }
      }, 30);
      
      // Scroll to element simultaneously
      await scrollToSection(targetId);
      
      clearInterval(typeInterval);
      setCommand(fullCmd + ' [ OK ]');
      
      // Fade out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.8,
        onComplete: () => setIsActive(false)
      });
    };

    window.addEventListener('nav-transition', handleNav);
    return () => window.removeEventListener('nav-transition', handleNav);
  }, []);

  if (!isActive) return null;

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.terminal}>
        <pre>{command}<span className={styles.cursor}>_</span></pre>
      </div>
    </div>
  );
};
