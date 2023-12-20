import { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@rneui/themed';
import FlashMessage from 'react-native-flash-message';
import styles from './css/styles';

import Home from './Components/Screens/Home';
import Singleplayer from './Components/Screens/Singleplayer';
import Lobby from './Components/Screens/Lobby';
import Multiplayer from './Components/Screens/Multiplayer';

const Stack = createStackNavigator();

const CustomTitle = (props) => (
  <Text
    className='text-white text-xl font-bold'
    selectable
  >
    {props.title}
  </Text>
);

export default function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const [themeIcon, setThemeIcon] = useState('moon');

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    setThemeIcon((themeIcon === 'moon') ? 'sunny' : 'moon');
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: styles.topBarColor,
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerRight: () => (
              <View className='pr-1.5'>
                <Icon
                  name={themeIcon}
                  type='ionicon'
                  color='white'
                  onPress={toggleDarkMode}
                  style={styles.topBarIconStyle}
                />
              </View>
            )
          }}
        >
          <Stack.Screen name='Home'>
            {(props) => (
              <Home {...props} isDarkMode={isDarkMode} />
            )}
          </Stack.Screen>

          <Stack.Screen name='Singleplayer'>
            {(props) => (
              <Singleplayer {...props} isDarkMode={isDarkMode} />
            )}
          </Stack.Screen>

          <Stack.Screen name='Lobby'>
            {(props) => (
              <Lobby {...props} isDarkMode={isDarkMode} />
            )}
          </Stack.Screen>

          <Stack.Screen
            name='Multiplayer'
            options={(props) => ({
              headerTitle: () => (
                <CustomTitle
                  title={`Room ${props.route.params.roomCode}`}
                />
              ),
              headerLeft: () => (
                <View className='pl-1.5'>
                  <Icon
                    name={'home'}
                    type='ionicon'
                    color='white'
                    onPress={
                      () => props.navigation.navigate('Home')
                    }
                    style={styles.topBarIconStyle}
                  />
                </View>
              )
            })}
          >
            {(props) => (
              <Multiplayer {...props} isDarkMode={isDarkMode} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

      <FlashMessage position='top' />
    </>
  );
}