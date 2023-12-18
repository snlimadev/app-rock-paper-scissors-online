import { useState, useEffect } from 'react';
import { Text, View, Modal } from 'react-native';
import { Card } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons';

import styles from '../css/styles';

export default function ResultModal(props) {
  const [hasModalBeenShown, setHasModalBeenShown] = useState(false);

  const closeModal = () => {
    props.setModalVisible(false);
  };

  useEffect(() => {
    if (props.modalVisible && !hasModalBeenShown) {
      const modalTimeout = setTimeout(() => {
        closeModal();
        setHasModalBeenShown(true);
      }, 1500);

      return () => {
        clearTimeout(modalTimeout);
        setHasModalBeenShown(false);
        props.setDisabledButtons(false);
      }
    }
  }, [props.modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => null}
    >
      <View
        className='flex-1 justify-center'
        style={styles.backgroundBlur}
      >
        <Card
          containerStyle={[props.themeBgColor, styles.roundedBorder]}
        >
          <View
            className='items-center pb-5'
            style={props.themeTextColor}
          >
            {(props.modalTitle === 'Draw') && (
              <View className='items-center'>
                <AntDesign
                  name='exclamationcircleo'
                  size={50}
                  color='#eab308'
                />

                <Text
                  className='text-2xl font-bold text-yellow-500 pt-3'
                >
                  {props.modalTitle}
                </Text>
              </View>
            )}

            {(props.modalTitle === 'You win') && (
              <View className='items-center'>
                <AntDesign
                  name='checkcircleo'
                  size={50}
                  color='#22c55e'
                />

                <Text
                  className='text-2xl font-bold text-green-500 pt-3'
                >
                  {props.modalTitle}
                </Text>
              </View>
            )}

            {(props.modalTitle.endsWith('wins')) && (
              <View className='items-center'>
                <AntDesign
                  name='closecircleo'
                  size={50}
                  color='#ef4444'
                />

                <Text
                  className='text-2xl font-bold text-red-500 pt-3'
                >
                  {props.modalTitle}
                </Text>
              </View>
            )}
          </View>

          <Text
            className='text-center text-lg'
            style={props.themeTextColor}
          >
            {props.modalDescription}
          </Text>
        </Card>
      </View>
    </Modal>
  );
}