import {Observable} from 'rxjs';
import {
  Action,
  fetchUserSuccess,
  fetchUserFailure,
  fetchReposSuccess,
  fetchReposFailure,
  fetchIssuesSuccess,
  fetchIssuesFailure,
} from '../actions';
import {
  GithubIssuesResponse,
  GithubNotFoundResponse,
  GithubReposResponse,
  GithubUserResponse,
} from '../types';

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

type ReposResponse = GithubReposResponse | GithubNotFoundResponse;

export const fetchGithubRepos = (username: string): Observable<Action> =>
  new Observable(observer => {
    console.log(`https://api.github.com/users/${username}/repos`);
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then((result: ReposResponse) => {
        if (result instanceof Array) {
          observer.next(fetchReposSuccess(result));
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

type IssuesResponse = GithubIssuesResponse | GithubNotFoundResponse;

export const fetchGithubIssues = (
  username: string,
  repo: string,
): Observable<Action> =>
  new Observable(observer => {
    console.log(`https://api.github.com/repos/${username}/${repo}/issues`);
    fetch(`https://api.github.com/repos/${username}/${repo}/issues`)
      .then(response => response.json())
      .then((result: IssuesResponse) => {
        if (result instanceof Array) {
          observer.next(fetchIssuesSuccess(result));
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
