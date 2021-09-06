import React, {useContext} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchIssuesPage} from '../../actions';
import {
  getIssuesLoading,
  getIssues,
  getIssuesPage,
  getIssuesPagination,
} from '../../selectors';
import {pluralize} from '../../utils';
import {GithubIssueResponse} from '../../types';
import styles from './styles';
import {ThemeContext} from '../ThemeContext/ThemeContext';
import {Pagination} from '../Pagination/Pagination';

type IssuesListProps = {
  onSelectIssue: (repo: GithubIssueResponse) => void;
};

const IssuesList = ({onSelectIssue}: IssuesListProps) => {
  const issues = useSelector(getIssues);
  const pagination = useSelector(getIssuesPagination);
  const page = useSelector(getIssuesPage);
  const isLoading = useSelector(getIssuesLoading);

  const dispatch = useDispatch();

  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.baseContainer]}>
      <Text style={[theme.textStyle, styles.issuesCount]}>
        {pluralize({
          singular: 'issue',
          plural: 'issues',
          empty: 'No issues',
          count: issues.length,
        })}
      </Text>
      <Pagination
        links={pagination}
        page={page}
        onPageChange={newPage => dispatch(fetchIssuesPage(newPage))}
      />
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
      <Pagination
        links={pagination}
        page={page}
        onPageChange={newPage =>
          !isLoading && dispatch(fetchIssuesPage(newPage))
        }
      />
    </View>
  );
};

export default IssuesList;
