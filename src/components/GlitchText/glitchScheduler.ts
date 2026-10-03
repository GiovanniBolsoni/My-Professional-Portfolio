

export type GlitchInstance = {
  triggerGlitch: (indices: number[], chars: string[], duration: number, burst: boolean) => void;
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

    if (document.documentElement.dataset.modalOpen === 'true') return true;

    return false;
  }

  private scheduleNext() {
    this.stop();
    if (!this.isEnabled) return;

    // Aumentar os intervalos da anomalia no glitchScheduler.ts: de 1.2s a 3.5s
    // A não ser no tema verde-matrix onde deve ser de 0.6s a 2.0s
    const minDelay = this.isMatrix ? 600 : 1200;
    const maxDelay = this.isMatrix ? 2000 : 3500;
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;

    this.timer = window.setTimeout(() => this.tick(), delay);
  }

  private tick() {
    if (this.isPaused()) {
      this.scheduleNext();
      return;
    }

    const visibleInstances: { el: Element, instance: GlitchInstance }[] = [];
    
    this.instances.forEach((instance, el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = (
        rect.top >= -rect.height &&
        rect.left >= -rect.width &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width
      );

      const isHovered = el.matches(':hover');

      // Add to visible instances if actually on screen (we tolerate a bit of margin)
      if (isVisible && !isHovered) {
        visibleInstances.push({ el, instance });
      }
    });

    if (visibleInstances.length > 0) {
      const target = visibleInstances[Math.floor(Math.random() * visibleInstances.length)];
      this.executeGlitch(target.instance);
    }

    this.scheduleNext();
  }

  private executeGlitch(instance: GlitchInstance) {
    const len = instance.getTextLength();
    if (len === 0) return;

    // 20% chance for a big glitch (pico de invasão)
    const isBig = Math.random() < 0.2;
    
    const count = isBig 
      ? Math.max(2, Math.floor(len * (0.3 + Math.random() * 0.1))) 
      : Math.floor(Math.random() * 3) + 1;

    const indices = new Set<number>();
    let attempts = 0;
    while (indices.size < count && attempts < len * 2) {
      indices.add(Math.floor(Math.random() * len));
      attempts++;
    }

    const indicesArr = Array.from(indices);
    const chars = indicesArr.map(() => this.getRandomChar());
    
    const duration = isBig ? 300 : (Math.floor(Math.random() * 3) + 2) * (Math.floor(Math.random() * 60) + 60);

    instance.triggerGlitch(indicesArr, chars, duration, isBig);
  }

  private getRandomChar(): string {
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  }
}

export const glitchScheduler = new GlitchScheduler();
