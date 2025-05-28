import { UserTypeProps } from '@/src/components/types';
import {
  calculatePoints,
  checkBoardFull,
  delayToResolve,
  getLastNonZeroRow,
  getRandomAvailableColumn,
  removeRepeatedCells,
} from '@/src/config/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  resetGame,
  selectCurrentPlayer,
  setCellValue,
  setCurrentDice,
  setIsDiceRolling,
  setPhase,
  setWinner,
  updateOccupiedColumns,
} from '../slices/game';
import { GamePhaseEnum } from '../slices/types';
import { RootState } from '../store';

export const selectFirstPlayer = createAsyncThunk(
  'selectFirstPlayer',
  async (_, { dispatch }) => {
    dispatch(setPhase(GamePhaseEnum.SELECT_FIRST_PLAYER));
    const firstPlayer = Math.random() < 0.5 ? 'user' : 'ai';
    dispatch(selectCurrentPlayer(firstPlayer));
  }
);

export const setCurrentPlayer = createAsyncThunk<
  void,
  { currentPlayer: 'user' | 'ai' }
>('setCurrentPlayer', async ({ currentPlayer }, { dispatch }) => {
  dispatch(setPhase(GamePhaseEnum.SELECT_CURRENT_PLAYER));
  dispatch(selectCurrentPlayer(currentPlayer));
  await delayToResolve(1000);
  if (currentPlayer === 'ai') {
    dispatch(rollDice());
  }
});

export const rollDice = createAsyncThunk(
  'rollDice',
  async (_, { dispatch }) => {
    dispatch(setPhase(GamePhaseEnum.ROLL_DICE));
    dispatch(setIsDiceRolling(true));
  }
);

export const setAIBehaviour = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('setAIBehaviour', async (rollNumber, { dispatch, getState }) => {
  const { aiOccupiedColumns } = getState().game;
  dispatch(setPhase(GamePhaseEnum.START_AI_BEHAVIOUR));

  dispatch(setCurrentDice(rollNumber));
  const aiColumn = getRandomAvailableColumn(aiOccupiedColumns);
  const row = getLastNonZeroRow(aiOccupiedColumns, aiColumn, 'up');

  await delayToResolve(1000);
  dispatch(placeDice({ rollNumber, row, col: aiColumn, type: 'ai' }));
});

export const setUserBehaviour = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('setUserBehaviour', async (column, { dispatch, getState }) => {
  const {
    userOccupiedColumns,
    currentDice: rollNumber,
    currentPhase,
    currentPlayer,
    isDiceRolling,
  } = getState().game;

  if (
    currentPhase !== GamePhaseEnum.ROLL_DICE ||
    currentPlayer !== 'user' ||
    isDiceRolling
  )
    return;

  const row = getLastNonZeroRow(userOccupiedColumns, column, 'down');
  if (row === -1) return;

  dispatch(setPhase(GamePhaseEnum.USER_BEHAVIOUR));
  if (rollNumber) {
    dispatch(placeDice({ rollNumber, row, col: column, type: 'user' }));
    // await delayToResolve(1000);
  }
});

export const placeDice = createAsyncThunk<
  void,
  { row: number; col: number; type: 'ai' | 'user'; rollNumber: number },
  { dispatch: any }
>('placeDice', async ({ row, col, type, rollNumber }, { dispatch }) => {
  dispatch(setPhase(GamePhaseEnum.PLACE_DICE));
  dispatch(setCellValue({ type, row, col, value: rollNumber }));

  dispatch(setCurrentDice(0));

  const nextPlayer: UserTypeProps = type === 'ai' ? 'user' : 'ai';
  dispatch(checkCellsDeletion({ nextPlayer, col, rollNumber }));

  const {
    payload: { isGameOver, aiPoints, userPoints },
  } = await dispatch(checkWinningConditions());

  if (isGameOver) {
    dispatch(
      setWinner(
        aiPoints === userPoints ? 'tie' : aiPoints > userPoints ? 'ai' : 'user'
      )
    );
    dispatch(setPhase(GamePhaseEnum.GAME_OVER));
  } else {
    dispatch(setPhase(GamePhaseEnum.SELECT_CURRENT_PLAYER));
    dispatch(selectCurrentPlayer(nextPlayer));

    await delayToResolve(2000);
    if (nextPlayer === 'ai') {
      dispatch(rollDice());
    }
  }
});

export const checkCellsDeletion = createAsyncThunk<
  void,
  { rollNumber: number; nextPlayer: UserTypeProps; col: number },
  { state: RootState }
>(
  'checkCellsDeletion',
  ({ rollNumber, nextPlayer, col }, { getState, dispatch }) => {
    dispatch(setPhase(GamePhaseEnum.CHECK_DICE_MATCHES));
    const { aiOccupiedColumns, userOccupiedColumns } = getState().game;

    const targetArray =
      nextPlayer === 'user' ? userOccupiedColumns : aiOccupiedColumns;

    const updatedArray = removeRepeatedCells(
      targetArray,
      col,
      rollNumber,
      nextPlayer === 'user' ? 'down' : 'up'
    );

    dispatch(
      updateOccupiedColumns({ type: nextPlayer, columns: updatedArray })
    );
  }
);

export const checkWinningConditions = createAsyncThunk<
  { isGameOver: boolean; aiPoints: number; userPoints: number },
  void,
  { state: RootState; dispatch: any }
>('checkWinningConditions', async (_, { getState, dispatch }) => {
  dispatch(setPhase(GamePhaseEnum.CHECK_WINNING_CONDITIONS));
  const { aiOccupiedColumns, userOccupiedColumns } = getState().game;

  const isAiBoardFull = checkBoardFull(aiOccupiedColumns);
  const isUserBoardFull = checkBoardFull(userOccupiedColumns);

  const aiPoints = calculatePoints(aiOccupiedColumns).reduce(
    (prev, curr) => prev + curr
  );
  const userPoints = calculatePoints(userOccupiedColumns).reduce(
    (prev, curr) => prev + curr
  );

  const isGameOver = isAiBoardFull || isUserBoardFull;

  return { isGameOver, aiPoints, userPoints };
});

export const restartGame = createAsyncThunk<void, void, { dispatch: any }>(
  'restartGame',
  async (_, { dispatch }) => {
    dispatch(resetGame());
    dispatch(selectFirstPlayer());
  }
);
