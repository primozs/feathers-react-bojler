import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from './Main';
import HomePage from './containers/HomePage';
import ChatPage from './containers/ChatPage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import ContactPage from './containers/ContactPage';
import UserProfilePage from './containers/UserProfilePage';
import {
  authenticateComponent,
  userIsAuthenticated,
  userIsNotAuthenticated
} from './containers/Authenticate';

const routes = (
  <Route path="/" component={authenticateComponent(Main)}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={userIsNotAuthenticated(LoginPage)} />
    <Route path="signup" component={userIsNotAuthenticated(SignupPage)} />
    <Route path="profile" component={userIsAuthenticated(UserProfilePage)} />
    <Route path="chat" component={userIsAuthenticated(ChatPage)} />
    <Route path="contact" component={ContactPage} />
  </Route>
);

export default routes;
