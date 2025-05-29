import { Image, StatusBar, View } from 'react-native';

import BottomLeftImage from '../assets/images/homeBottomLeft.png';
import BottomRightImage from '../assets/images/homeBottomRight.png';
import TopLeftImage from '../assets/images/homeTopLeft.png';
import TopRightImage from '../assets/images/homeTopRight.png';

import { WrapperProps } from './types';

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <View className={'flex-1 bg-black ' + className}>
      <Image
        source={TopLeftImage}
        className='absolute top-0 left-0 w-[200] h-[144]'
      />
      <Image
        source={TopRightImage}
        className='absolute top-0 right-0 w-[200] h-[144]'
      />
      <Image
        source={BottomLeftImage}
        className='absolute bottom-0 left-0 w-[160] h-[144]'
      />
      <Image
        source={BottomRightImage}
        className='absolute bottom-0 right-0 w-[200] h-[144]'
      />
      <StatusBar
        translucent
        backgroundColor={'rgba(0, 0, 0, 0)'}
        barStyle={'light-content'}
      />
      {children}
    </View>
  );
}
