import React, {useCallback, useContext} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import IssuesList from '../../components/IssuesList/IssuesList';
import {GithubIssueResponse, RootStackParamList} from '../../types';
import styles from '../../styles';
import {ThemeContext} from '../../components/ThemeContext/ThemeContext';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'IssuesBrowser'>;

const IssuesBrowserScreen = ({navigation}: ScreenProps) => {
  const theme = useContext(ThemeContext);

  const handleSelectIssue = useCallback(
    (issue: GithubIssueResponse) => {
      navigation.navigate('IssueViewer', {issueId: issue.id});
    },
    [navigation],
  );

  return (
    <SafeAreaView style={[theme.containerStyle, styles.screenStyle]}>
      <StatusBar barStyle={theme.barStyle} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={theme.containerStyle}>
        <View>
          <IssuesList onSelectIssue={handleSelectIssue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IssuesBrowserScreen;
