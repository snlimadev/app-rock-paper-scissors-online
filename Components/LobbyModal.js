import { useState } from 'react';
import { View, Modal } from 'react-native';
import { Card, Input, Button, CheckBox } from '@rneui/themed';

import styles from '../css/styles';

export default function LobbyModal(props) {
  const [focusedInput, setFocusedInput] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const handleCloseModal = () => {
    setFocusedInput(false);
    props.setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalOverlay}>
        <Card>
          <Card.Title modal>{props.modalTitle}</Card.Title>

          <Card.Divider />

          {(props.modalTitle === 'Create Room') ? (
            <CheckBox
              checked={props.publicRoom}
              onPress={() => props.setPublicRoom(!props.publicRoom)}
              title='Public room'
            />
          ) : (
            <Input
              placeholder='Enter the room code'
              value={props.roomCode}
              onChangeText={(e) => {
                props.setRoomCode(e);
                setDisabledButton((e) ? false : true);
              }}
              renderErrorMessage={false}
              keyboardType='number-pad'
              maxLength={8}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
              focused={focusedInput}
            />
          )}

          <Card.Divider footer />

          <View style={styles.flexRowContainer}>
            <Button
              title='Cancel'
              color='secondary'
              onPress={handleCloseModal}
              halfWidth
              noPaddingTop
            />

            <Button
              title='OK'
              disabled={
                (props.modalTitle === 'Create Room')
                  ? false
                  : disabledButton
              }
              onPress={() => {
                (props.modalTitle === 'Create Room')
                  ? props.createRoomAction()
                  : props.joinRoomAction()
              }}
              halfWidth
              noPaddingTop
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
}