/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/components/App/App';
import {applicationStart} from './src/actions';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

import configureStore from './store';

const store = configureStore();

store.dispatch(applicationStart());

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
