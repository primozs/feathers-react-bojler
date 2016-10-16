const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const process = require('./process');
const restrictToSender = require('./restrict-to-sender');

const populateSender = hooks.populate('sentBy', {
  service: 'users',
  field: 'id'
});

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [process()],
  update: [hooks.remove('sentBy'), restrictToSender()],
  patch: [hooks.remove('sentBy'), restrictToSender()],
  remove: [restrictToSender()]
};

exports.after = {
  all: [],
  find: [populateSender],
  get: [populateSender],
  create: [populateSender],
  update: [],
  patch: [],
  remove: []
};
