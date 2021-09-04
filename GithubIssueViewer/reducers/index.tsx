import {
  Action,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_SUCCESS,
  FETCH_REPOS_FAILURE,
  FETCH_REPOS_INIT,
  FETCH_REPOS_SUCCESS,
} from '../actions';
import {GithubIssuesResponse, GithubReposResponse} from '../types';

export type StateShape = {
  repos: GithubReposResponse;
  issues: GithubIssuesResponse;
  loading: boolean;
};

const initialState = {
  repos: [],
  issues: [],
  loading: false,
};

const reducer = (
  state: StateShape = initialState,
  action: Action,
): StateShape => {
  switch (action.type) {
    case FETCH_REPOS_INIT:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        repos: action.repos,
      };
    case FETCH_REPOS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case FETCH_ISSUES_SUCCESS:
      console.log(JSON.stringify(action.issues, null, 2));
      return {
        ...state,
        issues: action.issues,
        loading: false,
      };
    case FETCH_ISSUES_FAILURE:
      console.log('Issues fetch fail');
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
