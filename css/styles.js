import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
  },

  containerView: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },

  subcontainer: {
    flexGrow: 1,
    paddingVertical: 5,
  },

  flexRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flexColumnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  loadingCard: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
});

export default styles;