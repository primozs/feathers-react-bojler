import request from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function loginSuccess() {
  return {type: LOGIN_SUCCESS};
}

export function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    message: message
  };
}

export function logoutSuccess() {
  return {type: LOGOUT_SUCCESS};
}

export function loginLocal(creds) {
  return function(dispatch, getState) {
    request.post(
      '/auth/local',
      {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        console.log(res);
        dispatch(loginSuccess());
      })
      .catch((err) => {
        dispatch(loginFailure('Authentication was not successfull'));
      });
  };
}

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export function signupSuccess() {
  return {type: SIGNUP_SUCCESS};
}

export function signupFailure(message) {
  return {
    type: SIGNUP_FAILURE,
    message: message
  };
}

export function signup(data) {
  return function(dispatch, getState) {
    request.post(
      '/signup',
      {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        console.log(res);
        dispatch(signupSuccess());
      })
      .catch((err) => {
        dispatch(signupFailure('Signup failure'));
      });
  };
}
