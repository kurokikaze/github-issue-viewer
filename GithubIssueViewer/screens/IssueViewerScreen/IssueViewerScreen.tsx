import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'IssueViewer'>;

const IssueViewerScreen = ({route}: ScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const chosenIssue = route.params.issueId;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <Text>View issue {chosenIssue}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IssueViewerScreen;
