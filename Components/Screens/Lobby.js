import { useState, useEffect, useMemo } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button, Card } from '@rneui/base';
import { Icon, Dialog } from '@rneui/themed';

import styles from '../../css/styles';
import LobbyModal from '../LobbyModal';

import {
  getWsConnectionUrl,
  changeTheme,
  handleLobbyWebSocketEvents,
  getAvailableRoomsList,
  updateAvailableRooms
} from '../Functions';

export default function Lobby(props) {
  const lightBackground = styles.lightThemeBgColor;
  const lightText = styles.lightThemeTextColor;
  const [themeBgColor, setThemeBgColor] = useState(lightBackground);
  const [themeTextColor, setThemeTextColor] = useState(lightText);

  const [loadingVisible, setLoadingVisible] = useState(true);
  const [readyState, setReadyState] = useState('CONNECTING');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [publicRoom, setPublicRoom] = useState(true);

  const ws = useMemo(() => new WebSocket(getWsConnectionUrl()), []);
  const navigate = props.navigation.navigate;

  //#region Local functions / Funções locais
  const handleGetAvailableRoomsList = () => {
    getAvailableRoomsList(ws);
    setLoadingVisible(false);
  };

  const handleUpdateAvailableRooms = (e) => {
    updateAvailableRooms(e, setAvailableRooms);
  };

  const handleCreateRoom = () => {
    setModalVisible(false);

    if (ws && readyState === 'OPEN') {
      ws.close();
    }

    const randomCode = Math.floor(100000 + Math.random() * 900000);

    props.navigation.navigate('Multiplayer', {
      action: 'create',
      publicRoom: (publicRoom) ? 'Y' : 'N',
      roomCode: randomCode
    });
  };

  const handleJoinRoom = (room) => {
    setModalVisible(false);

    if (ws && readyState === 'OPEN') {
      ws.close();
    }

    props.navigation.navigate('Multiplayer', {
      action: 'join',
      publicRoom: '',
      roomCode: room || roomCode
    });
  }
  //#endregion

  //#region useEffect hooks
  useEffect(() => {
    handleLobbyWebSocketEvents(
      ws,
      setReadyState,
      handleGetAvailableRoomsList,
      handleUpdateAvailableRooms,
      navigate
    );

    return () => {
      if (ws && readyState === 'OPEN') {
        ws.close();
      }
    };
  }, [readyState]);

  useEffect(() => {
    changeTheme(props.isDarkMode, setThemeBgColor, setThemeTextColor);
  }, [props.isDarkMode]);
  //#endregion

  return (
    <View
      className='flex-1 justify-center p-2.5'
      style={themeBgColor}
    >
      <View className='pb-2 px-3.5'>
        <Button
          color='#FF8C00'
          buttonStyle={styles.roundedBorder}
          onPress={() => {
            setModalTitle('Create Room');
            setModalVisible(true);
          }}
        >
          <Icon
            name='plus-circle'
            type='feather'
            color='white'
          /> CREATE A ROOM
        </Button>
      </View>

      <View className='px-3.5'>
        <Button
          color='#FF8C00'
          buttonStyle={styles.roundedBorder}
          onPress={() => {
            setModalTitle('Join Room');
            setModalVisible(true);
          }}
        >
          <Icon
            name='arrow-right-circle'
            type='feather'
            color='white'
          /> JOIN A ROOM
        </Button>
      </View>

      <Card
        containerStyle={[themeBgColor, styles.roundedBorder]}
      >
        <Card.Title style={themeTextColor}>
          Public Rooms
        </Card.Title>

        <Card.Divider />

        <View className='max-h-[30vh]'>
          <ScrollView>
            {(availableRooms.length > 0) ? (
              <>
                {availableRooms.map((rooms) => (
                  <View key={rooms} className='pb-1.5'>
                    <Button
                      type='outline'
                      size='sm'
                      color='#FF8C00'
                      titleStyle={styles.btnTextColor}
                      buttonStyle={
                        [styles.roundedBorder, styles.btnStyle]
                      }
                      onPress={() => handleJoinRoom(rooms)}
                    >
                      <Icon
                        name='arrow-right-circle'
                        type='feather'
                        color='#FF8C00'
                      /> {rooms}
                    </Button>
                  </View>
                ))}
              </>
            ) : (
              <Text className='text-center' style={themeTextColor}>
                No public rooms available.
              </Text>
            )}
          </ScrollView>
        </View>
      </Card>

      <LobbyModal
        themeBgColor={themeBgColor}
        themeTextColor={themeTextColor}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalTitle={modalTitle}
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        publicRoom={publicRoom}
        setPublicRoom={setPublicRoom}
        createRoomAction={handleCreateRoom}
        joinRoomAction={handleJoinRoom}
      />

      <Dialog
        isVisible={loadingVisible}
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
    </View>
  );
}