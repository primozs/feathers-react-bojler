import React from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import LoginForm from 'grommet/components/LoginForm';
import Logo from '../components/Logo';
import Anchor from 'grommet/components/Anchor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from '../actions/authActions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.table({
      email: values.username,
      password: values.password
    });
    this.props.authActions.loginLocal({
      email: values.username,
      password: values.password
    });
  }

  render() {
    return (
      <Box align="center" full="vertical">
        <Header size="medium"/>
        <LoginForm
          logo={<Logo />}
          title="React Feathers"
          secondaryText="Login"
          rememberMe={false}
          usernameType={'email'}
          onSubmit={this.onSubmit}
          errors={[this.props.auth.errorMessage]}
        />
      </Box>
    );
  }
}

LoginPage.propTypes = {
  auth: React.PropTypes.object,
  authActions: React.PropTypes.object
};

LoginPage.defaultProps = {};

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
)(LoginPage);
