import React, {useContext} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchIssuesPage} from '../../actions';
import {
  getIssuesLoading,
  getIssues,
  getIssuesPage,
  getIssuesPagination,
  getIssuesUsername,
  getIssuesRepo,
} from '../../selectors';
import {GithubIssueResponse} from '../../types';
import styles from './styles';
import {ThemeContext} from '../ThemeContext/ThemeContext';
import {Pagination} from '../Pagination/Pagination';
import {IssuesFilter} from '../IssuesFilter/IssuesFilter';

type IssuesListProps = {
  onSelectIssue: (repo: GithubIssueResponse) => void;
};

const IssuesList = ({onSelectIssue}: IssuesListProps) => {
  const issues = useSelector(getIssues);
  const pagination = useSelector(getIssuesPagination);
  const page = useSelector(getIssuesPage);
  const isLoading = useSelector(getIssuesLoading);
  const username = useSelector(getIssuesUsername);
  const repo = useSelector(getIssuesRepo);

  const dispatch = useDispatch();

  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.baseContainer]}>
      <Text style={[theme.textStyle, styles.issuesCount]}>
        Issues of {username}/{repo}
      </Text>
      <IssuesFilter />
      <Pagination
        links={pagination}
        page={page}
        loading={isLoading}
        onPageChange={newPage => dispatch(fetchIssuesPage(newPage))}
      />
      <View style={styles.indicatorContainer}>
        <ScrollView style={styles.issuesContainer}>
          {issues.length > 0 &&
            issues.map(issue => (
              <View key={issue.id}>
                <Text
                  onPress={() => onSelectIssue(issue)}
                  style={styles.issueTitle}>
                  {issue.title}
                </Text>
              </View>
            ))}
        </ScrollView>
        {isLoading && (
          <ActivityIndicator style={styles.overlayIndicator} size={200} />
        )}
      </View>
      <Pagination
        links={pagination}
        page={page}
        loading={isLoading}
        onPageChange={newPage =>
          !isLoading && dispatch(fetchIssuesPage(newPage))
        }
      />
    </View>
  );
};

export default IssuesList;
