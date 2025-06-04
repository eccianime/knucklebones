import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../config/colors';
import { GameBackgroundProps } from './types';

export default function GameBackground({ children }: GameBackgroundProps) {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[
        '#000',
        colors.primary[500],
        colors.primary[600],
        colors.primary[600],
        colors.primary[600],
        colors.primary[500],
        '#000',
      ]}
      className='flex-1 '
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      locations={[0, 0.2, 0.25, 0.5, 0.75, 0.8, 1]}
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      {children}
    </LinearGradient>
  );
}
