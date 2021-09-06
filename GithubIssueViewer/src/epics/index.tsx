import {ofType, combineEpics, StateObservable} from 'redux-observable';
import {mergeMap, map, Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {
  Action,
  fetchIssuesInit,
  fetchReposInit,
  FETCH_ISSUES_INIT,
  FETCH_ISSUES_PAGE,
  FETCH_REPOS_INIT,
  FETCH_USER_INIT,
  SEARCH_USERS_STREAM,
} from '../actions';
import {
  fetchGithubIssues,
  fetchGithubRepos,
  fetchGithubUser,
} from '../library/github';
import {RootState} from '../reducers';
import {getIssuesUsername, getIssuesRepo} from '../selectors';

const USERS_SEARCH_DEBOUNCE = 600;

export const fetchUserEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_USER_INIT>(FETCH_USER_INIT),
    mergeMap(action => fetchGithubUser(action.user)),
  );

export const fetchReposEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_REPOS_INIT>(FETCH_REPOS_INIT),
    mergeMap(action => fetchGithubRepos(action.user)),
  );

export const fetchIssuesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_ISSUES_INIT>(FETCH_ISSUES_INIT),
    mergeMap(action =>
      fetchGithubIssues(action.user, action.repo, action.page),
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
      ),
    ),
  );

export const streamToFetches = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof SEARCH_USERS_STREAM>(SEARCH_USERS_STREAM),
    map(action => fetchReposInit(action.text)),
    debounceTime(USERS_SEARCH_DEBOUNCE),
  );

const rootEpic = combineEpics(
  fetchReposEpic,
  streamToFetches,
  fetchIssuesEpic,
  pagingIssuesEpic,
);

export default rootEpic;
