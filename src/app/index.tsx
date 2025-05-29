import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import splashImage from '../assets/images/splash.png';

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View className='flex-1 justify-center items-center'>
      <Image
        source={splashImage}
        transition={100}
        contentFit='cover'
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
}
