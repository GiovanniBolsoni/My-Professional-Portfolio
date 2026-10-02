export interface VisitorState {
  name: string;
  handle: string;
  visitorNumber: number | null;
  totalVisitors: number | null;
  firstVisit: number | null;
  lastVisit: number | null;
  visits: number;
  contactResolved: boolean;
}

const STORAGE_KEY = 'portfolio-visitor';

export function getVisitor(): VisitorState {
  const defaultState: VisitorState = {
    name: '',
    handle: 'visitante',
    visitorNumber: null,
    totalVisitors: null,
    firstVisit: null,
    lastVisit: null,
    visits: 1,
    contactResolved: false,
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultState, ...JSON.parse(saved) };
    }
  } catch (e) {
    // Ignore storage errors
  }
  return defaultState;
}

export function saveVisitor(state: Partial<VisitorState>) {
  const current = getVisitor();
  const next = { ...current, ...state };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    // Ignore storage errors
  }
  window.dispatchEvent(new CustomEvent('visitor-updated', { detail: next }));
}

export function validateAndFormatName(rawName: string): { name: string; handle: string; error?: string; easterEgg?: string } {
  const clean = rawName.trim();
  
  if (!clean) {
    return { name: '', handle: 'visitante' };
  }
  
  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(clean)) {
    return { name: '', handle: 'visitante', error: 'use apenas letras, espaços e hifens' };
  }
  
  let name = clean.slice(0, 24).replace(/\s+/g, ' ');
  name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  
  const handle = name.split(' ')[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

  let easterEgg;
  if (['root', 'admin', 'administrator', 'sudo'].includes(handle)) {
    easterEgg = 'Bonita tentativa 😄';
    return { name: '', handle: 'visitante', easterEgg };
  }
  if (['giovanni', 'bolsoni'].includes(handle)) {
    easterEgg = 'Impostor detectado 🤨, pode me chamar pelo seu nome de verdade';
    return { name: '', handle: 'visitante', easterEgg };
  }
  if (['recrutador', 'rh', 'techlead', 'cto'].includes(handle)) {
    easterEgg = 'Ah, a pessoa que eu estava esperando! Mas qual o seu nome mesmo?';
    return { name: '', handle: 'visitante', easterEgg };
  }

  return { name, handle };
}

export function setVisitorName(rawName: string): { easterEgg?: string, error?: string, success: boolean } {
  const result = validateAndFormatName(rawName);
  
  if (result.easterEgg || result.error) {
    return { easterEgg: result.easterEgg, error: result.error, success: false };
  }
  
  const state = getVisitor();
  state.name = result.name;
  state.handle = result.handle || 'visitante';
  if (!state.firstVisit) state.firstVisit = Date.now();
  
  saveVisitor(state);
  return { success: true };
}

export function clearVisitor() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }
  window.dispatchEvent(new CustomEvent('visitor-updated', { detail: getVisitor() }));
}

export function setContactResolved() {
  saveVisitor({ contactResolved: true });
}

export async function registerVisit() {
  const state = getVisitor();
  
  const now = Date.now();
  if (state.lastVisit && (now - state.lastVisit > 30 * 60 * 1000)) {
    state.visits += 1;
  } else if (!state.firstVisit) {
    state.firstVisit = now;
  }
  state.lastVisit = now;
  saveVisitor(state);

  const isDev = new URLSearchParams(window.location.search).get('dev') === '1' || localStorage.getItem('is-dev') === '1';
  if (isDev) {
    localStorage.setItem('is-dev', '1');
  }

  if (!state.visitorNumber) {
    if (isDev) {
      saveVisitor({ visitorNumber: 0, totalVisitors: 0 });
      return;
    }
    
    try {
      const res = await fetch('/api/visit', {
        method: 'POST',
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const data = await res.json();
        saveVisitor({ visitorNumber: data.visitorNumber, totalVisitors: data.total });
      }
    } catch (e) {
      // API fallback
    }
  } else {
    // Just fetch total
    try {
      const res = await fetch('/api/visit', {
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const data = await res.json();
        saveVisitor({ totalVisitors: data.total });
      }
    } catch (e) {
      // API fallback
    }
  }
}
