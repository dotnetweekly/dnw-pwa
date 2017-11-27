const mutations = {
  logout(state) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("dnwToken");
      window.localStorage.removeItem("dnwTokenExpiration");
    }
    state.isAuthenticated = false;
  },
  login(state, token) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dnwToken", token.token);
      window.localStorage.setItem("dnwTokenExpiration", token.expiration);
    }
    state.isAuthenticated = true;
  }
};

export default mutations;
