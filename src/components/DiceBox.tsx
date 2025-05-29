import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AIDiceBoxImage from '../assets/images/dice_box_ai.png';
import UserDiceBoxImage from '../assets/images/dice_box_user.png';
import { useAudio } from '../hooks/useAudio';
import { rollDice, setAIBehaviour } from '../redux/actions/game';
import { setCurrentDice } from '../redux/slices/game';
import { GamePhaseEnum } from '../redux/slices/types';
import { useAppDispatch, useAppSelector } from '../redux/store';
import Dice from './Dice';
import DiceRoller from './DiceRoller';
import { DiceBoxProps } from './types';

export default function DiceBox({
  type,
  currentPhase,
  currentPlayer,
}: DiceBoxProps) {
  const { isDiceRolling, currentDice } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const { playPlaceDice } = useAudio();

  const handleSetOrSelectValue = (value: number) => {
    if (type === 'ai') {
      playPlaceDice();
      dispatch(setAIBehaviour(value));
    } else {
      dispatch(setCurrentDice(value));
    }
  };

  const handleUserRoll = () => {
    dispatch(rollDice());
  };

  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      className={`self-center absolute`}
      style={{
        top: type === 'ai' ? top + 20 : undefined,
        bottom: type === 'user' ? bottom + 20 : undefined,
      }}
    >
      <ImageBackground
        source={type === 'ai' ? AIDiceBoxImage : UserDiceBoxImage}
        className='h-[115] w-[200] items-center justify-center'
      >
        {currentPhase === GamePhaseEnum.SELECT_CURRENT_PLAYER &&
          currentPlayer === 'user' &&
          type === 'user' && (
            <TouchableOpacity onPress={handleUserRoll}>
              <Text className='text-white font-LaptureSemiBold text-3xl px-14 text-center py-6'>
                ROLL
              </Text>
            </TouchableOpacity>
          )}
        {currentPhase === GamePhaseEnum.ROLL_DICE &&
          isDiceRolling &&
          currentPlayer === type && (
            <DiceRoller handleRollNumber={handleSetOrSelectValue} />
          )}
        {(currentPhase === GamePhaseEnum.START_AI_BEHAVIOUR ||
          currentPhase === GamePhaseEnum.ROLL_DICE) &&
          currentPlayer === type &&
          !isDiceRolling &&
          currentDice && <Dice currentNumber={currentDice} />}
      </ImageBackground>
    </View>
  );
}
