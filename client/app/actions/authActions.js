import { push } from 'react-router-redux';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, user };
}

export function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    message
  };
}

export function logoutSuccess() {
  return { type: LOGOUT_SUCCESS };
}

export function logoutFailure() {
  return { type: LOGOUT_FAILURE };
}

/**
 * Options example
 * {
 *     type: 'local',
 *     'email': 'admin@alibaba.com',
 *     'password': 'admin'
 *  }
 *
 * @param options
 * @returns {Function}
 */
export function loginLocal(options, app) {
  return (dispatch) => {
    return app.authenticate(options)
      .then((response) => {
        dispatch(loginSuccess(response.data));
        dispatch(push('/'));
        return response;
      })
      .catch((err) => {
        dispatch(loginFailure(err.message));
        return err;
      });
  };
}

export function keepLogin(feathers) {
  return (dispatch) => {
    return feathers.authenticate()
      .then((response) => {
        dispatch(loginSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(loginFailure(`Keep login error: ${err.message}`));
        return err;
      });
  };
}

/**
 * To make authentication universal this Redux action creator will run
 * on the server, to keep user logged in.
 *
 * This action must return promise `return feathers.authenticate...`
 * Check mern.io and AuthComponent.need in `app/containers/Authenticate.js`
 *
 * If you are logged in and make /profile reload, the profile page with
 * user data is already rendered on the server.
 *
 * @param token
 * @param feathers
 * @returns {Function}
 */
export function keepLoginServer(token, feathers) {
  return (dispatch) => {
    return feathers.authenticate({ type: 'token', token })
      .then((response) => {
        dispatch(loginSuccess(response.data));
        return response;
      })
      .catch((err) => {
        dispatch(loginFailure(`keepLoginServer error: ${err.message}`));
        return err;
      });
  };
}

export function logOut(app) {
  return (dispatch) => {
    return app.logout()
      .then((res) => {
        dispatch(logoutSuccess());
        dispatch(push('/login'));
        return res;
      })
      .catch((err) => {
        dispatch(loginFailure(err));
        return err;
      });
  };
}

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export function signupSuccess(user) {
  return { type: SIGNUP_SUCCESS, user };
}

export function signupFailure(message) {
  return {
    type: SIGNUP_FAILURE,
    message
  };
}

/**
 * Options exmple
 * {
 *   email: body.email,
 *   password: body.password
 * }
 *
 * @param options
 * @param app
 * @returns {Function}
 */
export function signup(options, app) {
  return (dispatch) => {
    return app.service('users')
      .create(options)
      .then((response) => {
        dispatch(signupSuccess());
        dispatch(push('/login'));
        return response;
      })
      .catch((err) => {
        dispatch(signupFailure(err));
        return err;
      });
  };
}
