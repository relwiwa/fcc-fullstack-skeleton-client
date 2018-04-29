import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { isAuthenticated, logout } from '../user-auth/authentication-service';

const Header = ({ history }) => {
  const signedIn = isAuthenticated();

  return <div className="top-bar">
    <div className="top-bar-left">
      <ul className="dropdown menu">
        <li className="menu-text"><a onClick={() => history.push('/')}>Full-Stack Skeleton</a></li>
      </ul>
    </div>
    <div className="top-bar-right">
      <ul className="menu">
        {!signedIn && <li><Link to="/signin"><span className="fa fa-sign-in"></span> Signin</Link></li>}
        {!signedIn && <li><Link to="/signup"><span className="fa fa-user-plus"></span> Signup</Link></li>}
        {signedIn && <li><a onClick={() => logout(history)}><span className="fa fa-sign-out"></span> Logout</a></li>}
      </ul>
    </div>
  </div>;
};

export default withRouter(Header);
