import { ScrollView } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';

import styles from '../../../css/styles';

export default function Home(props) {
  return (
    <ScrollView contentContainerStyle={styles.containerScrollView}>
      <Text h4 centered noPaddingTop>
        Welcome to Rock Paper Scissors - Online!
      </Text>

      <Text bold centered>
        Play against the computer (singleplayer)
        or online with a friend (multiplayer)!
      </Text>

      <Button onPress={() => props.navigation.navigate('Singleplayer')}>
        <Icon name='user' type='feather' /> SINGLEPLAYER
      </Button>

      <Button onPress={() => props.navigation.navigate('Lobby')}>
        <Icon name='users' type='feather' /> MULTIPLAYER
      </Button>
    </ScrollView>
  );
}