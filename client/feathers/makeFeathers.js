import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';
import CookieStorage from './CookieStorage';

let config;
if (process.env.NODE_ENV === 'production') {
  config = require('../../config/client-production');
} else {
  config = require('../../config/client-default');
}

let cookieStorage = null;
if (process.env.CLIENT) {
  cookieStorage = new CookieStorage();
}

const socket = io(config.socketioHost);
const feathersApp = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({storage: cookieStorage}));

export default feathersApp;
