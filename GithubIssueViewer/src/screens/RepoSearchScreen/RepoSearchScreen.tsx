import React, {useCallback, useContext, useState} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {fetchIssuesInit, searchUserStream} from '../../actions';
import SearchInput from '../../components/SearchInput/SearchInput';
import Section from '../../components/Section/Section';
import ReposList from '../../components/ReposList/ReposList';
import {GithubRepositoryResponse, RootStackParamList} from '../../types';
import styles from '../../styles';
import {ThemeContext} from '../../components/ThemeContext/ThemeContext';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const RepoSearchScreen = ({navigation}: ScreenProps) => {
  const theme = useContext(ThemeContext);

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
    <SafeAreaView style={[theme.containerStyle, styles.screenStyle]}>
      <StatusBar barStyle={theme.barStyle} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={theme.containerStyle}>
        <Header />
        <View style={theme.containerStyle}>
          <Section title="Search">
            <SearchInput
              text={repoSearchText}
              onChangeText={text => {
                setRepoSearchText(text);
                dispatch(searchUserStream(text));
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
