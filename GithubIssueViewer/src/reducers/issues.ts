import {
  Action,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_INIT,
  FETCH_ISSUES_SUCCESS,
} from '../actions';
import {GithubIssuesResponse, PaginationLinksType} from '../types';

type IssuesShape = {
  username: string;
  repo: string;
  list: GithubIssuesResponse;
  pagination: PaginationLinksType;
  currentPage: number;
  loading: boolean;
};

const initialState = {
  list: [],
  username: '',
  repo: '',
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
  if ('pagination' in action) {
    console.dir(action.pagination);
  }
  switch (action.type) {
    case FETCH_ISSUES_INIT:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        username: action.username,
        repo: action.repo,
        list: action.issues,
        pagination: action.pagination,
        currentPage: action.page,
        loading: false,
      };
    case FETCH_ISSUES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default issuesReducer;
