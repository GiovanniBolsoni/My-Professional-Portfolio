import { useEffect, useState } from 'react';
import { Command, Moon, Sun } from 'lucide-react';
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
    // For now, toggle between default and a light theme if it exists, or dracula
    // We haven't created a true light theme yet, so let's toggle between default and dracula or gruvbox.
    // Or we can just do default and gruvbox.
    const nextTheme = theme === 'default' ? 'dracula' : 'default';
    setTheme(nextTheme);
    applyTheme(themes[nextTheme]);
    localStorage.setItem('terminal-resume-theme', nextTheme);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>&lt;GB/&gt;</div>
        
        <div className={styles.actions}>
          <nav className={styles.nav}>
            <a href="#about">{t.about}</a>
            <a href="#experience">{t.experience}</a>
            <a href="#projects">{t.projects}</a>
            <a href="#contact">{t.contact}</a>
          </nav>
          
          <button className={styles.cmdBtn} aria-label="Command Palette">
            <Command size={16} />
            <span>⌘K</span>
          </button>
          
          <button className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'default' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
