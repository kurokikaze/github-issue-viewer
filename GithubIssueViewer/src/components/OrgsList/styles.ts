import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  baseContainer: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    padding: 40,
  },
  orgsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  orgName: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'normal',
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 18,
  },
  overlayIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
