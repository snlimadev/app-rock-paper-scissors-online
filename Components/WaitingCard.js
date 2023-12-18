import { useState } from 'react';
import { View, Text, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Button, Card } from '@rneui/base';
import { Tooltip } from '@rneui/themed';

import styles from '../css/styles';

export default function WaitingCard(props) {
  const [showToopTip, setShowToopTip] = useState(false);

  const code = props.roomCode;
  const text = `Room code for Rock Paper Scissors - Online is ${code}`;

  //#region Local functions / Funções locais
  const copy = async () => {
    try {
      await Clipboard.setStringAsync(text);
      setShowToopTip(true);
      setTimeout(() => setShowToopTip(false), 2000);
    } catch (error) {
      alert(error.message);
    }
  };

  const share = async () => {
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
    <View
      className='flex-1 justify-center pb-4'
      style={props.themeBgColor}
    >
      <Card
        containerStyle={[props.themeBgColor, styles.roundedBorder]}
      >
        <Card.Title style={props.themeTextColor}>
          Waiting for an opponent...
        </Card.Title>

        <Card.Divider />

        <Text
          style={props.themeTextColor}
          className='text-center pb-3'
          selectable
        >
          Please note your session will expire in 3
          minutes if an opponent doesn't join the game.
        </Text>

        <Tooltip
          visible={showToopTip}
          onOpen={() => setShowToopTip(true)}
          onClose={() => setShowToopTip(false)}
          popover={<Text className='text-white'>Copied</Text>}
          withPointer={false}
        />

        <View className='pb-1.5'>
          <Button
            title='COPY ROOM CODE'
            icon={{
              name: 'copy',
              type: 'font-awesome',
              size: 15,
              color: '#00A2E8',
            }}
            type='outline'
            size='sm'
            buttonStyle={styles.roundedBorder}
            onPress={copy} />
        </View>

        <View>
          <Button
            title='SHARE ROOM CODE'
            icon={{
              name: 'share-alt',
              type: 'font-awesome',
              size: 15,
              color: '#00A2E8',
            }}
            type='outline'
            size='sm'
            buttonStyle={styles.roundedBorder}
            onPress={share} />
        </View>
      </Card>
    </View>
  );
}