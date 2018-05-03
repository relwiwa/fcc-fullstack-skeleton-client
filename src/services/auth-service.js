import jwtDecode from 'jwt-decode';

import AuthData from '../models/auth-data';
import { localStorageKey } from '../config/words';

const isTokenExpired = (jwtExpiresIn) => {
  const now = Math.floor(Date.now() / 1000);
  return (now >= jwtExpiresIn) ? true : false;
}

export const getToken = () => {
  return localStorage.getItem(localStorageKey);
};

export const getAuthData = () => {
  const userJwt = localStorage.getItem(localStorageKey);
  const authData = new AuthData();
  if (userJwt) {
    const decodedJwt = jwtDecode(userJwt);
    const isExpired = isTokenExpired(decodedJwt.exp);
    if (!isExpired) {
      authData.isAuthenticated = true;
      authData.authUserId = decodedJwt.data;
    }
    else {
      localStorage.removeItem(localStorageKey);
    }
  }
  return authData;
}

export const signin = (jwtToken) => {
  localStorage.setItem(localStorageKey, jwtToken);
  return getAuthData();
}

export const logout = (historyObject) => {
  localStorage.removeItem(localStorageKey);
  historyObject.push('/');
};
