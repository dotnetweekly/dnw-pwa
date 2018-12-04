<template>
  <div id="app">
    <router-view name="modal"></router-view>
    <app-header></app-header>
    <main class="main-section section">
      <div class="container content">
        <recaptcha ref="recaptcha"></recaptcha>
        <router-view></router-view>
      </div>
    </main>
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
      setTimeout(() => {
        if (typeof window !== "undefined" && this.$refs.recaptcha) {
          window.recaptchaComponent = this.$refs.recaptcha;
        }
        if (typeof window !== "undefined") {
          let expiration = window.localStorage.getItem("dnwTokenExpiration");
          var unixTimestamp = new Date().getTime() / 1000;
          if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
            this.setLoginStatus(true);
          }

          const fontelloDom = document.querySelector("[data-css='fontello']");
          if (fontelloDom) {
            fontelloDom.removeAttribute("disabled");
          }
        }
      }, 1500);
    }
  };
</script>
<style lang="scss">
  @import "../_variables";
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/base/_all";
  @import "~bulma/sass/layout/_all";
  @import "~bulma/sass/grid/_all";
  @import "~bulma/sass/elements/button";
  @import "~bulma/sass/elements/container";
  @import "~bulma/sass/elements/content";
  @import "~bulma/sass/elements/form";
  @import "~bulma/sass/elements/icon";
  @import "~bulma/sass/elements/table";
  @import "~bulma/sass/elements/tag";
  @import "~bulma/sass/components/navbar";
  @import "~bulma/sass/components/tabs";
  @import "~bulma/sass/components/card";
  @import "~bulma/sass/components/message";
  @import "../styles/_multiselect";

  @import "../styles/_main";
  @import "../styles/_modals";
</style>
