import {ofType, combineEpics, StateObservable} from 'redux-observable';
import {mergeMap, map, Observable} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';
import {
  Action,
  CHANGE_ISSUES_FILTER,
  fetchIssuesInit,
  fetchReposInit,
  FETCH_ISSUES_INIT,
  FETCH_ISSUES_PAGE,
  FETCH_ISSUES_SUCCESS,
  FETCH_REPOS_INIT,
  FETCH_REPOS_PAGE,
  FETCH_USER_INIT,
  SEARCH_USERS_STREAM,
} from '../actions';
import {
  fetchGithubIssues,
  fetchGithubRepos,
  fetchGithubUser,
} from './libraryBindings';
import {RootState} from '../reducers';
import {
  getIssuesUsername,
  getIssuesRepo,
  getReposUsername,
  getIssuesFilter,
  getIssuesPage,
} from '../selectors';

const USERS_SEARCH_DEBOUNCE = 600;

export const fetchUserEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_USER_INIT>(FETCH_USER_INIT),
    mergeMap(action => fetchGithubUser(action.user)),
  );

export const fetchReposEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_REPOS_INIT>(FETCH_REPOS_INIT),
    mergeMap(action => fetchGithubRepos(action.user, action.page)),
  );

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

export const pagingReposEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    ofType<Action, typeof FETCH_REPOS_PAGE>(FETCH_REPOS_PAGE),
    map(action => fetchReposInit(getReposUsername(state$.value), action.page)),
  );

export const streamToFetches = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof SEARCH_USERS_STREAM>(SEARCH_USERS_STREAM),
    map(action => fetchReposInit(action.text)),
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
    filter(action => action.issues.length === 0),
    map(action =>
      fetchIssuesInit(
        getIssuesUsername(state$.value),
        getIssuesRepo(state$.value),
        action.pagination.last || 1, // In case something went wrong and we did not receive pagination data
        getIssuesFilter(state$.value),
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
  getIssuesLastPageIfEmpty,
);

export default rootEpic;
