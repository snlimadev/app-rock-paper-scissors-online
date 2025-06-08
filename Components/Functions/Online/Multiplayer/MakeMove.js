//#region Function to make a move
// Função para fazer uma jogada
export function makeMove(move, ws, readyState) {
  const messageData = {
    move: move
  };

  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(messageData));
  }
};
//#endregion