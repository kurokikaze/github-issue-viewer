import React, {useCallback, useContext} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GithubIssueResponse, RootStackParamList} from '../../types';
import styles from '../../styles';
import {ThemeContext} from '../../components/ThemeContext/ThemeContext';
import BookmarksList from '../../components/BookmarksList/BookmarksList';
import {useDispatch} from 'react-redux';
import {removeBookmark} from '../../actions';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'IssuesBrowser'>;

const IssuesBrowserScreen = ({navigation}: ScreenProps) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const handleSelectIssue = useCallback(
    (issue: GithubIssueResponse) => {
      navigation.navigate('IssueViewer', {issueId: issue.id, isBookmark: true});
    },
    [navigation],
  );

  const handleRemoveBookmark = useCallback(
    issueId => {
      dispatch(removeBookmark(issueId));
    },
    [dispatch],
  );

  return (
    <SafeAreaView style={[theme.containerStyle, styles.screenStyle]}>
      <StatusBar barStyle={theme.barStyle} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={theme.containerStyle}>
        <View>
          <BookmarksList
            onSelectIssue={handleSelectIssue}
            onRemoveBookmark={handleRemoveBookmark}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IssuesBrowserScreen;
