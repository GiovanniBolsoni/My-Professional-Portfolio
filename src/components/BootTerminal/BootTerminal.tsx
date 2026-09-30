import { useEffect, useRef } from 'react';
import { Terminal } from '../../terminal/Terminal';
import styles from './BootTerminal.module.css';

interface BootTerminalProps {
  onTransition: () => void;
}

export const BootTerminal = ({ onTransition }: BootTerminalProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<Terminal | null>(null);

  useEffect(() => {
    if (terminalRef.current && !terminalInstance.current) {
      terminalInstance.current = new Terminal(terminalRef.current);
    }

    const handleTransition = () => {
      onTransition();
    };

    window.addEventListener('terminal-transition', handleTransition);

    return () => {
      window.removeEventListener('terminal-transition', handleTransition);
    };
  }, [onTransition]);

  return (
    <div className={styles.terminalWrapper}>
      <div ref={terminalRef} className={styles.terminalContainer} />
    </div>
  );
};
