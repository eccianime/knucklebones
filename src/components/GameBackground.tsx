import { ImageBackground } from 'react-native';
import GameBackgroundImage from '../assets/images/game_bg.png';
import { GameBackgroundProps } from './types';

export default function GameBackground({ children }: GameBackgroundProps) {
  return (
    <ImageBackground
      className='flex-1'
      resizeMode='cover'
      source={GameBackgroundImage}
    >
      {children}
    </ImageBackground>
  );
}
