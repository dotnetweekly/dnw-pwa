<template>
  <div id="app">
    <app-header></app-header>
    <section class="main-section section">
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
@import "../assets/fontello/css/fontello.css";

body {
  font-size: $font-size;
}

.constant-flex {
  display: flex !important;
}

.tight {
  padding: 0;
  margin: 0;
}

.main-section.section {
  background-color: $background;
}

footer.footer {
  background-color: $white;
  box-shadow: 0px -1px 2px 0px rgba(10, 10, 10, 0.1);
}

.columns {
  flex-wrap: wrap;
}
</style>
