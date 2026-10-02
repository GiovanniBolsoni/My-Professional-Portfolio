import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import styles from './NavTransitionOverlay.module.css';

export const NavTransitionOverlay = () => {
  const [isActive, setIsActive] = useState(false);
  const [command, setCommand] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNav = (e: CustomEvent) => {
      const targetId = e.detail.targetId; // e.g. '#about'
      const targetName = targetId.replace('#', '');
      
      setIsActive(true);
      
      const tl = gsap.timeline({
        onComplete: () => {
          // Scroll to element
          const el = document.querySelector(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'auto' });
          }
          
          // Flash effect
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 0.2,
            onComplete: () => setIsActive(false)
          });
        }
      });

      // Typewriter effect
      const fullCmd = `> root@giovani:~$ cd ${targetName} && cat ${targetName}.json`;
      
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.1,
      });

      for (let i = 0; i <= fullCmd.length; i++) {
        tl.add(() => {
          setCommand(fullCmd.substring(0, i));
        }, `+=${0.015}`); // Very fast typing
      }
      
      tl.add(() => {
        setCommand(fullCmd + '\n\n[ OK ] Acesso concedido. Decriptando...');
      }, '+=0.1');

    };

    window.addEventListener('nav-transition', handleNav as EventListener);
    return () => window.removeEventListener('nav-transition', handleNav as EventListener);
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
