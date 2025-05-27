import { UserTypeProps } from '@/src/components/types';
import {
  getLastNonZeroRow,
  removeRemoveRepeatedCells,
} from '@/src/config/utils';
import { createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import {
  selectCurrentPlayer,
  setCellValue,
  setCurrentDice,
  setIsDiceRolling,
  setPhase,
  updateOccupiedColumns,
} from '../slices/game';
import { GamePhaseEnum } from '../slices/types';
import { RootState } from '../store';

export const selectFirstPlayer = createAsyncThunk(
  'selectFirstPlayer',
  (_, { dispatch }) => {
    dispatch(setPhase(GamePhaseEnum.SELECT_FIRST_PLAYER));

    const firstPlayer = Math.random() < 0.5 ? 0 : 1;

    dispatch(selectCurrentPlayer(firstPlayer === 0 ? 'user' : 'ai'));
  }
);

export const setCurrentPlayer = createAsyncThunk<
  void,
  { currentPlayer: 'user' | 'ai' }
>('setCurrentPlayer', ({ currentPlayer }, { dispatch }) => {
  dispatch(setPhase(GamePhaseEnum.SELECT_CURRENT_PLAYER));

  setTimeout(() => {
    dispatch(selectCurrentPlayer(currentPlayer));
    if (currentPlayer === 'ai') {
      dispatch(rollDice());
    }
  }, 2000);
});

export const rollDice = createAsyncThunk('rollDice', (_, { dispatch }) => {
  dispatch(setPhase(GamePhaseEnum.ROLL_DICE));
  dispatch(setIsDiceRolling(true));
});

export const setAIBehaivour = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('setAIBehaivour', (rollNumber, { dispatch, getState }) => {
  const { aiOccupiedColumns } = getState().game;
  dispatch(setPhase(GamePhaseEnum.START_AI_BEHAVIOUR));

  dispatch(setCurrentDice(rollNumber));
  const availableColumns = aiOccupiedColumns[0]
    .map((value, index) => (value === 0 ? index : -1))
    .filter((index) => index !== -1);

  let aiColumn;

  if (availableColumns.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableColumns.length);
    aiColumn = availableColumns[randomIndex];
  } else {
    aiColumn = Math.floor(Math.random() * 3);
  }

  const row = getLastNonZeroRow(aiOccupiedColumns, aiColumn, 'up');

  setTimeout(() => {
    dispatch(placeDice({ rollNumber, row, col: aiColumn, type: 'ai' }));
  }, 2000);
});

export const setUserBehaviour = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('setUserBehaviour', (column, { dispatch, getState }) => {
  const {
    userOccupiedColumns,
    currentDice: rollNumber,
    currentPhase,
    currentPlayer,
    isDiceRolling,
  } = getState().game;
  const row = getLastNonZeroRow(userOccupiedColumns, column, 'down');
  if (row === -1) return;
  if (currentPhase !== GamePhaseEnum.ROLL_DICE) return;
  if (currentPlayer !== 'user') return;
  if (isDiceRolling) return;

  dispatch(setPhase(GamePhaseEnum.USER_BEHAVIOUR));
  if (rollNumber) {
    dispatch(placeDice({ rollNumber, row, col: column, type: 'user' }));
    setTimeout(() => {}, 1000);
  }
});

export const placeDice = createAsyncThunk<
  void,
  { row: number; col: number; type: 'ai' | 'user'; rollNumber: number },
  { dispatch: ThunkDispatch<RootState, unknown, any> }
>('placeDice', ({ row, col, type, rollNumber }, { dispatch }) => {
  dispatch(setPhase(GamePhaseEnum.PLACE_DICE));
  dispatch(setCellValue({ type, row, col, value: rollNumber }));

  dispatch(setPhase(GamePhaseEnum.SELECT_CURRENT_PLAYER));
  dispatch(setCurrentDice(0));

  const nextPlayer: UserTypeProps = type === 'ai' ? 'user' : 'ai';

  dispatch(selectCurrentPlayer(nextPlayer));
  setTimeout(() => {
    dispatch(checkCellsDeletion({ nextPlayer, col, rollNumber }));

    if (nextPlayer === 'ai') {
      dispatch(rollDice());
    }
  }, 2000);
});

export const checkCellsDeletion = createAsyncThunk<
  void,
  { rollNumber: number; nextPlayer: UserTypeProps; col: number },
  { state: RootState; dispatch: ThunkDispatch<RootState, unknown, any> }
>(
  'checkCellsDeletion',
  ({ rollNumber, nextPlayer, col }, { getState, dispatch }) => {
    const { aiOccupiedColumns, userOccupiedColumns } = getState().game;

    let targetArray;
    if (nextPlayer === 'user') {
      targetArray = userOccupiedColumns;
    } else {
      targetArray = aiOccupiedColumns;
    }
    const updatedArray = removeRemoveRepeatedCells(
      targetArray,
      col,
      rollNumber
    );
    dispatch(
      updateOccupiedColumns({ type: nextPlayer, columns: updatedArray })
    );
  }
);
