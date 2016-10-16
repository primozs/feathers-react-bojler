import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../actions/authActions';

const initialState = {
  isAuthenticated: false,
  loginErrors: [],
  user: null,
  signupErrors: []
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        loginErrors: []
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loginErrors: [action.message]
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loginErrors: []
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        signupErrors: []
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signupErrors: action.message.errors
      };
    default:
      return state;
  }
}
