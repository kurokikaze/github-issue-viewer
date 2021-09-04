import {StateShape} from '../reducers';

export const getIssues = (state: StateShape) => state.issues;
export const getRepos = (state: StateShape) => state.repos;
export const getLoading = (state: StateShape) => state.loading;
