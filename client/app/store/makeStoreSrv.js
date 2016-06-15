import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

export default function makeStore(initialState) {
  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
  )(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
}
