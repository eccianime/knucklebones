import { useRef } from 'react';
import { findNodeHandle, UIManager, View } from 'react-native';
import {
  calculatePoints,
  checkDiceColor,
  DICE_SPACE_WIDTH,
} from '../config/utils';
import { setCellPosition } from '../redux/slices/internal';
import { CellPosition } from '../redux/slices/types';
import { useAppDispatch } from '../redux/store';
import Dice from './Dice';
import DiceColumnPoints from './DiceColumnPoints';
import { DiceBoardProps } from './types';
import UserSelectableArea from './UserSelectableArea';

type CellRefMap = Record<string, View | null>;

export default function DiceBoard({ type, occupiedColumns }: DiceBoardProps) {
  const dispatch = useAppDispatch();

  const rows = 3;
  const cols = 3;

  const cellRefs = useRef<CellRefMap>({});

  const handleMeasureCell = (row: number, col: number, type: 'ai' | 'user') => {
    const key = `${row}-${col}`;
    const ref = cellRefs.current[key];
    const node = ref ? findNodeHandle(ref) : null;

    if (node) {
      UIManager.measureInWindow(node, (x, y) => {
        const position: CellPosition = { x, y };
        dispatch(setCellPosition({ type, row, col, position }));
      });
    }
  };

  return (
    <View className='items-center flex-1'>
      <View
        className={`absolute ${type === 'ai' ? 'top-[150]' : 'bottom-[150]'}`}
      >
        <View className='gap-1'>
          {type === 'user' && (
            <DiceColumnPoints points={calculatePoints(occupiedColumns)} />
          )}
          <UserSelectableArea type={type}>
            {Array.from({ length: rows }).map((_, row) => (
              <View key={`row-${row}`} className='flex-row gap-3'>
                {Array.from({ length: cols }).map((_, col) => (
                  <View
                    key={`cell-${row}-${col}`}
                    ref={(ref) => {
                      cellRefs.current[`${row}-${col}`] = ref;
                    }}
                    className='bg-primary-400 items-center justify-center'
                    onLayout={() => handleMeasureCell(row, col, type)}
                    style={{
                      width: DICE_SPACE_WIDTH + 10,
                      height: DICE_SPACE_WIDTH,
                    }}
                  >
                    {occupiedColumns[row][col] > 0 && (
                      <Dice
                        currentNumber={occupiedColumns[row][col]}
                        color={checkDiceColor(
                          occupiedColumns,
                          col,
                          occupiedColumns[row][col]
                        )}
                      />
                    )}
                  </View>
                ))}
              </View>
            ))}
          </UserSelectableArea>
          {type === 'ai' && (
            <DiceColumnPoints points={calculatePoints(occupiedColumns)} />
          )}
        </View>
      </View>
    </View>
  );
}
