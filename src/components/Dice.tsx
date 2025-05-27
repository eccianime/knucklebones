import { Image } from 'react-native';
import DiceImage1 from '../assets/images/dice_1.png';
import DiceImage2 from '../assets/images/dice_2.png';
import DiceImage3 from '../assets/images/dice_3.png';
import DiceImage4 from '../assets/images/dice_4.png';
import DiceImage5 from '../assets/images/dice_5.png';
import DiceImage6 from '../assets/images/dice_6.png';
import { DICE_SPACE_WIDTH } from '../config/utils';
import { DiceProps } from './types';

const DICE_IMAGES = [
  DiceImage1,
  DiceImage2,
  DiceImage3,
  DiceImage4,
  DiceImage5,
  DiceImage6,
];

export default function Dice({ currentNumber }: DiceProps) {
  return (
    <Image
      className='absolute'
      source={DICE_IMAGES[currentNumber - 1]}
      style={{
        width: DICE_SPACE_WIDTH - 10,
        height: DICE_SPACE_WIDTH - 10,
      }}
    />
  );
}
