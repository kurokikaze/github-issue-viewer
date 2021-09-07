import {combineReducers} from 'redux';
import issuesReducer from './issues';
import reposReducer from './repos';
import configurationReducer from './configuration';
import bookmarksReducer from './bookmarks';

const rootReducer = combineReducers({
  repos: reposReducer,
  issues: issuesReducer,
  configuration: configurationReducer,
  bookmarks: bookmarksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
