import React, {useCallback, useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  fetchIssuesInit,
  searchUserStream,
  selectOrganization,
} from '../../actions';
import SearchInput from '../../components/SearchInput/SearchInput';
import ReposList from '../../components/ReposList/ReposList';
import {
  GithubOrganizationResponse,
  GithubRepositoryResponse,
  RootStackParamList,
} from '../../types';
import styles from '../../styles';
import {ThemeContext} from '../../components/ThemeContext/ThemeContext';
import OrgsList from '../../components/OrgsList/OrgsList';
import {getReposOrganization} from '../../selectors';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const RepoSearchScreen = ({navigation}: ScreenProps) => {
  const theme = useContext(ThemeContext);
  const organization = useSelector(getReposOrganization);

  const [repoSearchText, setRepoSearchText] = useState<string>('gustin');

  const dispatch = useDispatch();

  const handleSelectRepo = useCallback(
    (repo: GithubRepositoryResponse) => {
      dispatch(fetchIssuesInit(repo.owner.login, repo.name));
      navigation.navigate('IssuesBrowser');
    },
    [navigation, dispatch],
  );

  const handleSelectOrg = useCallback(
    (org: GithubOrganizationResponse) => {
      dispatch(selectOrganization(org));
    },
    [dispatch],
  );

  return (
    <SafeAreaView style={[theme.containerStyle, styles.screenStyle]}>
      <StatusBar barStyle={theme.barStyle} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={theme.containerStyle}>
        <View style={theme.containerStyle}>
          <SearchInput
            text={repoSearchText}
            onChangeText={text => {
              setRepoSearchText(text);
              dispatch(searchUserStream(text));
            }}
          />
          <Text>Organizations</Text>
          <OrgsList onSelectOrg={handleSelectOrg} />
          {organization ? (
            <View>
              <Text>Repositories</Text>
              <ReposList onSelectRepo={handleSelectRepo} />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepoSearchScreen;
