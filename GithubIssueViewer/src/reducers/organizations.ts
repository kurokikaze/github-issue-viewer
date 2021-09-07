import {
  Action,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_INIT,
  FETCH_ORGANIZATIONS_SUCCESS,
  SEARCH_USERS_STREAM,
} from '../actions';
import {GithubOrganizationsResponse, PaginationLinksType} from '../types';

export type OrganizationsShape = {
  username: string;
  list: GithubOrganizationsResponse;
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
  state: OrganizationsShape = initialState,
  action: Action,
): OrganizationsShape {
  console.log(action.type);
  switch (action.type) {
    case SEARCH_USERS_STREAM:
      return initialState;
    case FETCH_ORGANIZATIONS_INIT:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        username: action.username,
        list: action.orgs,
        pagination: action.pagination,
        currentPage: action.page,
      };
    case FETCH_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default reposReducer;
