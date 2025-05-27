import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import DiceImage1 from '../assets/images/dice_1.png';
import DiceImage2 from '../assets/images/dice_2.png';
import DiceImage3 from '../assets/images/dice_3.png';
import DiceImage4 from '../assets/images/dice_4.png';
import DiceImage5 from '../assets/images/dice_5.png';
import DiceImage6 from '../assets/images/dice_6.png';
import { DICE_SPACE_WIDTH } from '../config/utils';
import { DiceRollerProps } from './types';

const DICE_IMAGES = [
  DiceImage1,
  DiceImage2,
  DiceImage3,
  DiceImage4,
  DiceImage5,
  DiceImage6,
];

const DiceRoller = ({ handleRollNumber }: DiceRollerProps) => {
  const [diceImage, setDiceImage] = useState(DICE_IMAGES[0]);

  const rollDice = () => {
    let rollCount = 0;
    const maxRolls = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * DICE_IMAGES.length);
      setDiceImage(DICE_IMAGES[randomIndex]);
      rollCount++;

      if (rollCount >= maxRolls) {
        clearInterval(interval);

        const finalIndex = Math.floor(Math.random() * DICE_IMAGES.length);
        setDiceImage(DICE_IMAGES[finalIndex]);
        handleRollNumber(finalIndex + 1);
      }
    }, 50);
  };

  useEffect(() => {
    rollDice();
  }, []);

  return (
    <Image
      className='absolute'
      source={diceImage}
      style={{
        width: DICE_SPACE_WIDTH - 10,
        height: DICE_SPACE_WIDTH - 10,
      }}
    />
  );
};

export default DiceRoller;
