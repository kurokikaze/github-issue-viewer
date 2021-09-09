import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  baseContainer: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
  },
  indicatorContainer: {
    position: 'relative',
  },
  commentsCount: {
    fontSize: 24,
    fontWeight: '600',
    flex: 1,
  },
  commentsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
  even: {
    backgroundColor: '#333',
  },
  odd: {
    backgroundColor: '#000',
  },
});

export default styles;
