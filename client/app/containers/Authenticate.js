/**
 * Check authentication
 * https://github.com/mjrussell/redux-auth-wrapper
 */
import React, { PropTypes } from 'react';
import { UserAuthWrapper as userAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from '../actions/authActions';

export const userIsAuthenticated = userAuthWrapper({
  authSelector: (state) => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/login',
  predicate: (auth) => {
    return auth.isAuthenticated;
  },
  wrapperDisplayName: 'userIsAuthenticated'
});

export const userIsNotAuthenticated = userAuthWrapper({
  authSelector: (state) => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/profile',
  predicate: (auth) => {
    return !auth.isAuthenticated;
  },
  wrapperDisplayName: 'userIsNotAuthenticated'
});

export function authenticateComponent(Component) {
  /**
   * Set authentication state
   */
  class AuthComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if (process.env.CLIENT) {
        this.props.authActions.keepLogin(this.context.feathers);
      }
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  AuthComponent.propTypes = {
    authActions: PropTypes.object,
    auth: PropTypes.object // eslint-disable-line
  };

  AuthComponent.contextTypes = {
    feathers: PropTypes.object.isRequired,
    feathersJwt: PropTypes.string
  };

  AuthComponent.need = [(params) => {
    return authActionCreators.keepLoginServer(params.feathersJwt, params.feathers);
  }];

  const mapStateToProps = (state) => {
    return {
      auth: state.auth
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      authActions: bindActionCreators(authActionCreators, dispatch)
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
}
