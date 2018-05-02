import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Link, Route, Switch, withRouter } from 'react-router-dom';


import { getAuthData, logout } from '../services/auth-service';
import AuthData from '../models/auth-data';
import ProtectedRoute from './reusable-components/protected-route';

import Header from './layout/header';
import Home from './home';
import SigninUser from './user-auth/signin-user';
import SignupUser from './user-auth/signup-user';

import Dashboard from './protected/Dashboard';

import '../scss/foundation.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
      authId: null,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const authData = getAuthData();
    this.setState(authData);
  }

  handleLogout() {
    const { history } = this.props;
    logout(history);
    this.setState(new AuthData(false, null));
  }

  render() {
    const { isAuthenticated } = this.state;

    return <Fragment>
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={this.handleLogout}
      />
      <div style={{marginTop: 20}} className="grid-container">
        <Switch>
          <Route path="/" exact render={() => <Home isAuthenticated={isAuthenticated} />} />
          {!isAuthenticated && <Route path="/signin" render={() => <SigninUser />} />}
          {!isAuthenticated && <Route path="/signup" render={() => <SignupUser />} />}
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route render={() => <Home isAuthenticated={isAuthenticated} />} />
        </Switch>
      </div>
    </Fragment>;
  }
};

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(App);
