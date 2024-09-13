import { useState, useEffect } from 'react';
import { View, Modal } from 'react-native';
import { Card, Text, Icon } from '@rneui/themed';

import styles from '../css/styles';

export default function ResultModal(props) {
  const [hasModalBeenShown, setHasModalBeenShown] = useState(false);

  const handleCloseModal = () => {
    props.setModalVisible(false);
  };

  useEffect(() => {
    if (props.modalVisible && !hasModalBeenShown) {
      const modalTimeout = setTimeout(() => {
        handleCloseModal();
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
      <View style={styles.modalOverlay}>
        <Card>
          <View style={styles.flexColumnContainer}>
            {(props.modalTitle === 'Draw') && (
              <>
                <Icon name='exclamationcircleo' type='antdesign' xxxlarge warning />
                <Text bold xlarge warning>{props.modalTitle}</Text>
              </>
            )}

            {(props.modalTitle === 'You win') && (
              <>
                <Icon name='checkcircleo' type='antdesign' xxxlarge success />
                <Text bold xlarge success>{props.modalTitle}</Text>
              </>
            )}

            {(props.modalTitle.endsWith('wins')) && (
              <>
                <Icon name='closecircleo' type='antdesign' xxxlarge danger />
                <Text bold xlarge danger>{props.modalTitle}</Text>
              </>
            )}
          </View>

          <Text centered large style={{ paddingTop: 20 }}>
            {props.modalDescription}
          </Text>
        </Card>
      </View>
    </Modal>
  );
}