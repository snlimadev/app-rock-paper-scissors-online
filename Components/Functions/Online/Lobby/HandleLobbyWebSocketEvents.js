import { showMessage } from 'react-native-flash-message';

//#region Function to handle lobby Web Socket events
// Função para lidar com os eventos do Web Socket no lobby
export function handleLobbyWebSocketEvents(
  ws,
  handleGetAvailableRoomsList,
  handleUpdateAvailableRooms,
  navigate
) {
  if (ws) {
    ws.onopen = () => {
      handleGetAvailableRoomsList();
    };

    ws.onclose = () => { };

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
      handleUpdateAvailableRooms(e);
    };
  }
}
//#endregion