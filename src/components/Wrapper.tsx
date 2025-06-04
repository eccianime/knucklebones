import { StatusBar, View } from 'react-native';

import { WrapperProps } from './types';

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <View className={'flex-1 bg-black ' + className}>
      <StatusBar
        translucent
        backgroundColor={'rgba(0, 0, 0, 0)'}
        barStyle={'light-content'}
      />
      {children}
    </View>
  );
}
