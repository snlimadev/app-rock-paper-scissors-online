//#region Function to get the available rooms list
// Função para obter a lista de salas disponíveis
export function getAvailableRoomsList(ws) {
  const messageData = {
    action: 'getRooms'
  };

  ws.send(JSON.stringify(messageData));
};
//#endregion