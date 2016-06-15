import React, { PropTypes } from 'react';
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import FormattedMessage from 'grommet/components/FormattedMessage';
import AppHeader from './components/AppHeader';
import Authenticate from './containers/Authenticate';

class Main extends React.Component {
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

Main.displayName = 'Main';

Main.propTypes = {
  children: PropTypes.any
};

Main.defaultProps = {};

export default Main;
