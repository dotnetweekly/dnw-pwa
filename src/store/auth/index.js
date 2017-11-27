import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import defaultState from "./defaultState";

const inBrowser = typeof window !== "undefined";
const state =
  inBrowser && window.__INITIAL_STATE__
    ? window.__INITIAL_STATE__.authModule
    : defaultState;

if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", function (event) {
    let expiration = window.localStorage.getItem("dnwTokenExpiration");
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
