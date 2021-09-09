import {URL} from 'react-native-url-polyfill';
import {
  GithubCommentsResponse,
  GithubIssuesResponse,
  GithubNotFoundResponse,
  GithubOrganizationsResponse,
  GithubReposResponse,
  GithubUserResponse,
  PaginationLinksType,
} from '../../types';
import {parsePagination} from './utils';
import {
  FilterType,
  FILTER_OPEN,
} from '../../components/IssuesFilter/IssuesFilter';
import {
  SortingType,
  SORT_NONE,
} from '../../components/IssuesSorter/IssuesSorter';

type UserResponse = GithubUserResponse | GithubNotFoundResponse;

export const fetchUser = async (username: string): Promise<UserResponse> => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const result = await response.json();
  return result;
};

type OrgsResponse = {
  result: GithubOrganizationsResponse;
  pagination: PaginationLinksType;
} | null;

export const fetchOrganizations = async (
  username: string,
  page: number,
): Promise<OrgsResponse> => {
  const url = new URL(`https://api.github.com/users/${username}/orgs`);
  url.searchParams.append('page', page.toString(10));

  const response = await fetch(url.toString());
  const result = await response.json();
  const paginationHeader = response.headers.get('link');

  if (result instanceof Array) {
    return {
      result,
      pagination: parsePagination(paginationHeader || ''),
    };
  }

  return null;
};

type ReposResponse = {
  result: GithubReposResponse;
  pagination: PaginationLinksType;
} | null;

export const fetchRepos = async (
  organization: string,
  page: number = 1,
): Promise<ReposResponse> => {
  const url = new URL(`https://api.github.com/orgs/${organization}/repos`);
  url.searchParams.append('page', page.toString(10));

  const response = await fetch(url.toString());
  const result = await response.json();
  const paginationHeader = response.headers.get('link');

  if (result instanceof Array) {
    return {
      result,
      pagination: parsePagination(paginationHeader || ''),
    };
  }

  return null;
};

type IssuesResponse = {
  result: GithubIssuesResponse | GithubNotFoundResponse;
  pagination: PaginationLinksType;
} | null;

export const fetchIssues = async (
  username: string,
  repo: string,
  page: number = 1,
  filter: FilterType = FILTER_OPEN,
  sorting: SortingType,
): Promise<IssuesResponse> => {
  const url = new URL(
    `https://api.github.com/repos/${username}/${repo}/issues`,
  );
  url.searchParams.append('page', page.toString(10));

  if (filter !== FILTER_OPEN) {
    url.searchParams.append('state', filter);
  }

  if (sorting.field !== SORT_NONE) {
    url.searchParams.append('sort', sorting.field);
    url.searchParams.append('direction', sorting.direction);
  }

  const response = await fetch(url.toString());
  const issuesResult: GithubIssuesResponse | GithubNotFoundResponse =
    await response.json();

  const pagination = response.headers.get('link');

  if (issuesResult instanceof Array) {
    return {
      result: issuesResult,
      pagination: parsePagination(pagination || ''),
    };
  }

  return null;
};

type CommentsResponse = {
  result: GithubCommentsResponse | GithubNotFoundResponse;
  pagination: PaginationLinksType;
} | null;

export const fetchComments = async (
  username: string,
  repo: string,
  number: number,
  page: number = 1,
): Promise<CommentsResponse> => {
  const url = new URL(
    `https://api.github.com/repos/${username}/${repo}/issues/${number}/comments`,
  );
  url.searchParams.append('page', page.toString(10));

  const response = await fetch(url.toString());
  const commentsResult: GithubCommentsResponse | GithubNotFoundResponse =
    await response.json();

  const pagination = response.headers.get('link');

  if (commentsResult instanceof Array) {
    return {
      result: commentsResult,
      pagination: parsePagination(pagination || ''),
    };
  }

  return null;
};
