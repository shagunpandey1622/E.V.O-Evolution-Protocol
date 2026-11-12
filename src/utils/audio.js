// Project E.V.O. — Web Audio API Synthesizer
// Provides realistic sci-fi cybernetic interface audio with ZERO external sound files.
// Disabled by default to respect user experience and browser autoplay policies.

class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  toggleSound(forceState) {
    this.enabled = typeof forceState === 'boolean' ? forceState : !this.enabled;
    if (this.enabled) {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.playBootChime();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  // Futuristic UI Hover Chirp
  playHover() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore audio context exceptions
    }
  }

  // Cyber Click / Selection
  playClick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Ignore audio context exceptions
    }
  }

  // Augmentation Activation Sound
  playActivation() {
    if (!this.enabled || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      // High frequency laser scan sweep
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(300, t);
      osc1.frequency.exponentialRampToValueAtTime(2200, t + 0.35);
      
      gain1.gain.setValueAtTime(0.07, t);
      gain1.gain.linearRampToValueAtTime(0.12, t + 0.2);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.5);

      // Sub-bass resonance thump
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(150, t + 0.1);
      osc2.frequency.exponentialRampToValueAtTime(45, t + 0.45);
      
      gain2.gain.setValueAtTime(0.15, t + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t + 0.1);
      osc2.stop(t + 0.5);
    } catch {
      // Ignore audio context exceptions
    }
  }

  // System Boot Sequence Chime
  playBootChime() {
    if (!this.ctx) return;
    try {
      const frequencies = [440, 554.37, 659.25, 880];
      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + idx * 0.07;
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(t);
        osc.stop(t + 0.32);
      });
    } catch {
      // Ignore audio context exceptions
    }
  }
}

export const cyberAudio = new CyberAudioEngine();
