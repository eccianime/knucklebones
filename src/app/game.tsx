import DiceBoard from '../components/DiceBoard';
import DiceBox from '../components/DiceBox';
import FirstTurnModal from '../components/FirstTurnModal';
import GameBackground from '../components/GameBackground';

export default function Game() {
  return (
    <GameBackground>
      <DiceBox type='ai' />
      <DiceBoard type='ai' />
      <DiceBoard type='user' />
      <DiceBox type='user' />
      <FirstTurnModal />
    </GameBackground>
  );
}
