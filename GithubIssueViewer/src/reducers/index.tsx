import {combineReducers} from 'redux';
import issuesReducer from './issues';
import reposReducer from './repos';

const rootReducer = combineReducers({
  repos: reposReducer,
  issues: issuesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
