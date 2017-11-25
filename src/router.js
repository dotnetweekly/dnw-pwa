import Vue from "vue";
import VueRouter from "vue-router";
import OfflineRedirect from "./theme/OfflineRedirect.vue";
import Category from "./page/Category.vue";
import NotFound from "./page/NotFound.vue";

import Login from "./page/Login.vue";
import Register from "./page/Register.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "is-active",
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/offline-redirect", component: OfflineRedirect },
    { path: "/", component: Category },
    { path: "*", component: NotFound }
  ]
});

export default router;
