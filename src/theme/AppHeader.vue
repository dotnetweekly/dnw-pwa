<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <router-link class="navbar-item main-logo" to="/" title="dotNET Weekly">
        <img src="/assets/logo.jpg" /><span class="dnw-logo-txt">dotNET Weekly</span>
      </router-link>
      <div class="column">
        <div class="header-search">
          <input class="input" type="text" placeholder="Search for a link">
        </div>
      </div>
      <div class="header-cta">
        <router-link to="/add">+ Add a link</router-link>
      </div>
      <div class="header-profile">
        <router-link to="/profile"><i class="icon-user" aria-hidden="true"></i></router-link>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("authModule", ["isAuthenticated"])
  }
};
</script>
<style lang="scss" scoped>
@import "../_variables";
.dnw-logo-txt {
  padding-left: 0.75rem;
}
a.navbar-item.main-logo {
  color: $primary;
  font-size: 120%;
}
.header-search {
  padding: 0 20%;
}
.header-cta {
  padding: 1.1rem;
}
.header-profile {
  font-size: 160%;
  padding: 0.6rem;
}
</style>