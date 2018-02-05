<template>
  <div id="app">
    <router-view name="modal"></router-view>
    <app-header></app-header>
    <section class="main-section section">
      <div class="container content">
        <router-view></router-view>
      </div>
    </section>
    <app-footer></app-footer>
    <ga-analytics ua="UA-31484897-2"></ga-analytics>
    <recaptcha ref="recaptcha"></recaptcha>
  </div>
</template>
<script>
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import Recaptcha from '../components/recaptcha'
import gaAnalytics from "../components/gaAnalytics.vue";
export default {
  components: {
    "app-header": AppHeader,
    "app-footer": AppFooter,
    "ga-analytics": gaAnalytics,
    Recaptcha
  },
  mounted() {
    window.recaptchaComponent = this.$refs.recaptcha;
  }
};
</script>
<style lang="scss">
@import "../_variables";
@import "~bulma";
@import "../styles/_multiselect";
@import "../assets/fontello/css/fontello.css";

@import "../styles/_main";
@import "../styles/_modals";
</style>
