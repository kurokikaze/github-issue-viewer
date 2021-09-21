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
  FETCH_COMMENTS_INIT,
  loadOrganizationInit,
  LOAD_ORGANIZATION_INIT,
  SEARCH_USERS_STREAM,
  fetchOrganizationsInit,
  SELECT_ORGANIZATION,
  CHANGE_ISSUES_SORTER,
  fetchCommentsInit,
  FETCH_BOOKMARK_COMMENTS,
} from '../actions';
import {
  fetchGithubComments,
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
  getIssuesSorting,
  getCommentsIssueNumber,
  getBookmarkById,
  getBookmarkObjectById,
} from '../selectors';
import {BookmarkType, GithubIssueResponse} from '../types';

export const USERS_SEARCH_DEBOUNCE = 600;

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
      fetchGithubIssues(
        action.user,
        action.repo,
        action.page,
        action.filter,
        action.sorting,
      ),
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
        getIssuesSorting(state$.value),
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
        getIssuesSorting(state$.value),
      ),
    ),
  );

export const sortingIssuesEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType<Action, typeof CHANGE_ISSUES_SORTER>(CHANGE_ISSUES_SORTER),
    map(action =>
      fetchIssuesInit(
        getIssuesUsername(state$.value),
        getIssuesRepo(state$.value),
        getIssuesPage(state$.value),
        getIssuesFilter(state$.value),
        action.sorter,
      ),
    ),
  );

// Comments

export const fetchCommentsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_COMMENTS_INIT>(FETCH_COMMENTS_INIT),
    mergeMap(action =>
      fetchGithubComments(
        action.user,
        action.repo,
        action.issueNumber,
        action.page,
      ),
    ),
  );

export const pagingCommentsEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType<Action, typeof FETCH_ISSUES_PAGE>(FETCH_ISSUES_PAGE),
    map(action =>
      fetchCommentsInit(
        getIssuesUsername(state$.value),
        getIssuesRepo(state$.value),
        getCommentsIssueNumber(state$.value),
        action.page,
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
        getIssuesSorting(state$.value),
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

export const fetchBookmarksCommentsEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType<Action, typeof FETCH_BOOKMARK_COMMENTS>(FETCH_BOOKMARK_COMMENTS),
    filter(action => {
      const bookmark = getBookmarkObjectById(action.issueId)(state$.value);
      const issue = getBookmarkById(action.issueId)(state$.value);

      return Boolean(bookmark && issue);
    }),
    map(action => {
      // We have to cast the values here because we checked if the bookmark and the issue exist in the `filter` part
      const bookmark = getBookmarkObjectById(action.issueId)(
        state$.value,
      ) as BookmarkType;
      const issue = getBookmarkById(action.issueId)(
        state$.value,
      ) as GithubIssueResponse;

      return fetchCommentsInit(
        bookmark.username,
        bookmark.repo,
        issue.number,
        1,
      );
    }),
  );

const rootEpic = combineEpics(
  fetchReposEpic,
  streamToFetches,
  fetchIssuesEpic,
  pagingIssuesEpic,
  filteringIssuesEpic,
  sortingIssuesEpic,
  fetchCommentsEpic,
  pagingCommentsEpic,
  pagingReposEpic,
  fetchOrganizationsEpic,
  pagingOrganizationsEpic,
  getIssuesLastPageIfEmpty,
  loadOrganizationEpic,
  bookmarkWithIssue,
  selectOrganizationEpic,
  fetchBookmarksCommentsEpic,
);

export default rootEpic;
