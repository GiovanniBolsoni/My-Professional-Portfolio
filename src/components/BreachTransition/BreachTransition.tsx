import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './BreachTransition.module.css';

interface BreachTransitionProps {
  onDecryptStart: () => void;
  onComplete: () => void;
  skip?: boolean;
}

import { SKULL_ART } from './skullArt';

export const BreachTransition: React.FC<BreachTransitionProps> = ({ onDecryptStart, onComplete, skip }) => {
  const [phase, setPhase] = useState<'skull' | 'breach' | 'rupture' | 'decrypt'>('skull');
  const [skullText, setSkullText] = useState('');
  const [breachLines, setBreachLines] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Skip logic
  useEffect(() => {
    if (skip || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDecryptStart();
      setPhase('decrypt');
      return;
    }
    
    // Matrix Rain
    const canvas = canvasRef.current;
    let matrixInterval: number | undefined;
    if (canvas) {
      const c = canvas.getContext('2d');
      if (c) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const letters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""'#&_(),.;:?!\\|{}<>[]^~`;
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = new Array(columns).fill(1);
        
        matrixInterval = window.setInterval(() => {
          c.fillStyle = 'rgba(0, 0, 0, 0.05)';
          c.fillRect(0, 0, canvas.width, canvas.height);
          c.fillStyle = '#0f0';
          c.font = fontSize + 'px monospace';
          for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            c.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        }, 33);
      }
    }

    let isCancelled = false;

    const sequence = async () => {
      // 1. Skull Animation
      const topJawPart = SKULL_ART.slice(0, 13);
      const bottomJawPart = SKULL_ART.slice(13);
      
      const emptyMouthLine = "█████████         █████████";

      const setMouth = (lines: number) => {
        const middle: string[] = [];
        for (let j = 0; j < lines; j++) {
           middle.push(emptyMouthLine);
        }
        setSkullText([...topJawPart, ...middle, ...bottomJawPart].join("\n"));
      };

      const rhythm = [0, 1, 2, 2, 1, 0, 1, 2, 1, 0, 2, 2, 1, 0];
      for (const openLines of rhythm) {
        if (isCancelled) return;
        setMouth(openLines);
        await new Promise(r => setTimeout(r, 90));
      }

      if (isCancelled) return;
      setPhase('breach');

      // 2. Breach Lines (~500ms total)
      const lines = [
        "> bypassing firewall... [OK]",
        "> injecting payload... [OK]",
        "> overriding root privileges...",
        "> ACCESS GRANTED"
      ];
      for (let i = 0; i < lines.length; i++) {
        if (isCancelled) return;
        setBreachLines(prev => [...prev, lines[i]]);
        await new Promise(r => setTimeout(r, 120));
      }

      if (isCancelled) return;
      setPhase('rupture');
      
      // 3. Rupture (~400ms)
      await new Promise(r => setTimeout(r, 400));
      
      if (isCancelled) return;
      // 4. Decrypt (GUI entering)
      onDecryptStart();
      setPhase('decrypt');
    };

    sequence();

    const handleSkip = () => {
      if (!isCancelled && phase !== 'decrypt') {
        isCancelled = true;
        onDecryptStart();
        setPhase('decrypt');
      }
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    return () => {
      isCancelled = true;
      if (matrixInterval) clearInterval(matrixInterval);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, [skip, phase, onDecryptStart]);

  if (phase === 'decrypt') {
    return (
      <div className={styles.container} style={{ pointerEvents: 'none', background: 'transparent' }}>
        <motion.div 
          className={styles.decryptOverlay}
          initial={{ height: '100%' }}
          animate={{ height: '0%' }}
          transition={{ duration: 0.6, ease: 'linear' }}
          onAnimationComplete={onComplete}
        />
        <motion.div 
          className={styles.scanline}
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 0.6, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${phase === 'rupture' ? styles.ruptureActive : ''}`}>
      <canvas ref={canvasRef} className={styles.matrixCanvas} />
      
      {phase === 'skull' && (
        <div className={styles.content}>
          <pre className={styles.skullAnim}>{skullText}</pre>
          <div className={styles.warning}>SYSTEM COMPROMISED</div>
        </div>
      )}

      {phase === 'breach' && (
        <div className={styles.content}>
          <pre className={styles.skullAnim} style={{ opacity: 0.2 }}>{skullText}</pre>
          <div className={styles.breachLines} style={{ position: 'absolute' }}>
            {breachLines.map((line, i) => (
              <p key={i} className={styles.breachLine}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {phase === 'rupture' && (
        <>
          <div className={styles.content}>
            <pre className={styles.skullAnim}>{skullText}</pre>
            <div className={styles.warning}>SYSTEM COMPROMISED</div>
          </div>
          {/* Slice glitches */}
          <motion.div className={styles.slice} style={{ top: '20%' }} animate={{ x: [-20, 20, -10, 30, 0] }} transition={{ duration: 0.2, repeat: Infinity }} />
          <motion.div className={styles.slice} style={{ top: '60%', height: '10vh' }} animate={{ x: [30, -20, 10, -30, 0] }} transition={{ duration: 0.15, repeat: Infinity }} />
        </>
      )}
    </div>
  );
};
