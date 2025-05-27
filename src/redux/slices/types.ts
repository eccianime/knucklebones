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
  ELIMINATE_DICE_MATCHES = 'ELIMINATE_DICE_MATCHES',
  CALCULATE_POINTS = 'CALCULATE_POINTS',
  CHECK_FULL_BOARD = 'CHECK_FULL_BOARD',
  GAME_OVER = 'GAME_OVER',
}

export type GameStateProps = {
  currentPhase: GamePhaseEnum;
  currentPlayer: 'user' | 'ai' | null;
  isDiceRolling: boolean;
  currentDice: number | null;
  aiOccupiedColumns: number[][];
  userOccupiedColumns: number[][];
};

export type CellPosition = {
  x: number;
  y: number;
};

export type InternalStateProps = {
  aiCellPositions: (CellPosition | null)[][];
  playerCellPosition: (CellPosition | null)[][];
};
