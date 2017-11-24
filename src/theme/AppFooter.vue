<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <div class="footer-menu has-text-left is-pulled-left">
          <router-link to="about">About</router-link>
          <router-link to="about">Advertise</router-link>
          <router-link to="about">Code of Conduct</router-link>
        </div>
        <div class="has-text-right is-pulled-right">
          Follow us on
          <a href="https://twitter.com/dotnetweekly" target="_blank">dotNET Weekly</a>
        </div>
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
