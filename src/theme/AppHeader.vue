<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <router-link class="navbar-item main-logo" to="/" title="dotNET Weekly">
        <img src="/assets/logo.jpg" /><span class="dnw-logo-txt">dotNET Weekly</span>
      </router-link>
      <div class="column tight"></div>
      <div class="header-menu">
        <div class="header-cta">
          <router-link v-if="isAuthenticated" to="/add" class="is-text">+ Add a link</router-link>
          <router-link v-if="!isAuthenticated" to="/login" class="is-text">+ Add a link</router-link>
        </div>
        <div class="header-profile">
          <router-link v-if="isAuthenticated" to="/profile"><i class="icon-user" aria-hidden="true"></i></router-link>
          <router-link v-if="!isAuthenticated" to="/login"><i class="icon-user" aria-hidden="true"></i></router-link>
        </div>
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

.header-menu{
  display: flex;
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

@media screen and (min-width: $desktop) {
  .container {
    min-width: $desktop;
  }
}

@media screen and (min-width: $mobile) {
  .navbar > .container, .main-logo {
    display: flex !important;
  }
}

@media screen and (max-width: $mobile) {
  .header-menu, .main-logo,
  .header-cta, .header-profile{
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .column.tight {
    display: none;
  }
}
</style>
