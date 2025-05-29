import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import DiceTopImage from '../assets/images/homeDiceTop.png';
import LogoImage from '../assets/images/logo.png';
import Wrapper from '../components/Wrapper';

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Wrapper>
      <View className='flex-1 justify-center items-center gap-2 '>
        <Image source={DiceTopImage} className='w-[200] h-[34] mb-2' />
        <Text className='font-LaptureSemiBold text-primary-100 text-[40px]'>
          KNUCKLEBONES
        </Text>
        <Image source={LogoImage} className='w-[60] h-[60] mb-[50]' />
      </View>
    </Wrapper>
  );
}
