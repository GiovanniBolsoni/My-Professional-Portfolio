import React, { useEffect, useRef, useState, useMemo } from 'react';
import { glitchScheduler } from './glitchScheduler';
import styles from './GlitchText.module.css';
import { playTypingSound } from '../../utils/sound';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
  className?: string;
  style?: React.CSSProperties;
  reveal?: boolean;
  revealTrigger?: boolean;
  revealDelay?: number;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";
const SYMBOLS = '!@#$%&*<>/\\|{}[]=+?~^_01';
const LEET_SPEAK: Record<string, string> = {
  'A': '4', 'a': '4', 'E': '3', 'e': '3', 'I': '1', 'i': '1',
  'O': '0', 'o': '0', 'S': '5', 's': '5', 'T': '7', 't': '7',
  'G': '6', 'g': '6', 'B': '8', 'b': '8',
};

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  as: Component = 'span',
  className = '',
  style,
  reveal = true,
  revealTrigger = true,
  revealDelay = 0
}) => {
  const rootRef = useRef<HTMLElement>(null);
  
  const [isRevealing, setIsRevealing] = useState(() => reveal && !revealTrigger);
  const [hasRevealed, setHasRevealed] = useState(!reveal);
  const [revealIteration, setRevealIteration] = useState(0);
  
  const [glitchState, setGlitchState] = useState<Map<number, string>>(new Map());
  const [isBurst, setIsBurst] = useState(false);

  const structure = useMemo(() => {
    let charIndex = 0;
    const words = text.split(' ').map((word) => {
      const chars = word.split('').map((char) => ({
        char,
        globalIndex: charIndex++,
      }));
      charIndex++; // account for space
      return chars;
    });
    return { words, totalChars: charIndex - 1 };
  }, [text]);

  useEffect(() => {
    if (!reveal || hasRevealed) return;
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealing(false);
      setHasRevealed(true);
      return;
    }

    if (revealTrigger) {
      let interval: number;
      
      const startReveal = () => {
        setIsRevealing(true);
        let iteration = 0;
        interval = window.setInterval(() => {
          playTypingSound();
          setRevealIteration(iteration);
          
          if (iteration >= structure.totalChars) {
            clearInterval(interval);
            setIsRevealing(false);
            setHasRevealed(true);
          }
          iteration += 1 / 3;
        }, 30);
      };

      const timer = window.setTimeout(startReveal, revealDelay);

      return () => {
        clearTimeout(timer);
        if (interval) clearInterval(interval);
      };
    }
  }, [reveal, revealTrigger, hasRevealed, structure.totalChars, revealDelay]);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!hasRevealed || !rootRef.current) return;

    const instance = {
      getTextLength: () => structure.totalChars,
      triggerGlitch: (indices: number[], chars: string[], duration: number, burst: boolean) => {
        const newGlitchState = new Map<number, string>();
        indices.forEach((globalIndex, i) => {
          let replaceChar = chars[i];
          let origChar = '';
          for (const word of structure.words) {
            const found = word.find(c => c.globalIndex === globalIndex);
            if (found) {
              origChar = found.char;
              break;
            }
          }
          
          if (origChar && LEET_SPEAK[origChar] && Math.random() > 0.5) {
            replaceChar = LEET_SPEAK[origChar];
          } else if (Math.random() > 0.3) {
            replaceChar = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          }

          newGlitchState.set(globalIndex, replaceChar);
        });

        setGlitchState(newGlitchState);
        setIsBurst(burst);

        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
          setGlitchState(new Map());
          setIsBurst(false);
        }, duration);
      }
    };

    glitchScheduler.register(rootRef.current, instance);

    return () => {
      if (rootRef.current) {
        glitchScheduler.unregister(rootRef.current);
      }
    };
  }, [hasRevealed, structure]);

  const renderChar = (char: string, globalIndex: number) => {
    if (isRevealing) {
      if (globalIndex < revealIteration) {
        return <span key={globalIndex} className={styles.char}>{char}</span>;
      }
      const randomRevealChar = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      return <span key={globalIndex} className={styles.char}>{randomRevealChar}</span>;
    }

    const glitchedChar = glitchState.get(globalIndex);
    if (glitchedChar) {
      return (
        <span 
          key={globalIndex} 
          className={`${styles.char} ${styles.glitched}`} 
          data-glitch={glitchedChar}
        >
          {char}
        </span>
      );
    }

    return <span key={globalIndex} className={styles.char}>{char}</span>;
  };

  const burstClass = isBurst ? styles.burstMode : '';

  return (
    <Component 
      ref={rootRef as any} 
      className={`${styles.glitchContainer} ${burstClass} ${className}`} 
      style={style}
      aria-label={text}
    >
      <span aria-hidden="true">
        {structure.words.map((word, wIndex) => (
          <React.Fragment key={wIndex}>
            <span className={styles.word}>
              {word.map((c) => renderChar(c.char, c.globalIndex))}
            </span>
            {wIndex < structure.words.length - 1 && <span className={styles.space}> </span>}
          </React.Fragment>
        ))}
      </span>
    </Component>
  );
};
