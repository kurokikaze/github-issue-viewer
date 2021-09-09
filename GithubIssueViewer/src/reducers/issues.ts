import {
  Action,
  CHANGE_ISSUES_FILTER,
  CHANGE_ISSUES_SORTER,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUES_INIT,
  FETCH_ISSUES_SUCCESS,
} from '../actions';
import {FilterType, FILTER_ALL} from '../components/IssuesFilter/IssuesFilter';
import {
  SortingDirectionType,
  SortingFieldType,
  SortingType,
  SORT_DIRECTION_ASC,
  SORT_NONE,
} from '../components/IssuesSorter/IssuesSorter';
import {GithubIssuesResponse, PaginationLinksType} from '../types';

type IssuesShape = {
  username: string;
  repo: string;
  list: GithubIssuesResponse;
  pagination: PaginationLinksType;
  currentPage: number;
  loading: boolean;
  filter: FilterType;
  sorting: SortingType;
};

export const initialState = {
  list: [],
  username: '',
  repo: '',
  filter: FILTER_ALL as FilterType,
  sorting: {
    field: SORT_NONE as SortingFieldType,
    direction: SORT_DIRECTION_ASC as SortingDirectionType,
  } as SortingType,
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
    case CHANGE_ISSUES_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case CHANGE_ISSUES_SORTER:
      return {
        ...state,
        sorting: action.sorter,
      };
    default:
      return state;
  }
}

export default issuesReducer;
