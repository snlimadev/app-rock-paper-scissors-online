import { useState, useEffect, useMemo } from 'react';
import { ScrollView, View, Modal } from 'react-native';
import { Button, Card, Icon, Text } from '@rneui/themed';
import { showMessage } from 'react-native-flash-message';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import styles from '../../css/styles';
import LobbyModal from '../LobbyModal';

const BANNER_ID = 'ca-app-pub-4878437225305198/8146060270';

import {
  getWsConnectionUrl,
  handleLobbyWebSocketEvents,
  getAvailableRoomsList,
  updateAvailableRooms
} from '../Functions';

export default function Lobby(props) {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [publicRoom, setPublicRoom] = useState(true);

  const ws = useMemo(() => new WebSocket(getWsConnectionUrl()), []);
  const navigate = props.navigation.navigate;

  //#region Local functions / Funções locais
  const handleGetAvailableRoomsList = () => {
    getAvailableRoomsList(ws);
    setLoadingVisible(false);

    showMessage({
      message: 'Connected',
      type: 'success',
      icon: 'success'
    });
  };

  const handleUpdateAvailableRooms = (e) => {
    updateAvailableRooms(e, setAvailableRooms);
  };

  const handleOpenModal = (title) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const handleRedirect = (action, roomCode) => {
    setModalVisible(false);

    if (ws) ws.close();

    props.navigation.navigate('Multiplayer', {
      action: action,
      publicRoom: (publicRoom) ? 'Y' : 'N',
      roomCode: roomCode
    });
  };

  const handleCreateRoom = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);

    const time = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date()).replace(':', '');

    handleRedirect('create', String(randomCode) + String(time));
  };

  const handleJoinRoom = (selectedRoom) => {
    const roomCode = selectedRoom || roomCodeInput;

    handleRedirect('join', roomCode);
  };
  //#endregion

  //#region useEffect hooks
  useEffect(() => {
    handleLobbyWebSocketEvents(
      ws,
      handleGetAvailableRoomsList,
      handleUpdateAvailableRooms,
      navigate
    );

    return () => {
      if (ws) ws.close();
    };
  }, []);
  //#endregion

  return (
    <>
      <View style={styles.containerView}>
        <View style={[styles.subcontainer, { justifyContent: 'flex-end' }]}>
          <Button onPress={() => handleOpenModal('Create Room')} noPaddingTop>
            <Icon name='plus-circle' type='feather' /> CREATE A ROOM
          </Button>

          <Button onPress={() => handleOpenModal('Join Room')}>
            <Icon name='arrow-right-circle' type='feather' /> JOIN A ROOM
          </Button>
        </View>

        <ScrollView contentContainerStyle={styles.subcontainer}>
          <Card>
            <Card.Title>Public Rooms</Card.Title>

            <Card.Divider />

            {(availableRooms.length > 0) ? (
              <>
                {availableRooms.map((rooms, index) => (
                  <View key={rooms}>
                    <Button
                      type='outline'
                      size='sm'
                      onPress={() => handleJoinRoom(rooms)}
                      noPaddingTop={index === 0}
                    >
                      <Icon
                        name='arrow-right-circle'
                        type='feather'
                        small
                        primary
                      /> {rooms}
                    </Button>
                  </View>
                ))}
              </>
            ) : (
              <Text centered noPaddingTop>
                No public rooms available.
              </Text>
            )}
          </Card>
        </ScrollView>
      </View>

      {(!loadingVisible) && (
        <BannerAd
          unitId={(__DEV__) ? TestIds.BANNER : BANNER_ID}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true
          }}
        />
      )}

      <LobbyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalTitle={modalTitle}
        roomCode={roomCodeInput}
        setRoomCode={setRoomCodeInput}
        publicRoom={publicRoom}
        setPublicRoom={setPublicRoom}
        createRoomAction={handleCreateRoom}
        joinRoomAction={handleJoinRoom}
      />

      <Modal visible={loadingVisible} onRequestClose={() => null}>
        <Card containerStyle={styles.loadingCard}>
          <Text bold centered noPaddingTop>CONNECTING...</Text>
          <Button type='clear' loading disabled noPaddingTop />
        </Card>
      </Modal>
    </>
  );
}