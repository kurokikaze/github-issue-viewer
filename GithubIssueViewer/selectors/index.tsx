import {StateShape} from '../reducers';

export const getIssues = (state: StateShape) => state.issues;
export const getRepos = (state: StateShape) => state.repos;
export const getLoading = (state: StateShape) => state.loading;
export const getIssueById = (id: number) => (state: StateShape) =>
  state.issues.find(i => i.id === id);
