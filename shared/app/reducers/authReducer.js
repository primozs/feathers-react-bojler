import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions/authActions';

const initialState = {
  isAuthenticated: false,
  errorMessage: ''
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: ''
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.message
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: ''
      };
    default:
      return state;
  }
}
