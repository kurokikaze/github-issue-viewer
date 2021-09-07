import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  screenStyle: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    width: '100%',
  },
});

export const COLOR_LINKS = '#056aff';

export default styles;
