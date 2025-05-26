import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectCurrentPlayer, setPhase } from '../slices/game';
import { GamePhaseEnum } from '../slices/types';

export const selectFirstPlayer = createAsyncThunk(
  'selectFirstPlayer',
  (_, { dispatch }) => {
    dispatch(setPhase(GamePhaseEnum.SELECT_FIRST_PLAYER));

    const firstPlayer = Math.random() < 0.5 ? 0 : 1;

    dispatch(selectCurrentPlayer(firstPlayer === 0 ? 'user' : 'ai'));
  }
);
