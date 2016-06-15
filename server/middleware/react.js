import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import makeStore from '../../client/app/store/makeStoreSrv';
import { fetchComponentData } from '../util/fetchData';
import routes from '../../client/app/routes';
import { getLocaleMessagesData } from '../../client/app/locale/util';
import FeathersProvider from '../../client/feathers/FeathersProvider';
import feathersApp from '../../client/feathers/makeFeathers';
import * as authActionCreators from '../../client/app/actions/authActions';

const renderFullPage = (html, initialState) => {
  const style = process.env.NODE_ENV === 'production'
    ? '<link rel="stylesheet" href="/app.css" />' : '';

  const script = process.env.NODE_ENV === 'production'
    ? '<script src="/bundle.js"></script>' : '<script src="/dev/bundle.js"></script>';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <meta name="mobile-web-app-capable" content="yes">
        <title>React Feathers</title>
        <meta name="description" content="" />
        ${style}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        ${script}
      </body>
    </html>
  `;
};

const renderError = (err) => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production'
    ? `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

const getLocaleData = (req, res) => {
  let cookies = req.cookies;
  if (cookies && 'language' in cookies) {
    return getLocaleMessagesData(cookies.language);
  }
  return getLocaleMessagesData('en');
};

module.exports = function() {
  return function(req, res, next) {
    match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).end(renderError(err));
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (!renderProps) {
        return next();
      }

      const initialState = {};
      const store = makeStore(initialState);
      const localeData = getLocaleData(req, res);

      let cookies = req.cookies;
      let feathersJwt = '';

      if (cookies && 'feathers-jwt' in cookies) {
        feathersJwt = cookies['feathers-jwt'];
      }

      renderProps.params = {
        ...renderProps.params,
        feathersJwt: feathersJwt,
        feathers: feathersApp
      };

      //if (feathersJwt) {
      //  return store.dispatch(authActionCreators.keepLoginServer(feathersJwt, feathersApp))
      //    .then((res) => {
      //      return fetchComponentData(store, renderProps.components, renderProps.params);
      //    })
      //    .then(() => {
      //      const initialView = renderToString(
      //        <Provider store={store}>
      //          <IntlProvider locale={localeData.locale} messages={localeData.messages}>
      //            <FeathersProvider feathers={feathersApp} feathersJwt={feathersJwt}>
      //              <RouterContext {...renderProps}/>
      //            </FeathersProvider>
      //          </IntlProvider>
      //        </Provider>
      //      );
      //      const finalState = store.getState();
      //      res.status(200).end(renderFullPage(initialView, finalState));
      //    })
      //    .catch((err) => {
      //      return res.status(500).end(renderError(err));
      //    });
      //}

      return fetchComponentData(store, renderProps.components, renderProps.params)
        .then(() => {
          const initialView = renderToString(
            <Provider store={store}>
              <IntlProvider locale={localeData.locale} messages={localeData.messages}>
                <FeathersProvider feathers={feathersApp} feathersJwt={feathersJwt}>
                  <RouterContext {...renderProps}/>
                </FeathersProvider>
              </IntlProvider>
            </Provider>
          );
          const finalState = store.getState();
          res.status(200).end(renderFullPage(initialView, finalState));
        })
        .catch((err) => {
          return res.status(500).end(renderError(err));
        });
    });
  }
};
