export default class AuthData {
  constructor(isAuthenticated = null, authUserId = null) {
    this.isAuthenticated = isAuthenticated;
    this.authUserId = authUserId;
  }
}
