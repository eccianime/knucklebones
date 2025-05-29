import { Audio, AVPlaybackSource } from 'expo-av';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useAppSelector } from '../redux/store';

import { Sound } from 'expo-av/build/Audio';
import bgAudio from '../assets/sounds/bg_sound.aac';
import diceAudio from '../assets/sounds/dice.wav';
import loserAudio from '../assets/sounds/lose.wav';
import placeDiceAudio from '../assets/sounds/place_die.wav';
import selectAudio from '../assets/sounds/select.wav';
import winnerAudio from '../assets/sounds/win.wav';

type AudioControls = {
  playDice: () => void;
  playPlaceDice: () => void;
  playWinner: () => void;
  playLoser: () => void;
  playSelect: () => void;
  playBg: () => Promise<void>;
  stopBg: () => Promise<void>;
};

const AudioContext = createContext<AudioControls | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSoundOn } = useAppSelector((state) => state.internal);

  const soundRefs = useRef<Record<string, Sound>>({});
  const bgMusicRef = useRef<Sound | null>(null);

  const preloadSound = useCallback(
    async (key: string, source: AVPlaybackSource) => {
      if (!soundRefs.current[key]) {
        const { sound } = await Audio.Sound.createAsync(source);
        soundRefs.current[key] = sound;
      }
    },
    []
  );

  const playSound = useCallback(
    async (key: string, source: AVPlaybackSource) => {
      if (!isSoundOn) return;
      try {
        await preloadSound(key, source);
        const sound = soundRefs.current[key];
        await sound?.replayAsync();
      } catch (err) {
        console.warn(`Error al reproducir sonido [${key}]:`, err);
      }
    },
    [isSoundOn, preloadSound]
  );

  const playDice = useCallback(() => playSound('dice', diceAudio), [playSound]);
  const playPlaceDice = useCallback(
    () => playSound('placeDice', placeDiceAudio),
    [playSound]
  );
  const playWinner = useCallback(
    () => playSound('winner', winnerAudio),
    [playSound]
  );
  const playLoser = useCallback(
    () => playSound('loser', loserAudio),
    [playSound]
  );
  const playSelect = useCallback(
    () => playSound('select', selectAudio),
    [playSound]
  );

  const playBg = useCallback(async () => {
    try {
      if (!bgMusicRef.current) {
        const { sound } = await Audio.Sound.createAsync(bgAudio, {
          isLooping: true,
        });
        bgMusicRef.current = sound;
      }
      await bgMusicRef.current.playAsync();
    } catch (err) {
      console.warn('Error al reproducir música de fondo:', err);
    }
  }, []);

  const stopBg = useCallback(async () => {
    if (bgMusicRef.current) {
      try {
        await bgMusicRef.current.stopAsync(); // Solo la detenemos
      } catch (err) {
        console.warn('Error al detener música de fondo:', err);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      (async () => {
        if (bgMusicRef.current) {
          try {
            await bgMusicRef.current.unloadAsync();
          } catch (err) {
            console.warn('Error al liberar música de fondo:', err);
          }
          bgMusicRef.current = null;
        }
      })();

      Object.values(soundRefs.current).forEach(async (sound) => {
        try {
          await sound.unloadAsync();
        } catch (err) {
          console.warn('Error al liberar sonido:', err);
        }
      });
      soundRefs.current = {};
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        playDice,
        playPlaceDice,
        playWinner,
        playLoser,
        playBg,
        stopBg,
        playSelect,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio debe usarse dentro de AudioProvider');
  }
  return context;
};
