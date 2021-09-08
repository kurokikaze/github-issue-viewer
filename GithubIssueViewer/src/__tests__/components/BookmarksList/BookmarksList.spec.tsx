import React from 'react';
import 'react-native';
import {Provider} from 'react-redux';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import BookmarksList from '../../../components/BookmarksList/BookmarksList';
import Issue from '../../../components/Issue/Issue';
import {testIssue} from '../../../testData/testIssue';
import {formatDistanceToNow} from 'date-fns';

jest.mock('date-fns');

const mockDistanceFormatter = formatDistanceToNow as jest.MockedFunction<
  typeof formatDistanceToNow
>;

mockDistanceFormatter.mockReturnValue('some time ago');

const mockStore = configureMockStore([]);

describe('BookmarksList', () => {
  it('renders correctly', () => {
    const secondTestIssue = {
      ...testIssue,
      id: 12345,
    };
    const store = mockStore({
      bookmarks: {
        bookmarks: [
          {
            issue: testIssue.id,
          },
          {
            issue: 12345,
          },
        ],
        issues: [testIssue, secondTestIssue],
      },
      issues: {
        list: [],
        loading: false,
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <BookmarksList
          onSelectIssue={() => null}
          onRemoveBookmark={() => null}
        />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('onIssueSelect', () => {
    const issueSelectHandler = jest.fn();

    const store = mockStore({
      bookmarks: {
        bookmarks: [
          {
            issue: testIssue.id,
          },
        ],
        issues: [testIssue],
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <BookmarksList
          onSelectIssue={issueSelectHandler}
          onRemoveBookmark={() => null}
        />
      </Provider>,
    );

    wrapper.root.findByType(Issue).props.onSelect();

    expect(issueSelectHandler).toHaveBeenCalledWith(testIssue);
  });
});
