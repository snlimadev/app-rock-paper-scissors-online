import { useState, useEffect, useMemo } from 'react';
import { Text, BackHandler } from 'react-native';
import { Dialog } from '@rneui/themed';

import styles from '../../css/styles';
import WaitingCard from '../WaitingCard';
import Game from '../Game';

import {
  getWsConnectionUrl,
  changeTheme,
  handleGameWebSocketEvents,
  createOrJoinRoom,
  makeMove
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
  }

  const handleBackPress = () => {
    props.navigation.navigate('Home');
    return true;
  };
  //#endregion

  //#region useEffect hooks
  useEffect(() => {
    handleGameWebSocketEvents(
      ws,
      setReadyState,
      handleCreateOrJoinRoom,
      player,
      setPlayerScore,
      setOpponentScore,
      setDrawCounter,
      setGameStart,
      setModalVisible,
      setModalTitle,
      setModalDescription,
      navigate
    );

    return () => {
      if (ws && readyState === 'OPEN') {
        ws.close();
      }
    };
  }, [readyState]);

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
        onBackdropPress={() => setLoadingVisible(false)}
        overlayStyle={themeBgColor}
      >
        <Text
          className='text-lg text-center font-bold'
          style={themeTextColor}
        >
          CONNECTING...
        </Text>
        <Dialog.Loading />
      </Dialog>
    </>
  );
}