<template>
  <nav class="navbar has-shadow">
    <div class="container constant-flex">
      <router-link class="navbar-item constant-flex main-logo" to="/" title="dotNET Weekly">
        <img src="/assets/logo.jpg" /><span class="dnw-logo-txt">dotNET Weekly</span>
      </router-link>
      <div class="column tight"></div>
      <div class="header-cta">
        <router-link to="/add" class="is-text">+ Add a link</router-link>
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

@media screen and (min-width: $desktop) {
  .container {
    min-width: $desktop;
  }
}

@media screen and (max-width: 420px) {
  .column.tight {
    display: none;
  }
}

.navbar-item {
  align-items: center !important;
}

.dnw-logo-txt {
  padding-left: $is-size-7;
}
a.navbar-item.main-logo {
  color: $primary;
}
.header-search {
  padding: 0 20%;
}
.header-cta {
  padding: 1rem 0.75rem;
}
.header-profile {
  font-size: 160%;
  padding: 0.5rem 1rem;
}
</style>