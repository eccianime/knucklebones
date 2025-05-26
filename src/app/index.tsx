import { ImageBackground, StatusBar, Text, View } from 'react-native';

import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import SplashImage from '../assets/images/splash.png';
import RibbonButton from '../components/RibbonButton';

export default function Index() {
  const [currentSelected, setCurrentSelected] = useState(0);

  const handlePressPlay = () => {
    setCurrentSelected(0);
    setTimeout(() => {
      router.push('/game');
    }, 500);
  };

  const handlePressHowTo = () => {
    setCurrentSelected(1);
    router.push('/how-to-play');
  };

  const handleQuit = () => {
    setCurrentSelected(2);
    router.push('/game');
  };

  useFocusEffect(
    useCallback(() => {
      setCurrentSelected(0);
    }, [])
  );

  return (
    <ImageBackground source={SplashImage} className='flex-1'>
      <StatusBar barStyle={'light-content'} />
      <View className='absolute top-[50%] self-center'>
        <RibbonButton
          onPress={handlePressPlay}
          isSelected={currentSelected === 0}
          title='Play'
        />
        <RibbonButton
          onPress={handlePressHowTo}
          isSelected={currentSelected === 1}
          title='How to Play'
        />
        <RibbonButton
          onPress={handleQuit}
          isSelected={currentSelected === 2}
          title='Quit'
        />
      </View>
      <Text className='absolute bottom-0 mb-6 font-LaptureSemiBold text-primary-200 self-center text-2xl'>
        v.{'1.0.0'}
      </Text>
    </ImageBackground>
  );
}
