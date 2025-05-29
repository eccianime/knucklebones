import '../../global.css';

import { useFonts } from 'expo-font';
import { setVisibilityAsync } from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { AudioProvider } from '../hooks/useAudio';
import store from '../redux/store';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LaptureSemibold: require('../assets/fonts/Lapture-Semibold.otf'),
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      setVisibilityAsync('hidden');
    }
  }, []);
  if (!fontsLoaded) return null;

  return (
    <ReduxProvider store={store}>
      <AudioProvider>
        <Stack
          screenOptions={{ headerShown: false, animation: 'ios_from_right' }}
        />
      </AudioProvider>
    </ReduxProvider>
  );
}
