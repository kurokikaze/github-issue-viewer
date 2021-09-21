import {of, Subject} from 'rxjs';
import {TestScheduler} from 'rxjs/testing';
import {StateObservable} from 'redux-observable';

import {
  streamToFetches,
  fetchIssuesEpic,
  USERS_SEARCH_DEBOUNCE,
  pagingIssuesEpic,
} from '../../epics';
import {fetchGithubIssues} from '../../epics/libraryBindings';
import {
  fetchIssuesInit,
  fetchIssuesPage,
  fetchIssuesSuccess,
  fetchOrganizationsInit,
  searchUserStream,
} from '../../actions';
import {
  FilterType,
  FILTER_ALL,
  FILTER_OPEN,
} from '../../components/IssuesFilter/IssuesFilter';
import {RootState, initialState} from '../../reducers';
import {SortingType} from '../../components/IssuesSorter/IssuesSorter';

let testScheduler: TestScheduler;

// const testScheduler = new TestScheduler((actual, expected) => {
//   expect(actual).toEqual(expected);
// });

jest.mock('../../epics/libraryBindings', () => ({
  fetchGithubIssues: jest.fn(),
}));

const DELAY = USERS_SEARCH_DEBOUNCE;
describe('epics', () => {
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('debounces the organizations search by USERS_SEARCH_DEBOUNCE', () => {
    testScheduler.run(helpers => {
      const inputActions = {
        a: searchUserStream('r'),
        b: searchUserStream('rx'),
        c: searchUserStream('rxjs'),
      };

      const outputActions = {
        b: fetchOrganizationsInit('rx'),
        c: fetchOrganizationsInit('rxjs'),
      };

      const inputMarble = ` -ab  ${DELAY + 200}ms c`;
      const outputMarble = `--      ${DELAY}ms b ${DELAY + 200}ms c`;

      const action$ = helpers.hot(inputMarble, inputActions);

      const result$ = streamToFetches(action$);
      testScheduler.expectObservable(result$).toBe(outputMarble, outputActions);

      testScheduler.flush();
    });
  });

  it('fetchIssuesEpic', () => {
    const mockFetchIssues = fetchGithubIssues as jest.MockedFunction<
      typeof fetchGithubIssues
    >;
    testScheduler.run(({hot}) => {
      const inputActions = {
        a: fetchIssuesInit('testUser', 'testRepo', 1, FILTER_ALL, {
          field: 'comments',
          direction: 'asc',
        }),
      };

      const outputActions = {
        a: fetchIssuesSuccess(
          'testUser',
          'testRepo',
          [],
          {
            first: null,
            prev: null,
            next: null,
            last: null,
          },
          1,
        ),
      };

      const inputMarble = ' -a';
      const outputMarble = '-a';
      const action$ = hot(inputMarble, inputActions);

      mockFetchIssues.mockReturnValueOnce(of(outputActions.a));
      const result$ = fetchIssuesEpic(action$);

      testScheduler.expectObservable(result$).toBe(outputMarble, outputActions);
      testScheduler.flush();
    });
  });

  // Here we check that issue paging epic fetchIssuesPage creates action fetchIssuesInit,
  // taking parameters from the state and page number from the source action
  it('fetchIssuesPage', () => {
    testScheduler.run(({hot}) => {
      const inputActions = {
        a: fetchIssuesPage(10),
      };

      const outputActions = {
        a: fetchIssuesInit('testUser', 'testRepo', 10, FILTER_OPEN, {
          field: 'created_at',
          direction: 'desc',
        }),
      };

      const state = {
        ...initialState,
        issues: {
          ...initialState.issues,
          username: 'testUser',
          repo: 'testRepo',
          filter: FILTER_OPEN as FilterType,
          sorting: {
            field: 'created_at',
            direction: 'desc',
          } as SortingType,
        },
      };

      const inputMarble = ' -a';
      const outputMarble = '-a';

      const action$ = hot(inputMarble, inputActions);

      const state$ = new StateObservable<RootState>(new Subject(), state);

      const result$ = pagingIssuesEpic(action$, state$);

      testScheduler.expectObservable(result$).toBe(outputMarble, outputActions);
      testScheduler.flush();
    });
  });
});
