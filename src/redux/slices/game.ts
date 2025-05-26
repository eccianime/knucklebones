import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GamePhaseEnum, GameStateProps } from './types';

const INITIAL_STATE: GameStateProps = {
  currentPhase: GamePhaseEnum.MENU,
  aiColumnPoints: [0, 0, 0],
  userColumnPoints: [0, 0, 0],
  currentUser: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    setPhase: (state, action: PayloadAction<GamePhaseEnum>) => {
      console.log({ state0: state.currentPhase, state1: action.payload });
      state.currentPhase = action.payload;
    },
    selectCurrentPlayer: (state, action: PayloadAction<'user' | 'ai'>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setPhase, selectCurrentPlayer } = gameSlice.actions;
export default gameSlice.reducer;
