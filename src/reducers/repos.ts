import {
  Action,
  FETCH_REPOS_FAILURE,
  FETCH_REPOS_INIT,
  FETCH_REPOS_SUCCESS,
  SEARCH_USERS_STREAM,
  SELECT_ORGANIZATION,
} from '../actions';
import {GithubReposResponse, PaginationLinksType} from '../types';

export type ReposShape = {
  organization: string;
  list: GithubReposResponse;
  loading: boolean;
  pagination: PaginationLinksType;
  currentPage: number;
};

export const initialState = {
  organization: '',
  list: [],
  pagination: {
    first: null,
    prev: null,
    next: null,
    last: null,
  },
  currentPage: 1,
  loading: false,
};

function reposReducer(
  state: ReposShape = initialState,
  action: Action,
): ReposShape {
  switch (action.type) {
    case SEARCH_USERS_STREAM:
      return initialState;
    case SELECT_ORGANIZATION:
      return {
        ...state,
        organization: action.org.login,
      };
    case FETCH_REPOS_INIT:
      return {
        ...state,
        list: [],
        loading: true,
      };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        organization: action.organization,
        list: action.repos,
        pagination: action.pagination,
        currentPage: action.page,
      };
    case FETCH_REPOS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default reposReducer;
