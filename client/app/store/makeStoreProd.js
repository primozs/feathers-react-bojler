import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';

const historyRouterMiddleware = routerMiddleware(browserHistory);
const createStoreWithMiddleware = compose(
  applyMiddleware(
    historyRouterMiddleware,
    thunkMiddleware,
    promiseMiddleware
  )
)(createStore);

export default function makeStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
