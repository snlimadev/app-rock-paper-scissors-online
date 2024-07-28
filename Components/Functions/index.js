import { showMessage } from 'react-native-flash-message';

import styles from '../../css/styles';

export function getWsConnectionUrl() {
  return 'wss://api-rock-paper-scissors-online.glitch.me';
}

//#region Function to enable/disable dark mode
// Função para ativar/desativar o modo escuro
export function changeTheme(
  isDarkMode,
  setThemeBgColor,
  setThemeTextColor
) {
  if (isDarkMode) {
    setThemeBgColor(styles.darkThemeBgColor);
    setThemeTextColor(styles.darkThemeTextColor);
  } else {
    setThemeBgColor(styles.lightThemeBgColor);
    setThemeTextColor(styles.lightThemeTextColor);
  }
}
//#endregion

//#region Function to handle game rounds (singleplayer)
// Função para lidar com as rodadas do jogo (um jogador)
export function handleGameRoundsSingleplayer(
  playerMove,
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore,
  drawCounter,
  setDrawCounter,
  setModalVisible,
  setModalTitle,
  setModalDescription
) {
  const moves = ['ROCK', 'PAPER', 'SCISSORS'];
  const computerMove = moves[Math.floor(Math.random() * moves.length)];

  if (playerMove === computerMove) {
    setModalTitle('Draw');
    setModalDescription(`Both players chose ${playerMove}`);
    setDrawCounter(drawCounter + 1);
  } else if (
    (playerMove === 'ROCK' && computerMove === 'SCISSORS') ||
    (playerMove === 'PAPER' && computerMove === 'ROCK') ||
    (playerMove === 'SCISSORS' && computerMove === 'PAPER')
  ) {
    setModalTitle('You win');
    setModalDescription(`${playerMove} beats ${computerMove}`);
    setPlayerScore(playerScore + 1);
  } else {
    setModalTitle('Computer wins');
    setModalDescription(`${computerMove} beats ${playerMove}`);
    setComputerScore(computerScore + 1);
  }

  setModalVisible(true);
}
//#endregion

//#region Function to handle lobby Web Socket events
// Função para lidar com os eventos do Web Socket no lobby
export function handleLobbyWebSocketEvents(
  ws,
  setReadyState,
  handleGetAvailableRoomsList,
  handleUpdateAvailableRooms,
  navigate
) {
  if (ws) {
    ws.onopen = () => {
      setReadyState('OPEN');
      handleGetAvailableRoomsList();
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
      handleUpdateAvailableRooms(e);
    };
  }
}
//#endregion

//#region Function to get the available rooms list
// Função para obter a lista de salas disponíveis
export function getAvailableRoomsList(ws) {
  const messageData = {
    action: 'getRooms'
  };

  ws.send(JSON.stringify(messageData));
};
//#endregion

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

//#region Function make a move
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
