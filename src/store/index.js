import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth";
import linksModule from "./links";
import userModule from "./user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authModule,
    linksModule,
    userModule
  }
});

export default store;
