<template>
  <div id="app">
    <router-view name="modal"></router-view>
    <app-header></app-header>
    <section class="main-section section">
      <div>{{process.env.DOMAIN_API}}</div>
      <div class="container content">
        <router-view></router-view>
      </div>
    </section>
    <app-footer></app-footer>
    <ga-analytics ua="UA-31484897-2"></ga-analytics>
  </div>
</template>
<script>
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import gaAnalytics from "../components/gaAnalytics.vue";
export default {
  components: {
    "app-header": AppHeader,
    "app-footer": AppFooter,
    "ga-analytics": gaAnalytics
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
