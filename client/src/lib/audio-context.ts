export class AudioContextManager {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private oscillator: OscillatorNode | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private volume = 0.7;
  private useCustomAudio = false; // Toggle between synthetic and custom audio

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

  setUseCustomAudio(useCustom: boolean) {
    this.useCustomAudio = useCustom;
  }

  private async loadAudioFile(filename: string): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error('AudioContext not initialized');
    }

    const response = await fetch(`/audio/${filename}`);
    const arrayBuffer = await response.arrayBuffer();
    return await this.audioContext.decodeAudioData(arrayBuffer);
  }

  async playBreathSound(phase: 'inhale' | 'exhale', duration: number) {
    if (!this.audioContext || !this.gainNode) return;

    if (this.useCustomAudio) {
      await this.playCustomAudio(phase, duration);
    } else {
      this.playSyntheticSound(phase, duration);
    }
  }

  private async playCustomAudio(phase: 'inhale' | 'exhale', targetDuration: number) {
    try {
      const filename = `${phase}.wav`;
      const audioBuffer = await this.loadAudioFile(filename);
      
      // Calculate the playback rate to match the target duration
      const originalDuration = audioBuffer.duration;
      const playbackRate = originalDuration / (targetDuration / 1000);
      
      const source = this.audioContext!.createBufferSource();
      const gainNode = this.audioContext!.createGain();
      
      source.buffer = audioBuffer;
      source.playbackRate.value = playbackRate;
      gainNode.gain.value = this.volume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);
      
      source.start();
    } catch (error) {
      console.warn(`Failed to load custom audio for ${phase}:`, error);
      // Fallback to synthetic sound
      this.playSyntheticSound(phase, targetDuration);
    }
  }

  private playSyntheticSound(phase: 'inhale' | 'exhale', duration: number) {
    // Stop any existing oscillator
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
    }

    this.oscillator = this.audioContext!.createOscillator();
    const frequency = phase === 'inhale' ? 220 : 165; // Different frequencies for inhale/exhale
    
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(frequency, this.audioContext!.currentTime);
    
    // Create a gentle envelope
    const envelope = this.audioContext!.createGain();
    envelope.gain.setValueAtTime(0, this.audioContext!.currentTime);
    envelope.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext!.currentTime + 0.1);
    envelope.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext!.currentTime + duration / 1000 - 0.1);
    envelope.gain.linearRampToValueAtTime(0, this.audioContext!.currentTime + duration / 1000);

    this.oscillator.connect(envelope);
    envelope.connect(this.audioContext!.destination);

    this.oscillator.start(this.audioContext!.currentTime);
    this.oscillator.stop(this.audioContext!.currentTime + duration / 1000);
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
