import {combineReducers} from 'redux';
import {initialState as issues, default as issuesReducer} from './issues';
import {initialState as repos, default as reposReducer} from './repos';
import {
  initialState as configuration,
  default as configurationReducer,
} from './configuration';
import {
  initialState as bookmarks,
  default as bookmarksReducer,
} from './bookmarks';
import {
  initialState as organizations,
  default as organizationsReducer,
} from './organizations';
import {initialState as comments, default as commentsReducer} from './comments';

const rootReducer = combineReducers({
  repos: reposReducer,
  issues: issuesReducer,
  configuration: configurationReducer,
  bookmarks: bookmarksReducer,
  organizations: organizationsReducer,
  comments: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export const initialState = {
  issues,
  repos,
  configuration,
  bookmarks,
  organizations,
  comments,
};
