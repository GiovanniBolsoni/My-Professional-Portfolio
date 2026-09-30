// No React import
import styles from './Header.module.css';
import { i18n } from '../../data/i18n';

export const Header = () => {
  const lang = 'pt'; // To be made dynamic later
  const t = i18n[lang].commands;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>GB</div>
        <nav className={styles.nav}>
          <a href="#about">{t.about}</a>
          <a href="#experience">{t.experience}</a>
          <a href="#projects">{t.projects}</a>
          <a href="#contact">{t.contact}</a>
        </nav>
      </div>
    </header>
  );
};
