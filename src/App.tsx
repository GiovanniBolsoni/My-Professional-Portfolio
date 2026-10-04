import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.clearScrollMemory('manual');

import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { LogoTicker } from './components/LogoTicker/LogoTicker';
import { About } from './components/About/About';
import { Certifications } from './components/Certifications/Certifications';
import { GithubHistory } from './components/GithubHistory/GithubHistory';
import { Projects } from './components/Projects/Projects';
import { CommandPalette } from './components/CommandPalette/CommandPalette';
import { Footer } from './components/Footer/Footer';

import { Contact } from './components/Contact/Contact';
import { BootTerminal } from './components/BootTerminal/BootTerminal';
import { FloatingTerminalBtn } from './components/FloatingTerminalBtn/FloatingTerminalBtn';
import { TerminalOverlay } from './components/TerminalOverlay/TerminalOverlay';
import { applyTheme, themes, defaultThemeName } from './themes/themes';
import { NavTransitionOverlay } from './components/NavTransitionOverlay/NavTransitionOverlay';
import { NetworkBackground } from './components/NetworkBackground/NetworkBackground';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useScrollLock } from './hooks/useScrollLock';
import { registerVisit, getVisitor } from './visitor/visitorStore';
import styles from './App.module.css';

import { BreachTransition } from './components/BreachTransition/BreachTransition';
// ... (imports remain)

export default function App() {
  const [hasBooted, setHasBooted] = useState(() => !!sessionStorage.getItem('portfolio-booted'));
  const [showOverlay, setShowOverlay] = useState(false);
  const [isBreaching, setIsBreaching] = useState(false);
  const { isUnlocked, resetKonami } = useKonamiCode();

  useEffect(() => {
    if (isUnlocked) {
      window.dispatchEvent(new CustomEvent('set-theme', { detail: { themeName: 'verde-matrix' } }));
    }
  }, [isUnlocked]);

  useScrollLock(isUnlocked || showOverlay);

  useEffect(() => {
    const handleBreachStart = () => {
      setIsBreaching(true);
    };
    window.addEventListener('breach-start', handleBreachStart);

    registerVisit().catch(console.error);

    const handleVisibility = () => {
      if (document.hidden) {
        const v = getVisitor();
        if (v.name) document.title = `Volta aqui, ${v.name} 👀`;
      } else {
        document.title = 'Giovanni Bolsoni | Software Engineer';
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibility);
    
    const handleBeforeUnload = () => window.scrollTo(0, 0);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('breach-start', handleBreachStart);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (hasBooted) {
      applyTheme(themes[localStorage.getItem('terminal-resume-theme') || defaultThemeName] || themes[defaultThemeName]);
    } else {
      applyTheme(themes[defaultThemeName]);
    }

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    (window as any).lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    
    window.addEventListener('load', () => ScrollTrigger.refresh());
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    const easterEgg = `
  ███████████████████████████
  ███████▀▀▀      ▀▀▀███████
  ████▀                 ▀████
  ███│                   │███
  ██▌│                   │▐██
  ██ └┐                 ┌┘ ██
  ██  └┐               ┌┘  ██
  ██  ┌┘▄▄▄▄▄     ▄▄▄▄▄└┐  ██
  ██▌ │██████▌   ▐██████│ ▐██
  ███ │▐███▀▀  ▄  ▀▀███▌│ ███
  ██▀─┘       ▐█▌       └─▀██
  ██▄   ▄▄▄▓  ▀█▀  ▓▄▄▄   ▄██
  ████▄─┘██▌       ▐██└─▄████
  █████▌ ▐█▌       ▐█▌ ▐█████
  ██████  ▀▀       ▀▀  ██████
  ███████             ███████
  
  [!] ACESSO NÃO AUTORIZADO DETECTADO [!]
  Ah, vejo que você é um desenvolvedor explorando o código-fonte...
  Me mande um email e vamos conversar: giovani.soares@example.com
  `;
    
    if (!window.hasOwnProperty('easterEggPrinted')) {
      console.log('%c' + easterEgg, 'color: #00ff00; font-family: monospace; font-size: 12px; font-weight: bold; text-shadow: 0 0 5px #00ff00;');
      (window as any).easterEggPrinted = true;
    }

    // When loading the page already booted, dispatch gui-ready.
    // If not booted, BreachTransition will dispatch it during decrypt phase.
    if (hasBooted && !isBreaching) {
      setTimeout(() => window.dispatchEvent(new Event('gui-ready')), 100);
    }

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [hasBooted, isBreaching]);

  const handleTransition = () => {
    sessionStorage.setItem('portfolio-booted', 'true');
    setHasBooted(true);
    setShowOverlay(false);
    
    const v = getVisitor();
    if (v.visits > 1 && v.name) {
      const toast = document.createElement('div');
      toast.className = styles.visitorToast;
      toast.innerHTML = `Bom te ver de novo, ${v.name} (${v.visits}ª visita)`;
      document.body.appendChild(toast);
      
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';
      toast.style.backgroundColor = 'var(--bg-card)';
      toast.style.color = 'var(--fg)';
      toast.style.padding = '12px 24px';
      toast.style.borderRadius = '8px';
      toast.style.border = '1px solid var(--border)';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      toast.style.zIndex = '10000';
      toast.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        toast.style.transition = 'opacity 0.2s';
      }
      
      requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
      });
      
      setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
      }, 4000);
    }
  };

  return (
    <div className={styles.appShell}>
      <NetworkBackground />
      <CustomCursor />
      <NavTransitionOverlay />
      <div className={styles.noiseOverlay}></div>
      
      {isBreaching && (
        <BreachTransition 
          onDecryptStart={() => {
            handleTransition();
            setTimeout(() => {
              window.dispatchEvent(new Event('gui-ready'));
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo(0, { immediate: true });
                (window as any).lenis.resize();
              }
              ScrollTrigger.refresh();
            }, 50);
          }}
          onComplete={() => setIsBreaching(false)}
        />
      )}

      <AnimatePresence mode="wait">
        {!hasBooted ? (
          <div key="terminal" style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--bg)' }}>
            <BootTerminal onTransition={handleTransition} />
          </div>
        ) : (
          <motion.div 
            key="gui" 
            className={styles.mainContent} 
            id="gui-container"
            initial={{ opacity: 0, filter: 'blur(10px) brightness(2)' }}
            animate={{ 
              opacity: [0, 0.8, 0.4, 1, 0.8, 1], 
              filter: [
                'blur(10px) brightness(2)', 
                'blur(5px) brightness(1.5)', 
                'blur(8px) brightness(1.8)', 
                'blur(0px) brightness(1)', 
                'blur(2px) brightness(1.2)', 
                'blur(0px) brightness(1)'
              ] 
            }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: 'linear' }}
          >
            <Header />
            <main>
              <Hero />
              <LogoTicker />
              <About />
              <Projects />
              <Certifications />
              <GithubHistory />
              <Contact />
            </main>
            
            <Footer />
            <CommandPalette />
            <FloatingTerminalBtn onClick={() => setShowOverlay(true)} />
            

            <AnimatePresence>
              {isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className={styles.konamiOverlay}
                  onClick={resetKonami}
                >
                  <div className={styles.konamiContent}>
                    <h2>SYSTEM OVERRIDE</h2>
                    <p>Konami Code Aceito. Modo Matrix Ativado.</p>
                    <button onClick={resetKonami}>[ RETORNAR ]</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showOverlay && (
          <TerminalOverlay key="terminal-overlay" onClose={() => setShowOverlay(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
