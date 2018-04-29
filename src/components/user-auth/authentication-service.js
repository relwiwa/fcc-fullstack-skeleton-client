import jwtDecode from 'jwt-decode';
import { localStorageKey } from '../../config/words';

const AuthenticationService = {
  isAuthenticated: () => {
    const userJwt = localStorage.getItem(localStorageKey);
    if (!userJwt) {
      return false;
    }
    const decodedUserJwt = jwtDecode(userJwt);  
    const jwtExpiresIn = decodedUserJwt.exp;
    const now = Math.floor(Date.now() / 1000);
    return (now >= jwtExpiresIn) ? false : true;
  },
};

export default AuthenticationService;
