/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './components/App/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

import configureStore from './store';

const store = configureStore();

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
