import {
  Action,
  FETCH_REPOS_FAILURE,
  FETCH_REPOS_INIT,
  FETCH_REPOS_SUCCESS,
} from '../actions';
import {GithubReposResponse, PaginationLinksType} from '../types';

export type ReposShape = {
  username: string;
  list: GithubReposResponse;
  loading: boolean;
  pagination: PaginationLinksType;
  currentPage: number;
};

const initialState = {
  username: '',
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
    case FETCH_REPOS_INIT:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        username: action.username,
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
