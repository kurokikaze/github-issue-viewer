import {combineReducers} from 'redux';
import issuesReducer from './issues';
import reposReducer from './repos';
import configurationReducer from './configuration';
import bookmarksReducer from './bookmarks';
import organizationsReducer from './organizations';
import commentsReducer from './comments';

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
