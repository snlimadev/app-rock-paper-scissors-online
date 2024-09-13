//#region Function to update the available rooms list
// Função para atualizar a lista de salas disponíveis
export function updateAvailableRooms(e, setAvailableRooms) {
  try {
    const messageData = JSON.parse(e.data);

    if (messageData.rooms) {
      setAvailableRooms(messageData.rooms);
    }
  } catch (error) {
    console.error('Failed to parse message data: ', error);
  }
};
//#endregion