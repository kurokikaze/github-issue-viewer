import React, {useContext} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {getIssueById} from '../../selectors';
import {ThemeContext} from '../ThemeContext/ThemeContext';

import styles from './styles';

type IssueViewerProps = {
  issueId: number;
};

export const IssueViewer = ({issueId}: IssueViewerProps) => {
  const issue = useSelector(getIssueById(issueId));
  const theme = useContext(ThemeContext);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[theme.containerStyle, styles.container]}>
      {issue && (
        <View>
          <Text style={[theme.textStyle, styles.issueName]}>{issue.title}</Text>
          <Text style={[theme.textStyle, styles.issueText]}>{issue.body}</Text>
        </View>
      )}
    </ScrollView>
  );
};
