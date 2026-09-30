import { useRef, useEffect } from 'react';
import { Terminal } from '../../terminal/Terminal';
import styles from './TerminalOverlay.module.css';
import Icon from '../../Icon';

interface TerminalOverlayProps {
  onClose: () => void;
}

export const TerminalOverlay = ({ onClose }: TerminalOverlayProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<Terminal | null>(null);

  useEffect(() => {
    if (terminalRef.current && !terminalInstance.current) {
      terminalInstance.current = new Terminal(terminalRef.current);
    }

    const handleTransition = () => {
      onClose();
    };

    window.addEventListener('terminal-transition', handleTransition);

    return () => {
      window.removeEventListener('terminal-transition', handleTransition);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <div className={styles.header}>
          <div className={styles.controls}>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar terminal">
              <Icon name="close" size={14} />
            </button>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
          <div className={styles.title}>visitante@giovanni: ~</div>
        </div>
        <div ref={terminalRef} className={styles.terminalContainer} />
      </div>
    </div>
  );
};
