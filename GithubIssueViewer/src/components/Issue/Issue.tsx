import React, {useContext} from 'react';
import {formatDistanceToNow} from 'date-fns';
import {
  View,
  Text,
  Button,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {GithubIssueResponse} from '../../types';

import styles from './styles';
import {ThemeContext} from '../ThemeContext/ThemeContext';

type IssueProps = {
  issue: GithubIssueResponse;
  onSelect: () => void;
  onBookmark?: () => void;
  onRemoveBookmark?: () => void;
  canBookmark?: boolean;
  source?: string;
  style?: StyleProp<ViewStyle>;
};

const Issue = ({
  issue,
  onSelect,
  onBookmark,
  canBookmark = false,
  source,
  onRemoveBookmark,
  style,
}: IssueProps) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.issueContainer, style]}>
      <TouchableOpacity onPress={() => onSelect()} data-testID="select-issue">
        <Text style={styles.issueTitle}>{issue.title}</Text>
        {source ? (
          <Text style={[theme.textStyle, styles.issueDate]}>
            Issue of {source}
          </Text>
        ) : null}
        <Text style={[theme.textStyle, styles.issueDate]}>
          Created {formatDistanceToNow(new Date(issue.created_at))} ago
        </Text>
        {issue.updated_at && (
          <Text style={[theme.textStyle, styles.issueDate]}>
            Updated {formatDistanceToNow(new Date(issue.updated_at))} ago
          </Text>
        )}
        {issue.comments > 0 ? (
          <Text style={[theme.textStyle, styles.issueDate]}>
            Comments: {issue.comments}
          </Text>
        ) : (
          <Text style={[theme.textStyle, styles.issueDate]}>No comments</Text>
        )}
      </TouchableOpacity>
      {canBookmark && onBookmark ? (
        <View style={styles.bookmarkButtonContainer}>
          <Button
            title="Add to bookmarks"
            onPress={() => onBookmark()}
            data-testID="bookmark-issue"
          />
        </View>
      ) : null}
      {!canBookmark && onRemoveBookmark ? (
        <View style={styles.bookmarkButtonContainer}>
          <Button
            title="Remove bookmark"
            onPress={() => onRemoveBookmark()}
            data-testID="remove-issue-from-bookmarks"
          />
        </View>
      ) : null}
    </View>
  );
};

export default Issue;
