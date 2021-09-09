import {RootState} from '../reducers';

type UndefinedTypeGuard = <T>(x: T | undefined) => x is T;

export const getIssues = (state: RootState) => state.issues.list;
export const getIssuesUsername = (state: RootState) => state.issues.username;
export const getIssuesRepo = (state: RootState) => state.issues.repo;
export const getIssuesPagination = (state: RootState) =>
  state.issues.pagination;
export const getIssuesPage = (state: RootState) => state.issues.currentPage;
export const getIssuesLoading = (state: RootState) => state.issues.loading;
export const getIssuesFilter = (state: RootState) => state.issues.filter;

export const getRepos = (state: RootState) => state.repos.list;
export const getReposOrganization = (state: RootState) =>
  state.repos.organization;
export const getReposPagination = (state: RootState) => state.repos.pagination;
export const getReposPage = (state: RootState) => state.repos.currentPage;
export const getReposLoading = (state: RootState) => state.repos.loading;

export const getOrgs = (state: RootState) => state.organizations.list;
export const getOrgsUsername = (state: RootState) =>
  state.organizations.username;
export const getOrgsPagination = (state: RootState) =>
  state.organizations.pagination;
export const getOrgsPage = (state: RootState) =>
  state.organizations.currentPage;
export const getOrgsLoading = (state: RootState) => state.organizations.loading;

export const getOrganization = (state: RootState) =>
  state.configuration.organization;

export const getIssueById = (issueId: number) => (state: RootState) =>
  state.issues.list.find(({id}) => id === issueId);

export const getBookmarks = (state: RootState) =>
  state.bookmarks.bookmarks
    .map(({issue, repo, username}) => ({
      issue: state.bookmarks.issues.find(i => i.id === issue),
      repo,
      username,
    }))
    .filter(Boolean as any as UndefinedTypeGuard);

export const getBookmarkedIds = (state: RootState) =>
  state.bookmarks.bookmarks.map(bookmark => bookmark.issue);

export const getBookmarkById = (issueId: number) => (state: RootState) =>
  state.bookmarks.issues.find(({id}) => id === issueId);
