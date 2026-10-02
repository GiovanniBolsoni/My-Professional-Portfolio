import { useVisitor } from '../../visitor/useVisitor';
import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const visitor = useVisitor();
  const visitsText = visitor.visits > 1 ? `(${visitor.visits}ª visita)` : '';
  const numText = visitor.visitorNumber ? `visitante #${visitor.visitorNumber.toLocaleString('pt-BR')} ${visitsText}` : '';
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {numText && (
          <p className={styles.visitorInfo}>{numText}</p>
        )}
        <p className={styles.copyright}>
          &copy; {currentYear} Projetado e Desenvolvido por Giovanni Bolsoni. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
