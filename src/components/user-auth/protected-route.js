import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from './authentication-service';

const ProtectedRoute = ({component: Component, ...rest}) => <Route
  {...rest}
  render={props =>
    isAuthenticated() ? (
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
