import 'react-native';
import React from 'react';
import Bookmark from '../../../components/Bookmark/Bookmark';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Bookmark', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<Bookmark />).toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
