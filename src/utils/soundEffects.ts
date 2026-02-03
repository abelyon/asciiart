// Sound effect generator using Web Audio API
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.debug('Audio context not available:', error);
      return null;
    }
  }
  return audioContext;
};

export const playSound = (type: 'success' | 'error' | 'warning' = 'success') => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // Resume audio context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {
        // Silently fail if resume is not allowed
      });
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Different frequencies for success, warning, and error
    if (type === 'success') {
      // Pleasant ascending tone for success
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.1);
    } else if (type === 'warning') {
      // Medium tone for warning
      oscillator.frequency.setValueAtTime(350, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.1);
    } else {
      // Lower, more urgent tone for error
      oscillator.frequency.setValueAtTime(300, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.1);
    }

    oscillator.type = 'sine'; // Smooth sine wave

    // Volume envelope - quick fade in/out (low volume to not be annoying)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  } catch (error) {
    // Silently fail if audio is not available
    console.debug('Sound playback failed:', error);
  }
};
