import React, {useContext} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {getIssuesLoading, getBookmarks} from '../../selectors';
import {GithubIssueResponse} from '../../types';
import {ThemeContext} from '../ThemeContext/ThemeContext';
import {Issue} from '../Issue/Issue';

import styles from './styles';

type IssuesListProps = {
  onSelectIssue: (issue: GithubIssueResponse) => void;
  onRemoveBookmark: (issueId: number) => void;
};

const BookmarksList = ({onSelectIssue, onRemoveBookmark}: IssuesListProps) => {
  const issues = useSelector(getBookmarks);
  const isLoading = useSelector(getIssuesLoading);

  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.baseContainer]}>
      <Text style={[theme.textStyle, styles.issuesCount]}>Bookmarks</Text>
      <View style={styles.indicatorContainer}>
        <ScrollView style={styles.issuesContainer}>
          {issues.length > 0 &&
            issues.map((issue, id) => (
              <Issue
                key={issue.id}
                issue={issue}
                onSelect={() => onSelectIssue(issue)}
                canBookmark={false}
                onRemoveBookmark={() => onRemoveBookmark(issue.id)}
                style={
                  id % 2
                    ? theme.containerStyle
                    : theme.alternativeContainerStyle
                }
              />
            ))}
        </ScrollView>
        {isLoading && (
          <ActivityIndicator style={styles.overlayIndicator} size={200} />
        )}
      </View>
    </View>
  );
};

export default BookmarksList;
