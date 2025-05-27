import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../config/utils';
import { setCurrentPlayer } from '../redux/actions/game';
import { GamePhaseEnum } from '../redux/slices/types';
import { useAppDispatch, useAppSelector } from '../redux/store';

cssInterop(LinearGradient, {
  className: 'style',
});

export default function FirstTurnModal() {
  const { currentPhase, currentPlayer } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const xPosition = useSharedValue(SCREEN_WIDTH);
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: xPosition.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (currentPhase !== GamePhaseEnum.SELECT_FIRST_PLAYER || !currentPlayer)
      return;

    xPosition.value = withTiming(0, { duration: 2000 });
    opacity.value = withTiming(1, { duration: 2000 });

    const timer = setTimeout(() => {
      xPosition.value = withTiming(-SCREEN_WIDTH, { duration: 2000 });
      opacity.value = withTiming(0, { duration: 2000 });

      dispatch(setCurrentPlayer({ currentPlayer }));
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentPhase]);

  return (
    <View className='absolute top-[50%]'>
      <Animated.View className={'w-screen'} style={animatedStyles}>
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
          <Text className={'text-3xl text-white font-LaptureSemiBold'}>
            {currentPlayer === 'ai' ? 'AI ROLLS ' : 'YOU ROLL '}FIRST
          </Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
