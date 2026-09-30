// No React import
import styles from './Hero.module.css';
import { profile } from '../../data/resume';
import { i18n } from '../../data/i18n';

export const Hero = () => {
  const lang = 'pt';
  const t = i18n[lang].hero;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.greeting}>$ whoami</p>
          <h1 className={styles.name}>{profile.name}</h1>
          <h2 className={styles.role}>{profile.roles[0]}</h2>
          
          <div className={styles.actions}>
            <a href={profile.resumePdf} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
              {t.downloadCV}
            </a>
            <a href="#contact" className={styles.btnSecondary}>
              {t.contactMe}
            </a>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img src={profile.photo} alt={profile.name} className={styles.photo} />
          <div className={styles.glitchBox}></div>
        </div>
      </div>
    </section>
  );
};
