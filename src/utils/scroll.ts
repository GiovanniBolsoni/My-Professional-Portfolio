export const getLenis = () => {
  return typeof window !== 'undefined' ? (window as any).lenis : null;
};

const easing = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const getHeaderOffset = () => {
  const header = document.querySelector('header');
  return header ? header.getBoundingClientRect().height + 16 : 80 + 16;
};

export const scrollToTop = () => {
  return new Promise<void>((resolve) => {
    if (typeof window === 'undefined') return resolve();

    if (window.location.hash) {
      window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = getLenis();

    if (lenis && !isReducedMotion) {
      lenis.scrollTo(0, {
        immediate: false,
        duration: 1.2,
        easing,
        onComplete: () => resolve()
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: isReducedMotion ? 'auto' : 'smooth'
      });
      setTimeout(resolve, isReducedMotion ? 50 : 800);
    }
  });
};

export const scrollToSection = (targetId: string, customOffset?: number) => {
  return new Promise<void>((resolve) => {
    if (typeof window === 'undefined') return resolve();
    
    const targetSelector = targetId.startsWith('#') ? targetId : `#${targetId}`;
    const el = document.querySelector(targetSelector) as HTMLElement;
    
    if (!el) return resolve();

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = getLenis();
    
    const offset = customOffset !== undefined ? customOffset : -getHeaderOffset();

    const focusTarget = () => {
      el.setAttribute('tabIndex', '-1');
      el.focus({ preventScroll: true });
      resolve();
    };

    if (lenis && !isReducedMotion) {
      const distance = Math.abs(el.getBoundingClientRect().top);
      const duration = Math.min(Math.max(distance / 1500, 0.8), 1.8);

      lenis.scrollTo(el, {
        immediate: false,
        duration,
        easing,
        offset,
        onComplete: focusTarget
      });
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: isReducedMotion ? 'auto' : 'smooth' });
      setTimeout(focusTarget, isReducedMotion ? 50 : 800);
    }
  });
};
