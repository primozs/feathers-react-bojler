import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../reducers/index';

export default function makeStore(initialState) {
  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware
  )(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
}
