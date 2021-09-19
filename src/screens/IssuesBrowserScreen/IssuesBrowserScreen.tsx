import React, {useCallback, useContext} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import IssuesList from '../../components/IssuesList/IssuesList';
import {GithubIssueResponse, RootStackParamList} from '../../types';
import styles from '../../styles';
import {ThemeContext} from '../../components/ThemeContext/ThemeContext';
import {getIssuesRepo, getIssuesUsername} from '../../selectors';
import {bookmarkIssue, fetchCommentsInit, removeBookmark} from '../../actions';
import Header from '../../components/Header/Header';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'IssuesBrowser'>;

const IssuesBrowserScreen = ({navigation}: ScreenProps) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const username = useSelector(getIssuesUsername);
  const repo = useSelector(getIssuesRepo);

  const handleSelectIssue = useCallback(
    (issue: GithubIssueResponse) => {
      dispatch(fetchCommentsInit(username, repo, issue.number, 1));
      navigation.navigate('IssueViewer', {
        issueId: issue.id,
        isBookmark: false,
      });
    },
    [dispatch, navigation, username, repo],
  );

  const handleRemoveBookmark = useCallback(
    issueId => {
      dispatch(removeBookmark(issueId));
    },
    [dispatch],
  );

  const handleBookmarkIssue = useCallback(
    (issue: GithubIssueResponse) => {
      const bookmark = {
        issue: issue.id,
        username,
        repo,
      };
      dispatch(bookmarkIssue(bookmark));
    },
    [username, repo, dispatch],
  );

  return (
    <SafeAreaView style={[theme.containerStyle, styles.screenStyle]}>
      <StatusBar barStyle={theme.barStyle} />
      <Header />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={theme.containerStyle}>
        <View>
          <IssuesList
            onSelectIssue={handleSelectIssue}
            onBookmarkIssue={handleBookmarkIssue}
            onRemoveBookmark={handleRemoveBookmark}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IssuesBrowserScreen;
