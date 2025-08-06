import type { BreathingTechnique } from "@shared/schema";

export interface BreathingPhase {
  name: string;
  duration: number;
  instruction: string;
}

export function getBreathingPhases(technique: BreathingTechnique): BreathingPhase[] {
  const phases: BreathingPhase[] = [
    {
      name: "Inhale",
      duration: technique.inhale * 1000,
      instruction: "Breathe in slowly through your nose"
    }
  ];

  if (technique.hold1) {
    phases.push({
      name: "Hold",
      duration: technique.hold1 * 1000,
      instruction: "Hold your breath"
    });
  }

  phases.push({
    name: "Exhale",
    duration: technique.exhale * 1000,
    instruction: "Breathe out slowly through your mouth"
  });

  if (technique.hold2) {
    phases.push({
      name: "Hold",
      duration: technique.hold2 * 1000,
      instruction: "Hold your breath"
    });
  }

  return phases;
}

export function getAnimationClass(techniqueId: string): string {
  switch (techniqueId) {
    case 'deep':
      return 'breathing-deep';
    case 'box':
      return 'breathing-box';
    case '478':
      return 'breathing-478';
    default:
      return 'breathing-deep';
  }
}
