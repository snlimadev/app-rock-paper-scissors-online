import { showMessage } from 'react-native-flash-message';

//#region Function to handle game rounds (multiplayer)
// Função para lidar com as rodadas do jogo (dois jogadores)
export function handleGameRoundsMultiplayer(
  e,
  player,
  setPlayerScore,
  setOpponentScore,
  setDrawCounter,
  setGameStart,
  setGameEnd,
  setModalVisible,
  setModalTitle,
  setModalDescription,
  navigate
) {
  try {
    const data = JSON.parse(e.data);

    if (data.winner && data.description) {
      if (data.winner === 'DRAW') {
        setModalTitle('Draw');
        setDrawCounter((draws) => draws + 1);
      } else if (data.winner === player) {
        setModalTitle('You win');
        setPlayerScore((playerPoints) => playerPoints + 1);
      } else {
        setModalTitle('Opponent wins');
        setOpponentScore((opponentPoints) => opponentPoints + 1);
      }

      setModalDescription(data.description);
      setModalVisible(true);
    } else if (data.event) {
      if (data.event === 'Opponent joined the game.') {
        setGameStart(true);

        showMessage({
          message: 'Game starts!',
          type: 'info',
          icon: 'info'
        });
      } else if (data.event === 'Opponent left the game.') {
        setGameEnd(true);
      }
    } else if (data.error) {
      showMessage({
        message: 'Error',
        description: data.error,
        type: 'danger',
        icon: 'danger',
        duration: 5000
      });

      navigate('Home');
    }
  } catch (error) {
    console.error('Failed to parse message data: ', error);
  }
}
//#endregion