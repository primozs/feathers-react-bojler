/**
 * Check authentication
 * https://github.com/mjrussell/redux-auth-wrapper
 */
import React from 'react';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from '../actions/authActions';

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/login',
  predicate: (auth) => {
    return auth.isAuthenticated;
  },
  wrapperDisplayName: 'UserIsAuthenticated'
});

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.auth,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/profile',
  predicate: (auth) => {
    return !auth.isAuthenticated;
  },
  wrapperDisplayName: 'UserIsNotAuthenticated'
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
        <Component {...this.props}/>
      );
    }
  }

  AuthComponent.propTypes = {
    authActions: React.PropTypes.object,
    auth: React.PropTypes.object
  };

  AuthComponent.contextTypes = {
    feathers: React.PropTypes.object.isRequired,
    feathersJwt: React.PropTypes.string
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
