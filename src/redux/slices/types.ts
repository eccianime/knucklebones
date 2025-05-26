export enum GamePhaseEnum {
  MENU = 'MENU',
  SELECT_FIRST_PLAYER = 'SELECT_FIRST_PLAYER',
  SELECT_CURRENT_PLAYER = 'SELECT_CURRENT_PLAYER',
  ROLL_DICE = 'ROLL_DICE',
  SELECT_COLUMN = 'SELECT_COLUMN',
  CHECK_DICE_MATCHES = 'CHECK_DICE_MATCHES',
  ELIMINATE_DICE_MATCHES = 'ELIMINATE_DICE_MATCHES',
  CALCULATE_POINTS = 'CALCULATE_POINTS',
  CHECK_FULL_BOARD = 'CHECK_FULL_BOARD',
  GAME_OVER = 'GAME_OVER',
}

export type CellPosition = {
  x: number;
  y: number;
};

export type InternalStateProps = {
  aiCellPositions: (CellPosition | null)[][];
  playerCellPosition: (CellPosition | null)[][];
};
