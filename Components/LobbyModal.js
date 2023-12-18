import { useState } from 'react';
import { Text, View, Modal } from 'react-native';
import { Card, Input, Button } from '@rneui/base';
import { CheckBox } from '@rneui/themed';

import styles from '../css/styles';

export default function LobbyModal(props) {
  const [focusedInput, setFocusedInput] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const closeModal = () => {
    setFocusedInput(false);
    props.setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={closeModal}
    >
      <View
        className='flex-1 justify-center'
        style={styles.backgroundBlur}
      >
        <Card
          containerStyle={[props.themeBgColor, styles.roundedBorder]}
        >
          <Card.Title>
            <Text
              className='text-xl font-bold pt-3'
              style={props.themeTextColor}
            >
              {props.modalTitle}
            </Text>
          </Card.Title>

          <Card.Divider />

          {(props.modalTitle === 'Create Room') ? (
            <View className='items-start'>
              <CheckBox
                checked={props.publicRoom}
                onPress={() => props.setPublicRoom(!props.publicRoom)}
                checkedColor='#FF8C00'
                containerStyle={props.themeBgColor}
                title={
                  <Text className='text-lg pl-1.5' style={props.themeTextColor}>
                    Public room
                  </Text>
                }
              />
            </View>
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
              maxLength={6}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
              inputStyle={props.themeTextColor}
              inputContainerStyle={[
                (focusedInput) && styles.focusedInput,
                styles.inputStyle,
                styles.roundedBorder,
                styles.topBarIconStyle
              ]}
            />
          )}

          <View className='pt-3.5'>
            <Card.Divider />
          </View>

          <View className='flex-row justify-center'>
            <View className='pl-2.5 pr-1 w-1/2'>
              <Button
                color='#5C636A'
                buttonStyle={styles.roundedBorder}
                onPress={closeModal}
              >
                Cancel
              </Button>
            </View>

            <View className='pr-2.5 pl-1 w-1/2'>
              <Button
                color='#FF8C00'
                buttonStyle={styles.roundedBorder}
                disabled={
                  (props.modalTitle === 'Create Room') ? (
                    false
                  ) : (
                    disabledButton
                  )
                }
                onPress={() => {
                  (props.modalTitle === 'Create Room') ? (
                    props.createRoomAction()
                  ) : (
                    props.joinRoomAction()
                  )
                }}
              >
                OK
              </Button>
            </View>
          </View>
        </Card>
      </View>
    </Modal>
  );
}