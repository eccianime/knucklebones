import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { cssInterop } from 'nativewind';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { calculatePoints, delayToResolve, SCREEN_WIDTH } from '../config/utils';
import { restartGame, setCurrentPlayer } from '../redux/actions/game';
import { GamePhaseEnum } from '../redux/slices/types';
import { useAppDispatch, useAppSelector } from '../redux/store';
import RibbonButton from './RibbonButton';

cssInterop(LinearGradient, {
  className: 'style',
});

export default function GradientModal() {
  const {
    currentPhase,
    currentPlayer,
    winner,
    aiOccupiedColumns,
    userOccupiedColumns,
  } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const xPosition = useSharedValue(SCREEN_WIDTH);
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: xPosition.value }],
    opacity: opacity.value,
  }));

  const handleRestartGame = () => {
    dispatch(restartGame());
  };

  useEffect(() => {
    if (
      !(
        currentPhase === GamePhaseEnum.SELECT_FIRST_PLAYER ||
        currentPhase === GamePhaseEnum.GAME_OVER
      ) ||
      !currentPlayer
    )
      return;

    (async () => {
      xPosition.value = withTiming(0, { duration: 2000 });
      opacity.value = withTiming(1, { duration: 2000 });
      await delayToResolve(2000);

      if (currentPhase === GamePhaseEnum.SELECT_FIRST_PLAYER) {
        xPosition.value = withTiming(-SCREEN_WIDTH, { duration: 2000 });
        opacity.value = withTiming(0, { duration: 2000 });

        await delayToResolve(1000);
        dispatch(setCurrentPlayer({ currentPlayer }));

        await delayToResolve(1000);
        xPosition.value = withTiming(SCREEN_WIDTH, { duration: 0 });
        opacity.value = withTiming(1, { duration: 0 });
      }
    })();
  }, [currentPhase]);

  return (
    <View className='absolute top-[50%]'>
      <Animated.View
        className={'w-screen items-center justify-center'}
        style={animatedStyles}
      >
        <LinearGradient
          className='py-5 w-screen items-center justify-center'
          colors={[
            'transparent',
            '#000000',
            '#000000',
            '#000000',
            '#000000',
            'transparent',
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text
            className={'text-3xl text-white font-LaptureSemiBold text-center'}
          >
            {currentPhase === GamePhaseEnum.SELECT_FIRST_PLAYER &&
              `${currentPlayer === 'ai' ? 'AI ROLLS' : 'YOU ROLL'} FIRST`}
            {currentPhase === GamePhaseEnum.GAME_OVER &&
              `AI: ${calculatePoints(aiOccupiedColumns).reduce(
                (a, b) => a + b,
                0
              )} - YOU: ${calculatePoints(userOccupiedColumns).reduce(
                (a, b) => a + b,
                0
              )}`}
          </Text>
          {winner && (
            <Text
              className={
                'text-3xl text-white font-LaptureSemiBold text-center border'
              }
            >
              {winner === 'tie'
                ? 'TIE'
                : winner === 'ai'
                ? 'AI WINS'
                : winner === 'user' && 'YOU WIN'}
            </Text>
          )}
        </LinearGradient>
        {currentPhase === GamePhaseEnum.GAME_OVER && (
          <>
            <RibbonButton
              isSelected
              title='Play Again'
              onPress={handleRestartGame}
            />
            <RibbonButton
              isSelected
              title='Go Back'
              onPress={() => router.back()}
            />
          </>
        )}
      </Animated.View>
    </View>
  );
}
