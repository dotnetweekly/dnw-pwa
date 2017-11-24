import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth";
import linksModule from "./links";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authModule,
    linksModule
  }
});

export default store;
