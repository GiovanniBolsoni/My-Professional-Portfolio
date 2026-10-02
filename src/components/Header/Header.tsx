import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from './Header.module.css';
import { i18n } from '../../data/i18n';
import { applyTheme, defaultThemeName, themes } from '../../themes/themes';

export const Header = () => {
  const lang = 'pt'; // To be made dynamic later
  const t = i18n[lang].commands;
  const [theme, setTheme] = useState(defaultThemeName);

  useEffect(() => {
    const saved = localStorage.getItem('terminal-resume-theme') || defaultThemeName;
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'default' ? 'light' : 'default';
    setTheme(nextTheme);
    applyTheme(themes[nextTheme]);
    localStorage.setItem('terminal-resume-theme', nextTheme);
  };

  useEffect(() => {
    const handleToggle = () => toggleTheme();
    const handleSetTheme = (e: CustomEvent<{ themeName: string }>) => {
      const newTheme = e.detail.themeName;
      if (themes[newTheme]) {
        setTheme(newTheme);
        applyTheme(themes[newTheme]);
        localStorage.setItem('terminal-resume-theme', newTheme);
      }
    };
    
    window.addEventListener('toggle-theme', handleToggle);
    window.addEventListener('set-theme', handleSetTheme as EventListener);
    
    return () => {
      window.removeEventListener('toggle-theme', handleToggle);
      window.removeEventListener('set-theme', handleSetTheme as EventListener);
    };
  }, [theme]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>&lt;GB/&gt;</div>
        
        <div className={styles.actions}>
          <nav className={styles.nav}>
            <a href="#about" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('nav-transition', { detail: { targetId: '#about' } })); }}>{t.about}</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('nav-transition', { detail: { targetId: '#experience' } })); }}>{t.experience}</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('nav-transition', { detail: { targetId: '#projects' } })); }}>{t.projects}</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('nav-transition', { detail: { targetId: '#contact' } })); }}>{t.contact}</a>
          </nav>

          <div className={styles.socialNav}>
            <a href="https://github.com/GiovanniBolsoni" target="_blank" rel="noreferrer" aria-label="GitHub" className={styles.socialIcon}>
              <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width={20} height={20} style={{ filter: theme === 'default' ? 'invert(1)' : 'none' }} />
            </a>
            <a href="https://www.linkedin.com/in/giovanni-bolsoni/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
              <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1280px-LinkedIn_icon.svg.png" alt="LinkedIn" width={20} height={20} />
            </a>
            <a href="https://www.instagram.com/_bolsoni_/" target="_blank" rel="noreferrer" aria-label="Instagram" className={styles.socialIcon}>
              <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" width={20} height={20} />
            </a>
          </div>
          
          <button className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'default' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
