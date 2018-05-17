/*eslint no-undef: "off"*/

import Vue from "vue";
import VueRouter from "vue-router";
import OfflineRedirect from "./theme/OfflineRedirect.vue";

// import Category from "./page/Category.vue";
// import NotFound from "./page/NotFound.vue";
// import About from "./page/About.vue";
// import Login from "./page/Login.vue";
// import Register from "./page/Register.vue";
// import Activate from "./page/Activate.vue";
// import AddLink from "./page/AddLink.vue";
// import Profile from "./page/Profile.vue";
// import User from "./page/User.vue";
// import SingleLink from "./page/SingleLink.vue";
// import Newsletters from "./page/Newsletters.vue";
// import UpdateEmail from "./page/UpdateEmail.vue";
// import ForgotPassword from "./page/ForgotPassword.vue";
// import ForgotPasswordActivate from "./page/ForgotPasswordActivate.vue";
// import Unsubscribe from "./page/Unsubscribe.vue";

const Newsletters = process.BROWSER
  ? () =>
      System.import(
        /* webpackChunkName:'Newsletters' */ "./page/Newsletters.vue"
      )
  : require("./page/Newsletters.vue").default;

const Category = process.BROWSER
  ? () =>
      System.import(/* webpackChunkName:'Newsletters' */ "./page/Category.vue")
  : require("./page/Category.vue").default;

const NotFound = process.BROWSER
  ? () => System.import(/* webpackChunkName:'NotFound' */ "./page/NotFound.vue")
  : require("./page/NotFound.vue").default;

const About = process.BROWSER
  ? () => System.import(/* webpackChunkName:'About' */ "./page/About.vue")
  : require("./page/About.vue").default;

const Login = process.BROWSER
  ? () => System.import(/* webpackChunkName:'Login' */ "./page/Login.vue")
  : require("./page/Login.vue").default;

const Register = process.BROWSER
  ? () => System.import(/* webpackChunkName:'Register' */ "./page/Register.vue")
  : require("./page/Register.vue").default;

const Activate = process.BROWSER
  ? () => System.import(/* webpackChunkName:'Activate' */ "./page/Activate.vue")
  : require("./page/Activate.vue").default;

const AddLink = process.BROWSER
  ? () => System.import(/* webpackChunkName:'AddLink' */ "./page/AddLink.vue")
  : require("./page/AddLink.vue").default;

const Profile = process.BROWSER
  ? () => System.import(/* webpackChunkName:'Profile' */ "./page/Profile.vue")
  : require("./page/Profile.vue").default;

const User = process.BROWSER
  ? () => System.import(/* webpackChunkName:'User' */ "./page/User.vue")
  : require("./page/User.vue").default;

const SingleLink = process.BROWSER
  ? () =>
      System.import(/* webpackChunkName:'SingleLink' */ "./page/SingleLink.vue")
  : require("./page/SingleLink.vue").default;

const UpdateEmail = process.BROWSER
  ? () =>
      System.import(
        /* webpackChunkName:'UpdateEmail' */ "./page/UpdateEmail.vue"
      )
  : require("./page/UpdateEmail.vue").default;

const ForgotPassword = process.BROWSER
  ? () =>
      System.import(
        /* webpackChunkName:'ForgotPassword' */ "./page/ForgotPassword.vue"
      )
  : require("./page/ForgotPassword.vue").default;

const ForgotPasswordActivate = process.BROWSER
  ? () =>
      System.import(
        /* webpackChunkName:'ForgotPasswordActivate' */ "./page/ForgotPasswordActivate.vue"
      )
  : require("./page/ForgotPasswordActivate.vue").default;

const Unsubscribe = process.BROWSER
  ? () =>
      System.import(
        /* webpackChunkName:'Unsubscribe' */ "./page/Unsubscribe.vue"
      )
  : require("./page/Unsubscribe.vue").default;

const PrivacyPolicy = process.BROWSER
  ? () =>
      System.import(
        /* webpackChunkName:'PrivacyPolicy' */ "./page/PrivacyPolicy.vue"
      )
  : require("./page/PrivacyPolicy.vue").default;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "is-active",
  base: __dirname,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    { path: "/offline-redirect", component: OfflineRedirect },
    { path: "/about", component: About },
    { path: "/privacy-policy", component: PrivacyPolicy },
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
    {
      path: "/",
      component: Category,
      params: { category: "" }
    },
    { path: "*", component: NotFound }
  ]
});

export default router;
