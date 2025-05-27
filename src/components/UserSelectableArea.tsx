import { Pressable, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { DICE_SPACE_WIDTH } from '../config/utils';
import { setUserBehaviour } from '../redux/actions/game';
import { useAppDispatch } from '../redux/store';
import { UserSelectableAreaProps } from './types';

export default function UserSelectableArea({
  children,
  type,
}: UserSelectableAreaProps) {
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);

  const scale1 = useSharedValue(0.8);
  const scale2 = useSharedValue(0.8);
  const scale3 = useSharedValue(0.8);

  const opacities = [opacity1, opacity2, opacity3];
  const scales = [scale1, scale2, scale3];

  const handlePress = (index: number) => {
    // console.log(index);

    // opacities[index].value = withTiming(1, { duration: 500 });
    // scales[index].value = withTiming(1.1, { duration: 500 });

    // setTimeout(() => {
    //   opacities[index].value = withTiming(0, { duration: 500 });
    //   scales[index].value = withTiming(0.8, { duration: 500 });
    // }, 500);

    runOnJS(selectColumn)(index);
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
    opacity: opacity1.value,
    transform: [{ scale: scale1.value }],
  }));
  const animatedStyles3 = useAnimatedStyle(() => ({
    opacity: opacity1.value,
    transform: [{ scale: scale1.value }],
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
      <View className='absolute bottom-0 gap-2 flex-row'>
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
