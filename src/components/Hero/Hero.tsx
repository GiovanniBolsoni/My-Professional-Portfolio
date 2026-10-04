import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronDown, Download } from 'lucide-react';
import styles from './Hero.module.css';
import { profile } from '../../data/resume';
import { MagneticButton } from '../MagneticButton/MagneticButton';
import { GlitchText } from '../GlitchText/GlitchText';
import { useVisitor } from '../../visitor/useVisitor';
import { setVisitorName } from '../../visitor/visitorStore';

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const visitor = useVisitor();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  const roleText = profile.roles.join(' | ');

  useGSAP(() => {
    // Reveal animation
    const handleGuiReady = () => {
      setAnimationStarted(true);
      gsap.fromTo('.hero-elem-fade',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );
    };

    window.addEventListener('gui-ready', handleGuiReady, { once: true });
    const timer = setTimeout(handleGuiReady, 2000); // Fail-safe

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

    return () => {
      window.removeEventListener('gui-ready', handleGuiReady);
      clearTimeout(timer);
    };
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

  const handleNameSubmit = (e: React.KeyboardEvent | React.FocusEvent) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') return;
    if (tempName.trim()) {
      setVisitorName(tempName);
    }
    setIsEditingName(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('nav-transition', { detail: { targetId } }));
  };

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <section className={styles.hero} id="hero" ref={containerRef}>
      <div className={styles.heroBg} ref={bgRef}></div>
      <div className={styles.container} ref={textRef}>
        <p className={`${styles.greeting} hero-elem-fade`} style={{ opacity: 0 }}>
          {greeting},{' '}
          {visitor.name ? (
            <span className={styles.visitorName}>{visitor.name}</span>
          ) : isEditingName ? (
            <input 
              type="text" 
              className={styles.nameInput} 
              placeholder="como posso te chamar?" 
              autoFocus 
              value={tempName}
              onChange={e => setTempName(e.target.value)}
              onKeyDown={handleNameSubmit}
              onBlur={handleNameSubmit}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                outline: 'none',
                width: '200px'
              }}
            />
          ) : (
            <span 
              className={styles.visitorLink} 
              onClick={() => setIsEditingName(true)}
              style={{ cursor: 'pointer', borderBottom: '1px dotted var(--fg-subtle)', color: 'var(--fg-subtle)' }}
            >
              visitante
            </span>
          )}. Eu sou
        </p>
        <GlitchText 
          as="h1" 
          className={styles.name} 
          text={profile.name} 
          reveal={true}
          revealTrigger={animationStarted}
          revealDelay={600} 
        />
        <GlitchText 
          as="h2" 
          className={`${styles.role} hero-elem-fade`} 
          style={{ opacity: 0 }} 
          text={roleText} 
          reveal={false} 
        />

        
        <div className={`${styles.actions} hero-elem-fade`} style={{ opacity: 0 }}>
          <MagneticButton as="a" href="#projects" onClick={(e: any) => handleNavClick(e, 'projects')} className={styles.btnPrimary}>
            Ver Código
            <ChevronDown size={18} />
          </MagneticButton>
          <MagneticButton as="a" href="#contact" onClick={(e: any) => handleNavClick(e, 'contact')} className={styles.btnSecondary}>
            Agendar Reunião de Debug
          </MagneticButton>
          <MagneticButton as="a" href={profile.resumePdf} target="_blank" rel="noreferrer" download="Giovanni_Bolsoni_Fernandes_Curriculo.pdf" className={styles.btnSecondary}>
            <Download size={18} />
            Baixar Currículo
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

