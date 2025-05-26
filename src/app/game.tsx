import DiceBoard from '../components/DiceBoard';
import GameBackground from '../components/GameBackground';
import { useAppSelector } from '../redux/store';

export default function Game() {
  const { aiCellPositions, playerCellPosition } = useAppSelector(
    (state) => state.internal
  );
  console.log(aiCellPositions, playerCellPosition);

  return (
    <GameBackground>
      <DiceBoard type='ai' />
      <DiceBoard type='user' />
    </GameBackground>
  );
}
