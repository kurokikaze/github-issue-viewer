import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getLoading, getIssues} from '../../selectors';
import Section from '../Section/Section';

import styles from './styles';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {pluralize} from '../../utils';
import {GithubIssueResponse} from '../../types';

type IssuesListProps = {
  onSelectIssue: (repo: GithubIssueResponse) => void;
};

const IssuesList = ({onSelectIssue}: IssuesListProps) => {
  const issues = useSelector(getIssues);
  const isLoading = useSelector(getLoading);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Section title="">
      <Text style={styles.issuesCount}>
        {pluralize({
          singular: 'issue',
          plural: 'issues',
          empty: 'No issues',
          count: issues.length,
        })}
      </Text>
      <ScrollView style={styles.issuesContainer}>
        {isLoading && <ActivityIndicator size="large" />}
        {!isLoading &&
          issues.length > 0 &&
          issues.map(issue => (
            <View key={issue.id}>
              <Text
                onPress={() => onSelectIssue(issue)}
                style={[
                  styles.issueTitle,
                  {
                    color: isDarkMode ? Colors.white : Colors.black,
                  },
                ]}>
                {issue.title}
              </Text>
            </View>
          ))}
      </ScrollView>
    </Section>
  );
};

export default IssuesList;
