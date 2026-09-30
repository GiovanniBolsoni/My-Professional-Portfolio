import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Command, ChevronDown } from 'lucide-react';
import styles from './Hero.module.css';
import { profile } from '../../data/resume';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    tl.from('.hero-elem', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Parallax effect on scroll
    gsap.to(textRef.current, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <section className={styles.hero} id="hero" ref={containerRef}>
      <div className={styles.heroBg}></div>
      <div className={styles.container} ref={textRef}>
        <p className={`${styles.greeting} hero-elem`}>Olá, visitante. Eu sou</p>
        <h1 className={`${styles.name} hero-elem`}>
          {profile.name}
        </h1>
        <h2 className={`${styles.role} hero-elem`}>
          {profile.roles.join(' & ')}
        </h2>
        <p className={`${styles.description} hero-elem`}>
          {profile.objective}
        </p>
        
        <div className={`${styles.actions} hero-elem`}>
          <a href="#about" className={styles.btnPrimary}>
            Explorar a Interface
            <ChevronDown size={18} />
          </a>
          <button className={styles.btnSecondary} aria-label="Abrir Command Palette">
            <Command size={18} />
            <span>Menu Rápido (⌘K)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
