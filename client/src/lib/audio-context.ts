export class AudioContextManager {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private oscillator: OscillatorNode | null = null;
  private volume = 0.7;

  async initialize() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = this.volume;
    }

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  setVolume(volume: number) {
    this.volume = volume / 100;
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(this.volume, this.audioContext!.currentTime);
    }
  }

  playBreathSound(phase: 'inhale' | 'exhale', duration: number) {
    if (!this.audioContext || !this.gainNode) return;

    // Stop any existing oscillator
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
    }

    this.oscillator = this.audioContext.createOscillator();
    const frequency = phase === 'inhale' ? 220 : 165; // Different frequencies for inhale/exhale
    
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    // Create a gentle envelope
    const envelope = this.audioContext.createGain();
    envelope.gain.setValueAtTime(0, this.audioContext.currentTime);
    envelope.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.1);
    envelope.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + duration / 1000 - 0.1);
    envelope.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration / 1000);

    this.oscillator.connect(envelope);
    envelope.connect(this.audioContext.destination);

    this.oscillator.start(this.audioContext.currentTime);
    this.oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  stop() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
  }

  destroy() {
    this.stop();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.gainNode = null;
    }
  }
}

export const audioManager = new AudioContextManager();
