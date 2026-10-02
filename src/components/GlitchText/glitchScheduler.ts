

export type GlitchInstance = {
  triggerGlitch: (indices: number[], chars: string[], duration: number) => void;
  getTextLength: () => number;
};



const SYMBOLS = '!@#$%&*<>/\\|{}[]=+?~^_01';

class GlitchScheduler {
  private instances = new Map<Element, GlitchInstance>();
  private observer: IntersectionObserver | null = null;
  private timer: number | null = null;
  private isEnabled = true;
  private isMatrix = false;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('glitch-effect');
        if (stored === 'off') this.isEnabled = false;
      } catch (e) {
        // ignore
      }

      this.observer = new IntersectionObserver(
        () => {
          // Visible instances will have isIntersecting = true
          // We handle visibility checks dynamically in the tick
        },
        { threshold: 0.1 }
      );

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.scheduleNext();
        }
      });
      
      window.addEventListener('set-theme', (e: any) => {
        if (e.detail?.themeName === 'verde-matrix') {
          this.isMatrix = true;
        } else {
          this.isMatrix = false;
        }
      });
    }
  }

  public register(el: Element, instance: GlitchInstance) {
    this.instances.set(el, instance);
    if (this.observer) this.observer.observe(el);
    if (this.instances.size === 1) {
      this.scheduleNext();
    }
  }

  public unregister(el: Element) {
    this.instances.delete(el);
    if (this.observer) this.observer.unobserve(el);
    if (this.instances.size === 0) {
      this.stop();
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    try {
      localStorage.setItem('glitch-effect', enabled ? 'on' : 'off');
    } catch (e) {}
    
    if (enabled && this.instances.size > 0 && !document.hidden) {
      this.scheduleNext();
    } else {
      this.stop();
    }
  }

  public getEnabled() {
    return this.isEnabled;
  }

  private stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private isPaused() {
    if (!this.isEnabled) return true;
    if (document.hidden) return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    
    // Check if there is selected text
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return true;

    // Check if any modal/overlay is open
    // A simple way is to check for specific overlay selectors
    if (document.querySelector('[class*="TerminalOverlay_overlay"]')) return true;
    if (document.querySelector('[class*="CommandPalette_overlay"]')) return true;
    if (document.querySelector('[class*="Certifications_modal"]')) return true;

    return false;
  }

  private scheduleNext() {
    this.stop();
    if (!this.isEnabled) return;

    const minDelay = this.isMatrix ? 3000 : 5000;
    const maxDelay = this.isMatrix ? 7000 : 12000;
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;

    this.timer = window.setTimeout(() => this.tick(), delay);
  }

  private tick() {
    if (this.isPaused()) {
      this.scheduleNext();
      return;
    }

    // Find all currently visible instances that are not being hovered
    const visibleInstances: { el: Element, instance: GlitchInstance }[] = [];
    
    this.instances.forEach((instance, el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );

      // Check hover
      const isHovered = el.matches(':hover');

      if (isVisible && !isHovered) {
        visibleInstances.push({ el, instance });
      }
    });

    if (visibleInstances.length > 0) {
      // Pick one random instance
      const target = visibleInstances[Math.floor(Math.random() * visibleInstances.length)];
      this.executeGlitch(target.instance);
    }

    this.scheduleNext();
  }

  private executeGlitch(instance: GlitchInstance) {
    const len = instance.getTextLength();
    if (len === 0) return;

    // 10% chance for a big glitch (30-40% of characters)
    // 90% chance for a small glitch (1-3 characters)
    const isBig = Math.random() < 0.1;
    
    const count = isBig 
      ? Math.max(2, Math.floor(len * (0.3 + Math.random() * 0.1))) 
      : Math.floor(Math.random() * 3) + 1;

    // Pick random unique indices
    const indices = new Set<number>();
    let attempts = 0;
    while (indices.size < count && attempts < len * 2) {
      indices.add(Math.floor(Math.random() * len));
      attempts++;
    }

    const indicesArr = Array.from(indices);
    const chars = indicesArr.map(() => this.getRandomChar());
    
    // Duration: 60-120ms per tick, 2-4 ticks for small, up to 300ms for big
    const duration = isBig ? 300 : (Math.floor(Math.random() * 3) + 2) * (Math.floor(Math.random() * 60) + 60);

    instance.triggerGlitch(indicesArr, chars, duration);
  }

  private getRandomChar(): string {
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  }
}

export const glitchScheduler = new GlitchScheduler();
