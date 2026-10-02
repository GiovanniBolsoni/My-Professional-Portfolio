export const getLenis = () => {
  return typeof window !== 'undefined' ? (window as any).lenis : null;
};

export const scrollToTop = () => {
  if (typeof window === 'undefined') return;

  // Remove hash from URL without reloading
  if (window.location.hash) {
    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
  }

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(0, {
      immediate: isReducedMotion,
      duration: isReducedMotion ? 0 : 1.2
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: isReducedMotion ? 'auto' : 'smooth'
    });
  }
};

export const scrollToSection = (targetId: string, offset: number = -80) => {
  if (typeof window === 'undefined') return;
  
  const targetSelector = targetId.startsWith('#') ? targetId : `#${targetId}`;
  const el = document.querySelector(targetSelector);
  
  if (!el) return;

  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(el, {
      immediate: true,
      offset
    });
  } else {
    el.scrollIntoView({ behavior: 'auto' });
  }
};
