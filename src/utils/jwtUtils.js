export class jwtUtils {
  static isAuth(token) {
    if (!token) {
      return false;
    } else {
      return true;
    }
  }
  static getId(token){
    return token
  }
}
