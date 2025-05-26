import '../../global.css';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LaptureSemibold: require('../assets/fonts/Lapture-Semibold.otf'),
  });

  if (!fontsLoaded) return null;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='game' />
    </Stack>
  );
}
