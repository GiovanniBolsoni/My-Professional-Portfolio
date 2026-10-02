import { useEffect } from 'react';

let lockCount = 0;
let originalPaddingRight = '';

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    lockCount++;

    if (lockCount === 1) {
      originalPaddingRight = document.documentElement.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.documentElement.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
      }

      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    }

    return () => {
      lockCount--;

      if (lockCount === 0) {
        document.documentElement.style.overflow = '';
        document.documentElement.style.paddingRight = originalPaddingRight;
        
        if ((window as any).lenis) {
          (window as any).lenis.start();
        }
      }
    };
  }, [isLocked]);
}
