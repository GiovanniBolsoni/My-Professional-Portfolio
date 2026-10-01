import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
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

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

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
            initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          >
            <BootTerminal onTransition={handleTransition} />
          </motion.div>
        ) : (
          <motion.div
            key="gui"
            className={styles.mainContent}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Header />
            <main>
              <Hero />
              <About />
              <Projects />
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
