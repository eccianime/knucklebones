import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CellPosition, InternalStateProps } from './types';

const INITIAL_STATE: InternalStateProps = {
  aiCellPositions: Array(3)
    .fill(null)
    .map(() => Array(3).fill(null)),
  playerCellPosition: Array(3)
    .fill(null)
    .map(() => Array(3).fill(null)),
  isVolumeOn: true,
  isSoundOn: true,
  difficulty: 'Easy',
};

const internalSlice = createSlice({
  name: 'internal',
  initialState: INITIAL_STATE,
  reducers: {
    setCellPosition(
      state,
      action: PayloadAction<{
        type: 'ai' | 'user';
        row: number;
        col: number;
        position: CellPosition;
      }>
    ) {
      const { type, row, col, position } = action.payload;
      state[type === 'ai' ? 'aiCellPositions' : 'playerCellPosition'][row][
        col
      ] = position;
    },
    setIsVolumeOn(state, action: PayloadAction<boolean>) {
      state.isVolumeOn = action.payload;
    },
    setIsSoundOn(state, action: PayloadAction<boolean>) {
      state.isSoundOn = action.payload;
    },
    setDifficulty(state, action: PayloadAction<'Easy' | 'Intelligent'>) {
      state.difficulty = action.payload;
    },
  },
});

export const { setCellPosition, setIsVolumeOn, setIsSoundOn, setDifficulty } =
  internalSlice.actions;
export default internalSlice.reducer;
