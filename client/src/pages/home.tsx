import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { BreathingTechnique } from '@shared/schema';
import { Header } from '@/components/header';
import { TechniqueSelector } from '@/components/technique-selector';
import { BreathingVisualization } from '@/components/breathing-visualization';
import { SessionStats } from '@/components/session-stats';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);

  const { data: techniques, isLoading, error } = useQuery<BreathingTechnique[]>({
    queryKey: ['/api/techniques'],
  });

  // Auto-select first technique when data loads
  useState(() => {
    if (techniques && techniques.length > 0 && !selectedTechnique) {
      setSelectedTechnique(techniques[0]);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !techniques) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Unable to Load Techniques
              </h1>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              There was an error loading the breathing techniques. Please refresh the page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <TechniqueSelector
          techniques={techniques}
          selectedTechnique={selectedTechnique}
          onSelectTechnique={setSelectedTechnique}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <BreathingVisualization
            technique={selectedTechnique}
            techniques={techniques}
            onTechniqueChange={setSelectedTechnique}
          />
          
          <SessionStats />
        </div>

        {/* Instructions Section */}
        <section className="mt-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-6 text-center">
                How It Works
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="font-semibold text-text-primary dark:text-white mb-2">
                    Get Comfortable
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Find a quiet space and sit comfortably with your back straight and shoulders relaxed.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="font-semibold text-text-primary dark:text-white mb-2">
                    Follow the Guide
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Watch the breathing circle and follow the visual cues along with the gentle audio guidance.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="font-semibold text-text-primary dark:text-white mb-2">
                    Stay Focused
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    If your mind wanders, gently bring your attention back to your breath and the visual guide.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
