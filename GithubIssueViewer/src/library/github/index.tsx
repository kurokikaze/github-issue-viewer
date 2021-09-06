import {Observable} from 'rxjs';
import {
  Action,
  fetchUserSuccess,
  fetchUserFailure,
  fetchReposSuccess,
  fetchReposFailure,
  fetchIssuesSuccess,
  fetchIssuesFailure,
} from '../../actions';
import {
  GithubIssuesResponse,
  GithubNotFoundResponse,
  GithubReposResponse,
  GithubUserResponse,
} from '../../types';
import {parsePagination} from './utils';

type UserResponse = GithubUserResponse | GithubNotFoundResponse;

export const fetchGithubUser = (username: string): Observable<Action> =>
  new Observable(observer => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then((result: UserResponse) => {
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

type ReposResponse = {
  result: GithubReposResponse | GithubNotFoundResponse;
  pagination: string;
};

export const fetchGithubRepos = (
  username: string,
  page: number = 1,
): Observable<Action> =>
  new Observable(observer => {
    fetch(`https://api.github.com/users/${username}/repos?page=${page}`)
      .then(async response => {
        return {
          result: await response.json(),
          pagination: response.headers.get('link') || '',
        };
      })
      .then(({result, pagination}: ReposResponse) => {
        if (result instanceof Array) {
          observer.next(
            fetchReposSuccess(username, result, parsePagination(pagination), page),
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

type IssuesResponse = {
  result: GithubIssuesResponse | GithubNotFoundResponse;
  pagination: string;
};

export const fetchGithubIssues = (
  username: string,
  repo: string,
  page: number = 1,
): Observable<Action> =>
  new Observable(observer => {
    fetch(
      `https://api.github.com/repos/${username}/${repo}/issues?page=${page}`,
    )
      .then(async response => ({
        result: await response.json(),
        pagination: response.headers.get('link') || '',
      }))
      .then(({result, pagination}: IssuesResponse) => {
        if (result instanceof Array) {
          observer.next(
            fetchIssuesSuccess(
              username,
              repo,
              result,
              parsePagination(pagination),
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
