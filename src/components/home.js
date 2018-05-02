import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isAuthenticated }) => <Fragment>
  <h1>This is the Home Component</h1>
  <p>It tells something to the public about this project</p>
  <p>It also shows different invitations to interact, depending on your login status:</p>
  {isAuthenticated && <ul>
    <li>As you are logged in, you get invited to check out all items or go to your dashboard</li>
    <li>If you weren't logged in, it would invite you to <Link to="/signin">sign in</Link>, <Link to="/signup">sign up</Link>, or check out all the publicly visible items</li>
  </ul>}
  {!isAuthenticated && <ul>
    <li>If you were logged in, it would invite you to check out all items or go to your dashboard</li>
    <li>As you aren't logged in, you get invited to <Link to="/signin">sign in</Link>, <Link to="/signup">sign up</Link>, or check out all the publicly visible items</li>
  </ul>}
</Fragment>;

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Home;
