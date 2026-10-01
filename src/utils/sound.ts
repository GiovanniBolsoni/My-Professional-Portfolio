// Basic audio context singleton
let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playTypingSound = () => {
  try {
    initAudio();
    if (!audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Mechanical click sound characteristics
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(100 + Math.random() * 150, audioCtx.currentTime); 
    
    // Very short decay
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime); // Low volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.02);
  } catch (e) {
    // Ignore audio errors (e.g. autoplay blocked)
  }
};
