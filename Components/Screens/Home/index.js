import { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '@rneui/base';
import { Icon } from '@rneui/themed';

import styles from '../../../css/styles';
import { changeTheme } from '../../Functions';

export default function Home(props) {
  const lightBackground = styles.lightThemeBgColor;
  const lightText = styles.lightThemeTextColor;
  const [themeBgColor, setThemeBgColor] = useState(lightBackground);
  const [themeTextColor, setThemeTextColor] = useState(lightText);

  useEffect(() => {
    changeTheme(props.isDarkMode, setThemeBgColor, setThemeTextColor);
  }, [props.isDarkMode]);

  return (
    <ScrollView
      contentContainerStyle={styles.containerScrollView}
      style={themeBgColor}
    >
      <Text
        style={themeTextColor}
        className='text-2xl font-bold text-center pb-3'
      >
        Welcome to Rock Paper Scissors - Online!
      </Text>

      <Text
        style={themeTextColor}
        className='text-lg font-bold text-center pb-5'
      >
        Play against the computer (singleplayer)
        or online with a friend (multiplayer)!
      </Text>

      <View className='pb-2'>
        <Button
          color='#FF8C00'
          buttonStyle={styles.roundedBorder}
          onPress={() => props.navigation.navigate('Singleplayer')}
        >
          <Icon
            name='user'
            type='feather'
            color='white'
          /> SINGLEPLAYER
        </Button>
      </View>

      <View>
        <Button
          color='#FF8C00'
          buttonStyle={styles.roundedBorder}
          onPress={() => props.navigation.navigate('Lobby')}
        >
          <Icon
            name='users'
            type='feather'
            color='white'
          /> MULTIPLAYER
        </Button>
      </View>
    </ScrollView>
  );
}