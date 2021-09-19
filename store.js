// store.js

import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from './src/reducers/index';
import rootEpic from './src/epics';

const configureStore = () => {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
};

export default configureStore;
