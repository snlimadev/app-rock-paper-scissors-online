import { useState, useEffect, useMemo } from 'react';
import { Text, BackHandler } from 'react-native';
import { Dialog } from '@rneui/themed';
import { showMessage } from 'react-native-flash-message';

import styles from '../../css/styles';
import WaitingCard from '../WaitingCard';
import Game from '../Game';

import {
  getWsConnectionUrl,
  changeTheme,
  handleGameWebSocketEvents,
  createOrJoinRoom,
  makeMove,
  handleGameRoundsMultiplayer
} from '../Functions';

export default function Multiplayer(props) {
  const lightBackground = styles.lightThemeBgColor;
  const lightText = styles.lightThemeTextColor;
  const [themeBgColor, setThemeBgColor] = useState(lightBackground);
  const [themeTextColor, setThemeTextColor] = useState(lightText);

  const [loadingVisible, setLoadingVisible] = useState(true);
  const [readyState, setReadyState] = useState('CONNECTING');
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [drawCounter, setDrawCounter] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGamEnd] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [disabledButtons, setDisabledButtons] = useState(false);

  const ws = useMemo(() => new WebSocket(getWsConnectionUrl()), []);
  const navigate = props.navigation.navigate;
  const { action, publicRoom, roomCode } = props.route.params;
  const player = (action === 'create') ? 'PLAYER 1' : 'PLAYER 2';

  //#region Local functions / Funções locais
  const handleCreateOrJoinRoom = () => {
    createOrJoinRoom(action, publicRoom, roomCode, ws);
    setLoadingVisible(false);
  };

  const handleMove = (move) => {
    setDisabledButtons(true);
    makeMove(move, ws, readyState);
  };

  const handleGameRounds = (e) => {
    handleGameRoundsMultiplayer(
      e,
      player,
      setPlayerScore,
      setOpponentScore,
      setDrawCounter,
      setGameStart,
      setGamEnd,
      setModalVisible,
      setModalTitle,
      setModalDescription,
      navigate
    );
  };

  const handleGameEnd = () => {
    showMessage({
      message: 'Opponent left. Final score:',
      description: `YOU ${playerScore} x ${opponentScore} OPP` +
        `\n${drawCounter} DRAWS`,
      type: 'info',
      icon: 'info',
      duration: 5000
    });

    navigate('Home');
  };

  const handleBackPress = () => {
    navigate('Home');
    return true;
  };
  //#endregion

  //#region useEffect hooks
  useEffect(() => {
    handleGameWebSocketEvents(
      ws,
      setReadyState,
      handleCreateOrJoinRoom,
      handleGameRounds,
      navigate
    );

    return () => {
      if (ws && readyState === 'OPEN') {
        ws.close();
      }
    };
  }, [readyState]);

  useEffect(() => {
    if (gameEnd) {
      handleGameEnd();
    }
  }, [gameEnd]);

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackPress
      );
    };
  }, [props.navigation]);

  useEffect(() => {
    changeTheme(props.isDarkMode, setThemeBgColor, setThemeTextColor);
  }, [props.isDarkMode]);
  //#endregion

  return (
    <>
      {(!gameStart) ? (
        <WaitingCard
          themeBgColor={themeBgColor}
          themeTextColor={themeTextColor}
          roomCode={roomCode}
        />
      ) : (
        <Game
          themeBgColor={themeBgColor}
          themeTextColor={themeTextColor}
          player1Text='YOU'
          player1Score={playerScore}
          player2Text='OPP'
          player2Score={opponentScore}
          drawCounter={drawCounter}
          handleMove={handleMove}
          disabledButtons={disabledButtons}
          setDisabledButtons={setDisabledButtons}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalTitle={modalTitle}
          modalDescription={modalDescription}
        />
      )}

      <Dialog
        isVisible={loadingVisible}
        overlayStyle={[themeBgColor, styles.roundedBorder]}
      >
        <Text
          className='text-lg text-center font-bold'
          style={themeTextColor}
        >
          LOADING...
        </Text>
        <Dialog.Loading />
      </Dialog>
    </>
  );
}