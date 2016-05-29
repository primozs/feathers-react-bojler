import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppView from './AppView';
import HomePage from './containers/HomePage';
import ChatPage from './containers/ChatPage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import ContactPage from './containers/ContactPage';
import UserProfilePage from './containers/UserProfilePage';
import {
  authenticateComponent,
  requireAuthentication,
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from './containers/Authenticate';

const routes = (
  <Route path="/" component={authenticateComponent(AppView)}>
    <IndexRoute component={HomePage}/>
    <Route path="login" component={UserIsNotAuthenticated(LoginPage)} />
    <Route path="signup" component={UserIsNotAuthenticated(SignupPage)} />
    <Route path="profile" component={UserIsAuthenticated(UserProfilePage)} />
    <Route path="chat" component={UserIsAuthenticated(ChatPage)} />
    <Route path="contact" component={ContactPage} />
  </Route>
);

export default routes;
