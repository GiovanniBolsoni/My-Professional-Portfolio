import styles from './Footer.module.css';
import { socials } from '../../data/resume';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socials}>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={social.label}
            >
              {social.label}
            </a>
          ))}
        </div>
        <p className={styles.copyright}>
          &copy; {currentYear} Projetado e Desenvolvido por Giovanni Bolsoni. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
