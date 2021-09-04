import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {SEARCH_USERS_STREAM, fetchIssuesInit} from '../../actions';
import SearchInput from '../../components/SearchInput/SearchInput';
import Section from '../../components/Section/Section';
import ReposList from '../../components/ReposList/ReposList';
import {GithubRepositoryResponse, RootStackParamList} from '../../types';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const RepoSearchScreen = ({navigation}: ScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [repoSearchText, setRepoSearchText] = useState<string>('');

  const dispatch = useDispatch();

  const handleSelectRepo = useCallback(
    (repo: GithubRepositoryResponse) => {
      dispatch(fetchIssuesInit(repo.owner.login, repo.name));
      navigation.navigate('IssuesBrowser');
    },
    [navigation, dispatch],
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Search">
            <Text>Search:</Text>
            <SearchInput
              text={repoSearchText}
              onChangeText={text => {
                setRepoSearchText(text);
                dispatch({type: SEARCH_USERS_STREAM, text});
              }}
            />
          </Section>
          <ReposList onSelectRepo={handleSelectRepo} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepoSearchScreen;
