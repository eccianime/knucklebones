import { router } from 'expo-router';
import { ImageBackground, StatusBar, Text, View } from 'react-native';

import HomeImage from '../assets/images/home.png';

import RibbonButton from '../components/RibbonButton';

import { selectFirstPlayer } from '../redux/actions/game';
import { useAppDispatch } from '../redux/store';

export default function Index() {
  const dispatch = useAppDispatch();

  const handlePressPlay = () => {
    router.push('/game');
    dispatch(selectFirstPlayer());
  };

  const handlePressHowTo = () => {
    router.push('/how-to-play');
  };

  const handlePressAbout = () => {
    router.push('/about');
  };

  return (
    <ImageBackground resizeMode='cover' source={HomeImage} className='flex-1'>
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
