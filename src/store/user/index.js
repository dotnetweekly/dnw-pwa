import actions from "./actions";
import getters from "./getters";
import defaultState from "./defaultState";

const inBrowser = typeof window !== "undefined";
const state =
  inBrowser && window.__INITIAL_STATE__
    ? window.__INITIAL_STATE__.userModule
    : defaultState;

export default {
  namespaced: true,
  state,
  actions,
  getters
};
