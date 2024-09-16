//#region Function to create or join a game room
// Função para criar ou entrar em uma sala de jogo
export function createOrJoinRoom(action, publicRoom, roomCode, ws) {
  const messageData = {
    action: action,
    isPublic: publicRoom,
    roomCode: roomCode
  };

  ws.send(JSON.stringify(messageData));
};
//#endregion