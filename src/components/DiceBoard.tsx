import { useRef } from 'react';
import { findNodeHandle, UIManager, View } from 'react-native';
import { setCellPosition } from '../redux/slices/internal';
import { CellPosition } from '../redux/slices/types';
import { useAppDispatch } from '../redux/store';
import { DiceBoardProps } from './types';

const DICE_SPACE_WIDTH = 60;

type CellRefMap = Record<string, View | null>;

export default function DiceBoard({ type }: DiceBoardProps) {
  const rows = 3;
  const cols = 3;

  const dispatch = useAppDispatch();

  const cellRefs = useRef<CellRefMap>({});

  const handleMeasureCell = (row: number, col: number, type: 'ai' | 'user') => {
    const key = `${row}-${col}`;
    const ref = cellRefs.current[key];
    const node = ref ? findNodeHandle(ref) : null;

    if (node) {
      UIManager.measureInWindow(node, (x, y, width, height) => {
        console.log(`Posición absoluta de ${type} cell-${key}:`, x, y);
        const position: CellPosition = { x, y };
        dispatch(setCellPosition({ type, row, col, position }));
      });
    }
  };

  return (
    <View className='items-center flex-1'>
      <View
        className={`absolute ${type === 'ai' ? 'top-[180]' : 'bottom-[180]'}`}
      >
        <View className='gap-1'>
          {Array.from({ length: rows }).map((_, row) => (
            <View key={`row-${row}`} className='flex-row gap-3'>
              {Array.from({ length: cols }).map((_, col) => (
                <View
                  key={`cell-${row}-${col}`}
                  ref={(ref) => {
                    cellRefs.current[`${row}-${col}`] = ref;
                  }}
                  className='bg-primary-400'
                  onLayout={() => handleMeasureCell(row, col, type)}
                  style={{ width: DICE_SPACE_WIDTH, height: DICE_SPACE_WIDTH }}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
