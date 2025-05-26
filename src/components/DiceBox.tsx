import { ImageBackground, View } from 'react-native';
import AIDiceBoxImage from '../assets/images/dice_box_ai.png';
import UserDiceBoxImage from '../assets/images/dice_box_user.png';
import { DiceBoxProps } from './types';

export default function DiceBox({ type }: DiceBoxProps) {
  return (
    <View
      className={`self-center absolute ${
        type === 'ai' ? 'top-[60]' : 'bottom-[30]'
      }`}
    >
      <ImageBackground
        source={type === 'ai' ? AIDiceBoxImage : UserDiceBoxImage}
        className='h-[115] w-[200] items-center justify-center'
      ></ImageBackground>
    </View>
  );
}
