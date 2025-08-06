import { type BreathingTechnique, type SessionStats, type UserSettings } from "@shared/schema";

export interface IStorage {
  getTechniques(): Promise<BreathingTechnique[]>;
  getTechnique(id: string): Promise<BreathingTechnique | undefined>;
  getSessionStats(): Promise<SessionStats[]>;
  addSessionStats(stats: SessionStats): Promise<SessionStats>;
  getUserSettings(): Promise<UserSettings>;
  updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings>;
}

export class MemStorage implements IStorage {
  private techniques: BreathingTechnique[];
  private sessionStats: SessionStats[];
  private userSettings: UserSettings;

  constructor() {
    this.techniques = [
      {
        id: 'deep',
        name: 'Deep Breathing',
        description: 'Simple inhale and exhale pattern for relaxation and stress relief.',
        icon: 'lungs',
        color: 'from-blue-400 to-blue-600',
        inhale: 2,
        exhale: 2,
        totalCycle: 4,
      },
      {
        id: 'box',
        name: 'Box Breathing',
        description: 'Four-count breathing used by Navy SEALs for focus and calm.',
        icon: 'square',
        color: 'from-purple-400 to-purple-600',
        inhale: 4,
        hold1: 4,
        exhale: 4,
        hold2: 4,
        totalCycle: 16,
      },
      {
        id: '478',
        name: '4-7-8 Technique',
        description: "Dr. Weil's technique for anxiety relief and better sleep.",
        icon: 'bed',
        color: 'from-green-400 to-green-600',
        inhale: 4,
        hold1: 7,
        exhale: 8,
        totalCycle: 19,
      },
    ];

    this.sessionStats = [];
    this.userSettings = {
      volume: 70,
      sessionDuration: 10,
      backgroundSound: 'ocean',
      voiceGuidance: true,
      darkMode: false,
    };
  }

  async getTechniques(): Promise<BreathingTechnique[]> {
    return this.techniques;
  }

  async getTechnique(id: string): Promise<BreathingTechnique | undefined> {
    return this.techniques.find(t => t.id === id);
  }

  async getSessionStats(): Promise<SessionStats[]> {
    return this.sessionStats;
  }

  async addSessionStats(stats: SessionStats): Promise<SessionStats> {
    this.sessionStats.push(stats);
    return stats;
  }

  async getUserSettings(): Promise<UserSettings> {
    return this.userSettings;
  }

  async updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    this.userSettings = { ...this.userSettings, ...settings };
    return this.userSettings;
  }
}

export const storage = new MemStorage();
