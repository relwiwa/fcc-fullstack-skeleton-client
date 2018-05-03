import React from 'react';
import { Link } from 'react-router-dom';

import AuthUser from './auth-user';
import authInputsData from '../../config/auth-inputs-data';
import { authUserStati } from '../../config/words';

const signupMessages = {};
signupMessages[authUserStati.enterData] = 'Fill out the fields below to sign up';
signupMessages[authUserStati.transferData] = <span><span className="fa fa-spin fa-cog"></span> Your signup data is being processed <span className="fa fa-spin fa-cog"></span></span>;
signupMessages[authUserStati.successfulTransfer] = <span>You were successfully signed up. Continue to <Link to='/signin'><span className="fa fa-sign-in"></span> Signin</Link></span>;
signupMessages[authUserStati.erronousTransfer] = 'Unfortunately an error happened while signing you up.';

const SignupUser = (props) => <AuthUser
  headline="Sign up"
  inputsData={authInputsData}
  postUrl={'http://localhost:3000/user/signup'}
  statusMessages={signupMessages}
  submitLabel="Sign Up"
/>;

export default SignupUser;
