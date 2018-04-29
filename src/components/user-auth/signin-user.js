import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthUser from './auth-user';
import { localStorageKey } from '../../config/words';

const saveUserJwt = (userJwt) => {
  localStorage.setItem(localStorageKey, userJwt);
};

const signinMessages = {
  enter: 'Fill out the fields below to sign in',
  transfer: 'Your signin data is being processed',
  success: <Redirect to='/dashboard' />,
  error: 'Unfortunately an error happened while signing you in.',
};

const SigninUser = (props) => <AuthUser
  authLabel={'Signin'}
  postUrl={'http://localhost:3000/user/signin'}
  statusMessages={signinMessages}
  successCallback={saveUserJwt}
/>;

export default SigninUser;
