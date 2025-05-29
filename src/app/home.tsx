import { router } from 'expo-router';
import { Image, StatusBar, Text, View } from 'react-native';

import DiceTopImage from '../assets/images/homeDiceTop.png';
import LogoImage from '../assets/images/logo.png';

import RibbonButton from '../components/RibbonButton';

import { useEffect } from 'react';
import Wrapper from '../components/Wrapper';
import { useAudio } from '../hooks/useAudio';
import { selectFirstPlayer } from '../redux/actions/game';
import { resetGame } from '../redux/slices/game';
import { useAppDispatch, useAppSelector } from '../redux/store';

export default function Home() {
  const dispatch = useAppDispatch();
  const { isVolumeOn } = useAppSelector((state) => state.internal);
  const { playBg } = useAudio();

  const handlePressPlay = () => {
    router.push('/game');
    dispatch(resetGame());
    dispatch(selectFirstPlayer());
  };

  const handlePressHowTo = () => {
    router.push('/how-to-play');
  };

  const handlePressSettings = () => {
    router.push('/settings');
  };

  const handlePressAbout = () => {
    router.push('/about');
  };

  useEffect(() => {
    if (isVolumeOn) {
      playBg();
    }
  }, [isVolumeOn]);

  return (
    <Wrapper>
      <StatusBar
        translucent
        backgroundColor={'rgba(0, 0, 0, 0)'}
        barStyle={'light-content'}
      />
      <View className='flex-1 justify-center items-center gap-2'>
        <Image source={DiceTopImage} className='w-[200] h-[34] mb-2' />
        <Text className='font-LaptureSemiBold text-primary-100 text-[40px]'>
          KNUCKLEBONES
        </Text>
        <Image source={LogoImage} className='w-[60] h-[60] mb-[50]' />
        <RibbonButton onPress={handlePressPlay} isSelected title='Play' />
        <RibbonButton onPress={handlePressHowTo} title='How to Play' />
        <RibbonButton onPress={handlePressSettings} title='Settings' />
        <RibbonButton onPress={handlePressAbout} title='About' />
      </View>
      <Text className='absolute bottom-0 mb-10 font-LaptureSemiBold text-primary-200 text-2xl self-center'>
        v.{'1.0.0'}
      </Text>
    </Wrapper>
  );
}
