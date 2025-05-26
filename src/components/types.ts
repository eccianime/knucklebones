import { TouchableOpacityProps } from 'react-native';

export type RibbonButtonProps = TouchableOpacityProps & {
  isSelected?: boolean;
  title: string;
};

export type GameBackgroundProps = {
  children: React.ReactNode;
};

export type DiceBoardProps = {
  type: 'ai' | 'user';
};
