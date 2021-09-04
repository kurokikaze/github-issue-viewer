import {ofType, combineEpics} from 'redux-observable';
import {mergeMap, map, Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {
  Action,
  FetchReposInitAction,
  FetchUserInitAction,
  FETCH_ISSUES_INIT,
  FETCH_REPOS_INIT,
  FETCH_USER_INIT,
  SearchUserStreamAction,
  SEARCH_USERS_STREAM,
} from '../actions';
import {
  fetchGithubIssues,
  fetchGithubRepos,
  fetchGithubUser,
} from '../library/github';

const USERS_SEARCH_DEBOUNCE = 600;

export const fetchUserEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(FETCH_USER_INIT),
    mergeMap(action => fetchGithubUser((action as FetchUserInitAction).user)),
  );

export const fetchReposEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(FETCH_REPOS_INIT),
    mergeMap(action => fetchGithubRepos((action as FetchReposInitAction).user)),
  );

export const fetchIssuesEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType<Action, typeof FETCH_ISSUES_INIT>(FETCH_ISSUES_INIT),
    mergeMap(action => fetchGithubIssues(action.user, action.repo)),
  );

export const streamToFetches = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(SEARCH_USERS_STREAM),
    map(
      (action): FetchReposInitAction => ({
        type: FETCH_REPOS_INIT,
        user: (action as SearchUserStreamAction).text,
      }),
    ),
    debounceTime(USERS_SEARCH_DEBOUNCE),
  );

const rootEpic = combineEpics(fetchReposEpic, streamToFetches, fetchIssuesEpic);

export default rootEpic;
