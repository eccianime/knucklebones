import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import HowTo1Image from '../assets/images/how_to_1.png';
import HowTo2Image from '../assets/images/how_to_2.png';
import TitleImage from '../assets/images/how_to_title.png';
import RibbonButton from '../components/RibbonButton';
import Wrapper from '../components/Wrapper';
import { SCREEN_WIDTH } from '../config/utils';

const instructionData = [
  {
    image: HowTo1Image,
    title:
      'When dice of the same number are placed in the same column, multiply their value',
  },
  {
    image: HowTo2Image,
    title: 'Destroy your opponents dice by matching yours to theirs',
  },
];

export default function HowToPlay() {
  const containerWidth = SCREEN_WIDTH - 48;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<FlatList>(null);

  const handleNext = () => {
    scrollRef.current?.scrollToIndex({
      index: 1,
      animated: true,
    });
    setCurrentIndex(1);
  };
  const handleDone = () => {
    router.back();
  };

  const handleBack = () => {
    scrollRef.current?.scrollToIndex({
      index: 0,
      animated: true,
    });
    setCurrentIndex(0);
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
        {currentIndex === 0 && (
          <RibbonButton isSelected title='Next' onPress={handleNext} />
        )}
        {currentIndex === 1 && (
          <>
            <RibbonButton isSelected title='Got it' onPress={handleDone} />
            <RibbonButton title='Back' onPress={handleBack} />
          </>
        )}
      </View>
    </Wrapper>
  );
}
