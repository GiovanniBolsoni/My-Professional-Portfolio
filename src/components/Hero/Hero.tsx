import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Command, ChevronDown, Download } from 'lucide-react';
import styles from './Hero.module.css';
import { profile } from '../../data/resume';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import { useScrambleText } from '../../hooks/useScrambleText';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Split roles for better visual
  const roleText = profile.roles.join(' & ');

  const nameRef = useScrambleText(profile.name, animationStarted, { speed: 40, delay: 600 });
  const roleRef = useScrambleText(roleText, animationStarted, { speed: 30, delay: 1000 });

  useGSAP(() => {
    // Reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      onStart: () => setAnimationStarted(true)
    });

    tl.from('.hero-elem-fade', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.2
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

  // Mouse move parallax for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; // 30px movement
      const y = (e.clientY / innerHeight - 0.5) * 30;

      gsap.to(bgRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.hero} id="hero" ref={containerRef}>
      <div className={styles.heroBg} ref={bgRef}></div>
      <div className={styles.container} ref={textRef}>
        <p className={`${styles.greeting} hero-elem-fade`}>Olá, visitante. Eu sou</p>
        <h1 className={`${styles.name}`} ref={nameRef as any}>
          {/* Initial state to avoid jump before JS runs */}
          {profile.name}
        </h1>
        <h2 className={`${styles.role}`} ref={roleRef as any}>
          {roleText}
        </h2>
        <p className={`${styles.description} hero-elem-fade`}>
          Do SLA crítico ao Código Limpo.
        </p>
        
        <div className={`${styles.actions} hero-elem-fade`}>
          <MagneticButton as="a" href="#projects" className={styles.btnPrimary}>
            Ver Código
            <ChevronDown size={18} />
          </MagneticButton>
          <MagneticButton as="a" href="#contact" className={styles.btnSecondary}>
            Agendar Reunião de Debug
          </MagneticButton>
          <MagneticButton as="a" href={profile.resumePdf} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
            <Download size={18} />
            Baixar Currículo
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

