import 'react-native';
import React from 'react';
import App from '../../../components/App/App';

// Note: test renderer must be required after react-native.
import {createRenderer} from 'react-test-renderer/shallow';
import {formatDistanceToNow} from 'date-fns';

jest.mock('date-fns');

const mockDistanceFormatter = formatDistanceToNow as jest.MockedFunction<
  typeof formatDistanceToNow
>;

mockDistanceFormatter.mockReturnValue('some time ago');

describe('App', () => {
  it('renders correctly', () => {
    const renderer = createRenderer();
    const wrapper = renderer.render(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
