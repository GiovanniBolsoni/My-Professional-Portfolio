import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export const useKonamiCode = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [keyIndex, setKeyIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked) return;

      if (e.key === KONAMI_CODE[keyIndex]) {
        if (keyIndex === KONAMI_CODE.length - 1) {
          setIsUnlocked(true);
        } else {
          setKeyIndex((prev) => prev + 1);
        }
      } else {
        setKeyIndex(e.key === 'ArrowUp' ? 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyIndex, isUnlocked]);

  return { isUnlocked, resetKonami: () => setIsUnlocked(false) };
};
