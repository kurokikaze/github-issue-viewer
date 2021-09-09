import {
  Action,
  FETCH_COMMENTS_FAILURE,
  FETCH_COMMENTS_INIT,
  FETCH_COMMENTS_SUCCESS,
} from '../actions';

import {GithubCommentsResponse, PaginationLinksType} from '../types';

type IssuesShape = {
  username: string;
  repo: string;
  issueNumber: number;
  list: GithubCommentsResponse;
  pagination: PaginationLinksType;
  currentPage: number;
  loading: boolean;
};

export const initialState = {
  list: [],
  username: '',
  repo: '',
  issueNumber: 1,
  pagination: {
    first: null,
    prev: null,
    next: null,
    last: null,
  },
  currentPage: 1,
  loading: false,
};

function issuesReducer(
  state: IssuesShape = initialState,
  action: Action,
): IssuesShape {
  switch (action.type) {
    case FETCH_COMMENTS_INIT:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        username: action.username,
        repo: action.repo,
        list: action.comments,
        pagination: action.pagination,
        currentPage: action.page,
        loading: false,
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default issuesReducer;
