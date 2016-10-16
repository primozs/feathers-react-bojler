import io from 'socket.io-client'; // eslint-disable-line
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';
import CookieStorage from './CookieStorage';
import config from '../config';

let cookieStorage = null;
if (process.env.CLIENT) {
  cookieStorage = new CookieStorage();
}

const socket = io(config.socketioHost);
const feathersApp = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({ storage: cookieStorage }));

export default feathersApp;
