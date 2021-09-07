import {format} from 'date-fns';
import React, {useContext} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {getBookmarkById, getIssueById} from '../../selectors';
import {ThemeContext} from '../ThemeContext/ThemeContext';

import styles from './styles';

type IssueViewerProps = {
  issueId: number;
  isBookmark: boolean;
};

export const IssueViewer = ({issueId, isBookmark}: IssueViewerProps) => {
  const issueSelector = isBookmark ? getBookmarkById : getIssueById;
  const issue = useSelector(issueSelector(issueId));
  console.log('Viewing', isBookmark ? 'bookmark' : 'issue', 'number', issueId);
  const theme = useContext(ThemeContext);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[theme.containerStyle, styles.container]}>
      {issue && (
        <View>
          <Text style={[theme.textStyle, styles.issueName]}>{issue.title}</Text>
          <Text style={[theme.textStyle, styles.issueData]}>
            State: {issue.state}
          </Text>
          {issue.assignee ? (
            <Text style={[theme.textStyle, styles.issueData]}>
              Assigned to: {issue.assignee}
            </Text>
          ) : null}
          <Text style={[theme.textStyle, styles.issueData]}>
            Created:{' '}
            {format(new Date(issue.created_at), 'MMMM dd, yyyy HH:MM:ss')}
          </Text>
          {issue.updated_at ? (
            <Text style={[theme.textStyle, styles.issueData]}>
              Updated:{' '}
              {format(new Date(issue.updated_at), 'MMMM dd, yyyy HH:MM:ss')}
            </Text>
          ) : null}
          {issue.closed_at ? (
            <Text style={[theme.textStyle, styles.issueData]}>
              Created:{' '}
              {format(new Date(issue.closed_at), 'MMMM dd, yyyy HH:MM:ss')}
            </Text>
          ) : null}
          <Text style={[theme.textStyle, styles.issueText]}>{issue.body}</Text>
        </View>
      )}
    </ScrollView>
  );
};
