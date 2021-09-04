import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getRepos, getLoading} from '../../selectors';
import {GithubRepositoryResponse} from '../../types';
import Section from '../Section/Section';

import styles from './styles';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type ReposListProps = {
  onSelectRepo: (repo: GithubRepositoryResponse) => void;
};

const ACTIVE_REPO_COLOR = '#056aff';

const ReposList = ({onSelectRepo}: ReposListProps) => {
  const githubRepos = useSelector(getRepos);
  const reposLoading = useSelector(getLoading);

  const isDarkMode = useColorScheme() === 'dark';
  const modeColor = isDarkMode ? Colors.white : Colors.black;

  return (
    <Section title={`${githubRepos.length} Repos`}>
      <ScrollView style={styles.reposContainer}>
        {reposLoading && <ActivityIndicator size="large" />}
        {githubRepos.length > 0 &&
          githubRepos.map(repo => (
            <View key={repo.id}>
              <Text
                onPress={() => repo.open_issues_count > 0 && onSelectRepo(repo)}
                style={[
                  styles.repoName,
                  {
                    color:
                      repo.open_issues_count > 0
                        ? ACTIVE_REPO_COLOR
                        : modeColor,
                  },
                ]}>
                {repo.name}{' '}
                {repo.open_issues_count > 0 &&
                  `(${repo.open_issues_count} open  issues)`}
              </Text>
            </View>
          ))}
      </ScrollView>
    </Section>
  );
};

export default ReposList;
