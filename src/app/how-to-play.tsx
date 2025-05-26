import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import BackgroundImage from '../assets/images/bg.png';
import HowTo1Image from '../assets/images/how_to_1.png';
import HowTo2Image from '../assets/images/how_to_2.png';
import TitleImage from '../assets/images/how_to_title.png';
import RibbonButton from '../components/RibbonButton';

export default function HowToPlay() {
  const containerWidth = Dimensions.get('screen').width - 48;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleNext = () => {
    scrollRef.current?.scrollTo({
      x: containerWidth,
      animated: true,
    });
    setCurrentIndex(1);
  };
  const handleDone = () => {
    router.back();
  };

  const handleBack = () => {
    scrollRef.current?.scrollTo({
      x: 0,
      animated: true,
    });
    setCurrentIndex(0);
  };
  return (
    <ImageBackground source={BackgroundImage} className='flex-1 p-6'>
      <Image source={TitleImage} className='my-[50] mx-auto h-[50] w-[300]' />
      <ScrollView
        ref={scrollRef}
        bounces={false}
        horizontal
        snapToOffsets={[0, containerWidth]}
        className='max-h-[400]'
        contentContainerClassName='items-start'
      >
        <View
          className=' items-center justify-center'
          style={{ width: containerWidth }}
        >
          <Image source={HowTo1Image} className='h-[300] w-[300]' />
          <Text className='text-white text-xl my-5 font-LaptureSemiBold text-center mx-6'>
            When dice of the same number are placed in the same column, multiply
            their value
          </Text>
        </View>
        <View
          className=' items-center justify-center'
          style={{ width: containerWidth }}
        >
          <Image source={HowTo2Image} className='h-[300] w-[300]' />
          <Text className='text-white text-xl my-5 font-LaptureSemiBold text-center mx-6'>
            Destroy your opponents dice by matching yours to theirs
          </Text>
        </View>
      </ScrollView>
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
    </ImageBackground>
  );
}
