import actions from "./actions";
import * as getters from "./getters";
import defaultState from "./defaultState";

const inBrowser = typeof window !== "undefined";
const state =
  inBrowser && window.__INITIAL_STATE__
    ? window.__INITIAL_STATE__.linksModule
    : defaultState;

export default {
  namespaced: true,
  state,
  actions,
  getters
};
