import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Journey } from './components/Journey/Journey';
import { Projects } from './components/Projects/Projects';
import { Stack } from './components/Stack/Stack';
import { Certifications } from './components/Certifications/Certifications';
import { Contact } from './components/Contact/Contact';
import { BootTerminal } from './components/BootTerminal/BootTerminal';
import { applyTheme, themes, defaultThemeName } from './themes/themes';

export default function App() {
  const [hasBooted, setHasBooted] = useState(false);

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
  };

  return (
    <>
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Header />
            <main>
              <Hero />
              <About />
              <Journey />
              <Projects />
              <Stack />
              <Certifications />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
