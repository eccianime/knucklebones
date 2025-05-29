import React, { useEffect, useState } from 'react';
import { useAudio } from '../hooks/useAudio';
import Dice from './Dice';
import { DiceRollerProps } from './types';

const DiceRoller = ({ handleRollNumber }: DiceRollerProps) => {
  const { playDice } = useAudio();
  const [diceNumber, setDiceNumber] = useState(0);

  const rollDice = () => {
    playDice();
    let rollCount = 0;
    const maxRolls = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 6);
      setDiceNumber(randomIndex);
      rollCount++;

      if (rollCount >= maxRolls) {
        clearInterval(interval);

        const finalIndex = Math.floor(Math.random() * 6);
        setDiceNumber(finalIndex);
        handleRollNumber(finalIndex + 1);
      }
    }, 50);
  };

  useEffect(() => {
    rollDice();
  }, []);

  return <Dice currentNumber={diceNumber + 1} />;
};

export default DiceRoller;
