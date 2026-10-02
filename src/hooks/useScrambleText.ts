import { useEffect, useRef } from 'react';
import { playTypingSound } from '../utils/sound';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";

export function useScrambleText(
  originalText: string,
  trigger: boolean = true,
  options = { speed: 30, delay: 0 }
) {
  const elementRef = useRef<HTMLHeadingElement | HTMLSpanElement | HTMLParagraphElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !trigger) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.innerText = originalText;
      return;
    }

    let iteration = 0;
    let interval: number;

    const startAnimation = () => {
      interval = window.setInterval(() => {
        playTypingSound();
        el.innerText = originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            if (letter === " ") return " ";
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("");

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3; // Controls how many frames per letter
      }, options.speed);
    };

    if (options.delay > 0) {
      const timeout = setTimeout(startAnimation, options.delay);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    } else {
      startAnimation();
      return () => clearInterval(interval);
    }
  }, [originalText, trigger, options.speed, options.delay]);

  return elementRef;
}
