import { ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GameBackgroundImage from '../assets/images/game_bg.png';
import { GameBackgroundProps } from './types';

export default function GameBackground({ children }: GameBackgroundProps) {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ImageBackground
      className='flex-1'
      style={{ paddingTop: top, paddingBottom: bottom }}
      resizeMode='cover'
      source={GameBackgroundImage}
    >
      {children}
    </ImageBackground>
  );
}
