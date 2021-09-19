import React from 'react';
import 'react-native';
import {Provider} from 'react-redux';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import OrgsList from '../../../components/OrgsList/OrgsList';
import {
  testOrganization,
  anotherTestOrganization,
} from '../../../testData/testORganization';

const mockStore = configureMockStore([]);

describe('OrgsList', () => {
  it('renders correctly', () => {
    const store = mockStore({
      organizations: {
        list: [testOrganization, anotherTestOrganization],
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
        <OrgsList onSelectOrg={() => null} />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly (loading)', () => {
    const store = mockStore({
      organizations: {
        list: [testOrganization],
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
        <OrgsList onSelectOrg={() => null} />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly (pagination)', () => {
    const store = mockStore({
      organizations: {
        list: [testOrganization],
        pagination: {
          first: 1,
          prev: 2,
          next: 4,
          last: 5,
        },
        loading: true,
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <OrgsList onSelectOrg={() => null} />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('onSelectRepo', () => {
    const orgSelectHandler = jest.fn();

    const store = mockStore({
      organizations: {
        list: [testOrganization],
        pagination: {
          first: 1,
          prev: 2,
          next: 4,
          last: 5,
        },
        loading: true,
      },
    });

    const wrapper = renderer.create(
      <Provider store={store}>
        <OrgsList onSelectOrg={orgSelectHandler} />
      </Provider>,
    );

    wrapper.root
      .findByProps({'data-testID': `org-${testOrganization.id}`})
      .findByProps({'data-testID': 'select-org'})
      .props.onPress();

    expect(orgSelectHandler).toHaveBeenCalledWith(testOrganization);
  });
});
