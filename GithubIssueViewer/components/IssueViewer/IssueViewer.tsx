import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {getIssueById} from '../../selectors';

import styles from './styles';

type IssueViewerProps = {
  issueId: number;
};

export const IssueViewer = ({issueId}: IssueViewerProps) => {
  const issue = useSelector(getIssueById(issueId));

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}>
      {issue && (
        <View>
          <Text style={styles.issueName}>{issue.title}</Text>
          <Text style={styles.issueText}>{issue.body}</Text>
        </View>
      )}
    </ScrollView>
  );
};
