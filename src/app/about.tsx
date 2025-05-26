import { router } from 'expo-router';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  View,
} from 'react-native';
import TitleAboutImage from '../assets/images/about_title.png';
import BackgroundImage from '../assets/images/bg.png';
import RibbonButton from '../components/RibbonButton';

export default function About() {
  const handleGoBack = () => router.back();
  return (
    <ImageBackground source={BackgroundImage} className='flex-1 p-6 '>
      <Image
        source={TitleAboutImage}
        className='mt-12 mb-5 mx-auto h-[50] w-[230]'
      />
      <ScrollView bounces={false} contentContainerClassName='flex-grow pb-6'>
        <Text className='text-2xl font-LaptureSemiBold text-white'>
          This game is a fan-made project, created for non-commercial purposes.
          It is not affiliated with, endorsed, or sponsored by the creators of
          Cult of the Lamb or its copyright holders.{'\n\n'}
          All rights, names, characters, designs, and related elements from Cult
          of the Lamb are the intellectual property of Massive Monster and
          Devolver Digital. This project is an unofficial recreation made for
          educational and personal entertainment purposes only.
          {'\n\n'}
          If you are a copyright holder of Cult of the Lamb and believe that
          this project infringes your rights, please contact me at
          <Text
            className='text-primary-300'
            onPress={() => Linking.openURL('mailto:ingjeanpaulrojas@gmail')}
          >
            {' ingjeanpaulrojas@gmail.com '}
          </Text>
          to request removal or modification of any related content.
          {'\n\n'}
          👉 Cult of the Lamb is a registered trademark of Massive Monster and
          Devolver Digital. Learn more about the official game at
          <Text
            className='text-primary-300'
            onPress={() => Linking.openURL('https://www.cultofthelamb.com/')}
          >
            {' https://www.cultofthelamb.com/ '}
          </Text>
          .
        </Text>
      </ScrollView>
      <View className='items-center'>
        <RibbonButton isSelected title='Go back' onPress={handleGoBack} />
      </View>
    </ImageBackground>
  );
}
