import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import makeStore from '../../client/app/store/makeStoreSrv';
import fetchComponentData from '../util/fetchData';
import routes from '../../client/app/routes';
import FeathersProvider from '../../client/feathers/FeathersProvider';
import feathersApp from '../../client/feathers/makeFeathers';

const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets &&
    JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets &&
    JSON.parse(process.env.webpackChunkAssets);

  const vendors = process.env.NODE_ENV === 'production'
    ? `<script src='${assetsManifest['vendor.js']}'></script>` : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>       
        ${head.title.toString()}
        ${head.meta.toString()}                   
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8">
        <meta name="viewport"
          content="width=device-width,
          user-scalable=no,
          initial-scale=1,
          minimal-ui,
          maximum-scale=1,
          minimum-scale=1">       
        <meta name="mobile-web-app-capable" content="yes">
        ${head.link.toString()}
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="196x196" type="image/png" href="/favicon.png">      
        
        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['app.css']}' />` : ''}
        
      </head>
      <body>
        <div id="root">${html}</div>
       
        <script>
          window.__PRELOADED_STATE__ = ${serialize(initialState)};
          ${process.env.NODE_ENV === 'production' ?
    `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
       
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Intl"></script>
        ${vendors}
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['app.js'] : '/app.js'}'></script>
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

/**
 * Like electrode-redux-router-engine
 * @param req
 * @param match {redirectLoc, renderProps}
 */
const createReduxStore = (req, match) => { // eslint-disable-line
  const initialState = {};
  const store = makeStore(initialState);

  return Promise.all([
    // DO ASYNC THUNK ACTIONS HERE : store.dispatch(boostrapApp())
    Promise.resolve({})
  ]).then(() => {
    return store;
  });
};

const handleRender = (req, res, next) => {
  const location = req.path || (req.url && req.url.path);

  match({ routes, location }, (err, redirectLoc, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLoc) {
      return res.redirect(302, redirectLoc.pathname + redirectLoc.search);
    }

    if (!renderProps) {
      return next();
    }

    const cookies = req.cookies;
    let feathersJwt = '';

    if (cookies && 'feathers-jwt' in cookies) {
      feathersJwt = cookies['feathers-jwt'];
    }

    renderProps.params = {
      ...renderProps.params,
      feathersJwt,
      feathers: feathersApp
    };

    return createReduxStore(req, { redirectLoc, renderProps })
      .then((store) => {
        fetchComponentData(store, renderProps.components, renderProps.params);
        return store;
      })
      .then((store) => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlProvider
              locale={req.localeData.locale}
              messages={req.localeData.messages}
            >
              <FeathersProvider
                feathers={feathersApp}
                feathersJwt={feathersJwt}
              >
                <RouterContext {...renderProps} />
              </FeathersProvider>
            </IntlProvider>
          </Provider>
        );

        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
};

export default handleRender;
