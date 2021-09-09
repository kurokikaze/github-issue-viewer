import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Issue from '../../../components/Issue/Issue';
import {testIssue} from '../../../testData/testIssue';
import {formatDistanceToNow} from 'date-fns';

jest.mock('date-fns');

const mockDistanceFormatter = formatDistanceToNow as jest.MockedFunction<
  typeof formatDistanceToNow
>;

mockDistanceFormatter.mockReturnValue('some time ago');

describe('Issue', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(
      <Issue
        issue={testIssue}
        onSelect={() => null}
        onBookmark={() => null}
        onRemoveBookmark={() => null}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly (can bookmark)', () => {
    const wrapper = renderer.create(
      <Issue
        issue={testIssue}
        onSelect={() => null}
        onBookmark={() => null}
        onRemoveBookmark={() => null}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('onSelect', () => {
    const issueSelectHandler = jest.fn();

    const wrapper = renderer.create(
      <Issue
        issue={testIssue}
        onSelect={issueSelectHandler}
        onBookmark={() => null}
        onRemoveBookmark={() => null}
      />,
    );

    wrapper.root.findByProps({'data-testID': 'select-issue'}).props.onPress();

    expect(issueSelectHandler).toHaveBeenCalled();
  });

  it('onBookmark', () => {
    const issueBookmarkHandler = jest.fn();

    const wrapper = renderer.create(
      <Issue
        issue={testIssue}
        onSelect={() => null}
        canBookmark
        onBookmark={issueBookmarkHandler}
        onRemoveBookmark={() => null}
      />,
    );

    wrapper.root.findByProps({'data-testID': 'bookmark-issue'}).props.onPress();

    expect(issueBookmarkHandler).toHaveBeenCalled();
  });

  it('onRemoveBookmark', () => {
    const issueRemoveBookmarkHandler = jest.fn();

    const wrapper = renderer.create(
      <Issue
        issue={testIssue}
        onSelect={() => null}
        onBookmark={() => null}
        onRemoveBookmark={issueRemoveBookmarkHandler}
      />,
    );

    wrapper.root
      .findByProps({'data-testID': 'remove-issue-from-bookmarks'})
      .props.onPress();

    expect(issueRemoveBookmarkHandler).toHaveBeenCalled();
  });
});
