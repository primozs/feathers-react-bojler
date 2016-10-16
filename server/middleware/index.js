import handleRender from './handleRender';
import handleLocale from './locale';
import init from './init';

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

module.exports = function() {
  const app = this;

  app.use(init);
  app.use(handleLocale);
  app.use(handleRender);
  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
