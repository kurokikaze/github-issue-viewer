import {ofType, combineEpics, StateObservable} from 'redux-observable';
import {mergeMap, map, Observable} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';
import {
  Action,
  APPLICATION_START,
  bookmarkIssueSuccess,
  BOOKMARK_ISSUE_INIT,
  CHANGE_ISSUES_FILTER,
  fetchIssuesInit,
  fetchReposInit,
  FETCH_ISSUES_INIT,
  FETCH_ISSUES_PAGE,
  FETCH_ISSUES_SUCCESS,
  FETCH_ORGANIZATIONS_INIT,
  FETCH_REPOS_INIT,
  FETCH_REPOS_PAGE,
  FETCH_USER_INIT,
  loadOrganizationInit,
  LOAD_ORGANIZATION_INIT,
  SEARCH_USERS_STREAM,
  fetchOrganizationsInit,
  SELECT_ORGANIZATION,
} from '../actions';
import {
  fetchGithubIssues,
  fetchGithubOrgs,
  fetchGithubRepos,
  fetchGithubUser,
  loadOrganization,
} from './libraryBindings';
import {RootState} from '../reducers';
import {
  getIssuesUsername,
  getIssuesRepo,
  getIssuesFilter,
  getIssuesPage,
  getIssueById,
  getOrgsUsername,
  getReposOrganization,
} from '../selectors';

const USERS_SEARCH_DEBOUNCE = 600;

export const fetchUserEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_USER_INIT>(FETCH_USER_INIT),
    mergeMap(action => fetchGithubUser(action.user)),
  );

// Issues

export const fetchIssuesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_ISSUES_INIT>(FETCH_ISSUES_INIT),
    mergeMap(action =>
      fetchGithubIssues(action.user, action.repo, action.page, action.filter),
    ),
  );

export const pagingIssuesEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType<Action, typeof FETCH_ISSUES_PAGE>(FETCH_ISSUES_PAGE),
    map(action =>
      fetchIssuesInit(
        getIssuesUsername(state$.value),
        getIssuesRepo(state$.value),
        action.page,
        getIssuesFilter(state$.value),
      ),
    ),
  );

export const filteringIssuesEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType<Action, typeof CHANGE_ISSUES_FILTER>(CHANGE_ISSUES_FILTER),
    map(action =>
      fetchIssuesInit(
        getIssuesUsername(state$.value),
        getIssuesRepo(state$.value),
        getIssuesPage(state$.value),
        action.filter,
      ),
    ),
  );

// Organizations

export const fetchOrganizationsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_ORGANIZATIONS_INIT>(FETCH_ORGANIZATIONS_INIT),
    mergeMap(action => fetchGithubOrgs(action.user, action.page)),
  );

export const pagingOrganizationsEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType<Action, typeof FETCH_ISSUES_PAGE>(FETCH_ISSUES_PAGE),
    map(action =>
      fetchOrganizationsInit(getOrgsUsername(state$.value), action.page),
    ),
  );

export const selectOrganizationEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof SELECT_ORGANIZATION>(SELECT_ORGANIZATION),
    map(action => fetchReposInit(action.org.login, 1)),
  );

// Repos

export const fetchReposEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_REPOS_INIT>(FETCH_REPOS_INIT),
    mergeMap(action => fetchGithubRepos(action.user, action.page)),
  );

export const pagingReposEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType<Action, typeof FETCH_REPOS_PAGE>(FETCH_REPOS_PAGE),
    map(action =>
      fetchReposInit(getReposOrganization(state$.value), action.page),
    ),
  );

export const streamToFetches = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof SEARCH_USERS_STREAM>(SEARCH_USERS_STREAM),
    map(action => fetchOrganizationsInit(action.text)),
    debounceTime(USERS_SEARCH_DEBOUNCE),
  );

// Sometimes there will be situation when we'll get empty issues result
// For example, going to the last page of many-issues repository and switching filter to "open"
// In this case, we have to request the new last page of issues
export const getIssuesLastPageIfEmpty = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType<Action, typeof FETCH_ISSUES_SUCCESS>(FETCH_ISSUES_SUCCESS),
    filter(action => action.issues.length === 0 && action.page !== 1),
    map(action =>
      fetchIssuesInit(
        getIssuesUsername(state$.value),
        getIssuesRepo(state$.value),
        action.pagination.last || 1, // In case something went wrong and we did not receive pagination data
        getIssuesFilter(state$.value),
      ),
    ),
  );

export const loadOrganizationEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof LOAD_ORGANIZATION_INIT>(LOAD_ORGANIZATION_INIT),
    mergeMap(() => loadOrganization()),
  );

export const loadOrganizationOnAppStart = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof APPLICATION_START>(APPLICATION_START),
    map(() => loadOrganizationInit()),
  );

export const bookmarkWithIssue = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType<Action, typeof BOOKMARK_ISSUE_INIT>(BOOKMARK_ISSUE_INIT),
    map(action =>
      bookmarkIssueSuccess(
        action.issue,
        getIssueById(action.issue.issue)(state$.value) || null,
      ),
    ),
  );

const rootEpic = combineEpics(
  fetchReposEpic,
  streamToFetches,
  fetchIssuesEpic,
  pagingIssuesEpic,
  filteringIssuesEpic,
  pagingReposEpic,
  fetchOrganizationsEpic,
  pagingOrganizationsEpic,
  getIssuesLastPageIfEmpty,
  loadOrganizationEpic,
  bookmarkWithIssue,
  selectOrganizationEpic,
);

export default rootEpic;
