import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //#region General styles
  // Estilos gerais
  containerScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
  },

  roundedBorder: {
    borderRadius: 10,
  },

  backgroundBlur: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  //#endregion

  //#region Top bar styles
  // Estilos da barra superior
  topBarColor: {
    backgroundColor: '#FF8C00',
  },

  topBarIconStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  //#endregion

  //#region Dark and light theme styles
  // Estilos dos temas claro e escuro
  darkThemeBgColor: {
    backgroundColor: 'black',
  },

  darkThemeTextColor: {
    color: 'white',
  },

  lightThemeBgColor: {
    backgroundColor: 'white',
  },

  lightThemeTextColor: {
    color: 'black',
  },
  //#endregion

  //#region Text input styles
  // Estilos dos campos de texto
  inputStyle: {
    borderWidth: 1,
  },

  focusedInput: {
    borderColor: '#FF8C00',
  },
  //#endregion

  //#region Button styles
  // Estilos para botões
  btnStyle: {
    borderColor: '#FF8C00',
    borderWidth: 1.5,
  },

  btnTextColor: {
    color: '#FF8C00',
  },

  btnDisabledTextColor: {
    color: '#99A1A8',
  },
  //#endregion
});

export default styles;