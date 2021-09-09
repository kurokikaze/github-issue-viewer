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
import globalStyles from '../../styles';
import {ThemeContext} from '../../components/ThemeContext/ThemeContext';
import OrgsList from '../../components/OrgsList/OrgsList';
import {getOrgsUsername, getReposOrganization} from '../../selectors';

import styles from './styles';
import {FILTER_OPEN} from '../../components/IssuesFilter/IssuesFilter';
import {
  SORT_DIRECTION_ASC,
  SORT_NONE,
} from '../../components/IssuesSorter/IssuesSorter';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const RepoSearchScreen = ({navigation}: ScreenProps) => {
  const theme = useContext(ThemeContext);
  const organization = useSelector(getReposOrganization);
  const username = useSelector(getOrgsUsername);

  const [repoSearchText, setRepoSearchText] = useState<string>(username);

  const dispatch = useDispatch();

  const handleSelectRepo = useCallback(
    (repo: GithubRepositoryResponse) => {
      dispatch(
        fetchIssuesInit(repo.owner.login, repo.name, 1, FILTER_OPEN, {
          field: SORT_NONE,
          direction: SORT_DIRECTION_ASC,
        }),
      );
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
    <SafeAreaView style={[theme.containerStyle, globalStyles.screenStyle]}>
      <StatusBar barStyle={theme.barStyle} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={theme.containerStyle}>
        <View style={theme.containerStyle}>
          <Text style={[theme.textStyle, styles.listHeader]}>
            Enter username to fetch repositories
          </Text>
          <SearchInput
            text={repoSearchText}
            onChangeText={text => {
              setRepoSearchText(text);
              dispatch(searchUserStream(text));
            }}
          />
          <Text style={[theme.textStyle, styles.listHeader]}>
            Organizations
          </Text>
          <OrgsList onSelectOrg={handleSelectOrg} />
          {organization ? (
            <View>
              <Text style={[theme.textStyle, styles.listHeader]}>
                Repositories
              </Text>
              <ReposList onSelectRepo={handleSelectRepo} />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepoSearchScreen;
