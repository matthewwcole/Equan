import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TrendingUp, Settings, Calendar } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export function SessionStats() {
  const [sessionDuration, setSessionDuration] = useLocalStorage('sessionDuration', 10);
  const [backgroundSound, setBackgroundSound] = useLocalStorage('backgroundSound', 'ocean');
  const [voiceGuidance, setVoiceGuidance] = useLocalStorage('voiceGuidance', true);

  // Mock data for demonstration
  const weeklyData = [
    { day: 'M', sessions: 2, height: '60%' },
    { day: 'T', sessions: 3, height: '80%' },
    { day: 'W', sessions: 1, height: '40%' },
    { day: 'T', sessions: 4, height: '90%' },
    { day: 'F', sessions: 5, height: '100%' },
    { day: 'S', sessions: 0, height: '20%' },
    { day: 'S', sessions: 0, height: '20%' },
  ];

  return (
    <div className="space-y-6">
      {/* Current Session Stats */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-text-primary dark:text-white mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 text-primary mr-2" />
            Current Session
          </h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Cycles Completed</span>
              <Badge variant="secondary">0</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Current Cycle</span>
              <span className="font-semibold text-text-primary dark:text-white">
                1 / 20
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300" 
                style={{ width: '5%' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Settings */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-text-primary dark:text-white mb-4 flex items-center">
            <Settings className="h-5 w-5 text-secondary mr-2" />
            Quick Settings
          </h4>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
                Session Duration
              </Label>
              <Select value={sessionDuration.toString()} onValueChange={(value) => setSessionDuration(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
                Background Sounds
              </Label>
              <Select value={backgroundSound} onValueChange={setBackgroundSound}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="ocean">Ocean Waves</SelectItem>
                  <SelectItem value="forest">Forest Sounds</SelectItem>
                  <SelectItem value="white">White Noise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-gray-600 dark:text-gray-400">Voice Guidance</Label>
              <Switch
                checked={voiceGuidance}
                onCheckedChange={setVoiceGuidance}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-text-primary dark:text-white mb-4 flex items-center">
            <Calendar className="h-5 w-5 text-accent mr-2" />
            This Week
          </h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Sessions</span>
              <span className="font-semibold text-text-primary dark:text-white">8</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Minutes</span>
              <span className="font-semibold text-text-primary dark:text-white">75</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Streak</span>
              <span className="font-semibold text-accent">4 days 🔥</span>
            </div>
            
            {/* Weekly Chart */}
            <div className="mt-4">
              <div className="flex justify-between items-end h-20 space-x-1">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className={`w-6 rounded-t ${day.sessions > 0 ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'}`}
                      style={{ height: day.height }}
                    />
                    <span className="text-xs text-gray-500 mt-1">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
