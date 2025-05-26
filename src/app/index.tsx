import { ImageBackground, StatusBar } from 'react-native';
import SplashImage from '../assets/images/splash.png';

export default function Index() {
  return (
    <ImageBackground source={SplashImage} style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} />
    </ImageBackground>
  );
}
