import Vue from "vue";
import VueRouter from "vue-router";
import OfflineRedirect from "./theme/OfflineRedirect.vue";
import Category from "./page/Category.vue";
import NotFound from "./page/NotFound.vue";

import About from "./page/About.vue";
import Login from "./page/Login.vue";
import Register from "./page/Register.vue";
import Activate from "./page/Activate.vue";
import AddLink from "./page/AddLink.vue";
import Profile from "./page/Profile.vue";
import User from "./page/User.vue";
import SingleLink from "./page/SingleLink.vue";
import Newsletters from "./page/Newsletters.vue";
import UpdateEmail from "./page/UpdateEmail.vue";
import ForgotPassword from "./page/ForgotPassword.vue";
import ForgotPasswordActivate from "./page/ForgotPasswordActivate.vue";
import Unsubscribe from "./page/Unsubscribe.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "is-active",
  base: __dirname,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    { path: "/offline-redirect", component: OfflineRedirect },
    { path: "/about", component: About },
    { path: "/newsletters", component: Newsletters },
    { path: "/login", components: { modal: Login } },
    { path: "/register", component: Register },
    { path: "/forgot-password", component: ForgotPassword },
    { path: "/forgot-password/:key?", component: ForgotPasswordActivate },
    { path: "/activate/:key?", component: Activate },
    { path: "/unsubscribe/:key?", component: Unsubscribe },
    { path: "/updateEmail/:key?", component: UpdateEmail },
    { path: "/add", component: AddLink },
    { path: "/profile", component: Profile },
    { path: "/users/:username", component: User },
    { path: "/:category/:id", component: SingleLink },
    {
      path: "/week/:week/year/:year",
      component: Category,
      params: { category: "" }
    },
    { path: "/:category/week/:week/year/:year", component: Category },
    { path: "/", component: Category },
    { path: "*", component: NotFound }
  ]
});

export default router;
