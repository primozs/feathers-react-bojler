'use strict';

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');
const reactRoute = require('./react');
const signup = require('./signup');
const locale = require('./locale');

module.exports = function() {
  const app = this;

  app.use(locale());
  app.post('/signup', signup(app));
  app.use(reactRoute());
  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
