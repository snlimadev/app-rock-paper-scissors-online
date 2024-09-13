import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, useTheme } from '@rneui/themed';

import Home from '../Screens/Home';
import Singleplayer from '../Screens/Singleplayer';
import Lobby from '../Screens/Lobby';
import Multiplayer from '../Screens/Multiplayer';

const Stack = createStackNavigator();

export default function Routes() {
  const [themeIcon, setThemeIcon] = useState('moon');
  const { theme, updateTheme } = useTheme();

  const handleToggleDarkMode = () => {
    updateTheme((theme) => ({
      mode: (theme.mode === 'light') ? 'dark' : 'light',
    }));

    setThemeIcon((themeIcon === 'moon') ? 'sunny' : 'moon');
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTitleAlign: 'center',
          headerTitleStyle: { color: theme.colors.topBarText },
          headerTintColor: theme.colors.topBarText,
          headerRight: () => (
            <Icon
              topBar
              name={themeIcon}
              type='ionicon'
              onPress={handleToggleDarkMode}
            />
          )
        }}
      >
        <Stack.Screen name='Home' component={Home} />

        <Stack.Screen name='Singleplayer' component={Singleplayer} />

        <Stack.Screen name='Lobby' component={Lobby} />

        <Stack.Screen
          name='Multiplayer'
          component={Multiplayer}
          options={(props) => ({
            headerTitle: `Room ${props.route.params.roomCode}`,
            headerLeft: () => (
              <Icon
                topBar
                name={'home'}
                type='ionicon'
                onPress={() => props.navigation.navigate('Home')}
              />
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}