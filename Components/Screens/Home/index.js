import { useState, useCallback } from 'react';
import { ScrollView, Linking, Pressable } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useFocusEffect } from '@react-navigation/native';

import styles from '../../../css/styles';

const BANNER_ID = 'ca-app-pub-4878437225305198/6821903147';

export default function Home(props) {
  const [shouldShowBanner, setShouldShowBanner] = useState(false);

  const handleOpenURL = (appId) => {
    Linking.openURL(`https://play.google.com/store/apps/details?id=${appId}`);
  };

  useFocusEffect(
    useCallback(() => {
      setShouldShowBanner(true);

      return () => {
        setShouldShowBanner(false);
      };
    }, [])
  );

  return (
    <>
      <ScrollView contentContainerStyle={styles.containerScrollView}>
        <Text h4 centered noPaddingTop>
          Welcome to Rock Paper Scissors - Online!
        </Text>

        <Button onPress={() => props.navigation.navigate('Singleplayer')}>
          <Icon name='user' type='feather' /> SINGLEPLAYER
        </Button>

        <Button onPress={() => props.navigation.navigate('Lobby')}>
          <Icon name='users' type='feather' /> MULTIPLAYER
        </Button>

        <Text centered>
          <Text noPaddingTop>If you like it, please </Text>

          <Pressable onPress={() => handleOpenURL('com.snlimadev.rockpaperscissors')}>
            <Text primary bold underline noPaddingTop>rate the app</Text>
          </Pressable>

          <Text noPaddingTop> to help us keep improving it for you.</Text>
        </Text>

        <Text centered>
          <Text noPaddingTop>Check out our latest game, </Text>

          <Pressable onPress={() => handleOpenURL('com.snlimadev.battleship')}>
            <Text primary bold underline noPaddingTop>Battleship - Online</Text>
          </Pressable>

          <Text noPaddingTop>, available now!</Text>
        </Text>
      </ScrollView>

      {(shouldShowBanner) && (
        <BannerAd
          unitId={(__DEV__) ? TestIds.BANNER : BANNER_ID}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true
          }}
        />
      )}
    </>
  );
}