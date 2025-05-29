import { router } from 'expo-router';
import { ImageBackground, StatusBar, Text, View } from 'react-native';

import HomeImage from '../assets/images/home.png';

import RibbonButton from '../components/RibbonButton';

import { useEffect } from 'react';
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
    <ImageBackground resizeMode='cover' source={HomeImage} className='flex-1'>
      <StatusBar
        translucent
        backgroundColor={'rgba(0, 0, 0, 0)'}
        barStyle={'light-content'}
      />
      <View className='absolute top-[50%] self-center'>
        <RibbonButton onPress={handlePressPlay} isSelected title='Play' />
        <RibbonButton onPress={handlePressHowTo} title='How to Play' />
        <RibbonButton onPress={handlePressSettings} title='Settings' />
        <RibbonButton onPress={handlePressAbout} title='About' />
      </View>
      <Text className='absolute bottom-0 mb-10 font-LaptureSemiBold text-primary-200 self-center text-2xl'>
        v.{'1.0.0'}
      </Text>
    </ImageBackground>
  );
}
