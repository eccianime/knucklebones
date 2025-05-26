import React from 'react';
import { Text, View } from 'react-native';
import { DICE_SPACE_WIDTH } from '../config/utils';
import { DiceColumnPointsProps } from './types';

export default function DiceColumnPoints({ points }: DiceColumnPointsProps) {
  return (
    <View className='flex-row gap-3'>
      {points.map((point) => (
        <View
          key={Math.random()}
          className=' items-center justify-center'
          style={{
            width: DICE_SPACE_WIDTH + 10,
            height: DICE_SPACE_WIDTH - 20,
          }}
        >
          {point > 0 && (
            <Text className='font-LaptureSemiBold text-primary-400 text-3xl'>
              {point}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
