'use strict';

const service = require('feathers-sequelize');
const message = require('./message-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: message(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/messages', service(options));

  // Get our initialize service to that we can bind hooks
  const messageService = app.service('/messages');

  // Set up our before hooks
  messageService.before(hooks.before);

  // Set up our after hooks
  messageService.after(hooks.after);
};
