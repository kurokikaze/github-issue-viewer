import React, {useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import IssuesList from '../../components/IssuesList/IssuesList';
import {GithubIssueResponse, RootStackParamList} from '../../types';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'IssuesBrowser'>;

const IssuesBrowserScreen = ({navigation}: ScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleSelectIssue = useCallback(
    (issue: GithubIssueResponse) => {
      navigation.navigate('IssueViewer', {issueId: issue.id});
    },
    [navigation],
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <IssuesList onSelectIssue={handleSelectIssue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IssuesBrowserScreen;
