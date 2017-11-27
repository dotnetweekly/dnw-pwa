import Vue from "vue";
import AppLayout from "./theme/Layout.vue";
import store from "./store";
import router from "./router";

import axios from "axios";
import config from "./app.config";

axios.defaults.baseURL = config.apiDomain;

axios.interceptors.request.use(function (config) {
  if (typeof window === "undefined") {
    return config;
  }
  const token = window.localStorage.getItem("dnwToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(undefined, err => {
  let res = err.response;
  if (res && res.status && res.status === 401 || (res && res.body && !res.body.success)) {
    return Promise.reject(error);
  }
});

router.afterEach((to, from) => {
  store.dispatch(`authModule/setLatestPath`, from.path);
});

if (typeof window !== "undefined") {
  window.IntersectionObserver = require("intersection-observer-polyfill/dist/IntersectionObserver.global");
}

const VueClazyLoad = require("vue-clazy-load");

Vue.use(VueClazyLoad);

const app = new Vue({
  router,
  store,
  ...AppLayout
});

export { app, router, store };
