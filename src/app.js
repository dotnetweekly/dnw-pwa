import Vue from "vue";
import AppLayout from "./theme/Layout.vue";
import store from "./store";
import router from "./router";

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
