import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import styles from '../../styles';
import IssueViewer from '../../components/IssueViewer/IssueViewer';
import {ThemeContext} from '../../components/ThemeContext/ThemeContext';
import Header from '../../components/Header/Header';
import CommentsList from '../../components/CommentsList/CommentsList';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'IssueViewer'>;

const IssueViewerScreen = ({route}: ScreenProps) => {
  const theme = useContext(ThemeContext);

  const issueId = route.params.issueId;
  const isBookmark = route.params.isBookmark;

  return (
    <SafeAreaView style={[theme.containerStyle, styles.screenStyle]}>
      <StatusBar barStyle={theme.barStyle} />
      <Header />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={theme.containerStyle}>
        <IssueViewer issueId={issueId} isBookmark={isBookmark} />
        <CommentsList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default IssueViewerScreen;
