import AuthUserInput from '../models/auth-user-input';

export const authUserInputData = [
  new AuthUserInput(
    'email',
    'email',
    'Email Address',
    'Enter a valid email address',
    (value) => {
      /* Email regular expression taken from:
      http://emailregex.com */
      const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return value.match(emailRegExp) ? true : false;
    },
  ),
  new AuthUserInput(
    'password',
    'password',
    'Password',
    'Enter at least 8 digits, mixing letters and numbers',
    (value) => {
      if (value.length < 8) {
        return false;
      }
      if (!value.match(/[a-zA-Z]/) || !value.match(/[0-9]/)) {
        return false;
      }
      return true;
    },
  ),
];
