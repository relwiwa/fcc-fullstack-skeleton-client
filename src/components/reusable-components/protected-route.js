import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { getAuthData } from '../../services/auth-service';

const ProtectedRoute = ({component: Component, ...rest}) => <Route
  {...rest}
  render={props =>
    getAuthData().isAuthenticated ? (
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
