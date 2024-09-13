import { ThemeProvider } from '@rneui/themed';
import FlashMessage from 'react-native-flash-message';

import customTheme from './Themes/CustomTheme';
import Routes from './Components/Routes';

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Routes />

      <FlashMessage position='top' />
    </ThemeProvider>
  );
}