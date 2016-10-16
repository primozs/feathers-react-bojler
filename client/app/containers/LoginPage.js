import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import LoginForm from 'grommet/components/LoginForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import Logo from '../components/Logo';
import * as authActionCreators from '../actions/authActions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.authActions.loginLocal({
      type: 'local',
      email: values.username,
      password: values.password
    }, this.context.feathers);
  }

  render() {
    const { intl } = this.props;
    const appTitle = intl.formatMessage({ id: 'appTitle' });
    const loginTitle = intl.formatMessage({ id: 'loginTitle' });

    const errors = this.props.auth.loginErrors.map((error) => {
      return error.message;
    });

    return (
      <Box align="center" full="vertical">
        <Header size="medium" />
        <LoginForm
          logo={<Logo />}
          title={appTitle}
          secondaryText={loginTitle}
          rememberMe={false}
          usernameType={'email'}
          onSubmit={this.onSubmit}
          errors={errors}
        />
      </Box>
    );
  }
}

LoginPage.propTypes = {
  intl: intlShape,
  auth: React.PropTypes.object,
  authActions: React.PropTypes.object
};

LoginPage.defaultProps = {};

LoginPage.contextTypes = {
  feathers: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LoginPage));
