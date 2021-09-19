import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pagerText: {
    fontSize: 36,
  },
  pagerInactive: {
    opacity: 0.3,
  },
});

export default styles;
