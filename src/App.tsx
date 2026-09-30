import { useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Journey } from './components/Journey/Journey';
import { Projects } from './components/Projects/Projects';
import { Stack } from './components/Stack/Stack';
import { Certifications } from './components/Certifications/Certifications';
import { Contact } from './components/Contact/Contact';
import { applyTheme, themes, defaultThemeName } from './themes/themes';

export default function App() {
  useEffect(() => {
    // Apply default theme on load
    applyTheme(themes[defaultThemeName]);
  }, []);

  return (
    <>
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
    </>
  );
}
