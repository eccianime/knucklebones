import { Image } from 'react-native';
import DiceImage1 from '../assets/images/dice_1.png';
import DiceImage2 from '../assets/images/dice_2.png';
import DiceImage3 from '../assets/images/dice_3.png';
import DiceImage4 from '../assets/images/dice_4.png';
import DiceImage5 from '../assets/images/dice_5.png';
import DiceImage6 from '../assets/images/dice_6.png';

import DiceBlueImage1 from '../assets/images/dice_1_blue.png';
import DiceBlueImage2 from '../assets/images/dice_2_blue.png';
import DiceBlueImage3 from '../assets/images/dice_3_blue.png';
import DiceBlueImage4 from '../assets/images/dice_4_blue.png';
import DiceBlueImage5 from '../assets/images/dice_5_blue.png';
import DiceBlueImage6 from '../assets/images/dice_6_blue.png';

import DiceYellowImage1 from '../assets/images/dice_1_yellow.png';
import DiceYellowImage2 from '../assets/images/dice_2_yellow.png';
import DiceYellowImage3 from '../assets/images/dice_3_yellow.png';
import DiceYellowImage4 from '../assets/images/dice_4_yellow.png';
import DiceYellowImage5 from '../assets/images/dice_5_yellow.png';
import DiceYellowImage6 from '../assets/images/dice_6_yellow.png';

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

const DICE_BLUE_IMAGES = [
  DiceBlueImage1,
  DiceBlueImage2,
  DiceBlueImage3,
  DiceBlueImage4,
  DiceBlueImage5,
  DiceBlueImage6,
];

const DICE_YELLOW_IMAGES = [
  DiceYellowImage1,
  DiceYellowImage2,
  DiceYellowImage3,
  DiceYellowImage4,
  DiceYellowImage5,
  DiceYellowImage6,
];

export default function Dice({ currentNumber, color = 'normal' }: DiceProps) {
  const DICE_COLORS = {
    normal: DICE_IMAGES,
    blue: DICE_BLUE_IMAGES,
    yellow: DICE_YELLOW_IMAGES,
  };
  return (
    <Image
      className='absolute'
      source={DICE_COLORS[color][currentNumber - 1]}
      style={{
        width: DICE_SPACE_WIDTH - 10,
        height: DICE_SPACE_WIDTH - 10,
      }}
    />
  );
}
