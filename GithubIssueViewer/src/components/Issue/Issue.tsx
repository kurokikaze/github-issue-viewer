import React, {useContext} from 'react';
import {formatRelative} from 'date-fns';
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
  style?: StyleProp<ViewStyle>;
};

export const Issue = ({
  issue,
  onSelect,
  onBookmark,
  canBookmark = false,
  onRemoveBookmark,
  style,
}: IssueProps) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.issueContainer, style]}>
      <TouchableOpacity onPress={() => onSelect()}>
        <Text style={styles.issueTitle}>{issue.title}</Text>
        <Text style={[theme.textStyle, styles.issueDate]}>
          Created {formatRelative(new Date(issue.created_at), new Date())}
        </Text>
        {issue.updated_at && (
          <Text style={[theme.textStyle, styles.issueDate]}>
            Updated {formatRelative(new Date(issue.updated_at), new Date())}
          </Text>
        )}
      </TouchableOpacity>
      {canBookmark && onBookmark ? (
        <View style={styles.bookmarkButtonContainer}>
          <Button title="Add to bookmarks" onPress={() => onBookmark()} />
        </View>
      ) : null}
      {!canBookmark && onRemoveBookmark ? (
        <View style={styles.bookmarkButtonContainer}>
          <Button title="Remove bookmark" onPress={() => onRemoveBookmark()} />
        </View>
      ) : null}
    </View>
  );
};
