import React, { PropTypes } from 'react';
import App from 'grommet/components/App';
import Footer from 'grommet/components/Footer';
import FormattedMessage from 'grommet/components/FormattedMessage';
import Helmet from 'react-helmet';
import AppHeader from './components/AppHeader';
import config from '../config';

const Main = ({ children }) => {
  return (
    <App centered={false} inline={true}>
      <Helmet
        title={config.app.title}
        titleTemplate={config.app.titleTemplate}
        meta={config.app.meta}
      />
      <AppHeader />
      {children}
      <Footer
        size="small"
        pad={{ vertical: 'small' }}
        float={true}
        primary={true}
        appCentered={true}
        justify="center"
        colorIndex="grey-3"
      >
        <span>
          <FormattedMessage
            id="appFooter"
            defaultMessage="React feathers demo app"
          />
        </span>
      </Footer>
    </App>
  );
};

Main.displayName = 'Main';

Main.propTypes = {
  children: PropTypes.any
};

Main.defaultProps = {};

export default Main;
