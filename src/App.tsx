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
import styles from './App.module.css';

export default function App() {
  const [hasBooted, setHasBooted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const booted = sessionStorage.getItem('portfolio-booted');
    if (booted) {
      setHasBooted(true);
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
      <AnimatePresence mode="wait">
        {!hasBooted ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
