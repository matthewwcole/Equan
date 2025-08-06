import { useState, useEffect, useRef, useCallback } from 'react';
import type { BreathingTechnique } from '@shared/schema';
import { getBreathingPhases, type BreathingPhase } from '@/lib/breathing-patterns';
import { audioManager } from '@/lib/audio-context';

export function useBreathingSession(technique: BreathingTechnique | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseTimer, setPhaseTimer] = useState(0);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const phaseTimeoutRef = useRef<NodeJS.Timeout>();
  const phases = technique ? getBreathingPhases(technique) : [];

  const currentPhase = phases[currentPhaseIndex];

  const startPhase = useCallback((phaseIndex: number) => {
    if (!phases[phaseIndex]) return;

    const phase = phases[phaseIndex];
    setCurrentPhaseIndex(phaseIndex);
    setPhaseTimer(Math.ceil(phase.duration / 1000));

    // Play breathing sound for inhale/exhale phases
    if (phase.name === 'Inhale' || phase.name === 'Exhale') {
      audioManager.playBreathSound(
        phase.name.toLowerCase() as 'inhale' | 'exhale',
        phase.duration
      );
    }

    // Count down the phase timer
    const timer = setInterval(() => {
      setPhaseTimer((prev) => {
        const next = prev - 1;
        return next < 0 ? 0 : next;
      });
    }, 1000);

    // Move to next phase after duration
    phaseTimeoutRef.current = setTimeout(() => {
      clearInterval(timer);
      const nextPhaseIndex = (phaseIndex + 1) % phases.length;
      
      // If we completed a full cycle
      if (nextPhaseIndex === 0) {
        setCyclesCompleted(prev => prev + 1);
      }
      
      startPhase(nextPhaseIndex);
    }, phase.duration);
  }, [phases]);

  const play = useCallback(async () => {
    if (!technique) return;
    
    await audioManager.initialize();
    setIsPlaying(true);
    startPhase(currentPhaseIndex);
  }, [technique, currentPhaseIndex, startPhase]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    audioManager.stop();
    
    if (phaseTimeoutRef.current) {
      clearTimeout(phaseTimeoutRef.current);
    }
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentPhaseIndex(0);
    setPhaseTimer(0);
    setCyclesCompleted(0);
    setSessionTime(0);
    audioManager.stop();
    
    if (phaseTimeoutRef.current) {
      clearTimeout(phaseTimeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  // Session timer
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Reset when technique changes
  useEffect(() => {
    reset();
  }, [technique?.id, reset]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (phaseTimeoutRef.current) {
        clearTimeout(phaseTimeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      audioManager.stop();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    isPlaying,
    currentPhase,
    phaseTimer,
    cyclesCompleted,
    sessionTime: formatTime(sessionTime),
    sessionTimeSeconds: sessionTime,
    play,
    pause,
    reset,
  };
}
