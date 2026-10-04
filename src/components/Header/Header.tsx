import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from './Header.module.css';
import { i18n } from '../../data/i18n';
import { applyTheme, defaultThemeName, themes } from '../../themes/themes';
import { scrollToTop } from '../../utils/scroll';
import { socials } from '../../data/resume';

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
        <a href="/" className={styles.logo} aria-label="Voltar ao topo" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>&lt;GB/&gt;</a>
        
        <div className={styles.actions}>
          <nav className={styles.nav}>
            {[
              { id: 'about', label: t.about },
              { id: 'projects', label: t.projects },
              { id: 'certifications', label: t.navCertifications },
              { id: 'github', label: t.navGithub },
              { id: 'contact', label: t.contact }
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('nav-transition', { detail: { targetId: `#${item.id}` } }));
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.socialNav}>
            {socials.map((social) => (
              <a 
                key={social.label} 
                href={social.href} 
                target="_blank" 
                rel="noreferrer" 
                aria-label={social.label} 
                className={styles.socialIcon}
              >
                <img 
                  src={social.icon} 
                  alt={social.label} 
                  width={20} 
                  height={20} 
                  className={social.monochrome ? styles.monochromeIcon : ''} 
                />
              </a>
            ))}
          </div>
          
          <button className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'default' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
