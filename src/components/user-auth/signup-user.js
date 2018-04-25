import React from 'react';
import { Link } from 'react-router-dom';

import AuthUser from './auth-user';

const signupMessages = {
  enter: 'Fill out the fields below to sign up',
  transfer: 'Your signup data is being processed',
  success: <span>You were successfully signed up. Continue to <Link to='/signin'><span className="fa fa-sign-in"></span> Signin</Link></span>,
  error: 'Unfortunately an error happened while signing you up.',
};

const SignupUser = (props) => {
  
  return <AuthUser
    authLabel={'Signup'}
    postUrl={'http://localhost:3000/user/signup'}
    statusMessages={signupMessages}      
  />;
}

export default SignupUser;
