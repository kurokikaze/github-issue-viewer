import {RootState} from '../reducers';

export const getIssues = (state: RootState) => state.issues.list;
export const getIssuesUsername = (state: RootState) => state.issues.username;
export const getIssuesRepo = (state: RootState) => state.issues.repo;
export const getIssuesPagination = (state: RootState) =>
  state.issues.pagination;
export const getIssuesPage = (state: RootState) => state.issues.currentPage;
export const getIssuesLoading = (state: RootState) => state.issues.loading;
export const getIssuesFilter = (state: RootState) => state.issues.filter;

export const getRepos = (state: RootState) => state.repos.list;
export const getReposUsername = (state: RootState) => state.repos.username;
export const getReposPagination = (state: RootState) => state.repos.pagination;
export const getRepossPage = (state: RootState) => state.repos.currentPage;
export const getReposLoading = (state: RootState) => state.repos.loading;

export const getIssueById = (id: number) => (state: RootState) =>
  state.issues.list.find(i => i.id === id);
