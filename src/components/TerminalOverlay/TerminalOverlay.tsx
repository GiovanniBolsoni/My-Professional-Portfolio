import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Terminal } from '../../terminal/Terminal';
import styles from './TerminalOverlay.module.css';
import Icon from '../../Icon';
import { useScrollLock } from '../../hooks/useScrollLock';
import { getVisitor } from '../../visitor/visitorStore';

interface TerminalOverlayProps {
  onClose: () => void;
}

export const TerminalOverlay = ({ onClose }: TerminalOverlayProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<Terminal | null>(null);
  useScrollLock(true);

  const handle = getVisitor().handle || 'visitante';

  useEffect(() => {
    if (terminalRef.current && !terminalInstance.current) {
      terminalInstance.current = new Terminal(terminalRef.current, { withTopBar: false });
    }

    const handleTransition = () => {
      onClose();
    };

    window.addEventListener('terminal-transition', handleTransition);

    return () => {
      window.removeEventListener('terminal-transition', handleTransition);
    };
  }, [onClose]);

  // Handle Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <motion.div 
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      data-lenis-prevent="true"
    >
      <motion.div 
        className={styles.window}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
      >
        <div className={styles.header}>
          <div className={styles.controls}>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar terminal">
              <Icon name="close" size={14} />
            </button>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
          <div className={styles.title}>{handle}@giovanni: ~</div>
        </div>
        <div ref={terminalRef} className={styles.terminalContainer} />
      </motion.div>
    </motion.div>,
    document.body
  );
};
