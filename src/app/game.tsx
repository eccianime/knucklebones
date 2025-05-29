import DiceBoard from '../components/DiceBoard';
import DiceBox from '../components/DiceBox';
import GameBackground from '../components/GameBackground';
import GradientModal from '../components/GradientModal';
import { useAppSelector } from '../redux/store';

export default function Game() {
  const {
    currentPhase,
    currentPlayer,
    aiOccupiedColumns,
    userOccupiedColumns,
  } = useAppSelector((state) => state.game);
  return (
    <GameBackground>
      <DiceBox
        type='ai'
        currentPhase={currentPhase}
        currentPlayer={currentPlayer}
      />
      <DiceBoard type='ai' occupiedColumns={aiOccupiedColumns} />
      <DiceBoard type='user' occupiedColumns={userOccupiedColumns} />
      <DiceBox
        type='user'
        currentPhase={currentPhase}
        currentPlayer={currentPlayer}
      />
      <GradientModal />
    </GameBackground>
  );
}
