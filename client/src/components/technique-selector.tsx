import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Square, Bed } from 'lucide-react';
import type { BreathingTechnique } from '@shared/schema';
import { cn } from '@/lib/utils';

interface TechniqueSelectorProps {
  techniques: BreathingTechnique[];
  selectedTechnique: BreathingTechnique | null;
  onSelectTechnique: (technique: BreathingTechnique) => void;
}

const iconMap = {
  lungs: Stethoscope,
  square: Square,
  bed: Bed,
};

export function TechniqueSelector({ techniques, selectedTechnique, onSelectTechnique }: TechniqueSelectorProps) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-text-primary dark:text-white mb-4 text-center">
        Choose Your Breathing Technique
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {techniques.map((technique) => {
          const Icon = iconMap[technique.icon as keyof typeof iconMap] || Stethoscope;
          const isSelected = selectedTechnique?.id === technique.id;
          
          return (
            <Card
              key={technique.id}
              className={cn(
                "cursor-pointer transition-all duration-300 hover:shadow-xl border-2",
                isSelected
                  ? "border-primary shadow-lg ring-2 ring-primary/20"
                  : "border-transparent hover:border-primary/30"
              )}
              onClick={() => onSelectTechnique(technique)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${technique.color} rounded-full flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {technique.totalCycle}s cycle
                  </Badge>
                </div>
                <h3 className="font-semibold text-text-primary dark:text-white mb-2">
                  {technique.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {technique.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Inhale {technique.inhale}s
                  {technique.hold1 && ` • Hold ${technique.hold1}s`}
                  {` • Exhale ${technique.exhale}s`}
                  {technique.hold2 && ` • Hold ${technique.hold2}s`}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
