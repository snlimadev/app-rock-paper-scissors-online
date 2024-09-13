//#region Function to make a move
// Função para fazer uma jogada
export function makeMove(move, ws, readyState) {
  if (readyState === 'OPEN') {
    const messageData = {
      move: move
    };

    if (ws) {
      ws.send(JSON.stringify(messageData));
    }
  }
};
//#endregion