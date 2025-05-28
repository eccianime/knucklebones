import { UserTypeProps } from '@/src/components/types';

export enum GamePhaseEnum {
  MENU = 'MENU',
  SELECT_FIRST_PLAYER = 'SELECT_FIRST_PLAYER',
  SELECT_CURRENT_PLAYER = 'SELECT_CURRENT_PLAYER',
  ROLL_DICE = 'ROLL_DICE',
  START_AI_BEHAVIOUR = 'START_AI_BEHAVIOUR',
  USER_BEHAVIOUR = 'USER_BEHAVIOUR',
  SELECT_COLUMN = 'SELECT_COLUMN',
  PLACE_DICE = 'PLACE_DICE',
  CHECK_DICE_MATCHES = 'CHECK_DICE_MATCHES',
  CHECK_WINNING_CONDITIONS = 'CHECK_WINNING_CONDITIONS',
  GAME_OVER = 'GAME_OVER',
}

export type GameStateProps = {
  currentPhase: GamePhaseEnum;
  currentPlayer: 'user' | 'ai' | null;
  isDiceRolling: boolean;
  currentDice: number | null;
  aiOccupiedColumns: number[][];
  userOccupiedColumns: number[][];
  winner: UserTypeProps | 'tie' | null;
};

export type CellPosition = {
  x: number;
  y: number;
};

export type InternalStateProps = {
  aiCellPositions: (CellPosition | null)[][];
  playerCellPosition: (CellPosition | null)[][];
};
