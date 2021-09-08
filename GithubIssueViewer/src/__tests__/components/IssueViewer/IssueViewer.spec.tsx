import React from 'react';
import 'react-native';
import {Provider} from 'react-redux';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import IssueViewer from '../../../components/IssueViewer/IssueViewer';
import {testIssue} from '../../../testData/testIssue';

const mockStore = configureMockStore([]);

describe('IssueViewer', () => {
  it('renders correctly (Issue)', () => {
    const store = mockStore({
      issues: {
        list: [testIssue],
        loading: false,
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <IssueViewer issueId={testIssue.id} isBookmark={false} />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly (Bookmark)', () => {
    const store = mockStore({
      bookmarks: {
        issues: [testIssue],
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <IssueViewer issueId={testIssue.id} isBookmark={true} />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
