import React, {useContext} from 'react';
import {formatDistanceToNow} from 'date-fns';
import {View, Text, StyleProp, ViewStyle} from 'react-native';
import {GithubCommentResponse} from '../../types';

import {ThemeContext} from '../ThemeContext/ThemeContext';
import styles from './styles';

type IssueProps = {
  comment: GithubCommentResponse;
  style?: StyleProp<ViewStyle>;
};

const Comment = ({comment, style}: IssueProps) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.commentContainer, style]}>
      <Text style={styles.commentTitle}>Comment by {comment.user.login}</Text>
      <Text style={[theme.textStyle, styles.commentDate]}>
        Created {formatDistanceToNow(new Date(comment.created_at))} ago
      </Text>
      <Text style={[theme.textStyle, styles.commentDate]}>{comment.body}</Text>
    </View>
  );
};

export default Comment;
