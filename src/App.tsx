import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    // We check if the user previously booted to avoid showing the terminal on every reload?
    // Actually, maybe we want to show it every time for the effect, or use sessionStorage.
    // Let's use sessionStorage so it only shows once per tab session.
    const booted = sessionStorage.getItem('portfolio-booted');
    if (booted) {
      setHasBooted(true);
      applyTheme(themes[localStorage.getItem('terminal-resume-theme') || defaultThemeName] || themes[defaultThemeName]);
    } else {
      applyTheme(themes[defaultThemeName]);
    }
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
