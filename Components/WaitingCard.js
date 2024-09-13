import { ScrollView, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Button, Card, Text, Icon } from '@rneui/themed';
import { showMessage } from 'react-native-flash-message';

import styles from '../css/styles';

export default function WaitingCard(props) {
  const code = props.roomCode;
  const text = `Room code for Rock Paper Scissors - Online is ${code}`;

  //#region Local functions / Funções locais
  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(text);

      showMessage({
        message: 'Copied',
        type: 'info',
        icon: 'info'
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: text
      });
    } catch (error) {
      alert(error.message);
    }
  };
  //#endregion

  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Card>
        <Card.Title>Waiting for an opponent...</Card.Title>

        <Card.Divider />

        <Text selectable centered noPaddingTop>
          The room code is <Text bold>{code}</Text>. Please note your session
          will expire in 3 minutes if an opponent doesn't join the game.
        </Text>

        <Button type='outline' size='sm' info onPress={handleCopy}>
          <Icon name='copy' type='font-awesome' small info /> COPY ROOM CODE
        </Button>

        <Button type='outline' size='sm' info onPress={handleShare}>
          <Icon name='share-alt' type='font-awesome' small info /> SHARE ROOM CODE
        </Button>
      </Card>
    </ScrollView>
  );
}