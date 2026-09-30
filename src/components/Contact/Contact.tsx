import { useState } from 'react';
import styles from './Contact.module.css';
import { profile, socials } from '../../data/resume';
import { i18n } from '../../data/i18n';
import Icon from '../../Icon';

export const Contact = () => {
  const lang = 'pt';
  const t = i18n[lang].commands;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.prompt}>&gt;</span> {t.contact}
        </h2>
        
        <div className={styles.content}>
          <div className={styles.info}>
            <p className={styles.description}>
              Estou aberto a novas oportunidades e conexões. Sinta-se à vontade para entrar em contato!
            </p>
            
            <button onClick={handleCopyEmail} className={styles.emailBtn}>
              <Icon name="mail" size={20} />
              {copied ? 'E-mail copiado!' : profile.email}
            </button>

            <div className={styles.socials}>
              {socials.map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noreferrer" className={styles.socialLink}>
                  {/* Assuming Icon handles specific social icons if available, else just text for now */}
                  <span className={styles.socialLabel}>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className={styles.terminalFinal}>
            <div className={styles.termHeader}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
            <div className={styles.termBody}>
              <p><span className={styles.prompt}>visitante@giovanni:~$</span> ./check_status.sh</p>
              <p className={styles.termOutput}>ticket #001 status: resolvido ✅</p>
              <p><span className={styles.prompt}>visitante@giovanni:~$</span> <span className={styles.cursor}></span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
