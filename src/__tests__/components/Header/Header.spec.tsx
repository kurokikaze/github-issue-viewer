import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {useNavigation} from '@react-navigation/core';

import Header from '../../../components/Header/Header';
import SettingsIcon from '../../../components/Settings/Settings';
import Bookmark from '../../../components/Bookmark/Bookmark';

jest.mock('@react-navigation/core', () => ({
  useNavigation: jest.fn(),
}));

describe('Header', () => {
  it('renders correctly', () => {
    const navModuleMock = useNavigation as jest.MockedFunction<
      typeof useNavigation
    >;
    const navigate = jest.fn();
    navModuleMock.mockReturnValueOnce({
      navigate,
    });
    const wrapper = renderer.create(<Header />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('Settings icon navigates to Settings', () => {
    const navModuleMock = useNavigation as jest.MockedFunction<
      typeof useNavigation
    >;
    const navigate = jest.fn();
    navModuleMock.mockReturnValueOnce({
      navigate,
    });
    const wrapper = renderer.create(<Header />);

    wrapper.root.findByType(SettingsIcon).props.onPress();
    expect(navigate).toHaveBeenCalledWith('Settings');
  });

  it('Bookmarks icon navigates to BookmarksBrowser', () => {
    const navModuleMock = useNavigation as jest.MockedFunction<
      typeof useNavigation
    >;
    const navigate = jest.fn();
    navModuleMock.mockReturnValueOnce({
      navigate,
    });
    const wrapper = renderer.create(<Header />);

    wrapper.root.findByType(Bookmark).props.onPress();
    expect(navigate).toHaveBeenCalledWith('BookmarksBrowser');
  });
});
