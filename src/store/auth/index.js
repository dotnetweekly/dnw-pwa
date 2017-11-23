import actions from "./actions";
import mutations from "./mutations";

const state = {
  isAuthenticated: false
};

const getters = {
  isAuthenticated: state => {
    return state.isAuthenticated;
  }
};

if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", function(event) {
    let expiration = window.localStorage.getItem("tokenExpiration");
    var unixTimestamp = new Date().getTime() / 1000;
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      state.isAuthenticated = true;
    }
  });
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
