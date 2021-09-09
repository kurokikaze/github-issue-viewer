import {StyleSheet} from 'react-native';
import {COLOR_LINKS} from '../../styles';

const styles = StyleSheet.create({
  commentContainer: {
    display: 'flex',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingTop: 18,
    paddingBottom: 5,
  },
  commentTitle: {
    fontSize: 20,
    lineHeight: 24,
    paddingLeft: 20,
    fontWeight: 'normal',
    color: COLOR_LINKS,
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  commentDate: {
    paddingLeft: 20,
    paddingBottom: 20,
    fontSize: 18,
    lineHeight: 20,
  },
  bookmarkButtonContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
});

export default styles;
