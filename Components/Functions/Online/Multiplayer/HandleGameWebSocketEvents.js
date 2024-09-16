import { showMessage } from 'react-native-flash-message';

//#region Function to handle game Web Socket events
// Função para lidar com os eventos do Web Socket no jogo
export function handleGameWebSocketEvents(
  ws,
  setReadyState,
  handleCreateOrJoinRoom,
  handleGameRounds,
  navigate
) {
  if (ws) {
    ws.onopen = () => {
      setReadyState('OPEN');
      handleCreateOrJoinRoom();
    };

    ws.onclose = () => {
      setReadyState('CLOSED');
    };

    ws.onerror = () => {
      showMessage({
        message: 'Connection to the server lost or expired',
        description: 'Please check your internet connection ' +
          'and try again later.',
        type: 'danger',
        icon: 'danger',
        duration: 5000
      });

      navigate('Home');
    };

    ws.onmessage = (e) => {
      handleGameRounds(e);
    };
  }
}
//#endregion