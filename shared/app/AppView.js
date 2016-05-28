import React, { PropTypes } from 'react';
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import FormattedMessage from 'grommet/components/FormattedMessage';
import AppHeader from './components/AppHeader';

let config;
if (process.env.NODE_ENV === 'production') {
  config = require('../../config/production');
} else {
  config = require('../../config/default');
}

const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');

const socket = io(config.socketioHost);
const app = feathers()
  .configure(hooks())
  .configure(socketio(socket));
//.configure(feathers.authentication({
//  storage: window.localStorage
//}));

class AppView extends React.Component {

  getChildContext() {
    return {
      feathers: app
    };
  }

  render() {
    return (
      <App centered={false} inline={true}>
        <AppHeader />
        {this.props.children}
        <Footer
          size="small"
          pad={{vertical: 'small'}}
          float={true}
          primary={true}
          appCentered={true}
          justify="center"
          colorIndex="grey-3">
          <span>
            <FormattedMessage
              id="appFooter"
              defaultMessage="React feathers demo app" />
          </span>
        </Footer>
      </App>
    );
  }
}

AppView.displayName = 'AppView';

AppView.propTypes = {
  children: PropTypes.any
};

AppView.defaultProps = {};

AppView.childContextTypes = {
  feathers: React.PropTypes.object.isRequired
};

export default AppView;
module.exports = AppView;
