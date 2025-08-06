import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Volume2, Music, VolumeX } from 'lucide-react';
import { audioManager } from '@/lib/audio-context';

interface AudioSettingsProps {
  className?: string;
}

export function AudioSettings({ className }: AudioSettingsProps) {
  const [useCustomAudio, setUseCustomAudio] = useState(false);
  const [volume, setVolume] = useState(70);

  const handleCustomAudioToggle = (enabled: boolean) => {
    setUseCustomAudio(enabled);
    audioManager.setUseCustomAudio(enabled);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    audioManager.setVolume(newVolume);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Audio Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Audio Type Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Breathing Sounds</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose between synthetic tones or breathing audio
              </p>
            </div>
            <Switch
              checked={useCustomAudio}
              onCheckedChange={handleCustomAudioToggle}
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            {useCustomAudio ? (
              <>
                <Music className="h-4 w-4" />
                <span>Using breathing audio files</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                <span>Using synthetic breathing tones</span>
              </>
            )}
          </div>
        </div>

        {/* Volume Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base">Volume</Label>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {volume}%
            </span>
          </div>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-xs text-gray-500">
            <VolumeX className="h-3 w-3" />
            <Volume2 className="h-3 w-3" />
          </div>
        </div>


      </CardContent>
    </Card>
  );
}
