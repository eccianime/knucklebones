import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import RibbonImage from '../assets/images/ribbon.png';
import { RibbonButtonProps } from './types';

export default function RibbonButton({
  isSelected,
  title,
  ...props
}: RibbonButtonProps) {
  return (
    <TouchableOpacity {...props}>
      <ImageBackground
        source={isSelected ? RibbonImage : null}
        className='w-[260] h-[60] items-center justify-center'
      >
        <Text
          className={`text-2xl font-LaptureSemiBold ${
            isSelected ? 'text-primary-100' : 'text-primary-200'
          }`}
        >
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
