import React, { useEffect, useRef, useState, useMemo } from 'react';
import { glitchScheduler } from './glitchScheduler';
import styles from './GlitchText.module.css';
import { playTypingSound } from '../../utils/sound';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
  className?: string;
  style?: React.CSSProperties;
  revealWhenVisible?: boolean;
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
  revealWhenVisible = true,
  revealDelay = 0
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const [isRevealing, setIsRevealing] = useState(revealWhenVisible);
  const [revealIteration, setRevealIteration] = useState(0);
  const [glitchState, setGlitchState] = useState<Map<number, string>>(new Map());
  const [hasRevealed, setHasRevealed] = useState(false);

  // Split text into words and chars for rendering
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

  // Reveal logic
  useEffect(() => {
    if (!isRevealing || hasRevealed) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealing(false);
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startReveal = () => {
            let iteration = 0;
            const interval = setInterval(() => {
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

          if (revealDelay > 0) {
            setTimeout(startReveal, revealDelay);
          } else {
            startReveal();
          }
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    return () => observer.disconnect();
  }, [isRevealing, hasRevealed, structure.totalChars, revealDelay]);

  // Register with scheduler after reveal
  useEffect(() => {
    if (!hasRevealed || !rootRef.current) return;

    const instance = {
      getTextLength: () => structure.totalChars,
      triggerGlitch: (indices: number[], chars: string[], duration: number) => {
        // Map chars using leetspeak occasionally
        const newGlitchState = new Map<number, string>();
        indices.forEach((globalIndex, i) => {
          let replaceChar = chars[i]; // default random symbol
          
          // Try to get original char
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

        setTimeout(() => {
          setGlitchState(new Map());
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
    // Handling Reveal
    if (isRevealing) {
      if (globalIndex < revealIteration) {
        return <span key={globalIndex} className={styles.char}>{char}</span>;
      }
      const randomRevealChar = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      return <span key={globalIndex} className={styles.char}>{randomRevealChar}</span>;
    }

    // Handling Glitch
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

    // Normal char
    return <span key={globalIndex} className={styles.char}>{char}</span>;
  };

  return (
    <Component 
      ref={rootRef as any} 
      className={`${styles.glitchContainer} ${className}`} 
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
