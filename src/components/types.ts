import { TouchableOpacityProps } from 'react-native';

export type RibbonButtonProps = TouchableOpacityProps & {
  isSelected?: boolean;
  title: string;
};
