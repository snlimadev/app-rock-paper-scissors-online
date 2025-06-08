//#region Function to get the available rooms list
// Função para obter a lista de salas disponíveis
export function getAvailableRoomsList(ws) {
  const messageData = {
    action: 'getRooms'
  };

  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(messageData));
  }
};
//#endregion