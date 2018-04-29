import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthenticationService from './authentication-service';

const ProtectedRoute = ({component: Component, ...rest}) => <Route
  {...rest}
  render={props =>
    AuthenticationService.isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/signin",
          state: { from: props.location }
        }}
      />
    )
  }
/>;

export default ProtectedRoute;
