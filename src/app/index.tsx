import { ImageBackground, StatusBar, Text, View } from 'react-native';

import { router } from 'expo-router';
import HomeImage from '../assets/images/home.png';
import RibbonButton from '../components/RibbonButton';

export default function Index() {
  const handlePressPlay = () => {
    router.push('/game');
  };

  const handlePressHowTo = () => {
    router.push('/how-to-play');
  };

  const handlePressAbout = () => {
    router.push('/about');
  };

  return (
    <ImageBackground source={HomeImage} className='flex-1'>
      <StatusBar barStyle={'light-content'} />
      <View className='absolute top-[50%] self-center'>
        <RibbonButton onPress={handlePressPlay} isSelected title='Play' />
        <RibbonButton onPress={handlePressHowTo} title='How to Play' />
        <RibbonButton onPress={handlePressAbout} title='About' />
      </View>
      <Text className='absolute bottom-0 mb-10 font-LaptureSemiBold text-primary-200 self-center text-2xl'>
        v.{'1.0.0'}
      </Text>
    </ImageBackground>
  );
}
