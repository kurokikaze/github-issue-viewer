import {
  GithubIssuesResponse,
  GithubReposResponse,
  GithubUserResponse,
  PaginationLinksType,
} from '../types';

export const SEARCH_USERS_STREAM = 'streams/search_user';

export const FETCH_REPOS_INIT = 'actions/fetch_repos_init';
export const FETCH_REPOS_SUCCESS = 'actions/fetch_repos_success';
export const FETCH_REPOS_FAILURE = 'actions/fetch_repos_failure';
export const FETCH_REPOS_PAGE = 'actions/fetch_repos_page';

export const FETCH_USER_INIT = 'actions/fetch_user_init';
export const FETCH_USER_SUCCESS = 'actions/fetch_user_success';
export const FETCH_USER_FAILURE = 'actions/fetch_user_failure';

export const FETCH_ISSUES_INIT = 'actions/fetch_issues_init';
export const FETCH_ISSUES_SUCCESS = 'actions/fetch_issues_success';
export const FETCH_ISSUES_FAILURE = 'actions/fetch_issues_failure';
export const FETCH_ISSUES_PAGE = 'actions/fetch_issues_page';

export const FETCH_SINGLE_ISSUE_INIT = 'actions/fetch_single_issue_init';
export const FETCH_SINGLE_ISSUE_SUCCESS = 'actions/fetch_single_issue_success';
export const FETCH_SINGLE_ISSUE_FAILURE = 'actions/fetch_single_issue_failure';

export const fetchRepos = (text: string) => ({type: FETCH_REPOS_INIT, text});

interface FailureAction {
  err: string;
}

/* Fetching repos */
export type FetchReposInitAction = {
  type: typeof FETCH_REPOS_INIT;
  user: string;
  page: number;
};

export const fetchReposInit = (
  user: string,
  page: number = 1,
): FetchReposInitAction => ({
  type: FETCH_REPOS_INIT,
  user,
  page,
});

export type FetchReposPageAction = {
  type: typeof FETCH_REPOS_PAGE;
  page: number;
};

export const fetchReposPage = (page: number): FetchReposPageAction => ({
  type: FETCH_REPOS_PAGE,
  page,
});

type FetchReposSuccessAction = {
  type: typeof FETCH_REPOS_SUCCESS;
  username: string;
  repos: GithubReposResponse;
  pagination: PaginationLinksType;
  page: number;
};

export const fetchReposSuccess = (
  username: string,
  repos: GithubReposResponse,
  pagination: PaginationLinksType,
  page: number,
): FetchReposSuccessAction => ({
  type: FETCH_REPOS_SUCCESS,
  username,
  repos,
  pagination,
  page,
});

type FetchReposFailureAction = FailureAction & {
  type: typeof FETCH_REPOS_FAILURE;
};

export const fetchReposFailure = (err: string): FetchReposFailureAction => ({
  type: FETCH_REPOS_FAILURE,
  err,
});

/* Fetching user */
export type FetchUserInitAction = {
  type: typeof FETCH_USER_INIT;
  user: string;
};

export type FetchUserSuccessAction = {
  type: typeof FETCH_USER_SUCCESS;
  user: GithubUserResponse;
};

export const fetchUserSuccess = (
  user: GithubUserResponse,
): FetchUserSuccessAction => ({type: FETCH_USER_SUCCESS, user});

type FetchUserFailureAction = FailureAction & {
  type: typeof FETCH_USER_FAILURE;
};

export const fetchUserFailure = (err: string): FetchUserFailureAction => ({
  type: FETCH_USER_FAILURE,
  err,
});

export type SearchUserStreamAction = {
  type: typeof SEARCH_USERS_STREAM;
  text: string;
};

export const searchUserStream = (text: string): SearchUserStreamAction => ({
  type: SEARCH_USERS_STREAM,
  text,
});

/* Fetching issues */
export type FetchIssuesInitAction = {
  type: typeof FETCH_ISSUES_INIT;
  user: string;
  repo: string;
  page: number;
};

export const fetchIssuesInit = (
  user: string,
  repo: string,
  page: number = 1,
): FetchIssuesInitAction => ({type: FETCH_ISSUES_INIT, user, repo, page});

export type FetchIssuesPageAction = {
  type: typeof FETCH_ISSUES_PAGE;
  page: number;
};

export const fetchIssuesPage = (page: number): FetchIssuesPageAction => ({
  type: FETCH_ISSUES_PAGE,
  page,
});

export type FetchIssuesSuccessAction = {
  type: typeof FETCH_ISSUES_SUCCESS;
  repo: string;
  username: string;
  issues: GithubIssuesResponse;
  pagination: PaginationLinksType;
  page: number;
};

export const fetchIssuesSuccess = (
  username: string,
  repo: string,
  issues: GithubIssuesResponse,
  pagination: PaginationLinksType,
  page: number,
): FetchIssuesSuccessAction => ({
  type: FETCH_ISSUES_SUCCESS,
  username,
  repo,
  issues,
  pagination,
  page,
});

type FetchIssuesFailureAction = FailureAction & {
  type: typeof FETCH_ISSUES_FAILURE;
};

export const fetchIssuesFailure = (err: string): FetchIssuesFailureAction => ({
  type: FETCH_ISSUES_FAILURE,
  err,
});

export type Action =
  | SearchUserStreamAction
  | FetchReposInitAction
  | FetchReposSuccessAction
  | FetchReposFailureAction
  | FetchUserInitAction
  | FetchUserSuccessAction
  | FetchUserFailureAction
  | FetchIssuesInitAction
  | FetchIssuesSuccessAction
  | FetchIssuesFailureAction
  | FetchIssuesPageAction;
