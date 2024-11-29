class TokenUtil {
  isLogin() {
    return localStorage.getItem("user");
  }

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  setToken(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeToken(key: string) {
    localStorage.removeItem(key);
  }
}

export default new TokenUtil();
