import {Observable} from 'rxjs';
import {
  Action,
  fetchIssuesSuccess,
  fetchIssuesFailure,
  fetchUserSuccess,
  fetchUserFailure,
  fetchReposFailure,
  fetchReposSuccess,
  loadOrganizationSuccess,
} from '../actions';
import {fetchIssues, fetchUser, fetchRepos} from '../library/github';
import {retrieveOrganization} from '../library/storage';
import {FilterType, FILTER_OPEN} from '../components/IssuesFilter/IssuesFilter';

export const fetchGithubIssues = (
  username: string,
  repo: string,
  page: number = 1,
  filter: FilterType = FILTER_OPEN,
): Observable<Action> =>
  new Observable(observer => {
    fetchIssues(username, repo, page, filter)
      .then(response => {
        if (
          response !== null &&
          'result' in response &&
          response.result instanceof Array
        ) {
          observer.next(
            fetchIssuesSuccess(
              username,
              repo,
              response.result,
              response.pagination,
              page,
            ),
          );
        } else {
          observer.next(fetchIssuesFailure('Not Found'));
        }
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
        observer.complete();
      });
  });

export const fetchGithubUser = (username: string): Observable<Action> =>
  new Observable(observer => {
    fetchUser(username)
      .then(result => {
        if ('login' in result) {
          observer.next(fetchUserSuccess(result));
        } else {
          observer.next(fetchUserFailure('User not found'));
        }
        observer.complete();
      })
      .catch(err => {
        observer.next(fetchUserFailure(err));
        observer.complete();
      });
  });

export const fetchGithubRepos = (
  username: string,
  page: number = 1,
): Observable<Action> =>
  new Observable(observer => {
    fetchRepos(username, page)
      .then(response => {
        if (response && 'result' in response) {
          observer.next(
            fetchReposSuccess(
              username,
              response.result,
              response.pagination,
              page,
            ),
          );
        } else {
          observer.next(fetchReposFailure('Not Found'));
        }
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
        observer.complete();
      });
  });

export const loadOrganization = (): Observable<Action> =>
  new Observable(observer => {
    retrieveOrganization()
      .then(organization => {
        if (organization !== null) {
          observer.next(loadOrganizationSuccess(organization));
        }
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
        observer.complete();
      });
  });
