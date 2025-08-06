import { z } from "zod";

export const breathingTechniqueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  color: z.string(),
  inhale: z.number(),
  hold1: z.number().optional(),
  exhale: z.number(),
  hold2: z.number().optional(),
  totalCycle: z.number(),
});

export const sessionStatsSchema = z.object({
  id: z.string(),
  technique: z.string(),
  duration: z.number(),
  cyclesCompleted: z.number(),
  timestamp: z.string(),
});

export const userSettingsSchema = z.object({
  volume: z.number().min(0).max(100),
  sessionDuration: z.number(),
  backgroundSound: z.string(),
  voiceGuidance: z.boolean(),
  darkMode: z.boolean(),
});

export type BreathingTechnique = z.infer<typeof breathingTechniqueSchema>;
export type SessionStats = z.infer<typeof sessionStatsSchema>;
export type UserSettings = z.infer<typeof userSettingsSchema>;
