import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {IssueViewer} from '../../components/IssueViewer/IssueViewer';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'IssueViewer'>;

const IssueViewerScreen = ({route}: ScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const issueId = route.params.issueId;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <IssueViewer issueId={issueId} />
    </SafeAreaView>
  );
};

export default IssueViewerScreen;
