import {FilterType, FILTER_ALL} from '../components/IssuesFilter/IssuesFilter';
import {
  BookmarkType,
  GithubIssueResponse,
  GithubIssuesResponse,
  GithubOrganizationResponse,
  GithubOrganizationsResponse,
  GithubReposResponse,
  GithubUserResponse,
  PaginationLinksType,
} from '../types';

export const APPLICATION_START = 'actions/appication_start';

export const SEARCH_USERS_STREAM = 'streams/search_user';

export const SELECT_ORGANIZATION = 'actions/select_organization';

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
export const CHANGE_ISSUES_FILTER = 'actions/change_issues_filter';

export const FETCH_SINGLE_ISSUE_INIT = 'actions/fetch_single_issue_init';
export const FETCH_SINGLE_ISSUE_SUCCESS = 'actions/fetch_single_issue_success';
export const FETCH_SINGLE_ISSUE_FAILURE = 'actions/fetch_single_issue_failure';

export const FETCH_ORGANIZATIONS_INIT = 'actions/fetch_organizations_init';
export const FETCH_ORGANIZATIONS_SUCCESS =
  'actions/fetch_organizations_success';
export const FETCH_ORGANIZATIONS_FAILURE =
  'actions/fetch_organizations_failure';
export const FETCH_ORGANIZATIONS_PAGE = 'actions/fetch_organizations_page';

// Loading from storage
export const LOAD_ORGANIZATION_INIT = 'actions/load_organization_init';
export const LOAD_ORGANIZATION_SUCCESS = 'actions/load_organization_success';

export const LOAD_BOOKMARKS_INIT = 'actions/load_bookmarks_init';
export const LOAD_BOOKMARKS_SUCCESS = 'actions/load_bookmarks_success';

export const BOOKMARK_ISSUE_INIT = 'actions/bookmark_issue_init';
export const BOOKMARK_ISSUE_SUCCESS = 'actions/bookmark_issue_success';

export const REMOVE_BOOKMARK = 'actions/remove_bookmark';

type ApplicationStartAction = {
  type: typeof APPLICATION_START;
};

export const applicationStart = (): ApplicationStartAction => ({
  type: APPLICATION_START,
});

interface FailureAction {
  err: string;
}

type SelectOrganizationAction = {
  type: typeof SELECT_ORGANIZATION;
  org: GithubOrganizationResponse;
};

export const selectOrganization = (
  org: GithubOrganizationResponse,
): SelectOrganizationAction => ({
  type: SELECT_ORGANIZATION,
  org,
});

/* Fetching organizations */

export type FetchOrganizationsInitAction = {
  type: typeof FETCH_ORGANIZATIONS_INIT;
  user: string;
  page: number;
};

export const fetchOrganizationsInit = (
  user: string,
  page: number = 1,
): FetchOrganizationsInitAction => ({
  type: FETCH_ORGANIZATIONS_INIT,
  user,
  page,
});

export type FetchOrganizationsPageAction = {
  type: typeof FETCH_ORGANIZATIONS_PAGE;
  page: number;
};

export const fetchOrganizationsPage = (
  page: number,
): FetchOrganizationsPageAction => ({
  type: FETCH_ORGANIZATIONS_PAGE,
  page,
});

type FetchOrganizationsSuccessAction = {
  type: typeof FETCH_ORGANIZATIONS_SUCCESS;
  username: string;
  orgs: GithubOrganizationsResponse;
  pagination: PaginationLinksType;
  page: number;
};

export const fetchOrganizationsSuccess = (
  username: string,
  orgs: GithubOrganizationsResponse,
  pagination: PaginationLinksType,
  page: number,
): FetchOrganizationsSuccessAction => ({
  type: FETCH_ORGANIZATIONS_SUCCESS,
  username,
  orgs,
  pagination,
  page,
});

type FetchOrganizationsFailureAction = FailureAction & {
  type: typeof FETCH_ORGANIZATIONS_FAILURE;
};

export const fetchOrganizationsFailure = (
  err: string,
): FetchOrganizationsFailureAction => ({
  type: FETCH_ORGANIZATIONS_FAILURE,
  err,
});

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
  organization: string;
  repos: GithubReposResponse;
  pagination: PaginationLinksType;
  page: number;
};

export const fetchReposSuccess = (
  organization: string,
  repos: GithubReposResponse,
  pagination: PaginationLinksType,
  page: number,
): FetchReposSuccessAction => ({
  type: FETCH_REPOS_SUCCESS,
  organization,
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
  filter: FilterType;
};

export const fetchIssuesInit = (
  user: string,
  repo: string,
  page: number = 1,
  filter: FilterType = FILTER_ALL,
): FetchIssuesInitAction => ({
  type: FETCH_ISSUES_INIT,
  user,
  repo,
  page,
  filter,
});

export type FetchIssuesPageAction = {
  type: typeof FETCH_ISSUES_PAGE;
  page: number;
};

export const fetchIssuesPage = (page: number): FetchIssuesPageAction => ({
  type: FETCH_ISSUES_PAGE,
  page,
});

export type ChangeIssuesFilter = {
  type: typeof CHANGE_ISSUES_FILTER;
  filter: FilterType;
};

export const changeIssuesFilter = (filter: FilterType): ChangeIssuesFilter => ({
  type: CHANGE_ISSUES_FILTER,
  filter,
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

// Storage actions

type LoadOrganizationInitAction = {
  type: typeof LOAD_ORGANIZATION_INIT;
};

export const loadOrganizationInit = (): LoadOrganizationInitAction => ({
  type: LOAD_ORGANIZATION_INIT,
});

type LoadOrganizationSuccessAction = {
  type: typeof LOAD_ORGANIZATION_SUCCESS;
  organization: string;
};

export const loadOrganizationSuccess = (
  organization: string,
): LoadOrganizationSuccessAction => ({
  type: LOAD_ORGANIZATION_SUCCESS,
  organization,
});

type LoadBookmarksInitAction = {
  type: typeof LOAD_BOOKMARKS_INIT;
};

export const loadBookmarksInit = (): LoadBookmarksInitAction => ({
  type: LOAD_BOOKMARKS_INIT,
});

type BookmarkIssueInitAction = {
  type: typeof BOOKMARK_ISSUE_INIT;
  issue: BookmarkType;
};

export const bookmarkIssue = (
  issue: BookmarkType,
): BookmarkIssueInitAction => ({
  type: BOOKMARK_ISSUE_INIT,
  issue,
});

type BookmarkIssueSuccessAction = {
  type: typeof BOOKMARK_ISSUE_SUCCESS;
  bookmark: BookmarkType;
  issue: GithubIssueResponse | null;
};

export const bookmarkIssueSuccess = (
  bookmark: BookmarkType,
  issue: GithubIssueResponse | null,
): BookmarkIssueSuccessAction => ({
  type: BOOKMARK_ISSUE_SUCCESS,
  bookmark,
  issue,
});

type RemoveBookmarkAction = {
  type: typeof REMOVE_BOOKMARK;
  issueId: number;
};

export const removeBookmark = (issueId: number): RemoveBookmarkAction => ({
  type: REMOVE_BOOKMARK,
  issueId,
});

export type Action =
  | SearchUserStreamAction
  | SelectOrganizationAction
  | FetchReposInitAction
  | FetchReposSuccessAction
  | FetchReposFailureAction
  | FetchReposPageAction
  | FetchUserInitAction
  | FetchUserSuccessAction
  | FetchUserFailureAction
  | FetchIssuesInitAction
  | FetchIssuesSuccessAction
  | FetchIssuesFailureAction
  | FetchIssuesPageAction
  | FetchOrganizationsInitAction
  | FetchOrganizationsSuccessAction
  | FetchOrganizationsFailureAction
  | FetchOrganizationsPageAction
  | ChangeIssuesFilter
  | LoadOrganizationInitAction
  | LoadOrganizationSuccessAction
  | LoadBookmarksInitAction
  | ApplicationStartAction
  | BookmarkIssueInitAction
  | BookmarkIssueSuccessAction
  | RemoveBookmarkAction;
