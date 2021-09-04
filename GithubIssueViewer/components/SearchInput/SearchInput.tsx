import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 80,
    margin: 12,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  container: {
    flex: 1,
  },
});

type SearchInputProps = {
  text: string;
  onChangeText: (text: string) => void;
};

const SearchInput = ({text, onChangeText}: SearchInputProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};

export default SearchInput;
