import React from 'react';
import 'react-native';
import {Provider} from 'react-redux';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import IssuesList from '../../../components/IssuesList/IssuesList';
import Issue from '../../../components/Issue/Issue';
import {testIssue} from '../../../testData/testIssue';

const mockStore = configureMockStore([]);

describe('IssuesList', () => {
  it('renders correctly', () => {
    const secondTestIssue = {
      ...testIssue,
      id: 12345,
    };
    const store = mockStore({
      bookmarks: {
        bookmarks: [],
        issues: [],
      },
      issues: {
        list: [testIssue, secondTestIssue],
        pagination: {
          first: null,
          prev: null,
          next: null,
          last: null,
        },
        loading: false,
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <IssuesList
          onSelectIssue={() => null}
          onRemoveBookmark={() => null}
          onBookmarkIssue={() => null}
        />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly (issue is bookmarked)', () => {
    const store = mockStore({
      bookmarks: {
        bookmarks: [
          {
            issue: testIssue.id,
          },
        ],
      },
      issues: {
        list: [],
        pagination: {
          first: null,
          prev: null,
          next: null,
          last: null,
        },
        loading: false,
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <IssuesList
          onSelectIssue={() => null}
          onRemoveBookmark={() => null}
          onBookmarkIssue={() => null}
        />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('onSelectIssue', () => {
    const issueSelectHandler = jest.fn();

    const store = mockStore({
      issues: {
        list: [testIssue],
        pagination: {
          first: null,
          prev: null,
          next: null,
          last: null,
        },
      },
      bookmarks: {
        bookmarks: [],
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <IssuesList
          onBookmarkIssue={() => null}
          onSelectIssue={issueSelectHandler}
          onRemoveBookmark={() => null}
        />
      </Provider>,
    );

    wrapper.root.findByType(Issue).props.onSelect();

    expect(issueSelectHandler).toHaveBeenCalledWith(testIssue);
  });

  it('onBookmarkIssue', () => {
    const issueBookmarkHandler = jest.fn();

    const store = mockStore({
      issues: {
        list: [testIssue],
        pagination: {
          first: null,
          prev: null,
          next: null,
          last: null,
        },
      },
      bookmarks: {
        bookmarks: [],
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <IssuesList
          onBookmarkIssue={issueBookmarkHandler}
          onSelectIssue={() => null}
          onRemoveBookmark={() => null}
        />
      </Provider>,
    );

    wrapper.root.findByType(Issue).props.onBookmark();

    expect(issueBookmarkHandler).toHaveBeenCalledWith(testIssue);
  });
});