import './scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { match, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { IntlProvider } from 'react-intl';
import routes from './app/routes';
import { getLocaleMessagesData } from './app/locale/util';
import FeathersProvider from './feathers/FeathersProvider';
import feathersApp from './feathers/makeFeathers';

const localeData = getLocaleMessagesData();

const makeStore = process.env.NODE_ENV === 'production' ?
  require('./app/store/makeStoreProd').default :
  require('./app/store/makeStoreDev').default;

const initialState = window.__INITIAL_STATE__;
const store = makeStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

const appElement = document.getElementById('root');

match({routes, location}, () => {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale={localeData.locale} messages={localeData.messages}>
        <FeathersProvider feathers={feathersApp}>
          <Router routes={routes} history={history}/>
        </FeathersProvider>
      </IntlProvider>
    </Provider>,
    appElement);
});

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!appElement ||
    !appElement.firstChild ||
    !appElement.firstChild.attributes) {
    let message = `Server-side React render was discarded.
    Make sure that your initial render does not contain any client-side code.`;
    console.error(message); // eslint-disable-line
  }
}
