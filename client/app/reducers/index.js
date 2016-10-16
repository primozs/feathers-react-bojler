import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import navReducer from './navReducer';
import authReducer from './authReducer';
import chatReducer from '../../chat/reducers/chatReducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing,
  nav: navReducer,
  auth: authReducer,
  chat: chatReducer
});

export default rootReducer;
module.exports = rootReducer;
