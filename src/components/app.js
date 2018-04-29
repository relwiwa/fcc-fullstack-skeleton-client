import React, { Fragment } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import '../scss/foundation.scss';

import Dashboard from './protected/Dashboard';
import ProtectedRoute from './user-auth/protected-route';
import SigninUser from './user-auth/signin-user';
import SignupUser from './user-auth/signup-user';

const App = () => {
  return <Fragment>
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="dropdown menu">
          <li className="menu-text">Full-Stack Skeleton</li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <li><Link to="/signin"><span className="fa fa-sign-in"></span> Signin</Link></li>
          <li><Link to="/signup"><span className="fa fa-user-plus"></span> Signup</Link></li>
          <li><a><span className="fa fa-sign-out"></span> Logout</a></li>
        </ul>
      </div>
    </div>
    <div style={{marginTop: 20}} className="grid-container">
      <Route path="/signin" component={SigninUser} />
      <Route path="/signup" component={SignupUser} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
    </div>
  </Fragment>;
};

export default App;
