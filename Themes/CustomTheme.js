import { createTheme } from '@rneui/themed';

const DEFAULT_COLORS = {
  primary: '#FF8C00',
  secondary: '#5C636A',
  success: '#22C55E',
  warning: '#EAB308',
  danger: '#EF4444',
  info: '#00A2E8',
  topBarText: '#FFFFFF',
};
const DEFAULT_PADDING = 10;
const DEFAULT_RADIUS = 10;

const customTheme = createTheme({
  lightColors: DEFAULT_COLORS,

  darkColors: DEFAULT_COLORS,

  components: {
    Text: (props, theme) => ({
      style: {
        paddingTop: (props.noPaddingTop) ? 0 : DEFAULT_PADDING,
        fontWeight: (props.bold) ? 'bold' : 'normal',
        textAlign: (props.centered) ? 'center' : 'auto',
        textDecorationLine: (props.underline) ? 'underline' : 'none',
        fontSize: (props.xxlarge) ? 30 : (props.xlarge) ? 24 : (props.large) ? 18 : 14,
        color:
          (props.success)
            ? theme.colors.success
            : (props.warning)
              ? theme.colors.warning
              : (props.danger)
                ? theme.colors.danger
                : (props.primary)
                  ? theme.colors.primary
                  : theme.colors.black,
      },
    }),

    Button: (props, theme) => ({
      radius: DEFAULT_RADIUS,
      containerStyle: {
        paddingTop: (props.noPaddingTop) ? 0 : DEFAULT_PADDING,
        paddingHorizontal: (props.halfWidth) ? DEFAULT_PADDING / 2 : DEFAULT_PADDING,
        width: (props.halfWidth) ? '50%' : '100%',
      },
      buttonStyle: {
        borderWidth: (props.type === 'outline') ? 1 : 0,
        borderColor: (props.info) ? theme.colors.info : theme.colors.primary,
      },
      titleStyle: {
        color:
          (props.info)
            ? theme.colors.info
            : (props.type === 'outline')
              ? theme.colors.primary
              : theme.colors.topBarText,
      },
      disabledStyle: {
        borderColor: theme.colors.grey4,
      },
      disabledTitleStyle: {
        color: theme.colors.grey4,
      },
    }),

    CheckBox: {
      textStyle: {
        fontSize: 18,
        fontWeight: 'normal',
      },
    },

    Input: (props, theme) => ({
      inputContainerStyle: {
        borderColor: (props.focused) ? theme.colors.primary : theme.colors.grey3,
        borderWidth: 1,
        borderRadius: DEFAULT_RADIUS,
        paddingVertical: 4,
        paddingHorizontal: 8,
      },
    }),

    Card: {
      containerStyle: {
        borderRadius: DEFAULT_RADIUS,
        marginVertical: 0,
        marginHorizontal: DEFAULT_PADDING,
      },
    },

    CardTitle: (props) => ({
      style: (props.modal) && {
        fontSize: 20,
      },
    }),

    CardDivider: (props, theme) => ({
      style: (props.footer) && {
        paddingTop: 14,
      },
      color: theme.colors.grey4,
    }),

    Icon: (props, theme) => ({
      style: (props.topBar) && {
        paddingVertical: 4,
        paddingHorizontal: 10,
      },
      containerStyle: (props.topBar) && {
        borderRadius: 20,
        paddingHorizontal: 6,
      },
      color:
        (props.disabled)
          ? theme.colors.grey4
          : (props.primary)
            ? theme.colors.primary
            : (props.success)
              ? theme.colors.success
              : (props.warning)
                ? theme.colors.warning
                : (props.danger)
                  ? theme.colors.danger
                  : (props.info)
                    ? theme.colors.info
                    : theme.colors.topBarText,
      disabledStyle: {
        backgroundColor: 'transparent',
      },
      size: (props.xxxlarge) ? 50 : (props.small) ? 15 : 24,
    }),

    Dialog: (props, theme) => ({
      overlayStyle: {
        borderRadius: DEFAULT_RADIUS,
        backgroundColor: theme.colors.white,
        borderWidth: 0.5,
        borderColor: theme.colors.grey4,
      },
      backdropStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
    }),

    DialogTitle: (props, theme) => ({
      titleStyle: {
        textAlign: 'center',
        color: theme.colors.black,
      },
    }),
  },

  mode: 'light',
});

export default customTheme;