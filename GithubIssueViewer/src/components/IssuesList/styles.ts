import {StyleSheet} from 'react-native';
import {COLOR_LINKS} from '../../styles';

const styles = StyleSheet.create({
  baseContainer: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    padding: 40,
  },
  issuesCount: {
    fontSize: 24,
    fontWeight: '600',
    flex: 1,
  },
  issuesContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  issueTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'normal',
    color: COLOR_LINKS,
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
