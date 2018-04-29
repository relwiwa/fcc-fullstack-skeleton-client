import React, { Fragment } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import '../scss/foundation.scss';

import Dashboard from './protected/Dashboard';
import Header from './layout/header';
import Home from './home';
import ProtectedRoute from './user-auth/protected-route';
import SigninUser from './user-auth/signin-user';
import SignupUser from './user-auth/signup-user';

const App = () => {
  return <Fragment>
    <Header />
    <div style={{marginTop: 20}} className="grid-container">
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={SigninUser} />
      <Route path="/signup" component={SignupUser} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
    </div>
  </Fragment>;
};

export default App;
