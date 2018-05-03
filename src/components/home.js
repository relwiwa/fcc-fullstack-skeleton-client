import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { isTrueFalseOrNull } from '../services/prop-types-service';

const Home = ({ isAuthenticated }) => <Fragment>
  <h1>This is the Home Component</h1>
  <p>It tells something to the public about this project</p>
  <p>It also shows different invitations to interact, depending on your signin status:</p>
  {isAuthenticated && <ul>
    <li>As you are sign in, you get invited to check out all items or go to your <Link to="/dashboard"><span className="fa fa-list"></span> dashboard</Link></li>
    <li>If you weren't signed in, it would invite you to <Link to="/signin">sign in</Link>, <Link to="/signup">sign up</Link>, or check out all the publicly visible items</li>
  </ul>}
  {!isAuthenticated && <ul>
    <li>If you were signed in, it would invite you to check out all items or go to your <Link to="/dashboard"><span className="fa fa-list"></span> dashboard</Link></li>
    <li>As you aren't signed in, you get invited to <Link to="/signin"><span className="fa fa-sign-in"></span> sign in</Link>, <Link to="/signup"><span className="fa fa-sign-out"></span> sign up</Link>, or check out all the publicly visible items</li>
  </ul>}
</Fragment>;

Home.propTypes = {
  isAuthenticated: isTrueFalseOrNull,
};

export default Home;
