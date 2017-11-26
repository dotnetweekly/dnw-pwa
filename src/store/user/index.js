import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import defaultState from "./defaultState";

const inBrowser = typeof window !== "undefined";
const state =
  inBrowser && window.__INITIAL_STATE__
    ? window.__INITIAL_STATE__.usersModule
    : defaultState;

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
