import {
  GithubIssuesResponse,
  GithubReposResponse,
  GithubUserResponse,
} from '../types';

export const SEARCH_USERS_STREAM = 'streams/search_user';

export const FETCH_REPOS_INIT = 'actions/fetch_repos_init';
export const FETCH_REPOS_SUCCESS = 'actions/fetch_repos_success';
export const FETCH_REPOS_FAILURE = 'actions/fetch_repos_failure';

export const FETCH_USER_INIT = 'actions/fetch_user_init';
export const FETCH_USER_SUCCESS = 'actions/fetch_user_success';
export const FETCH_USER_FAILURE = 'actions/fetch_user_failure';

export const FETCH_ISSUES_INIT = 'actions/fetch_issues_init';
export const FETCH_ISSUES_SUCCESS = 'actions/fetch_issues_success';
export const FETCH_ISSUES_FAILURE = 'actions/fetch_issues_failure';

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
};

export const fetchReposInit = (user: string): FetchReposInitAction => ({
  type: FETCH_REPOS_INIT,
  user,
});

type FetchReposSuccessAction = {
  type: typeof FETCH_REPOS_SUCCESS;
  repos: GithubReposResponse;
};

export const fetchReposSuccess = (
  repos: GithubReposResponse,
): FetchReposSuccessAction => ({
  type: FETCH_REPOS_SUCCESS,
  repos,
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

/* Fetching issues */
export type FetchIssuesInitAction = {
  type: typeof FETCH_ISSUES_INIT;
  user: string;
  repo: string;
};

export const fetchIssuesInit = (
  user: string,
  repo: string,
): FetchIssuesInitAction => ({type: FETCH_ISSUES_INIT, user, repo});

export type FetchIssuesSuccessAction = {
  type: typeof FETCH_ISSUES_SUCCESS;
  issues: GithubIssuesResponse;
};

export const fetchIssuesSuccess = (
  issues: GithubIssuesResponse,
): FetchIssuesSuccessAction => ({type: FETCH_ISSUES_SUCCESS, issues});

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
  | FetchIssuesFailureAction;
