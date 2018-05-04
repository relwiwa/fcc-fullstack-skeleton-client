import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const Header = ({ history, isAuthenticated, onLogout }) => <div className="top-bar">
  <div className="top-bar-left">
    <ul className="dropdown menu">
      <li className="menu-text"><a onClick={() => history.push('/')}>Full-Stack Skeleton</a></li>
    </ul>
  </div>
  <div className="top-bar-right">
    <ul className="menu">
      <li><Link to="/items"><span className="fa fa-list"></span> All Items</Link></li>      
      {isAuthenticated && <li><Link to="/items/user"><span className="fa fa-user"></span> My Items</Link></li>}
      {!isAuthenticated && <li><Link to="/signin"><span className="fa fa-sign-in"></span> Signin</Link></li>}
      {!isAuthenticated && <li><Link to="/signup"><span className="fa fa-user-plus"></span> Signup</Link></li>}
      {isAuthenticated && <li><a onClick={onLogout}><span className="fa fa-sign-out"></span> Logout</a></li>}
    </ul>
  </div>
</div>;

Header.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default withRouter(Header);
