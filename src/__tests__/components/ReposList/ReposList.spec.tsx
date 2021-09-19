import React from 'react';
import 'react-native';
import {Provider} from 'react-redux';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import ReposList from '../../../components/ReposList/ReposList';
import {testRepo, anotherTestRepo} from '../../../testData/testRepo';

const mockStore = configureMockStore([]);

describe('ReposList', () => {
  it('renders correctly', () => {
    const store = mockStore({
      repos: {
        list: [testRepo, anotherTestRepo],
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
        <ReposList onSelectRepo={() => null} />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly (loading)', () => {
    const store = mockStore({
      repos: {
        list: [testRepo, anotherTestRepo],
        pagination: {
          first: null,
          prev: null,
          next: null,
          last: null,
        },
        loading: true,
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <ReposList onSelectRepo={() => null} />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly (pagination)', () => {
    const store = mockStore({
      repos: {
        list: [testRepo, anotherTestRepo],
        pagination: {
          first: null,
          prev: null,
          next: 2,
          last: 4,
        },
        loading: true,
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <ReposList onSelectRepo={() => null} />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('onSelectRepo', () => {
    const repoSelectHandler = jest.fn();

    const store = mockStore({
      repos: {
        list: [testRepo, anotherTestRepo],
        pagination: {
          first: null,
          prev: null,
          next: 2,
          last: 4,
        },
        loading: true,
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <ReposList onSelectRepo={repoSelectHandler} />
      </Provider>,
    );

    wrapper.root
      .findByProps({'data-testID': `repo-${testRepo.id}`})
      .findByProps({'data-testID': 'select-repo'})
      .props.onPress();

    expect(repoSelectHandler).toHaveBeenCalledWith(testRepo);
  });
});
