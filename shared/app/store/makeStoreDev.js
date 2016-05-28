import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

const historyRouterMiddleware = routerMiddleware(browserHistory);
const createStoreWithMiddleware = compose(
  applyMiddleware(
    historyRouterMiddleware,
    thunkMiddleware,
    promiseMiddleware,
    createLogger({
      predicate: (getState, action) => {
        return (
          action.type !== 'MOUSE_POS'
        );
      }
    })
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function makeStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextReducer = require('../reducers/index');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
