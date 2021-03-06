import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import BookmarksBrowserScreen from '../../../screens/BookmarksBrowserScreen/BookmarksBrowserScreen';
import {formatDistanceToNow} from 'date-fns';
// Note: test renderer must be required after react-native.
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types';
import {RouteProp} from '@react-navigation/core';
import {testIssue} from '../../../testData/testIssue';

const mockStore = configureMockStore([]);

jest.mock('date-fns');

const mockDistanceFormatter = formatDistanceToNow as jest.MockedFunction<
  typeof formatDistanceToNow
>;

mockDistanceFormatter.mockReturnValue('some time ago');

describe('BookmarksBrowserScreen', () => {
  it('renders correctly', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const store = mockStore({
      bookmarks: {
        bookmarks: [
          {
            issue: testIssue.id,
            username: 'testuser',
            repo: 'testrepo',
          },
        ],
        issues: [testIssue],
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <BookmarksBrowserScreen
          navigation={
            navigation as unknown as NativeStackNavigationProp<
              RootStackParamList,
              'BookmarksBrowser'
            >
          }
          route={
            'BookmarksBrowser' as unknown as RouteProp<
              RootStackParamList,
              'BookmarksBrowser'
            >
          }
        />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
