import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GamePhaseEnum, GameStateProps } from './types';

const EMPTY_POINTS = Array(3)
  .fill(0)
  .map(() => Array(3).fill(0));

const INITIAL_STATE: GameStateProps = {
  currentPhase: GamePhaseEnum.MENU,
  currentPlayer: null,
  isDiceRolling: false,
  currentDice: null,
  aiOccupiedColumns: EMPTY_POINTS,
  userOccupiedColumns: EMPTY_POINTS,
  winner: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    setPhase: (state, action: PayloadAction<GamePhaseEnum>) => {
      console.log(action.payload);
      state.currentPhase = action.payload;
    },
    selectCurrentPlayer: (state, action: PayloadAction<'user' | 'ai'>) => {
      state.currentPlayer = action.payload;
    },
    setIsDiceRolling: (state, action: PayloadAction<boolean>) => {
      state.isDiceRolling = action.payload;
    },
    setCurrentDice: (state, action: PayloadAction<number>) => {
      state.isDiceRolling = false;
      state.currentDice = action.payload;
    },
    setCellValue: (
      state,
      action: PayloadAction<{
        row: number;
        col: number;
        value: number;
        type: 'ai' | 'user';
      }>
    ) => {
      if (action.payload.type === 'ai') {
        state.aiOccupiedColumns[action.payload.row][action.payload.col] =
          action.payload.value;
      } else {
        state.userOccupiedColumns[action.payload.row][action.payload.col] =
          action.payload.value;
      }
    },
    updateOccupiedColumns: (
      state,
      action: PayloadAction<{ type: 'ai' | 'user'; columns: number[][] }>
    ) => {
      if (action.payload.type === 'ai') {
        state.aiOccupiedColumns = action.payload.columns;
      } else {
        state.userOccupiedColumns = action.payload.columns;
      }
    },
    setWinner: (state, action: PayloadAction<'ai' | 'user' | 'tie'>) => {
      state.winner = action.payload;
    },
    resetGame: (state) => (state = INITIAL_STATE),
  },
});

export const {
  setPhase,
  selectCurrentPlayer,
  setIsDiceRolling,
  setCurrentDice,
  setCellValue,
  updateOccupiedColumns,
  setWinner,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
