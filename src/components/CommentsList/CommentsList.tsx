import React, {useContext} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchCommentsPage, fetchIssuesPage} from '../../actions';
import {
  getComments,
  getCommentsLoading,
  getCommentsPage,
  getCommentsPagination,
} from '../../selectors';
import {ThemeContext} from '../ThemeContext/ThemeContext';
import {Pagination} from '../Pagination/Pagination';
import {isPaginationUsable} from '../../utils';
import Comment from '../Comment/Comment';
import styles from './styles';

const CommentsList = () => {
  const comments = useSelector(getComments);
  const pagination = useSelector(getCommentsPagination);
  const page = useSelector(getCommentsPage);
  const isLoading = useSelector(getCommentsLoading);

  const dispatch = useDispatch();

  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.baseContainer]}>
      {isPaginationUsable(pagination) ? (
        <Pagination
          links={pagination}
          page={page}
          loading={isLoading}
          onPageChange={newPage => dispatch(fetchIssuesPage(newPage))}
        />
      ) : null}
      <View style={styles.indicatorContainer}>
        <ScrollView style={styles.commentsContainer}>
          {comments.length > 0 &&
            comments.map((comment, id) => (
              <Comment
                key={comment.id}
                comment={comment}
                style={
                  id % 2
                    ? theme.containerStyle
                    : theme.alternativeContainerStyle
                }
              />
            ))}
          {comments.length === 0 && (
            <View>
              <Text style={[theme.textStyle, styles.commentsCount]}>
                No comments here
              </Text>
            </View>
          )}
        </ScrollView>
        {isLoading && (
          <ActivityIndicator style={styles.overlayIndicator} size={200} />
        )}
      </View>
      {isPaginationUsable(pagination) ? (
        <Pagination
          links={pagination}
          page={page}
          loading={isLoading}
          onPageChange={newPage =>
            !isLoading && dispatch(fetchCommentsPage(newPage))
          }
        />
      ) : null}
    </View>
  );
};

export default CommentsList;
