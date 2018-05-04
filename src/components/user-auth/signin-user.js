import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthUser from './auth-user';
import authInputsData from '../../config/auth-inputs-data';
import { formInputStati } from '../../config/words';

const signinMessages = {};
signinMessages[formInputStati.enterData] = 'Fill out the fields below to sign in';
signinMessages[formInputStati.transferData] = <span><span className="fa fa-spin fa-cog"></span> Your signin data is being processed <span className="fa fa-spin fa-cog"></span></span>;
signinMessages[formInputStati.erronousTransfer] = 'Unfortunately an error happened while signing you in.';

const SigninUser = ({ onSignin }) => <AuthUser
  headline="Sign In"
  inputsData={authInputsData}
  postUrl={'http://localhost:3000/user/signin'}
  statusMessages={signinMessages}
  submitLabel="Sign In"
  successCallback={onSignin}
/>;

SigninUser.propTypes = {
  onSignin: PropTypes.func.isRequired,
};

export default SigninUser;
