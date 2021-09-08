import React, {useContext} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchReposPage} from '../../actions';
import {
  getRepos,
  getReposLoading,
  getReposPagination,
  getReposPage,
} from '../../selectors';
import {GithubRepositoryResponse} from '../../types';
import {COLOR_LINKS} from '../../styles';
import {ThemeContext} from '../ThemeContext/ThemeContext';
import {pluralize, isPaginationUsable} from '../../utils';

import styles from './styles';
import {Pagination} from '../Pagination/Pagination';

type ReposListProps = {
  onSelectRepo: (repo: GithubRepositoryResponse) => void;
};

const linkRepoStyle: TextStyle = {
  color: COLOR_LINKS,
};

const ReposList = ({onSelectRepo}: ReposListProps) => {
  const githubRepos = useSelector(getRepos);
  const isLoading = useSelector(getReposLoading);
  const pagination = useSelector(getReposPagination);
  const page = useSelector(getReposPage);

  const dispatch = useDispatch();

  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.baseContainer]}>
      {isPaginationUsable(pagination) ? (
        <Pagination
          links={pagination}
          page={page}
          loading={isLoading}
          onPageChange={newPage => dispatch(fetchReposPage(newPage))}
        />
      ) : null}
      <View>
        <ScrollView style={styles.reposContainer}>
          {githubRepos.length > 0 &&
            githubRepos.map(repo => (
              <View key={repo.id} data-testID={`repo-${repo.id}`}>
                <Text
                  onPress={() => repo.has_issues && onSelectRepo(repo)}
                  data-testID="select-repo"
                  style={[
                    theme.textStyle,
                    styles.repoName,
                    repo.has_issues && linkRepoStyle,
                  ]}>
                  {repo.name}{' '}
                  {repo.open_issues_count > 0 &&
                    `(${pluralize({
                      singular: 'open issue',
                      plural: 'open issues',
                      empty: '',
                      count: repo.open_issues_count,
                    })})`}
                </Text>
              </View>
            ))}
        </ScrollView>
        {isLoading && (
          <ActivityIndicator size={300} style={styles.overlayIndicator} />
        )}
      </View>
      {isPaginationUsable(pagination) ? (
        <Pagination
          links={pagination}
          page={page}
          loading={isLoading}
          onPageChange={newPage =>
            !isLoading && dispatch(fetchReposPage(newPage))
          }
        />
      ) : null}
    </View>
  );
};

export default ReposList;
