import styles from './FloatingTerminalBtn.module.css';
import Icon from '../../Icon';

interface FloatingTerminalBtnProps {
  onClick: () => void;
}

export const FloatingTerminalBtn = ({ onClick }: FloatingTerminalBtnProps) => {
  return (
    <button 
      className={styles.fab} 
      onClick={onClick}
      aria-label="Abrir terminal interativo"
      title="Abrir terminal"
    >
      <Icon name="terminal" size={24} />
    </button>
  );
};
