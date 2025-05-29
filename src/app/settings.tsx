import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import TitleSettingsImage from '../assets/images/settings_title.png';
import RibbonButton from '../components/RibbonButton';
import Wrapper from '../components/Wrapper';
import { useAudio } from '../hooks/useAudio';
import {
  setDifficulty,
  setIsSoundOn,
  setIsVolumeOn,
} from '../redux/slices/internal';
import { useAppDispatch, useAppSelector } from '../redux/store';

export default function Settings() {
  const handleGoBack = () => router.back();
  const { isVolumeOn, isSoundOn, difficulty } = useAppSelector(
    (state) => state.internal
  );

  const { stopBg, playBg } = useAudio();

  const dispatch = useAppDispatch();

  const toggleVolume = () => {
    const newVolumeOn = !isVolumeOn;
    dispatch(setIsVolumeOn(newVolumeOn));
    if (newVolumeOn) {
      playBg();
    } else {
      stopBg();
    }
  };
  const handleSetSoundOn = () => {
    dispatch(setIsSoundOn(!isSoundOn));
  };
  const handleSetDifficulty = () => {
    dispatch(setDifficulty(difficulty === 'Easy' ? 'Intelligent' : 'Easy'));
  };
  return (
    <Wrapper className='p-6'>
      <Image
        source={TitleSettingsImage}
        className='mt-12 mb-5 mx-auto h-[50] w-[260]'
      />
      <View className='mt-10  pb-6 mx-4 gap-5'>
        <View className='flex-row justify-between h-16 items-center'>
          <Text className='font-LaptureSemiBold text-primary-200 text-2xl'>
            Difficulty
          </Text>
          <TouchableOpacity
            className='flex-row items-center gap-2 p-4'
            onPress={handleSetDifficulty}
          >
            {difficulty === 'Intelligent' && (
              <Ionicons name='chevron-back' size={16} color='white' />
            )}
            <Text className='font-LaptureSemiBold text-white text-2xl'>
              {difficulty}
            </Text>
            {difficulty === 'Easy' && (
              <Ionicons name='chevron-forward' size={16} color='white' />
            )}
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-between h-16 items-center'>
          <Text className='font-LaptureSemiBold text-primary-200 text-2xl'>
            Music
          </Text>
          <TouchableOpacity onPress={toggleVolume} className='p-4'>
            <Ionicons
              name={isVolumeOn ? 'volume-high' : 'volume-mute'}
              size={24}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-between h-16 items-center'>
          <Text className='font-LaptureSemiBold text-primary-200 text-2xl'>
            Sound Effects
          </Text>
          <TouchableOpacity onPress={handleSetSoundOn} className='p-4'>
            <Ionicons
              name={isSoundOn ? 'volume-high' : 'volume-mute'}
              size={24}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <View className='items-center mt-10'>
          <RibbonButton isSelected title='Go back' onPress={handleGoBack} />
        </View>
      </View>
    </Wrapper>
  );
}
