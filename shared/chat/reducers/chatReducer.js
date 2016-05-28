import {
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE
} from '../actions/chatActions';

const initialState = {
  messages: [],
  createErrMsg: '',
  findErrMsg: '',
  users: [],
  findErrUsers: ''
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE_SUCCESS:
      return {
        messages: [...state.messages, action.message],
        createErrMsg: ''
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        createErrMsg: action.message
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
        findErrMsg: ''
      };
    case GET_MESSAGES_FAILURE:
      return {
        ...state,
        findErrMsg: action.message
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        findErrUsers: ''
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        findErrUsers: action.message
      };
    default:
      return state;
  }
}
