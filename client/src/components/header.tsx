import { Moon, Sun, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { audioManager } from '@/lib/audio-context';
import { useEffect } from 'react';

export function Header() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [volume, setVolume] = useLocalStorage('volume', 70);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    audioManager.setVolume(volume);
  }, [volume]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <header className="w-full py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-white"
            >
              <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
              <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
              <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary dark:text-white">Breathe</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Volume Control */}
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm">
            <Volume2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
          
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-gray-300" />
            ) : (
              <Moon className="h-4 w-4 text-gray-600" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
