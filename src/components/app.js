import React, { Fragment } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import '../scss/foundation.scss';

import Signup from './user/signup';

const App = () => {
  return <Fragment>
    <nav>
      <Link to="/signup">Signup</Link>
    </nav>
    <Route path="/signup" component={Signup} />
  </Fragment>;
};

export default App;
