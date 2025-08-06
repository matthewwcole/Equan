import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BreathingTechnique } from '@shared/schema';
import { useBreathingSession } from '@/hooks/use-breathing-session';
import { getAnimationClass } from '@/lib/breathing-patterns';
import { cn } from '@/lib/utils';

interface BreathingVisualizationProps {
  technique: BreathingTechnique | null;
  techniques: BreathingTechnique[];
  onTechniqueChange: (technique: BreathingTechnique) => void;
}

export function BreathingVisualization({ technique, techniques, onTechniqueChange }: BreathingVisualizationProps) {
  const {
    isPlaying,
    currentPhase,
    phaseTimer,
    cyclesCompleted,
    sessionTime,
    play,
    pause,
  } = useBreathingSession(technique);

  const handlePlayPause = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  const handlePrevious = () => {
    if (!technique) return;
    const currentIndex = techniques.findIndex(t => t.id === technique.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : techniques.length - 1;
    onTechniqueChange(techniques[prevIndex]);
  };

  const handleNext = () => {
    if (!technique) return;
    const currentIndex = techniques.findIndex(t => t.id === technique.id);
    const nextIndex = currentIndex < techniques.length - 1 ? currentIndex + 1 : 0;
    onTechniqueChange(techniques[nextIndex]);
  };

  if (!technique) {
    return (
      <div className="lg:col-span-2">
        <Card className="min-h-[500px] flex items-center justify-center">
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">Please select a breathing technique to begin</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <Card className="min-h-[500px] flex flex-col">
        <CardContent className="p-8 flex-1 flex flex-col">
          {/* Session Info */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-text-primary dark:text-white">
                {technique.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {technique.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary dark:text-blue-400">
                {sessionTime}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                Session Time
              </div>
            </div>
          </div>

          {/* Breathing Circle Visualization */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {/* Outer Ring */}
              <div className="w-80 h-80 rounded-full border-4 border-gray-200 dark:border-gray-600 absolute inset-0 pulse-gentle" />
              
              {/* Main Breathing Circle */}
              <motion.div
                className={cn(
                  "w-80 h-80 rounded-full breathing-circle relative flex items-center justify-center",
                  isPlaying && getAnimationClass(technique.id)
                )}
                animate={{
                  scale: isPlaying ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: technique.totalCycle,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                {/* Inner glow effect */}
                <div className="w-60 h-60 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">
                      {currentPhase?.name || 'Ready'}
                    </div>
                    <div className="text-lg text-white/80">
                      {phaseTimer > 0 ? phaseTimer : ''}
                    </div>
                  </div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full breathing-particle"
                      style={{
                        top: `${20 + i * 25}%`,
                        left: `${30 + i * 20}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        rotate: [0, 120, 240, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 mt-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="w-12 h-12 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={handlePlayPause}
              size="lg"
              className="w-16 h-16 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="w-12 h-12 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Cycles completed display */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cycles completed: <span className="font-semibold">{cyclesCompleted}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
