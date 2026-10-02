import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
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
import { registerVisit, getVisitor } from './visitor/visitorStore';
import styles from './App.module.css';

export default function App() {
  const [hasBooted, setHasBooted] = useState(() => {
    return !!sessionStorage.getItem('portfolio-booted');
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const { isUnlocked, resetKonami } = useKonamiCode();

  useEffect(() => {
    if (isUnlocked) {
      window.dispatchEvent(new CustomEvent('set-theme', { detail: { themeName: 'verde-matrix' } }));
    }
  }, [isUnlocked]);

  useEffect(() => {
    // Registra a visita ao iniciar o app
    registerVisit().catch(console.error);

    const handleVisibility = () => {
      if (document.hidden) {
        const v = getVisitor();
        if (v.name) {
          document.title = `Volta aqui, ${v.name} 👀`;
        }
      } else {
        document.title = 'Giovanni Bolsoni | Software Engineer';
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (hasBooted) {
      applyTheme(themes[localStorage.getItem('terminal-resume-theme') || defaultThemeName] || themes[defaultThemeName]);
    } else {
      applyTheme(themes[defaultThemeName]);
    }

    // Setup smooth scroll and GSAP sync
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    
    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    
    window.addEventListener('load', () => ScrollTrigger.refresh());
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    // Easter egg for developers
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
  Gosta de olhar por baixo do capô, não é?
  
  Que tal pularmos a etapa do RH e falarmos direto de tecnologia?
  Me mande um email e vamos conversar: giovani.soares@example.com
  `;
    
    // Only print once
    if (!window.hasOwnProperty('easterEggPrinted')) {
      console.log('%c' + easterEgg, 'color: #00ff00; font-family: monospace; font-size: 12px; font-weight: bold; text-shadow: 0 0 5px #00ff00;');
      (window as any).easterEggPrinted = true;
    }

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const handleTransition = () => {
    sessionStorage.setItem('portfolio-booted', 'true');
    setHasBooted(true);
    setShowOverlay(false);
    
    // Check if returning visitor for toast
    const v = getVisitor();
    if (v.visits > 1 && v.name) {
      const toast = document.createElement('div');
      toast.className = styles.visitorToast;
      toast.innerHTML = `Bom te ver de novo, ${v.name} (${v.visits}ª visita)`;
      document.body.appendChild(toast);
      
      // Setup simple style inline since it's just a toast
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
      <AnimatePresence mode="wait">
        {!hasBooted ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: [1, 0.8, 1, 0], 
              scale: [1, 1.02, 0.98, 1.1],
              x: [0, -10, 10, -5, 5, 0],
              y: [0, 5, -5, 5, -5, 0],
              skewX: [0, 5, -5, 10, -10, 0],
              filter: [
                'hue-rotate(0deg) contrast(100%) blur(0px)', 
                'hue-rotate(90deg) contrast(200%) blur(2px)', 
                'hue-rotate(-90deg) contrast(300%) blur(4px)', 
                'hue-rotate(0deg) contrast(100%) blur(10px)'
              ]
            }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 1], ease: "easeInOut" }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--bg)' }}
          >
            <BootTerminal onTransition={handleTransition} />
          </motion.div>
        ) : (
          <motion.div
            key="gui"
            className={styles.mainContent}
            initial={
              window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? { opacity: 0 }
                : { opacity: 0, clipPath: 'inset(49.5% 0 49.5% 0)', filter: 'brightness(300%) contrast(200%) blur(10px)' }
            }
            animate={
              window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? { opacity: 1 }
                : { 
                    opacity: [0, 1, 1], 
                    clipPath: ['inset(49.5% 0 49.5% 0)', 'inset(49.5% 0 49.5% 0)', 'inset(0% 0 0% 0)'],
                    filter: [
                      'brightness(300%) contrast(200%) blur(10px)', 
                      'brightness(150%) contrast(150%) blur(2px)', 
                      'blur(0px)'
                    ]
                  }
            }
            onAnimationComplete={() => {
              const gui = document.getElementById('gui-container');
              if (gui) {
                gui.style.filter = 'none';
                gui.style.clipPath = 'none';
              }
              window.dispatchEvent(new Event('gui-ready'));
              if ((window as any).lenis) {
                (window as any).lenis.resize();
              }
              ScrollTrigger.refresh();
            }}
            id="gui-container"
            transition={{ duration: 0.6, times: [0, 0.3, 1], ease: "circOut", delay: 0.1 }}
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
              {showOverlay && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'relative', zIndex: 10000 }}
                >
                  <TerminalOverlay onClose={() => setShowOverlay(false)} />
                </motion.div>
              )}
            </AnimatePresence>

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
    </div>
  );
}
