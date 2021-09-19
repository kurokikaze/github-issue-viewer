import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: 80,
    margin: 12,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  container: {
    flex: 1,
    width: '100%',
    height: 80,
  },
  userFound: {
    borderColor: 'rgb(0,193,118)',
  },
  userNotFound: {
    borderColor: 'rgb(255,0,60)',
  },
});

export default styles;
