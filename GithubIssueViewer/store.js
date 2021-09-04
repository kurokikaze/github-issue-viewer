// store.js

import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import {createEpicMiddleware} from 'redux-observable';
import rootEpic from './epics';

const configureStore = () => {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
};

export default configureStore;
