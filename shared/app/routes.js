import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppView from './AppView';
import HomePage from './containers/HomePage';
import ChatPage from './containers/ChatPage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import ContactPage from './containers/ContactPage';

const routes = (
  <Route path="/" component={AppView}>
    <IndexRoute component={HomePage}/>
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="chat" component={ChatPage} />
    <Route path="contact" component={ContactPage} />
  </Route>
);

export default routes;
