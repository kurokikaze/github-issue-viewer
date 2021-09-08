import {
  Action,
  changeIssuesFilter,
  fetchIssuesFailure,
  fetchIssuesInit,
  fetchIssuesSuccess,
} from '../../actions';
import {
  FILTER_ALL,
  FILTER_CLOSED,
} from '../../components/IssuesFilter/IssuesFilter';
import issuesReducer, {initialState} from '../../reducers/issues';
import {testIssue} from '../../testData/testIssue';

describe('issuesReducer', () => {
  it('Storing issues list', () => {
    const storeIssuesAction = fetchIssuesSuccess(
      'testUser',
      'testRepo',
      [testIssue],
      {first: null, prev: null, next: null, last: null},
      1,
    );

    const startingState = {
      ...initialState,
      loading: true,
    };
    const resultingState = issuesReducer(startingState, storeIssuesAction);

    expect(resultingState.list).toHaveLength(1);
    expect(resultingState.list[0]).toEqual(testIssue);
    expect(resultingState.loading).toEqual(false);
  });

  it('Setting loading flag on fetch start', () => {
    const storeIssuesAction = fetchIssuesInit(
      'testUser',
      'testRepo',
      1,
      FILTER_ALL,
    );
    const resultingState = issuesReducer(initialState, storeIssuesAction);

    expect(resultingState.loading).toEqual(true);
  });

  it('Setting loading flag on fetch failure', () => {
    const storeIssuesAction = fetchIssuesFailure('testUser');
    const startingState = {
      ...initialState,
      loading: true,
    };
    const resultingState = issuesReducer(startingState, storeIssuesAction);

    expect(resultingState.loading).toEqual(false);
  });

  it('Saving filter for paginated requests', () => {
    const storeIssuesAction = changeIssuesFilter(FILTER_CLOSED);
    const resultingState = issuesReducer(initialState, storeIssuesAction);

    expect(resultingState.filter).toEqual(FILTER_CLOSED);
  });

  it('Returns initial state', () => {
    const action = {type: 'INIT'};

    const resultingState = issuesReducer(undefined, action as Action);
    expect(resultingState).toEqual(initialState);
  });
});
