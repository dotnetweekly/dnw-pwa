import Vue from "vue";
import VueRouter from "vue-router";
import OfflineRedirect from "./theme/OfflineRedirect.vue";

const Category = () => System.import("./page/Category.vue");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "is-active",
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: "/offline-redirect", component: OfflineRedirect },
    { path: "/", component: Category }
  ]
});

export default router;
