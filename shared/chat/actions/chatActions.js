
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export function sendMessageSuccess(message) {
  return {type: SEND_MESSAGE_SUCCESS, message}
}

export function sendMessageFailure(message) {
  return {type: SEND_MESSAGE_FAILURE, message}
}

export function sendMessage(text, feathers) {
  return function(dispatch, getState) {
    feathers.service('messages')
      .create({text: text})
      .then((message) => {
        dispatch(sendMessageSuccess(message));
      })
      .catch((err) => {
        dispatch(sendMessageFailure('Message could not be send'))
      });
  };
}

export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

export function getMessagesSuccess(messages) {
  return {type: GET_MESSAGES_SUCCESS, messages}
}

export function getMessagesFailure(message) {
  return {type: GET_MESSAGES_FAILURE, message}
}

export function findMessages(options, msgService) {
  return function(dispatch, getState) {
    msgService.find(options)
      .then((res) => {
        dispatch(getMessagesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getMessagesFailure('Messages could not be fetched'));
      });
  };
}

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export function getUsersSuccess(users) {
  return {type: GET_USERS_SUCCESS, users}
}

export function getUsersFailure(message) {
  return {type: GET_USERS_FAILURE, message}
}

export function findUsers(userService) {
  return function(dispatch, getState) {
    userService.find()
      .then((res) => {
        dispatch(getUsersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getUsersFailure('Users could not be fetched'));
      });
  };
}
