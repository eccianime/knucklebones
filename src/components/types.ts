import { TouchableOpacityProps } from 'react-native';
import { GamePhaseEnum } from '../redux/slices/types';

export type RibbonButtonProps = TouchableOpacityProps & {
  isSelected?: boolean;
  title: string;
};

export type GameBackgroundProps = {
  children: React.ReactNode;
};

export type UserTypeProps = 'user' | 'ai';

export type DiceBoardProps = {
  type: UserTypeProps;
  occupiedColumns: number[][];
};

export type DiceColumnPointsProps = {
  points: number[];
};

export type DiceBoxProps = {
  type: UserTypeProps;
  currentPhase: GamePhaseEnum;
  currentPlayer: UserTypeProps | null;
};

export type DiceRollerProps = {
  handleRollNumber: (rollNumber: number) => void;
};

export type DiceProps = {
  currentNumber: number;
};

export type UserSelectableAreaProps = {
  type: UserTypeProps;
  children: React.ReactNode;
};
