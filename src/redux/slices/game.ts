import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GamePhaseEnum } from './types';

const INITIAL_STATE = {
  currentPhase: 'MENU',
};

const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    setPhase: (state, action: PayloadAction<GamePhaseEnum>) => {
      state.currentPhase = action.payload;
    },
  },
});

export const { setPhase } = gameSlice.actions;
export default gameSlice.reducer;
