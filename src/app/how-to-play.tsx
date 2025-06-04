import { router } from 'expo-router';
import { goBack } from 'expo-router/build/global-state/routing';
import { useRef, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import HowTo1Image from '../assets/images/how_to_1.png';
import HowTo2Image from '../assets/images/how_to_2.png';
import HowTo3Image from '../assets/images/how_to_3.png';
import HowTo4Image from '../assets/images/how_to_4.png';
import TitleImage from '../assets/images/how_to_title.png';
import RibbonButton from '../components/RibbonButton';
import Wrapper from '../components/Wrapper';
import { SCREEN_WIDTH } from '../config/utils';

const instructionData = [
  {
    image: HowTo1Image,
    title:
      'When dice of different number are placed in the same column, sum their value',
  },
  {
    image: HowTo2Image,
    title: 'When 2 dices match, their value is doubled and summed',
  },
  {
    image: HowTo3Image,
    title: 'When 3 dices match, their value is multiplied by 3 and summed',
  },
  {
    image: HowTo4Image,
    title:
      'If your dice match an opponent dice, the dice will be destroyed. Watch out!',
  },
];

export default function HowToPlay() {
  const containerWidth = SCREEN_WIDTH - 48;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);

  const handleNext = () => {
    scrollRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
    setCurrentIndex(currentIndex + 1);
  };
  const handleDone = () => {
    router.back();
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      goBack();
      return;
    }
    scrollRef.current?.scrollToIndex({
      index: currentIndex - 1,
      animated: true,
    });
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <Wrapper className='p-6'>
      <Image source={TitleImage} className='my-[50] mx-auto h-[50] w-[300]' />
      <FlatList
        data={instructionData}
        ref={scrollRef}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        className='max-h-[400]'
        renderItem={({ item }) => (
          <View
            className=' items-center justify-center'
            style={{ width: containerWidth }}
          >
            <Image source={item.image} className='h-[300] w-[300]' />
            <Text className='text-white text-xl my-5 font-LaptureSemiBold text-center mx-6'>
              {item.title}
            </Text>
          </View>
        )}
      />
      <View className='items-center justify-center'>
        {currentIndex < 3 && (
          <RibbonButton isSelected title='Next' onPress={handleNext} />
        )}
        {currentIndex === 3 && (
          <>
            <RibbonButton isSelected title='Got it' onPress={handleDone} />
          </>
        )}
        <RibbonButton title='Back' onPress={handleBack} />
      </View>
    </Wrapper>
  );
}
