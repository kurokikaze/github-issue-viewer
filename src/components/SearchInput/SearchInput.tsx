import React, {useContext} from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import {Text} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {getOrgsUsername} from '../../selectors';
import {ThemeContext} from '../ThemeContext/ThemeContext';

import styles from './styles';

type SearchInputProps = {
  text: string;
  onChangeText: (text: string) => void;
};

const SearchInput = ({text, onChangeText}: SearchInputProps) => {
  const theme = useContext(ThemeContext);
  const usernameFound = useSelector(getOrgsUsername) !== '';

  return (
    <SafeAreaView style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style={[
          styles.input,
          theme.textStyle,
          usernameFound ? styles.userFound : styles.userNotFound,
        ]}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};

export default SearchInput;
