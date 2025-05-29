import { Pressable, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { DICE_SPACE_WIDTH } from '../config/utils';
import { setUserBehaviour } from '../redux/actions/game';
import { GamePhaseEnum } from '../redux/slices/types';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { UserSelectableAreaProps } from './types';

export default function UserSelectableArea({
  children,
  type,
}: UserSelectableAreaProps) {
  const { currentPhase, currentPlayer } = useAppSelector((state) => state.game);

  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);

  const scale1 = useSharedValue(0.8);
  const scale2 = useSharedValue(0.8);
  const scale3 = useSharedValue(0.8);

  const opacities = [opacity1, opacity2, opacity3];
  const scales = [scale1, scale2, scale3];

  const handlePress = (index: number) => {
    if (currentPhase !== GamePhaseEnum.ROLL_DICE || currentPlayer !== 'user')
      return;
    opacities[index].value = withTiming(1, { duration: 500 });
    scales[index].value = withTiming(1.1, { duration: 500 });
    setTimeout(() => {
      opacities[index].value = withTiming(0, { duration: 500 });
      scales[index].value = withTiming(0.8, { duration: 500 });
      runOnJS(selectColumn)(index);
    }, 500);
  };

  const dispatch = useAppDispatch();

  const selectColumn = (column: number) => {
    dispatch(setUserBehaviour(column));
  };

  const animatedStyles1 = useAnimatedStyle(() => ({
    opacity: opacity1.value,
    transform: [{ scale: scale1.value }],
  }));

  const animatedStyles2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
    transform: [{ scale: scale2.value }],
  }));
  const animatedStyles3 = useAnimatedStyle(() => ({
    opacity: opacity3.value,
    transform: [{ scale: scale3.value }],
  }));

  const animatedStylesArray = [
    animatedStyles1,
    animatedStyles2,
    animatedStyles3,
  ];

  return type === 'ai' ? (
    children
  ) : (
    <View className='gap-1'>
      <View className='absolute bottom-0 gap-2 flex-row'>
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <Animated.View
              key={`view-` + index}
              className='bg-primary-500'
              style={[
                {
                  width: DICE_SPACE_WIDTH + 12,
                  height: DICE_SPACE_WIDTH * 3 + 8,
                },
                animatedStylesArray[index],
              ]}
            />
          ))}
      </View>
      {children}
      <View className='absolute bottom-0 gap-4 flex-row justify-around self-center'>
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <Pressable
              key={`pressable-` + index}
              onPress={() => handlePress(index)}
              style={[
                {
                  width: DICE_SPACE_WIDTH + 12,
                  height: DICE_SPACE_WIDTH * 3 + 8,
                },
              ]}
            />
          ))}
      </View>
    </View>
  );
}
