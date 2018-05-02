export default class AuthData {
  constructor(isAuthenticated = null, authId = null) {
    this.isAuthenticated = isAuthenticated;
    this.authId = authId;
  }
}
