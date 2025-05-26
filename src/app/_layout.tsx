import '../../global.css';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LaptureSemibold: require('../assets/fonts/Lapture-Semibold.otf'),
  });

  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='game' />
      </Stack>
    </Provider>
  );
}
