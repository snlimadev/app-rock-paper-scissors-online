import { useState, useEffect, useRef } from 'react';
import { BackHandler, Modal, AppState, Platform } from 'react-native';
import { Card, Text, Button } from '@rneui/themed';
import { showMessage } from 'react-native-flash-message';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import styles from '../../css/styles';
import WaitingCard from '../WaitingCard';
import Game from '../Game';

const BANNER_ID = 'ca-app-pub-4878437225305198/8017772616';

import {
  getWsConnectionUrl,
  handleGameWebSocketEvents,
  createOrJoinRoom,
  makeMove,
  handleGameRoundsMultiplayer
} from '../Functions';

export default function Multiplayer(props) {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [drawCounter, setDrawCounter] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGamEnd] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const ws = useRef(null);
  const navigate = props.navigation.navigate;
  const { action, publicRoom, roomCode } = props.route.params;
  const player = (action === 'create') ? 'PLAYER 1' : 'PLAYER 2';

  //#region Local functions / Funções locais
  const handleConnect = () => {
    if (!ws.current) {
      setLoadingVisible(true);
      ws.current = new WebSocket(getWsConnectionUrl());

      handleGameWebSocketEvents(
        ws.current,
        handleCreateOrJoinRoom,
        handleGameRounds,
        navigate
      );
    }
  };

  const handleDisconnect = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  };

  const handleCreateOrJoinRoom = () => {
    createOrJoinRoom(action, publicRoom, roomCode, ws.current);
    setLoadingVisible(false);
  };

  const handleMove = (move) => {
    setDisabledButtons(true);
    makeMove(move, ws.current);
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
    return () => {
      handleDisconnect();
    };
  }, []);

  useEffect(() => {
    if (appState === 'active') {
      handleConnect();
    } else if (Platform.OS === 'android' && Platform.Version >= 35) {
      handleDisconnect();
      setPlayerScore(0);
      setOpponentScore(0);
      setDrawCounter(0);
      setGameStart(false);
      setModalVisible(false);
      setModalTitle('');
      setModalDescription('');
      setDisabledButtons(false);
    }
  }, [appState]);

  useEffect(() => {
    if (gameEnd) {
      handleGameEnd();
    }
  }, [gameEnd]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [props.navigation]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  //#endregion

  return (
    <>
      {(!gameStart) ? (
        <>
          <WaitingCard roomCode={roomCode} />

          {(action === 'create' && !loadingVisible) && (
            <BannerAd
              unitId={(__DEV__) ? TestIds.BANNER : BANNER_ID}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true
              }}
            />
          )}
        </>
      ) : (
        <Game
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

      <Modal visible={loadingVisible} onRequestClose={() => null}>
        <Card containerStyle={styles.loadingCard}>
          <Text bold centered noPaddingTop>LOADING...</Text>
          <Button type='clear' loading disabled noPaddingTop />
        </Card>
      </Modal>
    </>
  );
}