<template>
  <div id="app">
    <router-view name="modal"></router-view>
    <app-header></app-header>
    <section class="main-section section">
      <div class="container content">
        <recaptcha ref="recaptcha"></recaptcha>
        <router-view></router-view>
      </div>
    </section>
    <app-footer></app-footer>
    <ga-analytics ua="UA-31484897-2"></ga-analytics>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import Recaptcha from "../components/recaptcha";
import gaAnalytics from "../components/gaAnalytics.vue";
export default {
  components: {
    "app-header": AppHeader,
    "app-footer": AppFooter,
    "ga-analytics": gaAnalytics,
    Recaptcha
  },
  methods: {
    ...mapActions("authModule", {
      setLoginStatus: "setLoginStatus"
    })
  },
  mounted() {
    window.recaptchaComponent = this.$refs.recaptcha;
    if (typeof window !== "undefined") {
      let expiration = window.localStorage.getItem("dnwTokenExpiration");
      var unixTimestamp = new Date().getTime() / 1000;
      if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
        this.setLoginStatus(true);
      }
      document
        .querySelector("[data-css='fontello']")
        .removeAttribute("disabled");
    }
  }
};
</script>
<style lang="scss">
@import "../_variables";
@import "~bulma";
@import "../styles/_multiselect";

@import "../styles/_main";
@import "../styles/_modals";
</style>
