/*eslint no-unused-vars: "warn"*/

import Vue from "vue";
import VueDirective from "./helpers/directives";
import AppLayout from "./theme/Layout.vue";
import store from "./store";
import router from "./router";

import axios from "axios";
import config from "../app.config";

import setMetadata from "./helpers/metadata";

axios.defaults.baseURL = config.apiDomain;

axios.interceptors.request.use(function(config) {
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
  if (
    (res && res.status && res.status === 401) ||
    (res && res.body && !res.body.success)
  ) {
    return Promise.reject(res);
  }
});

router.afterEach((to, from) => {
  setMetadata(to.path);
  if (from.path == "/login") {
    return;
  }
  store.dispatch(`authModule/setLatestPath`, from.path);
});

const app = new Vue({
  router,
  store,
  ...AppLayout
});

export { app, router, store };
