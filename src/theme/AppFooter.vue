<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <div class="footer-menu has-text-left is-pulled-left">
          <router-link to="/newsletters">Newsletters</router-link>
          <!--
          <router-link to="/sponsorship">Sponsorship</router-link>
          -->
          <router-link to="/about">About</router-link>
          <router-link to="/privacy-policy">Privacy Policy</router-link>
        </div>
        <div class="has-text-right is-pulled-right">
          <a href="https://twitter.com/dotnetweekly" rel="noopener" target="_blank">
            <i class="icon-twitter" aria-hidden="true"></i> Follow Us
          </a>
        </div>
        <div class="is-clearfix"></div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@import "../_variables";
.footer {
  padding: $is-size-4 $is-size-6;
}
.footer-menu a {
  padding-right: $is-size-4;
}
</style>
