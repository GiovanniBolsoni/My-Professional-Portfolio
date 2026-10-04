import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from './Header.module.css';
import { i18n } from '../../data/i18n';
import { applyTheme, defaultThemeName, themes } from '../../themes/themes';
import { scrollToTop } from '../../utils/scroll';

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
            <a href="https://github.com/GiovanniBolsoni" target="_blank" rel="noreferrer" aria-label="GitHub" className={styles.socialIcon}>
              <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width={20} height={20} style={{ filter: theme === 'default' ? 'invert(1)' : 'none' }} />
            </a>
            <a href="https://www.linkedin.com/in/giovanni-bolsoni/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width={20} height={20} />
            </a>
            <a href="https://www.instagram.com/_bolsoni_/" target="_blank" rel="noreferrer" aria-label="Instagram" className={styles.socialIcon}>
              <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" width={20} height={20} />
            </a>
            <a href="https://giovanni-professional-portfolio.notion.site/Professional-Portfolio-28822110d735804795c7d33e038570d3" target="_blank" rel="noreferrer" aria-label="Notion" className={styles.socialIcon}>
              <img src="/icons/notion.svg" alt="Notion" width={20} height={20} style={{ filter: theme === 'default' ? 'invert(1)' : 'none' }} />
            </a>
            <a href="https://www.credly.com/users/giovanni-bolsoni" target="_blank" rel="noreferrer" aria-label="Credly" className={styles.socialIcon}>
              <img src="/icons/credly_square.svg" alt="Credly" width={20} height={20} />
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
