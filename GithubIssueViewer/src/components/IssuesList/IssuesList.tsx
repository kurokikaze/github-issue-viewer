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
  getBookmarkedIds,
} from '../../selectors';
import {GithubIssueResponse} from '../../types';
import styles from './styles';
import {ThemeContext} from '../ThemeContext/ThemeContext';
import {Pagination} from '../Pagination/Pagination';
import {IssuesFilter} from '../IssuesFilter/IssuesFilter';
import Issue from '../Issue/Issue';
import {isPaginationUsable} from '../../utils';
import IssuesSorter from '../IssuesSorter/IssuesSorter';

type IssuesListProps = {
  onSelectIssue: (issue: GithubIssueResponse) => void;
  onBookmarkIssue: (issue: GithubIssueResponse) => void;
  onRemoveBookmark: (issueId: number) => void;
};

const IssuesList = ({
  onSelectIssue,
  onBookmarkIssue,
  onRemoveBookmark,
}: IssuesListProps) => {
  const issues = useSelector(getIssues);
  const pagination = useSelector(getIssuesPagination);
  const page = useSelector(getIssuesPage);
  const isLoading = useSelector(getIssuesLoading);
  const username = useSelector(getIssuesUsername);
  const repo = useSelector(getIssuesRepo);
  const bookmarkedIds = useSelector(getBookmarkedIds);

  const dispatch = useDispatch();

  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.baseContainer]}>
      <Text style={[theme.textStyle, styles.issuesCount]}>
        Issues of {username}/{repo}
      </Text>
      <IssuesFilter />
      <IssuesSorter />
      {isPaginationUsable(pagination) ? (
        <Pagination
          links={pagination}
          page={page}
          loading={isLoading}
          onPageChange={newPage => dispatch(fetchIssuesPage(newPage))}
        />
      ) : null}
      <View style={styles.indicatorContainer}>
        <ScrollView style={styles.issuesContainer}>
          {issues.length > 0 &&
            issues.map((issue, id) => (
              <Issue
                key={issue.id}
                issue={issue}
                onSelect={() => onSelectIssue(issue)}
                onBookmark={() => onBookmarkIssue(issue)}
                onRemoveBookmark={() => onRemoveBookmark(issue.id)}
                canBookmark={!bookmarkedIds.includes(issue.id)}
                style={
                  id % 2
                    ? theme.containerStyle
                    : theme.alternativeContainerStyle
                }
              />
            ))}
          {issues.length === 0 && (
            <View>
              <Text style={[theme.textStyle, styles.issuesCount]}>
                No issues to display
              </Text>
              <Text style={[theme.textStyle]}>
                Choose organization and user in Settings
              </Text>
            </View>
          )}
        </ScrollView>
        {isLoading && (
          <ActivityIndicator style={styles.overlayIndicator} size={200} />
        )}
      </View>
      {isPaginationUsable(pagination) ? (
        <Pagination
          links={pagination}
          page={page}
          loading={isLoading}
          onPageChange={newPage =>
            !isLoading && dispatch(fetchIssuesPage(newPage))
          }
        />
      ) : null}
    </View>
  );
};

export default IssuesList;
