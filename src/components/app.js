import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { getAuthData, logout, signin } from '../services/auth-service';
import AuthData from '../models/auth-data';

import Header from './layout/header';
import Home from './home';
import ItemContainer from './items/item-container';
import ItemsContainer from './items/items-container';
import SigninUser from './user-auth/signin-user';
import SignupUser from './user-auth/signup-user';

import '../scss/foundation.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getAuthData();
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  handleLogout() {
    const { history } = this.props;
    logout(history);
    this.setState(new AuthData(false, null));
  }

  handleSignin(userJwt) {
    const { history } = this.props;
    const authData = signin(userJwt);
    this.setState(authData);
    history.push('/items/user');
  }

  render() {
    const { authUserId, isAuthenticated } = this.state;

    return <Fragment>
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={this.handleLogout}
      />
      <div style={{marginTop: 20}} className="grid-container">
        <Switch>
          <Route path="/" exact render={() => <Home isAuthenticated={isAuthenticated} />} />
          {!isAuthenticated && <Route path="/signin" render={() => <SigninUser
            onSignin={this.handleSignin}
          />} />}
          {!isAuthenticated && <Route path="/signup" render={() => <SignupUser />} />}
          <Route path="/items" exact render={() => <ItemsContainer
            authUserId={authUserId}
            isAuthenticated={isAuthenticated} />}
          />
          <Route path="/items/user" render={() => {
            return isAuthenticated
            ? <ItemsContainer
                authUserId={authUserId}
                isAuthenticated={isAuthenticated}
              />
            : <Redirect to="/signin" />;
          }} />
          <Route path="/item/display/:id" render={() => <ItemContainer
            authUserId={authUserId}
            isAuthenticated={isAuthenticated}
          />} />
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
