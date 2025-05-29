import '../../global.css';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Provider as ReduxProvider } from 'react-redux';
import { AudioProvider } from '../hooks/useAudio';
import store from '../redux/store';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LaptureSemibold: require('../assets/fonts/Lapture-Semibold.otf'),
  });

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
