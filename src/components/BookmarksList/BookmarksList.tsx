import React, {useContext} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {getBookmarks} from '../../selectors';
import {GithubIssueResponse} from '../../types';
import {ThemeContext} from '../ThemeContext/ThemeContext';
import Issue from '../Issue/Issue';

import styles from './styles';

type BookmarksListProps = {
  onSelectIssue: (issue: GithubIssueResponse) => void;
  onRemoveBookmark: (issueId: number) => void;
};

const BookmarksList = ({onSelectIssue, onRemoveBookmark}: BookmarksListProps) => {
  const bookmarks = useSelector(getBookmarks);

  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.baseContainer]}>
      <Text style={[theme.textStyle, styles.issuesCount]}>Bookmarks</Text>
      <View style={styles.indicatorContainer}>
        <ScrollView style={styles.issuesContainer}>
          {bookmarks.length > 0 &&
            bookmarks.map(({issue, repo, username}, id) =>
              issue ? (
                <Issue
                  key={issue.id}
                  issue={issue}
                  source={`${username}/${repo}`}
                  onSelect={() => onSelectIssue(issue)}
                  canBookmark={false}
                  onRemoveBookmark={() => onRemoveBookmark(issue.id)}
                  style={
                    id % 2
                      ? theme.containerStyle
                      : theme.alternativeContainerStyle
                  }
                />
              ) : null,
            )}
        </ScrollView>
      </View>
    </View>
  );
};

export default BookmarksList;
